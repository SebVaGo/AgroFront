import { motion } from 'framer-motion'

export default function AboutUs(){
    return(
        <div>
            <section className="py-12 mt-12 relative">
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto rounded-lg">
                    <motion.div
                        className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                                <h2 className="text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                    <span className="text-green-800">AGRO</span><span className="text-gray-900">WEB</span>
                                </h2>
                                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                    AgroWeb es una plataforma sin fines de lucro diseñada para facilitar la compra y venta de productos agrícolas de manera directa y sin intermediarios, ayudando a campesinos a obtener un precio justo en el mercado y a incorporar tecnología en sus ventas. La plataforma también beneficia a los compradores, permitiéndoles interactuar directamente con los productores, obtener productos frescos y de calidad, y contribuir al desarrollo económico del sector agrícola.
                                </p>
                            </div>
                        </motion.div>
                        <motion.img
                            className="lg:mx-0 mx-auto h-full shadow-xl rounded-3xl object-cover"
                            src="https://img.freepik.com/foto-gratis/vision-mujer-que-trabaja-sector-agricola-celebrar-dia-trabajo-mujeres_23-2151252034.jpg?t=st=1730588433~exp=1730592033~hmac=eac3b68d2ca9864867983a123c3f0102261758314d1cf9bb25512a38a0f7909d&w=1380"
                            alt="about Us image"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </motion.div>
                </div>
            </section>
            <section>
                <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto pb-16">
                    <motion.div
                        className="w-full flex flex-col md:flex-row justify-between items-center gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.div
                            className="w-full md:w-1/2 text-gray-500 text-base font-normal leading-relaxed"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <h2 className="text-gray-900 text-2xl font-bold font-manrope leading-normal">Misión y Propósito</h2>
                            <p>La misión que tenemos como AgroWeb es fomentar una venta justa, que no solo beneficie a nuestros campesinos que ofrecerán excelentes productos, sino que también los clientes que lleguen a la pagina a comprar. Por otra parte, el propósito que tenemos como AgroWeb es poder mover el sector agrícola con una plataforma fácil de hacer compras y ventas de productos agrícolas sin intermediarios. </p>
                            <h2 className="text-gray-900 text-2xl mt-4 font-bold font-manrope leading-normal">Visión</h2>
                            <p>La visión de AgroWeb es poder expandir la plataforma hacia otros sectores, para que los agricultores, pescadores, entre otros sectores que no usan la tecnología como un medio para impulsar la venta de sus productos y tienen que abaratar sus precios por la desinformación de precios en el mercado, puedan tener este concepto que es  AgroWeb como una alternativa para recibir por sus productos un precio justo, además de poder implementar más funciones en la plataforma virtual con la finalidad de poder ser más útil para nuestro publico objetivo. </p>
                        </motion.div>

                        <motion.div
                            className="hidden md:block w-1 h-96 bg-green-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        ></motion.div>

                        <motion.div
                            className="w-full md:w-1/2 text-gray-500 text-base font-normal leading-relaxed"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <h2 className="text-gray-900 text-2xl font-bold font-manrope leading-normal">VRIP y AgroWeb</h2>
                            <p>
                                AgroWeb debe su nacimiento gracias a el Vicerrectorado de Investigación y Posgrado (VRIP). Que impulsa proyectos de desarrollo de investigación con la finalidad de poder buscar una solución a un determinado problema, en este caso a través del concurso del PRO-CTIE, se mandó la gran problemática que tenían los agricultores o campesinos al momento de vender sus productos, ya que en muchos casos estos al no tener una información claro el valor económico que tenían sus productos en el mercado peruano, estos simplemente para no quedarse con sus productos vendían sus productos a un precio paupérrimo. Es aquí donde nace la idea de AgroWeb donde busca solucionar esta problemática con un trato directo hacia empresas que desean productos del campo.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}