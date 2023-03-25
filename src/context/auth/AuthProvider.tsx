import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { AuthContext, AuthReducer } from './index';
import { pokeApi } from '@services';
import { IUser } from '@/interfaces/users';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;

}
const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE)
    // ---------login function-----------
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await pokeApi.post('/auth/login', { email, password })
            const { token, user } = data;

            Cookies.set('token', token)
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;

        } catch ({ error }) {
            return false;
        }
    }
    // ---------logout function-----------
    const logout = async () => {
        Cookies.remove('token')
        Cookies.remove('cart')
        dispatch({ type: '[Auth] - Logout' })
    }
    // ---------------validar si hay cookie cookie------------
    useEffect(() => {
        checkToken()
    }, [])
    const checkToken = async () => {
        if (!Cookies.get('token')) return;
        try {
            const { data } = await pokeApi.get('/user/validate-token');
            const { token, user } = data
            if (!user) return false
            dispatch({ type: '[Auth] - Login', payload: user })
        } catch (error) {
            Cookies.remove('token')
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                //methods
                loginUser,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}