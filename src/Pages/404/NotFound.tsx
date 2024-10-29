import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div >
            <main className="h-screen w-full flex flex-col justify-center items-center bg-white">
                <h1 className="text-9xl font-extrabold text-black tracking-widest">404</h1>
                <div className="bg-green-700 px-2 text-sm text-white rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <button className="mt-5">
                    <Link to="/"
                className="relative inline-block text-sm font-medium text-white group active:text-black focus:outline-none "
                    >
                    <span
                        className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#000] group-hover:translate-y-0 group-hover:translate-x-0"
                    ></span>
                    <span className="relative block px-8 py-3 bg-green-700 border border-current">
                        Go Home
                    </span>
                    </Link>
                </button>
            </main>
        </div>
    )
}