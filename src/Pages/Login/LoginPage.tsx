import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userAccesToken } from '../../types';
import fondoAgroWeb from '../../utils/images/FondoAgroWeb.webp';
import logo from '../../utils/images/Logo.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    clave: '',
  });
  const [message, setMessage] = useState(''); 
  const [accessToken, setAccessToken] = useState(''); 
  const [timeLeft, setTimeLeft] = useState<number>(); 
  const [perfiles, setPerfiles] = useState<Array<{ "id_usuario": number, "tipo_usuario": number }>>(); 
  const [selectedPerfil, setSelectedPerfil] = useState('');
 //@ts-ignore
  const [idUsuario, setIdUsuario] = useState<number>();  
  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<userAccesToken>("https://agroweb-5dxm.onrender.com/api/auth/login", formData);
      const { accessToken, primerLogin, id_usuario, perfiles, seleccionRequerida } = response.data;

      if (seleccionRequerida && perfiles && perfiles.length > 0) {
        setPerfiles(perfiles);
        setIdUsuario(id_usuario);
        setMessage('Seleccione un perfil para continuar.');
        return;
      }

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
        navigate('/homepage');
      }
    } catch (error) {
      setMessage('Fallo en el inicio de sesión.');
      console.error('Error durante el login:', error);
    }
  };

  const handlePerfilSeleccionado = async () => {
    const perfilSeleccionado = perfiles?.find((perfil) => perfil.tipo_usuario === parseInt(selectedPerfil));

    if (!perfilSeleccionado) {
      setMessage('Perfil no válido seleccionado.');
      return;
    }

    try {
      const response = await axios.post("https://agroweb-5dxm.onrender.com/api/auth/loginConPerfil", {
        id_usuario: perfilSeleccionado.id_usuario,
        tipo_usuario: selectedPerfil,
      });

      const { accessToken } = response.data;
      sessionStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      setMessage('¡Perfil seleccionado correctamente!');
      navigate('/homepage');
    } catch (error) {
      setMessage('Error al seleccionar el perfil.');
      console.error('Error seleccionando perfil:', error);
    }
  };

  const startAutoLogoutTimer = (time: number) => {
    const timer = setTimeout(() => {
      handleLogout();
    }, time * 1000); 

    return () => clearTimeout(timer); 
  };

  const handleLogout = () => {
    setAccessToken('');
    setTimeLeft(0);
    setMessage('Sesión expirada. Por favor, inicie sesión de nuevo.');
    sessionStorage.removeItem('accessToken'); 
  };

  useEffect(() => {
    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleLogout();
    }
  }, [timeLeft]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${fondoAgroWeb})` }}>
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105">
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

        {/* Columna Derecha: Formulario de Inicio de Sesión */}
        <div className="flex items-center justify-center w-1/2 p-12">
          <div className="w-full max-w-md space-y-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800">Iniciar Sesión</h2>

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
                    className="w-full px-4 py-3 mt-1 border rounded-lg shadow-md focus:ring-green-500 focus:border-green-500"
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
                    className="w-full px-4 py-3 mt-1 border rounded-lg shadow-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <p className="text-center text-gray-600">
                  ¿No tienes una cuenta? <a href="/register" className="text-blue-600 hover:underline"> Regístrate aquí.</a>
                </p>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                  className="w-full px-4 py-3 mt-1 border rounded-lg shadow-md focus:ring-green-500 focus:border-green-500"
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
                  className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Continuar
                </button>
              </div>
            ) : (
              null
            )}

            {message && <p className="mt-4 text-sm text-center text-red-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
