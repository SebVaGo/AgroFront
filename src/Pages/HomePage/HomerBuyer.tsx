import ProductCard from "../../Components/CategoryCard";
import PopularProduct from "../../Components/PopularProducts";
import Verduras from "../../../Public/vegetales.jpg";
import Frutas from "../../../Public/frutas.jpg";
import Tuberculo from "../../../Public/tuberculos.jpg";
import Carnes from "../../../Public/carnes.jpg";
import Lacteos from "../../../Public/lacteos.jpg";
import Tomate from "../../../Public/tomate.jpg";
import Papa from "../../../Public/papa.jpg";
import Manzana from "../../../Public/manzana.jpg";
import Platano from "../../../Public/platano.jpg";
import Naranja from "../../../Public/naranja.jpg";
import CamuCamu from "../../../Public/camu.jpg";
import Kiwi from "../../../Public/kiwi.jpg";
import Uvas from "../../../Public/uvas.jpg";
import Mandarina from "../../../Public/mandarina.jpg"; 
import Mango from "../../../Public/mango.jpg";
import { useEffect, useState } from "react";
import { allProductsProps } from "../../types";
import axios from "axios";

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
//@ts-ignore
const POPULAR_PRODUCTS = [
    {
    name: "Tomate",
    image: Tomate,
    price: "$5.00",
    description: "Tomate fresco",
    category: {
        name: "Verduras",
        image: "https://i.pravatar.cc/150?u=verduras"
    },
    quantity: 10
    },
    {
    name: "Papa",
    image: Papa,
    price: "$3.00",
    description: "Papa fresca",
    category: {
        name: "Tuberculos",
        image: "https://i.pravatar.cc/150?u=tuberculos"
    },
    quantity: 10
    },
    {
    name: "Manzana",
    image: Manzana,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Platano",
    image: Platano,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Naranja",
    image: Naranja,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Camu Camu",
    image: CamuCamu,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Kiwi",
    image: Kiwi,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Uvas",
    image: Uvas,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Mandarina",
    image: Mandarina,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
    {
    name: "Mango",
    image: Mango,
    price: "$2.00",
    description: "Manzana fresca",
    category: {
        name: "Frutas",
        image: "https://i.pravatar.cc/150?u=frutas"
    },
    quantity: 10
    },
]

export default function HomerBuyer() {
    const [productos, setProductos] = useState<allProductsProps>();
    //@ts-ignore
    const [mensaje, setMensaje] = useState("");
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get("https://agroweb-5dxm.onrender.com/api/product-list/all");
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
            <div>
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
            <div className="flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-bold mt-8 text-center">PRODUCTOS POPULARES</h1>
                <div className="mt-5 flex justify-center w-5/6">
                    <div className="grid grid-cols-2 w-5/6 md:grid-cols-5">
                    {
                        Array.isArray(productos) && productos.slice(0, 8).map(prod => {
                            return (
                                <PopularProduct key={prod.name} 
                                nombre_item={prod.nombre_item}
                                precio={prod.precio}
                                imagen_url={prod.imagen_url}
                                id_producto = {prod.id_producto}
                                descripcion = {prod.descripcion}
                                stock = {prod.stock}
                                categoria = {prod.categoria}
                                medida = {prod.medida}
                                vendedor = {prod.vendedor}
                                 />
                            )
                        })
                    }
                    </div>
                </div>
            
            </div>
        </div>
    )
}
