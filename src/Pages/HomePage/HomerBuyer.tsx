import ProductCard from "../../Components/CategoryCard";
import PopularProduct from "../../Components/PopularProducts";
import Verduras from "../../../Public/vegetales.jpg";
import Frutas from "../../../Public/frutas.jpg";
import Tuberculo from "../../../Public/tuberculos.jpg";
import Carnes from "../../../Public/carnes.jpg";
import Lacteos from "../../../Public/lacteos.jpg";
import { useEffect, useState } from "react";
import { allProductsProps } from "../../types";
import axios from "axios";
import {API_BASE_URL} from '../../../config';

const INITIAL_CATEGORY = [
    {
    name: "Verduras",
    image: Verduras
    },
    {
    name: "Frutas",
    image: Frutas
    },
    {
    name: "Tuberculos",
    image: Tuberculo
    },
    {
    name: "Lacteos",
    image: Lacteos
    },
    {
    name: "Carnes",
    image: Carnes
    }
]

export default function HomerBuyer() {
    const [productos, setProductos] = useState<allProductsProps>();
    //@ts-ignore
    const [mensaje, setMensaje] = useState("");
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}api/product-list/all`);
                setProductos(response.data.productos);
                console.log(response.data.productos);
                setMensaje("");
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setMensaje('Error al obtener los productos.');
            }
        };
        fetchProductos();
    }, []);

    return (
        <div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8 mx-4 md:mx-8">
                <h1 className="text-2xl md:text-3xl font-bold mt-8 text-center">CATEGORIAS</h1> 
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center mx-auto md:mx-8">
                        {
                            INITIAL_CATEGORY.map(cat => {
                                return(
                                <ProductCard key={cat.name} category={cat}/>
                        )
                                })
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mt-4 text-center">ALGUNOS PRODUCTOS</h1>
                {!productos ? (
                    <div className="h-96 flex items-center justify-center">
                        <p className="text-xl font-bold mt-8 text-center">Cargando productos..</p>
                    </div>
                ) : (
                <div className="mt-5 flex justify-center w-5/6">
                    <div className="grid grid-cols-2 space-x-4 w-5/6 md:grid-cols-5">
                    {
                       Array.isArray(productos) && productos
                       .sort(() => 0.5 - Math.random())
                       .slice(0, 10)
                       .map(prod => {
                           return (
                               <PopularProduct key={prod.name} 
                                   nombre_item={prod.nombre_item}
                                   precio={prod.precio}
                                   imagen_url={prod.imagen_url}
                                   id_producto={prod.id_producto}
                                   descripcion={prod.descripcion}
                                   stock={prod.stock}
                                   categoria={prod.categoria}
                                   medida={prod.medida}
                                   vendedor={prod.vendedor}
                               />
                           )
                       })
                    }
                    </div>
                </div>
                )}
            
            </div>
        </div>
    )
}
