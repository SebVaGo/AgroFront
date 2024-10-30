import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userAccesToken } from '../../types';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    clave: '',
  });
  const [message, setMessage] = useState('');  // Mensaje de éxito o error
  const [accessToken, setAccessToken] = useState('');  // Token de autenticación
  const [timeLeft, setTimeLeft] = useState<number>();  // Tiempo restante del token
  const [perfiles, setPerfiles] = useState<Array<{
    "id_usuario":number , "tipo_usuario":number
  }>>();  // Perfiles disponibles si hay más de uno
  const [selectedPerfil, setSelectedPerfil] = useState('');  // Perfil seleccionado por el usuario
  //@ts-ignore
  const [idUsuario, setIdUsuario] = useState<number>();  // ID del usuario
  const navigate = useNavigate();  // Para redirigir a otras rutas

  // Maneja los cambios en los inputs
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Lógica para el login inicial
  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<userAccesToken>("https://agroweb-5dxm.onrender.com/api/auth/login", formData);
      const { accessToken, primerLogin, id_usuario, perfiles, seleccionRequerida } = response.data;

      if (seleccionRequerida && perfiles && perfiles.length > 0) {
        // Si el usuario tiene múltiples perfiles, guardar perfiles y mostrar el selector
        setPerfiles(perfiles);
        setIdUsuario(id_usuario);
        setMessage('Seleccione un perfil para continuar.');
        console.log(perfiles);
        return;
      }

      // Si solo hay un perfil, continuar con el login
      sessionStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      setMessage('¡Inicio de sesión exitoso!');

      if (primerLogin) {
        navigate('/completa-perfil', { state: { accessToken, id_usuario } });
      } else {
        const timeResponse = await axios.get("https://agroweb-5dxm.onrender.com/api/auth/left-time", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTimeLeft(timeResponse.data.timeLeft);
        startAutoLogoutTimer(timeResponse.data.timeLeft);
      }
    } catch (error : unknown) {
      setMessage('Fallo en el inicio de sesión.');
      const err = error as any;
      console.error('Error durante el login:', err.response?.data?.error || err.message);
    }
  };

  // Lógica para enviar el perfil seleccionado
  const handlePerfilSeleccionado = async () => {
    // Aquí buscamos el id_usuario correspondiente al tipo_usuario seleccionado
    const perfilSeleccionado = perfiles?.find((perfil : any) => perfil.tipo_usuario === parseInt(selectedPerfil));

    if (!perfilSeleccionado) {
      setMessage('Perfil no válido seleccionado.');
      return;
    }

    console.log('Perfil seleccionado:', selectedPerfil);
    console.log('ID de usuario:', perfilSeleccionado);  // Este es el id_usuario correcto

    try {
      const response = await axios.post("https://agroweb-5dxm.onrender.com/api/auth/loginConPerfil", {
        id_usuario: perfilSeleccionado.id_usuario,  // Aquí enviamos el id_usuario correcto
        tipo_usuario: selectedPerfil,  // El perfil seleccionado por el usuario
      });

      const { accessToken } = response.data;
      sessionStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      setMessage('¡Perfil seleccionado correctamente!');
      navigate('/homepage');  // Redirigir después de seleccionar el perfil
    } catch (error) {
      setMessage('Error al seleccionar el perfil.');
      console.error('Error seleccionando perfil:', error);
    }
  };

  // Lógica para auto-logout cuando el token expire
  const startAutoLogoutTimer = (time : number) => {
    const timer = setTimeout(() => {
      handleLogout();
    }, time * 1000);  // El tiempo se recibe en segundos

    return () => clearTimeout(timer);  // Limpiar el timeout si es necesario
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setAccessToken('');
    setTimeLeft(0);
    setMessage('Sesión expirada. Por favor, inicie sesión de nuevo.');
    sessionStorage.removeItem('accessToken');  // Remover el token del sessionStorage
  };

  // Manejar el tiempo restante en el token
  useEffect(() => {
    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);  // Disminuir el tiempo restante cada segundo

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleLogout();
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h2>

      {!accessToken && (perfiles?.length ?? 0) === 0 ? (
      <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo:</label>
        <input
        id="correo"
        type="email"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="clave" className="block text-sm font-medium text-gray-700">Clave:</label>
        <input
        id="clave"
        type="password"
        name="clave"
        value={formData.clave}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <p className='text-center'>
        ¿No tienes una cuenta? <a href="/register" className="text-sm text-blue-500 hover:underline"> Regístrate aquí.</a>
      </p>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Login
      </button>
      </form>
      ) : (perfiles?.length ?? 0) > 0 ? (
      <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Seleccione su perfil:</h3>
      <select
        value={selectedPerfil}
        onChange={(e) => setSelectedPerfil(e.target.value)}
        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">Seleccione un perfil</option>
        {(perfiles ?? []).map((perfil, index) => (
        <option key={index} value={perfil.tipo_usuario}>
        {perfil.tipo_usuario === 1 ? 'Comprador' : 'Vendedor'}
        </option>
        ))}
      </select>
      <button
        onClick={handlePerfilSeleccionado}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Continuar
      </button>
      </div>
      ) : (
      <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Tiempo restante del token: {timeLeft !== null ? `${timeLeft} segundos` : 'Calculando...'}</h3>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Logout
      </button>
      </div>
      )}

      {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Login;