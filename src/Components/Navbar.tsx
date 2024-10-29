import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar (){
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const typeUser = sessionStorage.getItem('typeUser');

    return (
            <div>
                <nav className="bg-neutral-800">
                    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                                <div className="md:mb-0">
                                    <Link to="/" className="flex items-center">
                                        <svg className="w-24 h-auto md:w-48" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261 36">
                                            <path d="M22.99 27.5h-9.96l-1.8 7.5H.19L11.23.8h14.1L35.89 35h-11.1l-1.8-7.5ZM17.95 8.18l-3.54 12.66h7.14L18.19 8.18h-.24Zm49.924 7.86v17.1c-2.68.88-5.22 1.52-7.62 1.92-2.4.4-4.42.6-6.06.6-5.44 0-9.7-1.42-12.78-4.26s-4.62-7.2-4.62-13.08c0-6 1.62-10.48 4.86-13.44 3.24-3 7.8-4.5 13.68-4.5 3.08 0 6.78.46 11.1 1.38 0 .8-.08 2-.24 3.6-.16 1.56-.32 2.66-.48 3.3l-2.16-.06c-2.64-.08-4.7-.12-6.18-.12-4.44 0-6.86.26-7.26.78-.64.76-1.1 1.94-1.38 3.54-.24 1.6-.36 3.14-.36 4.62 0 2.68.3 4.76.9 6.24.6 1.48 1.52 2.52 2.76 3.12 1.24.6 2.92.9 5.04.9h.24V16.04h10.56ZM104.115 35h-11.34l-2.04-8.64c-.08-.32-.22-.86-.42-1.62-.16-.8-.36-1.38-.6-1.74-.24-.4-.58-.66-1.02-.78-1.12.04-2.76.06-4.92.06V35h-10.8V1.1c4.84-.36 9.36-.54 13.56-.54 3.8 0 6.88.32 9.24.96 2.36.6 4.12 1.66 5.28 3.18 1.2 1.48 1.8 3.52 1.8 6.12 0 2.44-.56 4.36-1.68 5.76-1.12 1.36-2.92 2.18-5.4 2.46v.36c1.4.12 2.56.58 3.48 1.38.96.76 1.6 1.74 1.92 2.94l2.94 11.28Zm-20.34-19.5c.36.04 1.06.06 2.1.06 3.08 0 4.88-.26 5.4-.78.48-.48.72-1.6.72-3.36 0-1.64-.44-2.76-1.32-3.36-.84-.6-2.24-.9-4.2-.9-.44 0-1.34.04-2.7.12v8.22Zm40.684 20.28c-5.96 0-10.44-1.4-13.44-4.2-2.96-2.84-4.44-7.38-4.44-13.62 0-6.12 1.64-10.58 4.92-13.38 3.28-2.8 7.62-4.2 13.02-4.2 11.36 0 17.04 5.66 17.04 16.98 0 5.72-1.4 10.22-4.2 13.5-2.76 3.28-7.06 4.92-12.9 4.92Zm-.24-7.08c1.12 0 2.06-.18 2.82-.54.76-.4 1.36-1.08 1.8-2.04.84-1.64 1.26-4.32 1.26-8.04 0-3.64-.42-6.28-1.26-7.92-.84-1.68-2.38-2.56-4.62-2.64-.84 0-1.72.1-2.64.3-.88.16-1.44.4-1.68.72-.48.56-.86 1.76-1.14 3.6-.24 1.8-.36 3.78-.36 5.94 0 3.36.32 5.82.96 7.38.44 1.16 1.06 2 1.86 2.52.8.48 1.8.72 3 .72Z" fill="#055808"/>
                                            <path d="M166.494 35h-13.5L144.174.8h11.52l4.56 25.14h.3L165.414.8h11.28l4.98 25.14h.18L186.474.8h11.04l-8.82 34.2h-13.44l-4.08-21.84h-.36L166.494 35ZM201.054.8h24.9V8h-14.1v6.24h11.88v6.48h-11.88v6.96h14.04V35h-24.84V.8Zm51.679 16.14c2.72.32 4.66 1.24 5.82 2.76 1.16 1.48 1.74 3.28 1.74 5.4 0 1.32-.2 2.58-.6 3.78-.4 1.16-.88 2.16-1.44 3-.56.8-1.04 1.32-1.44 1.56-1.6 1.04-6.48 1.56-14.64 1.56h-11.64V.8h14.1c3.2 0 5.78.18 7.74.54 2 .32 3.62 1.08 4.86 2.28 1.24 1.16 1.86 2.94 1.86 5.34 0 2.08-.52 3.76-1.56 5.04-1 1.28-2.6 2.16-4.8 2.64v.3Zm-4.8-8.88c-.4-.4-.88-.64-1.44-.72-.52-.12-1.36-.18-2.52-.18s-2.04.02-2.64.06v7.32h3.12c1.48 0 2.46-.1 2.94-.3.36-.16.68-.58.96-1.26.32-.68.48-1.42.48-2.22 0-1.2-.3-2.1-.9-2.7Zm1.02 20.04c.28-.24.5-.68.66-1.32.2-.68.3-1.36.3-2.04 0-.84-.12-1.62-.36-2.34-.2-.76-.48-1.3-.84-1.62-.36-.36-.88-.6-1.56-.72-.64-.12-1.74-.18-3.3-.18-1 0-1.84.02-2.52.06v8.7c1.88.04 3.56.02 5.04-.06 1.48-.12 2.34-.28 2.58-.48Z" fill="#000"/>
                                        </svg>
                                    </Link>
                                </div>

                                <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center ">
                                    <li>
                                        <Link to="/" className="flex text-sm font-medium text-white hover:text-green-600 ">
                                        Principal
                                        </Link>
                                    </li>
                                    <li className="shrink-0">
                                        {typeUser === 'COMPRADOR' ? 
                                            <Link to="/shop" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                        Comprar
                                        </Link>
                                        : <Link to="/create-product" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                        Vender
                                        </Link>
                                        }
                                    </li>
                                    <li className="shrink-0">
                                        {typeUser === "VENDEDOR" ?
                                        <Link to="/my-products" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                        Mis productos
                                        </Link>
                                        : <Link to="#" className="flex text-sm font-medium text-white hover:text-green-600">
                                            Páginas
                                        </Link>
                                        }
                                    </li>
                                    <li className="shrink-0">
                                        {typeUser === "VENDEDOR" ? 
                                        (<Link to="/shop" title="" className="text-sm font-medium text-white hover:text-green-600">
                                            Todos los productos
                                        </Link>)
                                        : 
                                        <Link to="#" className="text-sm font-medium text-white hover:text-green-600">
                                            Blog
                                        </Link>}
                                    </li>
                                    <li className="shrink-0">
                                        <a href="#" title="" className="text-sm font-medium text-white hover:text-green-600">
                                        Sobre nosotros
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-center lg:space-x-2">
                                {typeUser === "COMPRADOR" ? <Link to="/shopping-cart" className="inline-flex items-center rounded-lg justify-center p-2 hover:text-green-600 text-sm font-medium leading-none text-white">
                                    <span className="sr-only">
                                        Cart
                                    </span>
                                        <svg className="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                                        </svg>
                                    <span className="hidden sm:flex">Mi carrito</span>
                                </Link>
                                :
                                ""}
                                <Link to="/profile" className="inline-flex items-center rounded-lg justify-center p-2 hover:text-green-600 text-sm font-medium leading-none text-white">
                                    <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                    Mi cuenta
                                </Link>

                            </div>

                            <button type="button"
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                            data-collapse-toggle="ecommerce-navbar-menu-1" aria-controls="ecommerce-navbar-menu-1" aria-expanded="false" className="inline-flex lg:hidden items-center justify-center rounded-md  p-2 text-white">
                                <span className="sr-only">
                                    Open Menu
                                </span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div 
                     className={`bg-neutral-800 rounded-lg py-3 ${isOpenMenu ? `` : `hidden`} px-4 mt-4`}>
                        <ul className="text-white text-sm font-medium dark:text-white space-y-3">
                            <li>
                            <Link to="/" className="flex text-sm font-medium text-white hover:text-green-600 ">
                                        Principal
                            </Link>
                            </li>
                            <li>
                            {typeUser === 'VENDEDOR' ? 
                                <Link to="/create-product" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                    Vender
                                </Link>
                                : 
                                <Link to="/shop" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                    Comprar
                                </Link>
                            }
                            </li>
                            <li>
                                <Link to="/my-products" title="" className="flex text-sm font-medium text-white hover:text-green-600">
                                    Mis productos
                                </Link>
                            </li>
                            <li>
                                <a href="#" title="" className="text-sm font-medium text-white hover:text-green-600">
                                    Blog    
                                </a>
                            </li>
                            <li>
                                <a href="#" title="" className="text-sm font-medium text-white hover:text-green-600">
                                    Sobre nosotros
                                </a>
                            </li>
                        </ul>
                    </div>
            </nav>
         </div>
    )
}

