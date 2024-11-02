
//@ts-ignore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import {  allProductsProps, CategoryProps, itemProps } from '../../types';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../localStorage';
import { API_BASE_URL } from '../../../config';

const PublicProductList = () => {
    //@ts-ignore
    const [formData, setFormData] = useLocalStorage('formData', {});
    const [productos, setProductos] = useState<allProductsProps | null>();
    const [mensaje, setMensaje] = useState("");
    const [categorias, setCategorias] = useState<Array<CategoryProps>>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState<itemProps[]>(); 
    const [searchItem, setSearchItem] = useState(''); 
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortOrder, setSortOrder] = useState('ASC');
    //@ts-ignore
    const [selectedProduct, setSelectedProduct] = useState<allProductsProps>();

    // Obtener todos los productos al cargar el componente
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}api/product-list/all`);
                setProductos(response.data.productos);
                
                setMensaje("");
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setMensaje('Error al obtener los productos.');
            }
        };
        fetchProductos();
    }, []);

    // Obtener todas las categorías al cargar el componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}api/add-category/getCategories`);
                setCategorias(response.data.categorias);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    // Obtener todos los items al cargar el componente
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}api/product-list/items`);
                setItems(response.data.items);
            } catch (error) {
                console.error('Error al obtener los items:', error);
            }
        };
        fetchItems();
    }, []);

    // Función para aplicar los filtros
    const applyFilters = async () => {
        const data = {
            categoria: selectedCategory || 'todas',
            minPrice: minPrice ? parseFloat(minPrice) : null,
            maxPrice: maxPrice ? parseFloat(maxPrice) : null,
            order: sortOrder || 'ASC',
            searchItem: searchItem || null,
        };

        if (data.minPrice && data.maxPrice && data.minPrice > data.maxPrice) {
            setMensaje('El precio mínimo no puede ser mayor que el precio máximo.');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}api/product-list/filter`, data);
            setProductos(response.data.productos);
            console.log(response.data)
            setMensaje("");
        } catch (error) {
            console.error('Error al aplicar los filtros:', error);
            setMensaje('Error al aplicar los filtros. Intenta de nuevo.');
        }
    };

    // Llamar a applyFilters cuando cambie algún filtro
    useEffect(() => {
        applyFilters(); 
    }, [selectedCategory, minPrice, maxPrice, sortOrder, searchItem]);

    // Función para obtener los detalles de un producto al hacer clic en la imagen
    const fetchProductDetails = async (id_producto : number) => {
        console.log('ID del producto:', id_producto);
        try {
            const response = await axios.post(`${API_BASE_URL}api/product-description/description`, { id_producto });
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            setMensaje('Error al obtener los detalles del producto.');
        }
    };

    const searchProductsByItem = async () => {
        try {
            const selectedItem = items?.find(item => item.nombre_item.toLowerCase() === searchItem.toLowerCase());
            
            if (!selectedItem) {
                setMensaje('No se encontró ningún item con ese nombre.');
                return;
            }

            console.log("Buscando productos relacionados con el item_id:", selectedItem.id_item);

            const response = await axios.post(`${API_BASE_URL}api/product-description/byitem`, {
                id_item: selectedItem.id_item
            });

            if (response.data ?? response.data.productos) {
                setProductos(response.data.productos);
                console.log('Productos encontrados:', response.data.productos);
                setMensaje("");

                // Hacer la petición para obtener el promedio del precio
                const avgResponse = await axios.post(`${API_BASE_URL}api/average-price/average`, {
                    id_item: selectedItem.id_item
                });

                if (avgResponse.data ?? avgResponse.data.averagePrice) {
                    //setAveragePrice(avgResponse.data.averagePrice);
                    console.log('Precio promedio encontrado:', avgResponse.data.averagePrice);
                } else {
                    //setAveragePrice(null);
                    setMensaje('No se pudo obtener el precio promedio de este item.');
                }
            } else {
                setMensaje('No se encontraron productos relacionados con este item.');
                setProductos(null);
                //setAveragePrice(null);
            }
        } catch (error) {
            console.error('Error al buscar productos por item:', error);
            setMensaje('Hubo un error al realizar la búsqueda.');
            setProductos(null);
            //setAveragePrice(null);
        }
    };


    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Listado Público de Productos</h1>
                <div className="flex flex-wrap gap-4 mb-3 bg-gray-300 p-4 rounded-lg shadow-lg">
                    {/* Filtro por categoría */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoría:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="">Todas las Categorías</option>
                            {categorias && Array.isArray(categorias) && categorias.map((categoria) => (
                                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                    {categoria.nombre_categoria}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por precio */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Mínimo:</label>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Ingrese precio mínimo"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md mb-2"
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio Máximo:</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Ingrese precio máximo"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        />
                    </div>

                    {/* Filtro de orden ascendente/descendente */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por Precio:</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="ASC">De menor a mayor</option>
                            <option value="DESC">De mayor a menor</option>
                        </select>
                    </div>

                    {/* Barra de búsqueda por Item */}
                    <div className="w-full flex items-center sm:w-1/2 lg:w-1/4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Item:</label>
                            <input
                                type="text"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                                placeholder="Buscar por nombre del item"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            />
                        </div>
                        <div className="flex justify-center mt-6 ml-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    searchProductsByItem();
                                }}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                {/* Mostrar mensaje si existe */}
                {mensaje && <p className="text-red-500">{mensaje}</p>}

                {/* Mostrar productos en cards */}
                {productos && Array.isArray(productos) && productos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-300 p-4 rounded-lg shadow-lg">
                    {productos.map((producto) => (
                    <Link to ={ `/product-details/${producto.id_producto}`}
                    key={producto.id_producto}
                    onClick={() => {
                        setFormData(producto);
                        sessionStorage.setItem('producto', JSON.stringify(producto))
                    }
                    }
                     className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="relative">
                        {producto.imagen_url ? (
                            <img
                            src={producto.imagen_url}
                            alt={producto.descripcion}
                            className="w-full h-48 object-cover cursor-pointer"
                            onClick={() => fetchProductDetails(producto.id_producto)}
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">Sin imagen</div>
                        )}
                        </div>
                        <div className="p-4">
                            <p className="text-gray-600 font-semibold">Item: {producto.nombre_item || 'Sin item'}</p>
                            <p className="text-gray-600">Precio: {producto.precio}</p>
                        </div>
                    </Link>
                    ))}
                </div>
                ) : (
                !mensaje && 
                <div className="h-96 flex items-center justify-center">
                    <p className="text-xl font-bold mt-8 text-center">Cargando productos..</p>
                </div>
                )}

                {/*{/* Mostrar los detalles del producto seleccionado 
                {selectedProduct && (
                <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
                    <img src={selectedProduct.imagen_url} alt={selectedProduct.descripcion} className="w-64 h-64 object-cover mb-4" />
                    <p><strong>Descripción:</strong> {selectedProduct.descripcion}</p>
                    <p><strong>Precio:</strong> {selectedProduct.precio}</p>
                    <p><strong>Stock:</strong> {selectedProduct.stock}</p>
                    <p><strong>Medida:</strong> {selectedProduct.medida}</p>
                    <p><strong>Item:</strong> {selectedProduct.nombre_item}</p>
                    <p><strong>Categoría:</strong> {selectedProduct.categoria}</p>
                    <p><strong>Vendedor:</strong> {selectedProduct.vendedor.nombre}</p>
                    <p><strong>Teléfono:</strong> {selectedProduct.vendedor.telefono}</p>
                    <p><strong>Fecha de creación:</strong> {new Date(selectedProduct.vendedor.fecha_creacion).toLocaleDateString()}</p>
                </div>
                )}*/}
            </div>
            <Footer/>
        </div>
    );
};

export default PublicProductList;