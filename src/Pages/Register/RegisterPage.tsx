import { useState, useEffect } from 'react';
import axios from 'axios';
import { datosUsuario, userDniRucData, UserType, userVerifyData } from "../../types";
import { useNavigate } from "react-router-dom";
import fondoAgroWeb from '../../utils/images/FondoAgroWeb.webp';
import logo from '../../utils/images/Logo.jpg';

export default function Register(){
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        dniRuc: '',
        id_tipo_usuario: '1', // Por defecto, selecciona 'COMPRADOR'
        correo: '',
        codigoVerificacion: '',
        telefono: '',
        clave: ''
      });
    
    const [inicio, setInicio] = useState<string | null>("inicio"); // Estado para manejar si se ha iniciado el proceso de registro
    const [tiposUsuario, setTiposUsuario] = useState<UserType>();
    const [error, setError] = useState('');
    const [datosUsuario, setDatosUsuario] = useState<datosUsuario | null>(null); // Estado para almacenar los datos obtenidos
    const [success, setSuccess] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState(false); // Estado para manejar si el código ha sido enviado
    const [codigoVerificado, setCodigoVerificado] = useState(false); // Estado para manejar si el código ha sido verificado

    useEffect(() => {
        // Obtener los tipos de usuario al montar el componente
        const fetchTiposUsuario = async () => {
          try {
            return await axios.get<UserType>('https://agroweb-5dxm.onrender.com/api/tipo-usuario/tipos-usuario').then(response => response.data);
          } catch (error) {
            console.error('Error al obtener los tipos de usuario:', error);
            setError('Error al cargar los tipos de usuario.');
          }
        };
    
        fetchTiposUsuario().then(setTiposUsuario);
    }, []);
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    };

    const handleSubmitDniRuc = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInicio(null);
        setError("");
        setSuccess("");
        setDatosUsuario(null);

        try{
            const payload = {
                dni_ruc: formData.dniRuc,
                id_tipo_usuario: formData.id_tipo_usuario
            };

            const response = await axios.post<userDniRucData>(`https://agroweb-5dxm.onrender.com/api/datos/obtener-datos`, payload);

            setDatosUsuario(response.data.datosUsuario); 
            setSuccess(response.data.message);

        } catch (error) {
            setError('Ocurrió un error al obtener los datos.');

        }
    };

    const handleEnviarCodigo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            // @ts-ignore
            const response = await axios.post(`https://agroweb-5dxm.onrender.com/api/auth/enviar-codigo`, {
                correo: formData.correo,  // Asegúrate de que 'correo' está correctamente definido
                dni_ruc: formData.dniRuc,  // Asegúrate de que 'dniRuc' está correctamente definido
                tipo_usuario: formData.id_tipo_usuario  // Asegúrate de que 'id_tipo_usuario' está correctamente definido
            });
            setCodigoEnviado(true);  // Actualizar estado cuando el código es enviado
            setSuccess('Código de verificación enviado.');
        }catch{
            setError('Error al enviar el código de verificación.');
            setSuccess('');
        }
    };

    const handleVerificarCodigo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // @ts-ignore
            const response = await axios.post(`https://agroweb-5dxm.onrender.com/api/auth/verify-email`, { 
              codigo: formData.codigoVerificacion, 
              dni_ruc: formData.dniRuc 
            });
            setCodigoEnviado(false);
            setCodigoVerificado(true);
            setSuccess('Código verificado exitosamente.');
          } catch {
            setError('Error al verificar el código.');
          }
    };

    const handleFinalizarRegistro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const payload = {
              dni_ruc: formData.dniRuc,
              telefono: formData.telefono,
              correo: formData.correo,
              clave: formData.clave,
              id_tipo_usuario: formData.id_tipo_usuario,
              id_empresa: datosUsuario?.id_empresa,
              id_datos_dni: datosUsuario?.id_datos_dni,
            };

            const response = await axios.post<userVerifyData>(`https://agroweb-5dxm.onrender.com/api/auth/finalizar-registro`, payload);
            setSuccess(response.data.message);
            nav('/login');
        }catch{
            setError('Error al finalizar el registro.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fondoAgroWeb})` }}>
            <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
                {/* Columna Izquierda: Información General */}
                <div className="flex flex-col items-center justify-center w-1/2 p-12 bg-white-100">
                    <h1 className="text-5xl font-bold text-green-600 mt-0 mb-6">AgroWeb</h1>
                    <img
                        src={logo} 
                        alt="Imagen de AgroWeb"
                        className="rounded-2xl shadow-lg w-90 h-70 object-cover"
                    />
                    <p className="mt-4 text-center text-gray-700 text-lg">
                        Conéctate con el futuro de la agricultura sostenible.
                        Únete a nuestra comunidad y descubre oportunidades para crecer.
                    </p>
                </div>

                {/* Columna Derecha: Formulario de Registro */}
                <div className="w-1/2 p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Registro de Usuario</h2>
                    
                    {inicio && (
                        <form onSubmit={handleSubmitDniRuc} className="space-y-6">
                            <div>
                                <label htmlFor="dniRuc" className="block text-gray-700 font-medium">Ingrese su DNI o RUC:</label>
                                <input
                                    id="dniRuc"
                                    type="text"
                                    name="dniRuc"
                                    value={formData.dniRuc}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ingrese su DNI o RUC"
                                    className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="id_tipo_usuario" className="block text-gray-700 font-medium">Tipo de Usuario:</label>
                                <select
                                    id="id_tipo_usuario"
                                    name="id_tipo_usuario"
                                    value={formData.id_tipo_usuario}
                                    onChange={handleSelectChange}
                                    className="w-full px-4 py-3 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500"
                                >
                                    {tiposUsuario && Array.isArray(tiposUsuario) && tiposUsuario.map(tipo => (
                                        <option key={tipo.id_tipo_usuario} value={tipo.id_tipo_usuario}>
                                            {tipo.tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <button type="submit" className="w-full bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                                Consultar
                            </button>
                        </form>
                    )}

                    {/* Información de Usuario Obtenida */}
                    {datosUsuario && (
                        <div className="mt-6 space-y-4 text-gray-700">
                            <h3 className="text-lg font-semibold">Datos Obtenidos</h3>
                            {formData.dniRuc.length === 8 ? (
                                <>
                                    <p><strong>Nombres:</strong> {`${datosUsuario.primer_nombre} ${datosUsuario.segundo_nombre || ''}`}</p>
                                    <p><strong>Apellidos:</strong> {`${datosUsuario.apellido_paterno} ${datosUsuario.apellido_materno}`}</p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Razón Social:</strong> {datosUsuario.razon_social}</p>
                                    <p><strong>Dirección:</strong> {`${datosUsuario.direccion}, ${datosUsuario.departamento}, ${datosUsuario.provincia}, ${datosUsuario.distrito}`}</p>
                                    <p><strong>Estado:</strong> {datosUsuario.estado}</p>
                                    <p><strong>Condición:</strong> {datosUsuario.condicion}</p>
                                </>
                            )}
                        </div>
                    )}
                {datosUsuario && (
                    <div className=" p-4 pb-0 ">
                        <div className="mb-4">
                            <label htmlFor="correo" className="block text-gray-700 font-medium mb-4">Ingrese su Correo Electrónico:</label>
                            <input
                                id="correo"
                                type="email"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su correo electrónico"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                {...(codigoEnviado && { disabled: true })}
                            />
                        </div>

                        {/* Botón para enviar código */}
                        {!codigoEnviado && (
                            <form onSubmit={handleEnviarCodigo} className="flex justify-center">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    Enviar Código
                                </button>
                            </form>
                        )}

                        {codigoEnviado && !codigoVerificado && (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="codigoVerificacion" className="block text-gray-700 font-medium mb-2">Ingrese el Código de Verificación:</label>
                                    <input
                                        id="codigoVerificacion"
                                        type="text"
                                        name="codigoVerificacion"
                                        value={formData.codigoVerificacion}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ingrese el código recibido"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <form onSubmit={handleVerificarCodigo} className="flex justify-center">
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                        Verificar Código
                                    </button>
                                </form>
                            </div>
                        )}
                        {codigoVerificado && (
                        <div className="mt-6">
                            <div className="mb-4">
                                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Ingrese su Teléfono:</label>
                                <input
                                id="telefono"
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su número de teléfono"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="clave" className="block text-gray-700 font-medium mb-2">Ingrese su Contraseña:</label>
                                <input
                                id="clave"
                                type="password"
                                name="clave"
                                value={formData.clave}
                                onChange={handleInputChange}
                                required
                                placeholder="Ingrese su contraseña"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Botón para finalizar el registro */}
                            <form onSubmit={handleFinalizarRegistro} className="flex justify-center">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                    Registrar
                                </button>
                            </form>
                        </div>
                )}
                    </div>
                )}
                {error && (
                    <div className="flex flex-col items-center">
                        <div className="p-4 m-4 bg-red-100 border border-red-400 text-red-700 rounded-md mt-4">
                            <p className="text-center font-semibold">{error}</p>
                        </div>
                        <button 
                        onClick={() =>{
                            setInicio("inicio");
                            setDatosUsuario(null);
                            setError("");
                            setSuccess("");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 my-4 ">
                            Volver atrás
                        </button>
                        
                    </div>
                    
                )}
                {success && (
                    <div className="p-4 m-4 bg-green-100 border border-green-400 text-green-700 rounded-md mt-4">
                        <p className="text-center font-semibold">{success}</p>
                    </div>
                )}
                {/* Input para teléfono y clave */}
                
            </div>
        </div>
    </div>


    )
}