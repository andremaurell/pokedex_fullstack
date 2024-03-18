import { app, pool } from '../index';
import express, { Request, Response } from 'express';
import { PokemonDetails } from './types';
import axios from 'axios';
import dotenv from 'dotenv';

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEAPI_URL_TYPE = 'https://pokeapi.co/api/v2/type/';

const router = express.Router();
dotenv.config();

router.get('/api/pokemons', async (req: Request, res: Response) => {
    try { 
        const response = await axios.get(`${POKEAPI_URL}?limit=151`);
        const pokemonData = response.data.results.map((pokemon: any) => {
            const id = pokemon.url.split('/').slice(-2, -1)[0];
            return {
                name: pokemon.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
        });
        res.json(pokemonData);
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

// Busca um time registrado por usuário
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

// Rota para criação de um time
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

router.get('/api/types/:type', async (req, res) => {
    const type = req.params.type;

    try {
        const response = await axios.get(`${POKEAPI_URL_TYPE}${type}`);
        const pokemons = response.data.pokemon.map((pokemon: { pokemon: { name: string; }; }) => pokemon.pokemon.name);
        
        res.json({
            type: type,
            pokemons: pokemons
        });
    } catch (error) {
        res.status(404).json({ error: `Pokémon type ${type} not found.` });
    }
}); 

router.get('/api/pokemons/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const response = await axios.get(`${POKEAPI_URL}${name}`, );
        const { id, height, weight, types } = response.data;
        res.json({ name, id, height, weight, types: types.map((type: { type: { name: string; }; }) => type.type.name)})
    } catch (error) {
        res.status(404).json({ error: `Pokémon ${name} not found.` });
    }
});


export { router };

