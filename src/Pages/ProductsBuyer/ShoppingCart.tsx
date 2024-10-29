import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useState } from "react";

export default function ShoppingCart(){
    const [quantity, setQuantity] = useState<number>(1);

    const handleQuanityIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const handleQuanityDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuantity(quantity - 1);
    }
    return(
        <div>
            <Navbar />
            <div className="text-center flex flex-col">
                <div className="p-10">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="w-full flex justify-center items-start h-screen w-3/4 h-3/4 px-48 space-x-4">
                    <table className="w-full border-collapse border border-gray-400">
                        <thead className="">
                            <tr>
                                <th className="border-t border-b border-gray-400 px-4 py-2">Producto</th>
                                <th className="border-t border-b border-gray-400 px-4 py-2">Precio</th>
                                <th className="border-t border-b border-gray-400 px-4 py-2">Cantidad</th>
                                <th className="border-t border-b border-gray-400 px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className=" border-gray-400 px-4 py-2">Producto 1</td>
                                <td className=" border-gray-400 px-4 py-2">$100</td>
                                <td className=" border-gray-400 px-4 py-2">
                                    <form className="max-w-xs mx-auto">
                                        <button 
                                        onClick={handleQuanityDecrease}
                                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        disabled={ quantity === 1 ? true : undefined}>
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-width="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={quantity} required />
                                        <button 
                                        onClick={handleQuanityIncrease}
                                         className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-width="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                                
                                <td className=" border-gray-400 px-4 py-2">$100</td>
                            </tr>
                            <tr>
                                <td className="border-gray-400 px-4 py-2">Producto 1</td>
                                <td className="border-gray-400 px-4 py-2">$100</td>
                                <td className="border-gray-400 px-4 py-2">
                                <form className="max-w-xs mx-auto">
                                <button 
                                        onClick={handleQuanityDecrease}
                                        className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        disabled={ quantity === 1 ? true : undefined}>
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-width="2" d="M1 1h16"/>
                                            </svg>
                                        </button>
                                        <input type="text" className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={quantity} required />
                                        <button 
                                        onClick={handleQuanityIncrease}
                                         className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-width="2" d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                                <td className="border-gray-400 px-4 py-2">$100</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className="border-t border-gray-400 px-4 py-2">
                                    <div className="flex justify-between">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Continuar Comprando
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Borrar todo
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <table className="w-1/4 border border-gray-400 rounded h-1/3">
                        <thead>
                            <tr>
                                <th className=" border-gray-400 px-4 py-2">Resumen</th>
                                <th className=" border-gray-400 px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-gray-400 text-start px-4 py-2">Subtotal:</td>
                                <td className="border-gray-400 text-end px-4 py-2">$200</td>
                            </tr>
                            <tr>
                                <td className="border-gray-400 text-start px-4 py-2">Envío:</td>
                                <td className="border-gray-400 text-end px-4 py-2">$10</td>
                            </tr>
                            <tr>
                                <td className="border-gray-400 text-start px-4 py-2">Total:</td>
                                <td className="border-gray-400 text-end px-4 py-2">$210</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} className=" border-gray-400 px-4 py-2">
                                    <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded">
                                        Pagar
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}