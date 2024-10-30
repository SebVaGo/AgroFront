
//@ts-ignore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';

import {  allProductsProps, CategoryProps, itemSelect } from '../../types';

const PublicProductList = () => {
    const [productos, setProductos] = useState<allProductsProps>();
    const [mensaje, setMensaje] = useState("");
    const [categorias, setCategorias] = useState<Array<CategoryProps>>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState<itemSelect>(); 
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
                const response = await axios.get("https://agroweb-5dxm.onrender.com/api/product-list/all");
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
                const response = await axios.get("https://agroweb-5dxm.onrender.com/api/add-category/getCategories");
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
                const response = await axios.get("https://agroweb-5dxm.onrender.com/api/product-list/items");
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
            const response = await axios.post("https://agroweb-5dxm.onrender.com/api/product-list/filter", data);
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
            const response = await axios.post("https://agroweb-5dxm.onrender.com/api/product-description/description", { id_producto });
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
            setMensaje('Error al obtener los detalles del producto.');
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Listado Público de Productos</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                    {/* Filtro por categoría */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Categoría:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        >
                            <option value="">Todas las Categorías</option>
                            {categorias && categorias.map((categoria) => (
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
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Item:</label>
                        <input
                            type="text"
                            value={searchItem}
                            onChange={(e) => setSearchItem(e.target.value)}
                            placeholder="Buscar por nombre del item"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                        />
                    </div>
                </div>
                {/* Mostrar mensaje si existe */}
                {mensaje && <p className="text-red-500">{mensaje}</p>}

                {/* Mostrar productos en cards */}
                {productos && Array.isArray(productos) && productos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productos.map((producto) => (
                    <div key={producto.id_producto} className="bg-white shadow-md rounded-lg overflow-hidden">
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
                        <h2 className="text-lg font-semibold">{producto.descripcion}</h2>
                        <p className="text-gray-600">Precio: {producto.precio}</p>
                        <p className="text-gray-600">Stock: {producto.stock}</p>
                        <p className="text-gray-600">Medida: {producto.medida || 'Sin medida'}</p>
                        <p className="text-gray-600">Item: {producto.nombre_item || 'Sin item'}</p>
                        <p className="text-gray-600">Categoría: {producto.categoria || 'Sin categoría'}</p>
                        <p className="text-gray-600">Vendedor: {producto.vendedor.nombre || 'Sin nombre'}</p>
                        <p className="text-gray-600">Correo: {producto.vendedor.correo}</p>
                        <p className="text-gray-600">Teléfono: {producto.vendedor.telefono}</p>
                        <p className="text-gray-600">Fecha de Creación: {producto.vendedor.fecha_creacion ? new Date(producto.vendedor.fecha_creacion).toLocaleDateString() : 'Fecha no disponible'}</p>
                        </div>
                    </div>
                    ))}
                </div>
                ) : (
                !mensaje && <p className="text-gray-500">Cargando productos...</p>
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
                )}

                {/* Mostrar la lista de todos los items obtenidos */}
                {items && items.items && items.items.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Lista de Items</h2>
                    <ul className="list-disc pl-5">
                    {items.items.map((item) => (
                        <li key={item.id_item}>{item.nombre_item}</li>
                    ))}
                    </ul>
                </div>
                )}
                
            </div>
            <Footer/>
        </div>
    );
};

export default PublicProductList;