import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { userDniData, userRucData } from '../../types';

export default function SellerProfile() {
    const nav = useNavigate();
    const [profileData, setProfileData] = useState<userDniData | userRucData | null>(null);
    const [message, setMessage] = useState('');
    const [editingField, setEditingField] = useState('');
    const [editedData, setEditedData] = useState({
        correo: '',
        telefono: '',
        foto_perfil: '',
        pais: '',
        departamento: '',
        provincia: '',
        distrito: '',
        direccion_detallada: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('accessToken');
                if (!token) throw new Error('No token found');

                return await axios.get<userDniData | userRucData | null>('https://agroweb-5dxm.onrender.com/api/seller/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => response.data);

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile().then((data) => {
            if (data) {
                setProfileData(data);
            }
        });

    }, []);

    const handleEditChange = (field: string, value: string) => {
        setEditedData({ ...editedData, [field]: value });
    };

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('timeLeft');
        sessionStorage.removeItem('typeUser');
        setMessage('Session expired. Please log in again.');
        nav('/login');
    };

    const handleSave = async () => {
        try {
            const token = sessionStorage.getItem('accessToken');
            if (!token) throw new Error('AccessToken no disponible en sessionStorage.');

            await axios.put('https://agroweb-5dxm.onrender.com/api/seller/update-profile', editedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage('Perfil actualizado con éxito.');
            setEditingField(''); // Deja de editar
        } catch (error) {
            setMessage('Error al actualizar el perfil. Inténtalo de nuevo.');
            if (axios.isAxiosError(error)) {
                console.error('Error al actualizar el perfil:', error.response?.data?.error || error.message);
            }
        }
    };
    
    

    return (
        <div >
            <Navbar />
            <div className="w-full flex justify-center items-center my-20">
                <div className="grid lg:flex w-3/4 h-3/4">
                    <div className="border border-gray-700 h-full rounded-lg p-4 w-full lg:w-1/3">
                        <h1 className="text-2xl font-bold mb-4">Menú</h1>
                        <div className="flex flex-wrap lg:flex-col space-y-4">
                            <Link to="/" className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg">
                                <svg data-name="Layer 1" width="24" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M25 1a24 24 0 1 0 24 24A24 24 0 0 0 25 1Zm0 46a22 22 0 1 1 22-22 22 22 0 0 1-22 22Z"/><path d="M25 25.41a13 13 0 0 0-13 13 1 1 0 0 0 2 0 11 11 0 1 1 22 0 1 1 0 0 0 2 0 13 13 0 0 0-13-13ZM25 23.71a7 7 0 0 0 6.81-7.2A7 7 0 0 0 25 9.3a7 7 0 0 0-6.81 7.21 7 7 0 0 0 6.81 7.2Zm0-12.41a5 5 0 0 1 4.81 5.21 5 5 0 0 1-4.81 5.2 5 5 0 0 1-4.81-5.2A5 5 0 0 1 25 11.3Z"/></svg>
                                <span className='ml-2'>General</span>
                            </Link>

                            {profileData?.tipoUsuario.tipo === "COMPRADOR" ? (
                                <Link to="/shopping-cart" className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg">
                                <svg className="lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                                </svg>
                                <span className='ml-2'>Carrito de compras</span>
                                </Link>
                            ) : (
                                <Link to="/my-products" className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg">
                                    <svg className="lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                                    </svg>
                                    <span className='ml-2'>Mis productos</span>

                                </Link>
                            )}

                            <Link to="#" className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg">
                                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 20v-7h7l-3.217 3.22A5.916 5.916 0 0 0 12 18a6 6 0 0 0 5.648-4h.018c.114-.325.201-.66.259-1h2.012A8 8 0 0 1 12 20h-.01a7.94 7.94 0 0 1-5.653-2.34L4 20Zm2.074-9H4.062a8 8 0 0 1 7.933-7H12a7.94 7.94 0 0 1 5.654 2.34L20 4v7h-7l3.222-3.22A5.915 5.915 0 0 0 12 6a6 6 0 0 0-5.648 4h-.018c-.115.325-.202.66-.259 1h-.001Z" fill="#000"/>
                                </svg>
                                <span className='ml-2'>Historial de compras</span>
                            </Link>

                            <Link to="#" className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                                    <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z"></path>
                                </svg>
                                <span className='ml-2'>Seguridad</span>
                            </Link>

                            <button className="flex items-center w-full lg:w-auto p-2 hover:bg-gray-300 rounded-lg" onClick={handleLogout}>
                                <svg viewBox="0 0 128 128" width="24" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M91 119H9V9h82V1H1v126h90z"/><path d="M40 60h8v8h-8zM90.8 96.8 123.7 64 90.8 31.2l-5.6 5.6L108.3 60H58v8h50.3L85.2 91.2z"/></svg>
                                <span className='ml-2'>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                    <div className="h-full mt-4 lg:mt-0 ml-0 lg:ml-4 items-center w-full lg:w-3/4">
                        <div className='w-full border border-gray-700 border-b-0'>
                            <h1 className="text-2xl font-bold w-full px-8 py-1">Perfil de usuario</h1>
                        </div>
                        <div className={`w-full h-auto min-h-full ${!profileData ? "flex items-center justify-center" : ""} border border-gray-700 rounded-t-none rounded-b`}>
                        {profileData ? (
                            <div className='flex p-4'>
                                <div className='w-3/4 flex flex-col space-y-4'>
                                    {/* Información adicional (DNI o Empresa) */}
                                    {profileData.user.dni_ruc.length === 8 && profileData.additionalInfo && (
                                        <>
                                            <h3 className='text-xl font-semibold'>Datos del Usuario</h3>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Primer Nombre: </strong>
                                                <span>{'primer_nombre' in profileData.additionalInfo ? profileData.additionalInfo.primer_nombre : 'No disponible'}</span>
                                            </div>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Apellidos: </strong>
                                                <span>{'apellido_paterno' in profileData.additionalInfo ? profileData.additionalInfo.apellido_paterno : ''}</span>&nbsp;
                                                <span>{'apellido_materno' in profileData.additionalInfo ? profileData.additionalInfo.apellido_materno : ''}</span>
                                            </div>
                                        </>
                                    )}
                                    {profileData.user.dni_ruc.length === 8 && !profileData.additionalInfo && (
                                        <p>Datos de usuario no disponibles.</p>
                                    )}
                                    {profileData.user.dni_ruc.length !== 8 && profileData.additionalInfo && (
                                        <>
                                            <h3 className='text-xl font-semibold'>Datos de la Empresa</h3>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Razón Social: </strong>
                                                <span>{'razon_social' in profileData.additionalInfo ? profileData.additionalInfo.razon_social : 'No disponible'}</span>
                                            </div>
                                        </>
                                    )}
                                    {profileData.user.dni_ruc.length !== 8 && !profileData.additionalInfo && (
                                        <p>Datos de la empresa no disponibles.</p>
                                    )}
                                    {/* Tipo de Usuario */}
                                    <div className='flex items-center'>
                                        <strong className='w-1/3'>Tipo de Usuario: </strong>
                                        <span>{profileData.tipoUsuario ? profileData.tipoUsuario.tipo : 'No disponible'}</span>
                                    </div>

                                    {/* Correo */}
                                    <div className='flex items-center'>
                                        <strong className='w-1/3'>Correo: </strong>
                                        {editingField === 'correo' ? (
                                            <input
                                                type="email"
                                                className='border p-1 rounded w-2/3'
                                                value={editedData.correo || profileData.user.correo}
                                                onChange={(e) => handleEditChange('correo', e.target.value)}
                                            />
                                        ) : (
                                            <div className='flex items-center w-2/3'>
                                                <span>{profileData.user.correo}</span>
                                                <button className='ml-2 text-blue-500' onClick={() => setEditingField('correo')}>Editar</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* DNI/RUC */}
                                    <div className='flex items-center'>
                                        <strong className='w-1/3'>DNI/RUC: </strong>
                                        <span>{profileData.user.dni_ruc}</span>
                                    </div>

                                    {/* Teléfono */}
                                    <div className='flex items-center'>
                                        <strong className='w-1/3'>Teléfono: </strong>
                                        {editingField === 'telefono' ? (
                                            <input
                                                type="text"
                                                className='border p-1 rounded w-2/3'
                                                value={editedData.telefono || profileData.user.telefono}
                                                onChange={(e) => handleEditChange('telefono', e.target.value)}
                                            />
                                        ) : (
                                            <div className='flex items-center w-2/3'>
                                                <span>{profileData.user.telefono || 'No disponible'}</span>
                                                <button className='ml-2 text-blue-500' onClick={() => setEditingField('telefono')}>Editar</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Dirección */}
                                    {profileData.direccion ? (
                                        <>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>País: </strong>
                                                {editingField === 'pais' ? (
                                                    <input
                                                        type="text"
                                                        className='border p-1 rounded w-2/3'
                                                        value={editedData.pais || profileData.direccion.pais}
                                                        onChange={(e) => handleEditChange('pais', e.target.value)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center w-2/3'>
                                                        <span>{profileData.direccion.pais}</span>
                                                        <button className='ml-2 text-blue-500' onClick={() => setEditingField('pais')}>Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Departamento: </strong>
                                                {editingField === 'departamento' ? (
                                                    <input
                                                        type="text"
                                                        className='border p-1 rounded w-2/3'
                                                        value={editedData.departamento || profileData.direccion.departamento}
                                                        onChange={(e) => handleEditChange('departamento', e.target.value)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center w-2/3'>
                                                        <span>{profileData.direccion.departamento}</span>
                                                        <button className='ml-2 text-blue-500' onClick={() => setEditingField('departamento')}>Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Provincia: </strong>
                                                {editingField === 'provincia' ? (
                                                    <input
                                                        type="text"
                                                        className='border p-1 rounded w-2/3'
                                                        value={editedData.provincia || profileData.direccion.provincia}
                                                        onChange={(e) => handleEditChange('provincia', e.target.value)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center w-2/3'>
                                                        <span>{profileData.direccion.provincia}</span>
                                                        <button className='ml-2 text-blue-500' onClick={() => setEditingField('provincia')}>Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Distrito: </strong>
                                                {editingField === 'distrito' ? (
                                                    <input
                                                        type="text"
                                                        className='border p-1 rounded w-2/3'
                                                        value={editedData.distrito || profileData.direccion.distrito}
                                                        onChange={(e) => handleEditChange('distrito', e.target.value)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center w-2/3'>
                                                        <span>{profileData.direccion.distrito}</span>
                                                        <button className='ml-2 text-blue-500' onClick={() => setEditingField('distrito')}>Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex items-center'>
                                                <strong className='w-1/3'>Dirección Detallada: </strong>
                                                {editingField === 'direccion_detallada' ? (
                                                    <textarea
                                                        className='border p-1 rounded w-2/3'
                                                        value={editedData.direccion_detallada || profileData.direccion.direccion_detallada}
                                                        onChange={(e) => handleEditChange('direccion_detallada', e.target.value)}
                                                    />
                                                ) : (
                                                    <div className='flex items-center w-2/3'>
                                                        <span>{profileData.direccion.direccion_detallada}</span>
                                                        <button className='ml-2 text-blue-500' onClick={() => setEditingField('direccion_detallada')}>Editar</button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex items-center'>
                                            <strong className='w-1/3'>Dirección: </strong>
                                            <span>No disponible</span>
                                        </div>
                                    )}
                                    <button className='mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded' onClick={handleSave}>Guardar cambios</button>
                                </div>
                                <div className='flex w-1/4 items-start'>
                                    <div className='flex flex-col items-center w-full'>
                                        <img
                                            src={profileData.user.foto_perfil || 'https://via.placeholder.com/150'}
                                            alt="Foto de perfil"
                                            className='w-48 h-48 rounded-full mb-4'
                                        />
                                        {editingField === 'foto_perfil' ? (
                                            <input
                                                type="file"
                                                className='border p-1 rounded w-full'
                                                value={editedData.foto_perfil || profileData.user.foto_perfil}
                                                onChange={(e) => handleEditChange('foto_perfil', e.target.value)}
                                            />
                                        ) : (
                                            <button className='text-blue-500' onClick={() => setEditingField('foto_perfil')}>Editar</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col justify-center items-center h-full w-full'>
                                <h1>Aún no has iniciado sesión!</h1>
                                <button 
                                onClick={()=> nav('/login')}
                                className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mt-4'>
                                    Iniciar sesión
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

