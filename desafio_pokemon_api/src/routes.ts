import { app, pool } from '../index';
import express, { Request, Response } from 'express';
import { PokemonDetails } from './types';
import axios from 'axios';
import dotenv from 'dotenv';
import { get } from 'http';
import { types } from 'util';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEAPI_URL_LEGENDARY = 'https://pokeapi.co/api/v2/pokemon-species/';

const router = express.Router();
dotenv.config();

interface PokemonData {
    name: string;
    types: string[];
    image: string;

}

const getPokemonDetails = async (name: string) => {
    try {
        const response = await axios.get(`${POKEAPI_URL}${name}`);
        const { id, height, weight, types, stats } = response.data;
        return { name, id, height, weight, 
            types: types.map((type: { type: { name: string; }; }) => type.type.name), 
            stats: stats.map((stat: { base_stat: number; stat: { name: string; }; }) => {
            return { name: stat.stat.name, base_stat: stat.base_stat };
        }) };
    } catch (error) {
        throw new Error(`Pokémon ${name} not found.`);
    }
};

router.get('/api/pokemons', async (req: Request, res: Response) => {
    try { 
        const response = await axios.get(`${POKEAPI_URL}?limit=151`);
        const pokemonData: PokemonData[] = [];
        
        const pokemonPromises = response.data.results.map(async (pokemon: any) => {
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            const infos = await getPokemonDetails(pokemon.name);
            console.log(infos.stats)
            return {
                name: pokemon.name,
                stats: infos.stats,
                types: infos.types,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
        });

        const resolvedPokemonData = await Promise.all(pokemonPromises);        
        res.json(resolvedPokemonData);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        res.status(500).json({ message: 'Error fetching Pokemon data' });
    }
});


router.get('/api/teams', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM teams');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});
router.get('/api/teams/:owner', async (req: Request, res: Response) => {
    const owner = req.params.owner;
    try {
        const { rows } = await pool.query('SELECT * FROM teams WHERE owner = $1', [owner]);
        if (rows.length === 0) {
            res.status(404).json({ error: 'Team not found for the specified owner.' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});
router.post('/api/teams', async (req: Request, res: Response) => {
    const { user, team } = req.body;
    if (!user || !team || !Array.isArray(team)) {
        res.status(400).json({ error: 'User and team are required as an array.' });
        return;
    }
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const pokemonDetailsList: PokemonDetails[] = [];
        for (const pokemonName of team) {
            try {
                const response = await axios.get(`${POKEAPI_URL}${pokemonName}`);
                const { id, height, weight } = response.data;
                pokemonDetailsList.push({ name: pokemonName, id, height, weight });
            } catch (error) {
                await client.query('ROLLBACK');
                res.status(404).json({ error: `Pokémon ${pokemonName} not found.` });
                return;
            }
        }
        await client.query('INSERT INTO teams (owner, pokemons) VALUES ($1, $2)', [user, JSON.stringify(pokemonDetailsList)]);
        await client.query('COMMIT');
        res.json({ message: 'Team created successfully.' });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: (error as Error).message });
    } finally {
        client.release();
    }
});
interface legendaries {
    is_legendary: boolean;
    is_mythical: boolean;
}

interface stats {
    name: string;
    base_stat: number;
}

const getPokemonLegendary = async (pokemonName: string) => {
    try {
        const response = await axios.get(`${POKEAPI_URL_LEGENDARY}${pokemonName}`);
        const { is_legendary, is_mythical }: legendaries = response.data;
        return { is_legendary, is_mythical };
    } catch (error) {
        throw new Error(`Pokémon ${pokemonName} not found.`);
    }
};
const getPokemonStats = async (pokemonName: string) => {
    try {
        const response = await axios.get(`${POKEAPI_URL}${pokemonName}`);
        return response.data.stats.map((stat: { base_stat: number; stat: { name: string; }; }) => {
            return { name: stat.stat.name, base_stat: stat.base_stat };
        });

    } catch (error) {
        throw new Error(`Pokémon ${pokemonName} not found stats.`);
    }
};

router.get('/api/legendaries', async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${POKEAPI_URL_LEGENDARY}?limit=151`);
        const legendaryPromises = response.data.results.map(async (pokemon: any) => {
            const legendary = await getPokemonLegendary(pokemon.name);
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            if (legendary.is_legendary || legendary.is_mythical) {
                const types = await axios.get(`${POKEAPI_URL}${id}`);
                const stats = await getPokemonStats(pokemon.name);
                const legendaryData = {
                    name: pokemon.name,
                    legendary: legendary,
                    stats: stats, 
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                    types: types.data.types.map((type: { type: { name: string; }; }) => type.type.name)
                };
                return legendaryData;
            }
            return null;
        });
        const resolvedData = (await Promise.all(legendaryPromises)).filter(data => data !== null);
        res.json(resolvedData);
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        res.status(500).json({ message: 'Error fetching Pokemon data' });
    }
});


export { router };