import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
    id: number;
    username: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => void;
}

interface AuthProviderProps {
    children: ReactNode;
  }

  const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();


    const login = async (username:string, password:string) => {
        try {
            const result = await axios.post('https://chatmultiusers-back-production.up.railway.app/login', { username, password });
            const loggedInUser = {
                id: result.data.id,
                username: username,
            };
            console.log('Usuário logado com sucesso!', loggedInUser);
            setIsAuthenticated(true);
            setUser(loggedInUser);
            navigate('/chat');
        } catch (error:Error) {
            console.error('Login failed:', error.response.data.message || 'Unexpected error');
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);