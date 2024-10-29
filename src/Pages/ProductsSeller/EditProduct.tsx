import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CategorySelect, extentSelect, itemSelect } from '../../types';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

export default function EditProduct() {
    const location = useLocation(); // Recibir el producto desde el estado de la navegación
    const navigate = useNavigate();
    const { producto } = location.state; // Obtener el producto desde el estado
    const [categorias, setCategorias] = useState<CategorySelect>();
    const [selectedCategory, setSelectedCategory] = useState(producto.Item?.Categoria?.id_categoria || '');
    const [items, setItems] = useState<itemSelect>();
    const [selectedItem, setSelectedItem] = useState(producto.id_item || '');
    const [descripcion, setDescripcion] = useState(producto.descripcion || '');
    const [precio, setPrecio] = useState(producto.precio || '');
    const [stock, setStock] = useState(producto.stock || '');
    const [medidas, setMedidas] = useState<extentSelect>();
    const [selectedMedida, setSelectedMedida] = useState(producto.id_medida || '');
    const [mensaje, setMensaje] = useState<string>();
    const [imagen, setImagen] = useState<File | null>(); // Estado para la imagen

    // Obtener las categorías al cargar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get<CategorySelect>(`https://agroweb-5dxm.onrender.com/api/add-category/getCategories`);
                setCategorias(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías', error);
            }
        };
        fetchCategories();
    }, []);

    // Obtener las medidas disponibles al cargar el componente
    useEffect(() => {
        const fetchMedidas = async () => {
            try {
                const response = await axios.get<extentSelect>(`https://agroweb-5dxm.onrender.com/api/medida/medidas`);
                setMedidas(response.data);
            } catch (error) {
                console.error('Error al obtener las medidas', error);
            }
        };
        fetchMedidas();
    }, []);

    // Manejar la selección de categoría
    useEffect(() => {
        const fetchItems = async () => {
            if (selectedCategory) {
                try {
                    const response = await axios.get<itemSelect>(
                        `https://agroweb-5dxm.onrender.com/api/add-category/getItemsByCategory/${selectedCategory}`
                    );
                    setItems(response.data);
                } catch (error) {
                    console.error('Error al obtener los items de la categoría', error);
                }
            }
        };
        fetchItems();
    }, [selectedCategory]);

    // Manejar el envío del formulario para editar el producto
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = sessionStorage.getItem('accessToken'); // Obtener el token del almacenamiento local
        if (!token) {
            console.error("AccessToken no disponible en sessionStorage.");
            throw new Error('AccessToken no disponible en sessionStorage.');
        }

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
            const response = await axios.put(`https://agroweb-5dxm.onrender.com/api/crud-product/productos/${producto.id_producto}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Importante para enviar archivos
                },
            });

            if (response.status === 200) {
                console.log("Producto actualizado exitosamente:", response.data);
                setMensaje('Producto actualizado con éxito');
                navigate('/'); // Redirigir a la lista de productos
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            setMensaje('Error al actualizar el producto');
        }
    };

    console.log(items);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Producto en AgroWeb</h1>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Seleccionar Categoría</h2>
                <select 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedCategory} 
                onChange={(e) => setSelectedItem(e.target.value)}
                >
                <option value="">Selecciona una categoría</option>
                {Array.isArray(categorias?.categorias) && categorias.categorias.map((categoria) => (
                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                    {categoria.nombre_categoria}
                    </option>
                ))}
                </select>
            </div>

            {selectedCategory && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Seleccionar Producto</h2>
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
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Seleccionar Medida</h2>
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
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Subir Imagen</h2>
                <input 
                    type="file" 
                    className="w-full p-2 border border-gray-300 rounded-md"
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
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Actualizar Producto</h2>
                {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label className="block text-gray-700">Descripción:</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700">Precio:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                    </div>
                    <div className="mb-4">
                    <label className="block text-gray-700">Stock:</label>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                    </div>
                    <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    disabled={!selectedItem || !selectedMedida}
                    >
                    Actualizar Producto
                    </button>
                </form>
                </div>
            )}
            </main>
            <Footer />
        </div>
    );
};
