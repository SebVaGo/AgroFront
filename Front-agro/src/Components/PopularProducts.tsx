import { ProductCardProps } from "../types";

export default function PopularProduct({product} : ProductCardProps){
    return(
        <div className="p-4">
            <div className="border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-full items-center">
                <img src={product.image} alt={product.name} className="w-full rounded-t-lg"/>
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-xl font-bold text-green-600 mt-2">{product.price}</p>
            </div>
            </div>
        </div>
    )
}