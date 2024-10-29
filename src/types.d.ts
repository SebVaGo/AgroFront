export interface Category {
    name: string;
    image: string;
}

export interface Product {
    name: string;
    image: string;
    price: string;
    description: string;
    category: Category;
    quantity: number;
}

export interface ProductCardProps {
    product: Product
}

export interface CategoryCardProps{
    category: Category
}

interface CategoryProps{
    id_categoria: number; 
    nombre_categoria: string 
}

export interface CategorySelect {
    categorias: Array<CategoryProps>

}

interface extentProps{
    id_medida: number;
    nombre: string
}

export interface extentSelect {
    medidas: Array<extentProps>
}

export interface itemProps{
    id_item: number;
    nombre_item: string;
    id_categoria: number
}

export interface itemSelect {
    items: Array<itemProps>
}

export interface allProductsProps{
    id_producto: number;
    descripcion: string;
    precio: string;
    stock: number;
    imagen_url: string;
    nombre_item: string;
    categoria: string;
    medida: string;
    vendedor: {
        correo: string;
        nombre: string;
        fecha_creacion: string;
        telefono: string
    }
}

export interface allProducts {
    productos: Array<allProductsProps>
}

export interface ProductDetails {
    Item: {
        Categoria: CategoryProps;
        id_item: number;
        nombre_item: string;
        id_categoria: number;
    };
    Medida: extentProps;
    descripcion: string;
    id_producto: number;
    id_usuario: number;
    imagen_url: string | null;
    precio: string;
    stock: number;
}

export interface ProductDetailsProps {
    productos: Array<ProductDetails>;
}

interface UserType {
    id_tipo_usuario: number;
    tipo: string;
}

export interface datosUsuario {
    apellido_materno: string;
    apellido_paterno: string;
    primer_nombre: string;
    segundo_nombre: string;
    id_empresa?: string;
    id_datos_dni?: string;
    razon_social: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    estado: string;
    condicion: string;

}

interface userVerifyData {
    message: string;
    user: {
        correo: string;
        creeated_at: string;
        dni_ruc: string;
        id_tipo_usuario: string;
        id_usuario: number;
        telefono: string;
    }
}

interface userDniRucData {
    datosUsuario: datosUsuario;
    message: string;
}

export interface userRegisterProps{
    userType: UserType;
    userDniRucData: userDniRucData;
    userVerifyData: userVerifyData;
}

interface userAccesToken{
    accessToken: string;
    id_usuario: number;
    primerLogin: boolean;
    perfiles: Array<{
        id_usuario:number;
        tipo_usuario:number
    }>;
    seleccionRequerida: string
}

export interface userTimeLeft{
    timeLeft: number;
}

export interface userLoginProps{
    userAccesToken: userAccesToken;
    userTimeLeft: userTimeLeft
}

interface direccionData{
    departamento: string;
    direccion_detallada: string;
    distrito: string;
    pais: string;
    provincia: string
}

interface userData{
    correo: string;
    dni_ruc: string;
    foto_perfil?: string;
    id_tipo_usuario: number;
    telefono:string
}

export interface userDniData{
    additionalInfo: {
        apellido_materno: string;
        apellido_paterno: string;
        primer_nombre: string;
        segundo_nombre?: string
    };
    direccion: direccionData;
    tipoUsuario:{
        tipo: string;
    };
    user: userData
}

export interface userRucData{
    additionalInfo: {
        departamento: string;
        direccion: string;
        distrito: string;
        provincia: string;
        razon_social: string;
    };
    direccion: direccionData;
    tipoUsuario:{
        tipo: string;
    };
    user: userData
}


//-----------------LOGIN-----------------

export interface Perfil {
    id_usuario: number;
    tipo_usuario: number;
  }
  
  export interface Usuario {
    correo: string;
    clave: string;
  }


