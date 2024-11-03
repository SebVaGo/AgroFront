import { useEffect, useState } from "react";
import Footer from "../../Components/Footer"
import Navbar from "../../Components/Navbar"
import useLocalStorage from "../../localStorage";
import axios from "axios";
import { allProductsProps } from "../../types";
import { useNavigate  } from "react-router-dom";
import { API_BASE_URL } from "../../../config";

export default function ProductDetails() {
    const nav = useNavigate();
    const [productosPorVendedor, setProductosPorVendedor] = useState<allProductsProps[]>();
    const [productosPorCategoria, setProductosPorCategoria] = useState<allProductsProps[]>();
    const [formData, setFormData] = useLocalStorage('formData',  {
        id_producto: 0,
        nombre_item: "",
        descripcion: "",
        precio: "",
        stock: 0,
        categoria: "",
        imagen_url: "",
        vendedor: {
            fecha_creacion: "",
            nombre: "",
            correo: "",
            telefono: "",
        },
    });

    const id_usuario = Number(sessionStorage.getItem('id_usuario')); // Convierte el id_usuario a number

    console.log('id_usuario:', id_usuario);
    console.log('Correo del vendedor:', formData.vendedor.correo);
    console.log('API_BASE_URL:', API_BASE_URL);

    useEffect(() => {
        const axiosProductsByCategory = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}api/product-list/filter`, formData.categoria);
                if (response.status === 404) {
                    throw new Error('Products not found');
                }
                setProductosPorCategoria(response.data.productos);
                console.log('Products by category:', response.data.productos);
            } catch (error) {
                console.error('Error fetching products by category:', error);
            }
        };

        setTimeout(() => {
            axiosProductsByCategory();
        }, 1000);
    }, [formData.categoria]);

    useEffect(() => {
        const axiosProductsBySeller = async () => {
            try{
                const response = await axios.post(`${API_BASE_URL}api/product-list/seller-products`, {
                    sellerEmail: formData.vendedor.correo
                });
                if (response.status === 404) {
                    throw new Error('Products not found');
                }
                setProductosPorVendedor(response.data.productos);
                console.log('Products by seller:', response.data.productos);
            } catch (error) {
                console.error('Error fetching products by seller:', error);
            }
        };

        setTimeout(() => {
            axiosProductsBySeller();
        }, 1000);

    }, [formData.vendedor.correo]);

    const handleLoDeseo = async () => {
        console.log('id_usuario:', id_usuario);
        console.log('Correo del vendedor:', formData.vendedor.correo);
        console.log('API_BASE_URL:', API_BASE_URL);
    
        try {
            const response = await axios.post(`${API_BASE_URL}api/product-list/contact-seller`, {
                sellerEmail: formData.vendedor.correo,
                buyerId: id_usuario,
                productName: formData.nombre_item,       // Nombre del producto
                productDescription: formData.descripcion // Descripción del producto
            });
    
            if (response.status === 200) {
                alert('¡El vendedor ha sido contactado exitosamente!');
            }
        } catch (error) {
            console.error('Error al contactar al vendedor:', error);
            alert('Hubo un problema al contactar al vendedor.');
        }
    };
    
    
    return (
        <div>
            <Navbar />
            <div className="w-full py-2 px-4">
                <div className="bg-gray-100 p-8 shadow-xl rounded-lg">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg shadow-lg bg-gray-300 mb-4">
                                    <img className="w-full h-full object-cover" src={formData.imagen_url} alt={formData.nombre_item}/>
                                </div>
                            </div>
                            <div className="md:flex-1 px-4">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">{formData.nombre_item}
                                </h2>
                                <p className="text-gray-600 text-md mb-4">
                                    {formData.categoria}
                                </p>
                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700">Price: </span>
                                        <span className="text-gray-600">
                                            {formData.precio}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700">Stock: </span>
                                        <span className="text-gray-600">
                                            {formData.stock}
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">
                                        Vendedor:
                                    </span>
                                    <div className="flex items-center mt-2">
                                        <p className="text-1xl text-gray-600 mb-2">
                                            {formData.vendedor.nombre}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Contacto: </span>
                                    <div className="flex items-center mt-2">
                                        <p className="text-1xl text-gray-600 mb-2">
                                            <strong>Correo:</strong> {formData.vendedor.correo}
                                        </p>
                                        <p className="text-1xl text-gray-600 mb-2 ml-4">
                                            <strong>Teléfono:</strong>  {formData.vendedor.telefono}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Detalles de producto:</span>
                                    <p className="text-gray-600 text-sm mt-2">
                                        {formData.descripcion}
                                    </p>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button onClick={handleLoDeseo} className="w-3/4 bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Lo deseo</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full py-2 px-4 mb-2">
                <div className="bg-gray-100 p-8 shadow-xl rounded-lg">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos Relacionados</h2>
                        <div className="flex overflow-x-scroll space-x-4 pb-2">
                            {productosPorCategoria?.filter(producto => producto.id_producto !== formData.id_producto).map((producto) => (
                                <div 
                                key={producto.id_producto} 
                                onClick={() => {
                                    setFormData({
                                        id_producto: producto.id_producto,
                                        nombre_item: producto.nombre_item,
                                        descripcion: producto.descripcion,
                                        precio: producto.precio,
                                        stock: producto.stock,
                                        categoria: producto.categoria,
                                        imagen_url: producto.imagen_url,
                                        vendedor: {
                                            fecha_creacion: producto.vendedor.fecha_creacion,
                                            nombre: producto.vendedor.nombre,
                                            correo: producto.vendedor.correo,
                                            telefono: producto.vendedor.telefono,
                                        },
                                    })
                                    nav(`/product-details/${producto.id_producto}`)
                                }}
                                className="flex-none max-w-64 w-64 bg-gray-100 rounded-lg shadow-md">
                                    <div className="h-40 bg-gray-300 rounded-t-lg">
                                        <img
                                            className="w-full h-full object-cover rounded-t-lg"
                                            src={producto.imagen_url}
                                            alt={producto.nombre_item}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-800">{producto.nombre_item}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {producto.descripcion.length > 100 ? `${producto.descripcion.substring(0, 100)}...` : producto.descripcion}
                                        </p>
                                        <div className="mt-2">
                                            <span className="font-bold text-gray-700">Precio: </span>
                                            <span className="text-gray-600">{producto.precio}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full py-2 px-4 mb-2">
                <div className="bg-gray-100 p-8 shadow-xl rounded-lg">
                    {productosPorVendedor && Array.isArray(productosPorVendedor) && productosPorVendedor.length > 1 ?
                    (<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Otros productos de {formData.vendedor.nombre}</h2>
                           <div className="flex overflow-x-scroll space-x-4 pb-2">
                            {productosPorVendedor?.filter(producto => producto.id_producto !== formData.id_producto).map((producto) => (
                                <div 
                                key={producto.id_producto} 
                                onClick={() => {
                                    setFormData({
                                        id_producto: producto.id_producto,
                                        nombre_item: producto.nombre_item,
                                        descripcion: producto.descripcion,
                                        precio: producto.precio,
                                        stock: producto.stock,
                                        categoria: producto.categoria,
                                        imagen_url: producto.imagen_url,
                                        vendedor: {
                                            fecha_creacion: producto.vendedor.fecha_creacion,
                                            nombre: producto.vendedor.nombre,
                                            correo: producto.vendedor.correo,
                                            telefono: producto.vendedor.telefono,
                                        },
                                    })
                                    nav(`/product-details/${producto.id_producto}`)
                                }}
                                className="flex-none max-w-64 w-64 bg-gray-100 rounded-lg shadow-md">
                                    <div className="h-40 bg-gray-300 rounded-t-lg">
                                        <img
                                            className="w-full h-full object-cover rounded-t-lg"
                                            src={producto.imagen_url}
                                            alt={producto.nombre_item}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-gray-800">{producto.nombre_item}</h3>
                                        <p className="text-gray-600 text-sm">
                                            {producto.descripcion.length > 100 ? `${producto.descripcion.substring(0, 100)}...` : producto.descripcion}
                                        </p>
                                        <div className="mt-2">
                                            <span className="font-bold text-gray-700">Precio: </span>
                                            <span className="text-gray-600">{producto.precio}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>) : (<div className="flex justify-center items-center h-64">
                        <p className="text-xl text-gray-600">No hay otros productos del vendedor.</p>
                    </div>)}
                </div>
            </div>
            
            <Footer />
     </div>
    );
}