import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';

export default function CompletaPerfil() {
    const nav = useNavigate();
    // Leer el accessToken desde sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');
    const id_usuario = sessionStorage.getItem('id_usuario'); // Supongamos que también guardaste id_usuario en sessionStorage
    
    if (!accessToken) {
        console.error("AccessToken no está definido.");
    }

    const [formData, setFormData] = useState({
        pais: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion_detallada: '',
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(
                `https://agroweb-5dxm.onrender.com/api/auth/complete-profile`,
                { id_usuario, ...formData },  // Enviar el id_usuario y los datos del formulario
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,  // Agregar el token en los headers
                    },
                }
            );
            setMessage('Perfil completado con éxito.');
            setTimeout(() => {
                nav('/homepage');
            }, 1000);
        } catch (error) {
            setMessage('Error al completar el perfil. Inténtalo de nuevo.');
            if(axios.isAxiosError(error) && error) console.error('Error during profile completion:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto bg-white p-8 my-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Completa tu Perfil</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="pais" className="block text-sm font-medium text-gray-700">País:</label>
                    <input
                    id="pais"
                    type="text"
                    name="pais"
                    value={formData.pais}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="departamento" className="block text-sm font-medium text-gray-700">Departamento:</label>
                    <input
                    id="departamento"
                    type="text"
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="provincia" className="block text-sm font-medium text-gray-700">Provincia:</label>
                    <input
                    id="provincia"
                    type="text"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="distrito" className="block text-sm font-medium text-gray-700">Distrito:</label>
                    <input
                    id="distrito"
                    type="text"
                    name="distrito"
                    value={formData.distrito}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="direccion_detallada" className="block text-sm font-medium text-gray-700">Dirección Detallada:</label>
                    <textarea
                    id="direccion_detallada"
                    name="direccion_detallada"
                    value={formData.direccion_detallada}
                    onChange={handleTextChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Guardar Perfil
                </button>
                </form>

                {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
            </div>
            <Footer />
        </div>
    )
}

