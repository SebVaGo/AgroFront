import { CategoryCardProps } from "../types";

export default function ProductCard({category}: CategoryCardProps){
    return (
        <div >
            <div key={category.name} className="border rounded-lg border-gray-200 justify-items-center mt-12 w-full  md:w-56 max-w-56 mx-6  transition duration-500 ease-in-out transform hover:scale-105 hover:border-green-600 hover:border-2">
                <div className="w-full items-center">
                    <img src={category.image} alt={category.name} className = "rounded-t-lg w-screen"/>
                </div>
                <div className="p-4 text-center">
                    <h2 className="text-lg font-bold mb-2">{category.name}</h2>
                </div>
            </div>
        </div>
    );
};
