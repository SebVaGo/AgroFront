import { allProductsProps } from "../types";

export default function PopularProduct(product : allProductsProps){
    return(
        <div className="p-4">
            <div className="border w-auto border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-full items-center min-h-48 w-full">   
                    <img src={product.imagen_url} alt={product.nombre_item} className="w-full h-48 object-cover rounded-t-lg"/>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800">{product.nombre_item}</h2>
                    <p className="text-xl font-bold text-green-600 mt-2">{product.precio}</p>
                </div>
            </div>
        </div>
    )
}