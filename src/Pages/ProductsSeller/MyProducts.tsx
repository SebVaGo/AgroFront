import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductDetails, ProductDetailsProps } from "../../types";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { API_BASE_URL } from "../../../config";

export default function HomeSeller() {
    const [productos, setProductos] = useState<ProductDetailsProps>();
    const [mensaje, setMensaje] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            setMensaje('Debe iniciar sesión para ver los productos.');
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}api/crud-product/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Productos:', response.data.productos);
            if (response.data.productos.length >= 0) {
                setProductos(response.data.productos);
            } else {
                setMensaje('No hay productos disponibles.');
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setMensaje('Error al obtener los productos.');
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const fetchProductsByCategory = async () => {
        if (!selectedCategory) {
            setMensaje('Selecciona una categoría.');
            return;
        }

        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            setMensaje('Debe iniciar sesión para ver los productos.');
            return;
        }

        try {
            const response = await axios.get<ProductDetailsProps>(`${API_BASE_URL}api/crud-product/category/${selectedCategory}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.productos.length > 0) {
                setProductos(response.data);
                setMensaje("");
            } else {
                setMensaje('No hay productos disponibles en esta categoría.');
            }
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            setMensaje('Error al obtener los productos.');
        }
    };

    const handleEditProduct = (producto: ProductDetails) => {
        navigate(`/edit-product/${producto.id_producto}`, { state: { producto } });
    };

    const handleDeleteProduct = async (id_producto: number) => {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
            setMensaje('Debe iniciar sesión para eliminar productos.');
            return;
        }

        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (!confirmacion) return;

        try {
            const response = await axios.delete(`${API_BASE_URL}api/crud-product/productos/${id_producto}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                setMensaje('Producto eliminado exitosamente');
                fetchProductos();
                setTimeout(() => setMensaje(""), 2000);
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
                    <div className="flex justify-center items-center space-x-4 mb-6">
                        <p className="text-center">Seleccionar Categoría:</p>
                        <div className="flex">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="border border-gray-300 rounded p-2 mr-2"
                            >
                                <option value="">Selecciona una categoría</option>
                            </select>
                            <button
                                onClick={fetchProductsByCategory}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Buscar Productos por Categoría
                            </button>
                        </div>
                    </div>
                    {mensaje && <p className="text-red-500 mb-4 text-center">{mensaje}</p>}
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
                                    <tr key={producto.id_producto} className="h-24">
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
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDeleteProduct(producto.id_producto);
                                                }}
                                                className="bg-red-500 text-white p-2 rounded"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : productos === undefined ? (
                        <p className="text-gray-500 text-center">Cargando...</p>
                    ) : (
                        <p className="text-gray-500 text-center">No hay productos disponibles.</p>
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
    );
}
