import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CategorySelect , extentSelect, itemSelect } from '../../types';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';

const CrudProduct = () => {
    const nav = useNavigate();

    const [categorias, setCategorias] = useState<CategorySelect>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState<itemSelect>();
    const [selectedItem, setSelectedItem] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [medidas, setMedidas] = useState<extentSelect>();
    const [selectedMedida, setSelectedMedida] = useState('');
    const [mensaje, setMensaje] = useState("");
    const [imagen, setImagen] = useState<File | null>(); // Estado para la imagen

    // Obtener las categorías al cargar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                return await axios.get<CategorySelect>(`https://agroweb-5dxm.onrender.com/api/add-category/getCategories`).then((response) => response.data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };
        fetchCategories().then(setCategorias);
    }, []);

    // Obtener las medidas disponibles al cargar el componente
    useEffect(() => {
        const fetchMedidas = async () => {
            try {
                return await axios.get<extentSelect>(`https://agroweb-5dxm.onrender.com/api/medida/medidas`).then((response) => response.data);
            } catch (error) {
                console.error('Error al obtener las medidas', error);
            }
        };
        fetchMedidas().then(setMedidas);
    }, []);

    // Manejar la selección de categoría
    const handleCategoryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoriaId = e.target.value;
        setSelectedCategory(categoriaId);
        setSelectedItem(''); // Limpiar el item seleccionado al cambiar de categoría

        // Obtener los items de la categoría seleccionada
        try {
            const response = await axios.get<itemSelect>(
                `https://agroweb-5dxm.onrender.com/api/add-category/getItemsByCategory/${categoriaId}`);
            console.log('Items de la categoría:', response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error al obtener los items de la categoría', error);
        }
    };

    // Manejar el envío del formulario para crear el producto
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = sessionStorage.getItem('accessToken'); // Obtener el token del almacenamiento local
        if (!token) {
            console.error("AccessToken no disponible en sessionStorage.");
            throw new Error('AccessToken no disponible en sessionStorage.');
        }
        console.log("Token:", token);
        // Crear un objeto FormData para enviar tanto los datos del producto como la imagen
        const formData = new FormData();
        formData.append('descripcion', descripcion);
        formData.append('precio', parseFloat(precio).toString());
        formData.append('stock', parseInt(stock).toString());
        formData.append('id_item', parseInt(selectedItem).toString());
        formData.append('id_medida', parseInt(selectedMedida).toString());
        
        if (imagen) {
            formData.append('imagen', imagen); // Añadir la imagen si se ha seleccionado
            console.log("Imagen seleccionada:", imagen);
        } else {
            console.log("No se seleccionó ninguna imagen.");
        }

        try {
            console.log('Datos enviados al backend (FormData):', {
                descripcion, precio, stock, selectedItem, selectedMedida
            });
            const response = await axios.post(`https://agroweb-5dxm.onrender.com/api/crud-product/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Importante para enviar archivos
                },
            });

            if (response.status === 201) {
                console.log("Producto creado exitosamente:", response.data);
                setMensaje('Éxito');
                setDescripcion('');
                setPrecio('');
                setStock('');
                setSelectedMedida(''); // Limpiar selección de medida
                setImagen(null); // Limpiar la imagen seleccionada
            }
            if(response.status === 403){
                console.log("Error al crear el producto:", response.data);
                setMensaje('Usted no tiene permisos para crear un producto');
            }
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }

        setTimeout(() => {
            nav('/');
        }, 3000);
    };

    console.log(categorias);
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow w-1/2 container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Crear Producto en AgroWeb</h1>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Seleccionar Categoría</h2>
                    <select 
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={selectedCategory} 
                    onChange={handleCategoryChange}
                    >
                    <option value="">Selecciona una categoría</option>
                    {categorias?.categorias && Array.isArray(categorias.categorias) && categorias.categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                        {categoria.nombre_categoria}
                        </option>
                    ))}
                    </select>
                </div>

                {selectedCategory && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Seleccionar Producto</h2>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            disabled={!selectedCategory}
                        >
                            <option value="">Selecciona un producto</option>
                            {Array.isArray(items) && items.map((item) => (
                            <option key={item.id_item} value={item.id_item}>
                                {item.nombre_item}
                            </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedItem && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Seleccionar Medida</h2>
                        <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={selectedMedida}
                            onChange={(e) => setSelectedMedida(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una medida</option>
                            {Array.isArray(medidas?.medidas) && medidas.medidas.map((medida) => (
                            <option key={medida.id_medida} value={medida.id_medida}>
                                {medida.nombre}
                            </option>
                            ))}
                        </select>
                    </div>
                )}

                {selectedItem && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Subir Imagen</h2>
                        <input 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            type="file" 
                            onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setImagen(file);
                            }
                            }} 
                        />
                    </div>
                )}

                {selectedItem && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Crear Producto</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div>
                            <label className="block text-sm font-medium mb-1">Descripción:</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                required
                            />
                            </div>
                            <div>
                            <div className='flex justify-between flex-wrap space'>
                                <div className="flex justify-between w-1/2 block text-sm font-medium mb-1">
                                <p className='pt-2'>Precio:</p> 
                                <input
                                    className="w-3/4 p-2 border border-gray-300 rounded-md"
                                    type="number"
                                    step="0.01"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    required
                                />
                                </div>
                                <div className="flex justify-between w-1/2 block text-sm font-medium mb-1">
                                <p className='pt-2 pl-3'>Stock:</p>
                                <input
                                    className="w-3/4 p-2 border border-gray-300 rounded-md"
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                                </div>
                            </div>
                            </div>
                            <button 
                            className="w-min-1/4 px-6 bg-green-500 text-white p-2 rounded-md hover:bg-green-700 transition duration-300"
                            type="submit" 
                            disabled={!selectedItem || !selectedMedida}
                            >
                            Crear Producto
                            </button>
                        </form>
                        {mensaje && <p className={`text-center ${mensaje==="Éxito" ? "text-green-500" : "text-red-500"} mb-4`}>{mensaje}</p>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CrudProduct;
