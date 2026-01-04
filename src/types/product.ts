export interface Product{
    id:string,
    name:string,
    price : number,
    category: string,
    stock: number,
    description : string,
    createAt:Date
}

export type ViewMode = 'grid' | 'list';

export interface ProductFormData{
    name:string,
    price : number,
    category: string,
    stock: number,
    description : string,
}