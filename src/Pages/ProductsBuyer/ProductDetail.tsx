import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer"
import Navbar from "../../Components/Navbar"

export default function ProductDetails() {
    
    
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-6 rounded-lg border max-w-4xl w-full">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <img src="https://via.placeholder.com/300" alt="product" className="h-64 w-64 object-cover rounded-lg"/>
                        </div>
                        <div className="ml-6 flex flex-col justify-center">
                            <h1 className="text-3xl font-bold text-gray-800">Product Name</h1>
                            <p className="mt-2 text-gray-600">Category</p>
                            <p className="mt-2 text-gray-600">Price</p>
                            <p className="mt-2 text-gray-600">Stock</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700">Description</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}