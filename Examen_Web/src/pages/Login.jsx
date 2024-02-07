import { Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/Auth';
import { Spinner } from 'flowbite-react';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { signIn, user } = useAuth();


    useEffect(() => {
        if (user) {
            navigate('/home');
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn({ email, password });
            navigate('/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };




    const handleSingUp = () => navigate('/register');

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">  </div>
    }

    return (
        <div className="mx-auto bg-slate-100">
            <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto p-4">
                <Card className="max-w-sm">
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Correo Electronico" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@flowbite.com"
                                required
                                value={email} // Controla el input con el estado email
                                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Contraseña" />
                            </div>
                            <TextInput
                                id="password1"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className='text-blue-400 text-pretty font-medium hover:underline cursor-pointer' onClick={handleSingUp}>No tienes cuenta? </span>
                        </div>
                        <Button type="submit">Iniciar Sesion</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Login;