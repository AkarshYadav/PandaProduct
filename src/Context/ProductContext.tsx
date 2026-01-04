import { createContext , useState , useContext, useMemo, useCallback } from "react";
import type { Product , ProductFormData , ViewMode } from "../types/product";

const generateMockProducts = (): Product[] => {
    const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Beauty', 'Food'];
    const adjectives = ['Premium', 'Classic', 'Modern', 'Vintage', 'Deluxe', 'Essential', 'Pro', 'Ultra'];
    const nouns = ['Widget', 'Gadget', 'Device', 'Tool', 'Item', 'Product', 'Gear', 'Accessory'];
  
    return Array.from({ length: 24 }, (_, i) => ({
      id: `prod-${i + 1}`,
      name: `${adjectives[i % adjectives.length]} ${nouns[i % nouns.length]} ${i + 1}`,
      price: Math.round((Math.random() * 500 + 10) * 100) / 100,
      category: categories[i % categories.length],
      stock: Math.floor(Math.random() * 200),
      description: `High-quality ${nouns[i % nouns.length].toLowerCase()} designed for everyday use. Perfect for those who appreciate quality and functionality.`,
      createAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    }));
  };

interface ProductContextType{
    products:Product[],
    searchQuery:string,
    currentPage : number,
    viewMode : ViewMode,
    itemsPerPage:number,
    filteredProducts:Product[],
    totalPages:number,
    paginatedProducts:Product[],
    addProduct:(product:ProductFormData)=>void,
    editProduct:(id:string,product:ProductFormData)=>void,
    deleteProduct:(id:string)=>void,
    setSearchQuery:(query:string)=>void,
    setCurrentPage:(page:number)=>void,
    setViewMode:(mode:ViewMode)=>void,
}

const ProductContext = createContext<ProductContextType|undefined>(undefined);

export function ProductProvider({children}:{children:React.ReactNode}){
   const [products,setProducts] = useState<Product[]>(generateMockProducts());
   const [searchQuery,setSearchQuery] = useState<string>('');
   const [currentPage,setCurrentPage] = useState<number>(1);
   const [viewMode,setViewMode] = useState<ViewMode>('grid');
   const itemsPerPage = 8;

   const filteredProducts = useMemo(()=>{
    let result = products;
    if(searchQuery.trim()) {
      result = products.filter((product)=> product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Sort by createAt descending (newest first)
    return [...result].sort((a, b) => b.createAt.getTime() - a.createAt.getTime());
   },[products , searchQuery]);

   const totalPages = useMemo(()=>{
    return Math.ceil(filteredProducts.length / itemsPerPage);
   }, [filteredProducts.length])

   const paginatedProducts = useMemo(()=>{
    const start = (currentPage-1)*itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
   }, [filteredProducts , currentPage])

   const addProduct = useCallback((data:ProductFormData)=>{
    const newProduct:Product = {
        id: `prod-${Date.now()}`,
        ...data,
        createAt: new Date(),
    };
    setProducts((prev)=>[newProduct, ...prev]);
    setCurrentPage(1);
   }, [])

   const editProduct = useCallback((id: string, data: ProductFormData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...data } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);
  const value = useMemo(
    () => ({
      products,
      searchQuery,
      currentPage,
      viewMode,
      itemsPerPage,
      filteredProducts,
      totalPages,
      paginatedProducts,
      addProduct,
      editProduct,
      deleteProduct,
      setSearchQuery: handleSetSearchQuery,
      setCurrentPage,
      setViewMode,
    }),
    [
      products,
      searchQuery,
      currentPage,
      viewMode,
      filteredProducts,
      totalPages,
      paginatedProducts,
      addProduct,
      editProduct,
      deleteProduct,
      handleSetSearchQuery,
    ]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}


export function useProductContext(){
    const context = useContext(ProductContext);
    if(!context){
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}