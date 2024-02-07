import React, { useContext, useState, useEffect, createContext } from 'react';
import { supabase } from '../supabase/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = supabase.auth.getSession();

        setUser(session?.user ?? null);
        setLoading(false);

        supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );
    }, []);

    const value = {
        signUp: async (dataSingUp) => {
            const { data, error } = await supabase.auth.signUp(dataSingUp);
            if (error) console.error('Error en el registro:', error.message);
            return data;
        },
        signIn: async (datasignIn) => {
            console.log(datasignIn);
            const { data, error } = await supabase.auth.signInWithPassword(datasignIn);
            if (error) console.error('Error en el inicio de sesión:', error.message);
            return data;
        },
        signOut: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) console.error('Error al cerrar sesión:', error.message);
        },
        user,
    };


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};