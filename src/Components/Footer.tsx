import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <div>
            <footer className="bg-neutral-800">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/homepage" className="flex items-center">
                        <svg className="w-24 h-auto md:w-64" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261 36">
                            <path d="M22.99 27.5h-9.96l-1.8 7.5H.19L11.23.8h14.1L35.89 35h-11.1l-1.8-7.5ZM17.95 8.18l-3.54 12.66h7.14L18.19 8.18h-.24Zm49.924 7.86v17.1c-2.68.88-5.22 1.52-7.62 1.92-2.4.4-4.42.6-6.06.6-5.44 0-9.7-1.42-12.78-4.26s-4.62-7.2-4.62-13.08c0-6 1.62-10.48 4.86-13.44 3.24-3 7.8-4.5 13.68-4.5 3.08 0 6.78.46 11.1 1.38 0 .8-.08 2-.24 3.6-.16 1.56-.32 2.66-.48 3.3l-2.16-.06c-2.64-.08-4.7-.12-6.18-.12-4.44 0-6.86.26-7.26.78-.64.76-1.1 1.94-1.38 3.54-.24 1.6-.36 3.14-.36 4.62 0 2.68.3 4.76.9 6.24.6 1.48 1.52 2.52 2.76 3.12 1.24.6 2.92.9 5.04.9h.24V16.04h10.56ZM104.115 35h-11.34l-2.04-8.64c-.08-.32-.22-.86-.42-1.62-.16-.8-.36-1.38-.6-1.74-.24-.4-.58-.66-1.02-.78-1.12.04-2.76.06-4.92.06V35h-10.8V1.1c4.84-.36 9.36-.54 13.56-.54 3.8 0 6.88.32 9.24.96 2.36.6 4.12 1.66 5.28 3.18 1.2 1.48 1.8 3.52 1.8 6.12 0 2.44-.56 4.36-1.68 5.76-1.12 1.36-2.92 2.18-5.4 2.46v.36c1.4.12 2.56.58 3.48 1.38.96.76 1.6 1.74 1.92 2.94l2.94 11.28Zm-20.34-19.5c.36.04 1.06.06 2.1.06 3.08 0 4.88-.26 5.4-.78.48-.48.72-1.6.72-3.36 0-1.64-.44-2.76-1.32-3.36-.84-.6-2.24-.9-4.2-.9-.44 0-1.34.04-2.7.12v8.22Zm40.684 20.28c-5.96 0-10.44-1.4-13.44-4.2-2.96-2.84-4.44-7.38-4.44-13.62 0-6.12 1.64-10.58 4.92-13.38 3.28-2.8 7.62-4.2 13.02-4.2 11.36 0 17.04 5.66 17.04 16.98 0 5.72-1.4 10.22-4.2 13.5-2.76 3.28-7.06 4.92-12.9 4.92Zm-.24-7.08c1.12 0 2.06-.18 2.82-.54.76-.4 1.36-1.08 1.8-2.04.84-1.64 1.26-4.32 1.26-8.04 0-3.64-.42-6.28-1.26-7.92-.84-1.68-2.38-2.56-4.62-2.64-.84 0-1.72.1-2.64.3-.88.16-1.44.4-1.68.72-.48.56-.86 1.76-1.14 3.6-.24 1.8-.36 3.78-.36 5.94 0 3.36.32 5.82.96 7.38.44 1.16 1.06 2 1.86 2.52.8.48 1.8.72 3 .72Z" fill="#055808"/>
                            <path d="M166.494 35h-13.5L144.174.8h11.52l4.56 25.14h.3L165.414.8h11.28l4.98 25.14h.18L186.474.8h11.04l-8.82 34.2h-13.44l-4.08-21.84h-.36L166.494 35ZM201.054.8h24.9V8h-14.1v6.24h11.88v6.48h-11.88v6.96h14.04V35h-24.84V.8Zm51.679 16.14c2.72.32 4.66 1.24 5.82 2.76 1.16 1.48 1.74 3.28 1.74 5.4 0 1.32-.2 2.58-.6 3.78-.4 1.16-.88 2.16-1.44 3-.56.8-1.04 1.32-1.44 1.56-1.6 1.04-6.48 1.56-14.64 1.56h-11.64V.8h14.1c3.2 0 5.78.18 7.74.54 2 .32 3.62 1.08 4.86 2.28 1.24 1.16 1.86 2.94 1.86 5.34 0 2.08-.52 3.76-1.56 5.04-1 1.28-2.6 2.16-4.8 2.64v.3Zm-4.8-8.88c-.4-.4-.88-.64-1.44-.72-.52-.12-1.36-.18-2.52-.18s-2.04.02-2.64.06v7.32h3.12c1.48 0 2.46-.1 2.94-.3.36-.16.68-.58.96-1.26.32-.68.48-1.42.48-2.22 0-1.2-.3-2.1-.9-2.7Zm1.02 20.04c.28-.24.5-.68.66-1.32.2-.68.3-1.36.3-2.04 0-.84-.12-1.62-.36-2.34-.2-.76-.48-1.3-.84-1.62-.36-.36-.88-.6-1.56-.72-.64-.12-1.74-.18-3.3-.18-1 0-1.84.02-2.52.06v8.7c1.88.04 3.56.02 5.04-.06 1.48-.12 2.34-.28 2.58-.48Z" fill="#000"/>
                        </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">AGROWEB</a>
                                </li>
                                <li>
                                    <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://github.com/SebVaGo" className="hover:underline ">Github</a>
                                </li>
                                <li>
                                    <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© <a href="#" className="hover:underline">Financiado por PRO - CITE</a>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
                                </svg>
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://github.com/SebVaGo" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                                </svg>
                            <span className="sr-only">Discord community</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                                <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                            </svg>
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clip-rule="evenodd"/>
                            </svg>
                            <span className="sr-only">Dribbble account</span>
                        </a>
                    </div>
                </div>
                </div>
            </footer>

        </div>
    )
}