import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../utils/Modal'; // Asegúrate de que la ruta sea correcta

interface Perfil {
  id_usuario: number;
  tipo_usuario: number;
}

interface FormData {
  correo: string;
  clave: string;
}

export default function useLogin(){
  const [formData, setFormData] = useState<FormData>({
    correo: '',
    clave: '',
  });

  const [message, setMessage] = useState(''); 
  const [accessToken, setAccessToken] = useState('');
  const [timeLeft, setTimeLeft] = useState<number | null>(null); 
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [selectedPerfil, setSelectedPerfil] = useState(''); 
  const [idUsuario, setIdUsuario] = useState<number | null>(null); 
  const [showModal, setShowModal] = useState(false);  // Controla si el modal se muestra o no
  const navigate = useNavigate();

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL_BACK}api/auth/login`, formData);
      const { accessToken, primerLogin, id_usuario, perfiles, seleccionRequerida } = response.data;
  
      if (seleccionRequerida && perfiles.length > 0) {
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
        const timeResponse = await axios.get(`${import.meta.env.VITE_APP_URL_BACK}api/auth/left-time`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTimeLeft(timeResponse.data.timeLeft);
        startAutoLogoutTimer(timeResponse.data.timeLeft);
      }
    } catch (error: unknown) {
      // Mostrar el mensaje de error específico del backend
      setMessage('Error al iniciar sesión.');
      setShowModal(true);  // Mostrar el modal de error
    }
  };
  

  const handlePerfilSeleccionado = async () => {
    const perfilSeleccionado = perfiles.find((perfil) => perfil.tipo_usuario === parseInt(selectedPerfil));
  
    if (!perfilSeleccionado) {
      setMessage('Perfil no válido seleccionado.');
      setShowModal(true);  // Mostrar el modal en caso de error
      return;
    }
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL_BACK}api/auth/loginConPerfil`, {
        id_usuario: perfilSeleccionado.id_usuario,
        tipo_usuario: selectedPerfil,
      });
  
      const { accessToken } = response.data;
      sessionStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);
      setMessage('¡Perfil seleccionado correctamente!');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Error al seleccionar el perfil.');
      setShowModal(true);  // Mostrar el modal en caso de error
    }
  };

  // Lógica para auto-logout cuando el token expire
  const startAutoLogoutTimer = (time: number) => {
    const timer = setTimeout(() => {
      handleLogout();
    }, time * 1000);

    return () => clearTimeout(timer);
  };

  const handleLogout = () => {
    setAccessToken('');
    setTimeLeft(null);
    setMessage('Sesión expirada. Por favor, inicie sesión de nuevo.');
    sessionStorage.removeItem('accessToken');
    setShowModal(true);  // Mostrar modal cuando la sesión expire
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

  return {
    formData,
    handleChange,
    handleLogin,
    message,
    accessToken,
    perfiles,
    selectedPerfil,
    setSelectedPerfil,
    handlePerfilSeleccionado,
    timeLeft,
    handleLogout,
    showModal,
    handleCloseModal,  // Añadimos esta función para cerrar el modal
  };
};