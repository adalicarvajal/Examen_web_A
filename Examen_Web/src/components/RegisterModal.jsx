import { Alert, Button, Card, Checkbox, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { supabase } from '../supabase/client';

function RegisterModal({ show, onClose, onNewUser }) {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [role, setRole] = useState('');

    const { signUp } = useAuth();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const { data, error } = await supabase
            .from('role')
            .select('id, role');
        if (error) console.log('error', error);
        else setRoles(data);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { user } = await signUp({ email, password });

            const newUser = {
                names: name + ' ' + lastName,
                email: email,
                id_role: parseInt(role),
                id_auth: user.id
            }

            const { error } = await supabase
                .from('users')
                .insert(newUser);

            if (error) console.error('Error al registrar al usuario:', error.message);

            onNewUser();
            setShowAlert(true);
        } catch (error) {
            console.error('Error al registrar al usuario:', error.message);
        }
    };


    const onCloseModal = () => {
        setEmail('');
        setPassword('');
        setShowAlert(false);
        onClose();
    }


    return (
        <Modal show={show} size="md" onClose={onCloseModal} popup>
            <Modal.Header />
            <Modal.Body>
                <Card className="max-w-sm">
                    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                        {showAlert && (
                            <Alert color="success" onDismiss={() => setShowAlert(false)}>
                                <span className="font-medium">Registro exitoso!</span> Revisa tu correo para confirmar tu cuenta.
                            </Alert>
                        )}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Nombres" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Ingresa los nombres"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lastName" value="Apellidos" />
                            </div>
                            <TextInput
                                id="lastName"
                                type="text"
                                placeholder="Ingresa los apellidos"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="role" value="Role" />
                            </div>
                            <Select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Selecciona un rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.role}</option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2" value="Email" />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@test.com"
                                required
                                value={email} // Controla el input con el estado email
                                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Contraseña" />
                            </div>
                            <TextInput
                                id="password2"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="agree" />
                            <Label htmlFor="agree" className="flex">
                                Acepto los&nbsp;
                                <div className="text-cyan-600  dark:text-cyan-500">
                                    terminos y condiciones
                                </div>
                            </Label>
                        </div>

                        <Button type="submit">Registrar nuevo usuario</Button>
                    </form>
                </Card>
            </Modal.Body>
        </Modal>
    );
}

export default RegisterModal;