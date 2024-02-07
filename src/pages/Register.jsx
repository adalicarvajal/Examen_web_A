import React from "react";
import { Card, Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useAuth } from '../contexts/Auth';
import { useState } from 'react';
import { Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.error('Las contraseñas no coinciden');
            return;
        }
        try {
            await signUp({ email, password });
            setShowAlert(true);
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    const handleSigIn = () => {
        navigate('/');
    }


    return (
        <div className="mx-auto bg-slate-100">
            <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto p-4">
                <Card className="max-w-sm">
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        {showAlert && (
                            <Alert color="success" onDismiss={() => setShowAlert(false)}>
                                <span className="font-medium">Registro exitoso!</span> Puedes iniciar sesión ahora.
                            </Alert>
                        )}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2" value="Your email" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@flowbite.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Your password" />
                            </div>
                            <TextInput
                                id="password2"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="confirmPassword" value="Repeat password" />
                            </div>
                            <TextInput
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" />
                            <Label htmlFor="agree" className="flex">
                                I agree with the&nbsp;
                                <div className="text-cyan-600  dark:text-cyan-500">
                                    terms and conditions
                                </div>
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className='text-blue-400 text-pretty font-medium hover:underline cursor-pointer' onClick={handleSigIn}>Already have an account? </span>
                        </div>
                        <Button type="submit">Register new account</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Register;