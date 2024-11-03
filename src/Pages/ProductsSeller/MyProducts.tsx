import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductDetails, ProductDetailsProps } from "../../types";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { API_BASE_URL } from "../../../config";

export default function HomeSeller() {
    const [productos, setProductos] = useState<ProductDetailsProps>();
    const [mensaje, setMensaje] = useState<string>();
    //const [categorias, setCategorias] = useState<CategorySelect>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate(); // Hook para redirigir al usuario a la página de edición
    const [productLength , setProctLenght] = useState(0);
    // Obtener todos los productos del vendedor
    const fetchProductos = async () => {
        const token = sessionStorage.getItem('accessToken'); // Obtener el token de acceso desde sessionStorage

        if (!token) {
            setMensaje('Debe iniciar sesión para ver los productos.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}api/crud-product/all`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token de autorización
                },
            });

            console.log('Productos del vendedor:', response.data);
            if (response.data.productos.length > 0) {
                setProctLenght(response.data.productos.length);
                setProductos(response.data.productos);
            } else {
                setMensaje('No hay productos disponibles.');
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setMensaje('Error al obtener los productos.');
        }
    };
    useEffect(() => {
        fetchProductos();     
    }, [productLength]);
  // Manejar el cambio de categoría
    const handleCategoryChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };
    // Obtener los productos de la categoría seleccionada
    const fetchProductsByCategory = async () => {
        if (!selectedCategory) {
            setMensaje('Selecciona una categoría.');
            return;
        }

        const token = sessionStorage.getItem('accessToken'); // Obtener el token de acceso desde sessionStorage

        if (!token) {
            setMensaje('Debe iniciar sesión para ver los productos.');
            return;
        }

        console.log('Categoría seleccionada:', selectedCategory);

        try {
            const response = await axios.get<ProductDetailsProps>(`${API_BASE_URL}api/crud-product/category/${selectedCategory}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token de autorización
                },
            });

            console.log('Productos por categoría:', response.data);
            if (response.data.productos.length > 0) {
                setProductos(response.data);
                setMensaje("");
            } 
            if(response.data.productos.length === 0){
                setMensaje('No hay productos disponibles en esta categoría.');
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setMensaje('Error al obtener los productos.');
        }
    };

    // Redirigir a la página de edición del producto
    const handleEditProduct = (producto : ProductDetails) => {
        navigate(`/edit-product/${producto.id_producto}`, { state: { producto } }); // Navegar a la ruta de edición pasando el producto
    };

    // Función para eliminar un producto
    const handleDeleteProduct = async (id_producto : number) => {
        const token = sessionStorage.getItem('accessToken'); // Obtener el token de acceso desde sessionStorage

        if (!token) {
            setMensaje('Debe iniciar sesión para eliminar productos.');
            return;
        }

        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmacion) return; // Si el usuario cancela, no hacer nada

        try {
            const response = await axios.delete(`${API_BASE_URL}api/crud-product/productos/${id_producto}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Enviar el token de autorización
                },
            });

            console.log('Respuesta de eliminación:', response.data);
            if (response.status === 200) {
                setProctLenght(productLength - 1);
                setMensaje('Producto eliminado exitosamente');
                console.log("Se eliminó:", mensaje);
                setTimeout(() => {
                    setMensaje("");
                }
                , 2000);
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            setMensaje('Error al eliminar el producto.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="m-14">
                <div className="container mx-auto p-4 w-4xl text-center">
                <h1 className="text-4xl font-bold mb-4 text-center">MIS PRODUCTOS</h1>

                {/* Selector de categoría */}
                <div className="flex justify-center items-center space-x-4 mb-6">
                    <p className=" text-center">Seleccionar Categoría:</p>
                    <div className="flex">
                    <select 
                        value={selectedCategory} 
                        onChange={handleCategoryChange} 
                        className="border border-gray-300 rounded p-2 mr-2"
                    >
                        <option value="">Selecciona una categoría</option>
                        {/* {Array.isArray(categorias?.categorias) && categorias.categorias.map((categoria) => (
                        <option key={categoria.id_categoria} value={categoria.id_categoria}>
                            {categoria.nombre_categoria}
                        </option>
                        ))} */}
                    </select>
                    <button 
                        onClick={fetchProductsByCategory} 
                        className="bg-green-500 text-white p-2 rounded"
                    >
                        Buscar Productos por Categoría
                    </button>
                    </div>
                </div>

                {/* Mostrar mensaje si existe */}
                {mensaje && <p className="text-red-500 mb-4 text-center">{mensaje}</p>}

                {/* Mostrar tabla de productos si existen */}
                {Array.isArray(productos) && productos.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200 mx-auto">
                    <thead>
                        <tr>
                        <th className="py-2 px-4 border-b">Imagen</th>
                        <th className="py-2 px-4 border-b">Descripción</th>
                        <th className="py-2 px-4 border-b">Precio</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Medida</th>
                        <th className="py-2 px-4 border-b">Item</th>
                        <th className="py-2 px-4 border-b">Categoría</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {productos.map((producto) => (
                        <tr key={producto.id_producto} className="h-24"> {/* Fijar la altura de las filas */}
                            <td className="py-2 px-4 border-b">
                            {producto.imagen_url ? (
                                <img
                                src={producto.imagen_url}
                                alt={producto.descripcion}
                                className="w-24 h-24 object-cover mx-auto"
                                />
                            ) : (
                                'Sin imagen'
                            )}
                            </td>
                            <td className="py-2 px-4 border-b">{producto.descripcion}</td>
                            <td className="py-2 px-4 border-b">{producto.precio}</td>
                            <td className="py-2 px-4 border-b">{producto.stock}</td>
                            <td className="py-2 px-4 border-b">{producto.Medida ? producto.Medida.nombre : 'Sin medida'}</td>
                            <td className="py-2 px-4 border-b">{producto.Item ? producto.Item.nombre_item : 'Sin item'}</td>
                            <td className="py-2 px-4 border-b">{producto.Item && producto.Item.Categoria ? producto.Item.Categoria.nombre_categoria : 'Sin categoría'}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    onClick={() => handleEditProduct(producto)} 
                                    className="bg-yellow-500 text-white p-2 rounded mr-2 mb-2"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={(e) =>
                                       { e.preventDefault();
                                        handleDeleteProduct(producto.id_producto)}} 
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    !mensaje && <p className="text-gray-500 text-center">Cargando...</p>
                )}
                </div>
                <div className="mt-8 flex flex-col items-center">
                <p className="text-lg font-semibold mb-2">¿Quieres agregar un nuevo producto?</p>
                <button 
                    onClick={() => navigate('/create-product')} 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Agregar Producto
                </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}