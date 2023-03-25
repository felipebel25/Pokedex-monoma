import { IUser } from '@/interfaces/users';
import { createContext } from 'react';


export interface AuthContextProps {
     isLoggedIn: boolean;
     user?: IUser;

     loginUser: (email: string, password: string) => Promise<boolean>;
     logout: () => void;

}
export const AuthContext = createContext({} as AuthContextProps)