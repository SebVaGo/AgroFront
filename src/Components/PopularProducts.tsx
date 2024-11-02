import { Link } from "react-router-dom";
import { allProductsProps } from "../types";
import useLocalStorage from '../localStorage';

export default function PopularProduct(producto : allProductsProps){
    //@ts-ignore
    const [formData, setFormData] = useLocalStorage('formData', {});
    return(
        <Link to ={ `/product-details/${producto.id_producto}`}
        key={producto.id_producto}
        onClick={() => {
            setFormData(producto)
        }
        }
        className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative">
                {producto.imagen_url ? (
                    <img
                    src={producto.imagen_url}
                    alt={producto.descripcion}
                    className="w-full h-48 object-cover cursor-pointer"
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
    )
}