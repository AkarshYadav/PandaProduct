import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { Hero } from "@/components/Hero";
import { ViewToggle } from "@/components/ViewToggle";
import { useProductContext } from "@/Context/ProductContext";
import type { Product } from "@/types/product";
import { Pagination } from "@/components/Pagination";
import { ProductTable } from "@/components/ProductTable";
import { ProductCard } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

function ProductList() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const {
    paginatedProducts,
    viewMode,
    filteredProducts,
    deleteProduct,
  } = useProductContext();

  return (
    <>
      <Navbar />

      <ProductForm
        open={formOpen}
        onOpenChange={handleFormClose}
        product={editingProduct}
      />

      <Hero />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <ViewToggle />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {paginatedProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 px-4"
            >
              <motion.div
                className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Package className="h-8 w-8 text-muted-foreground" />
              </motion.div>

              <motion.h3
                className="text-lg font-semibold mb-2"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No products found
              </motion.h3>

              <motion.p
                className="text-muted-foreground text-center max-w-sm mb-6"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {filteredProducts.length === 0
                  ? "Try adjusting your search to find what you're looking for."
                  : "Get started by adding your first product."}
              </motion.p>

              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button onClick={handleAddNew} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Grid View */}
              {viewMode === "grid" && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  layout
                >
                  <AnimatePresence>
                    {paginatedProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={deleteProduct}
                        index={index}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductTable
                    products={paginatedProducts}
                    onEdit={handleEdit}
                    onDelete={deleteProduct}
                  />
                </motion.div>
              )}

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Pagination />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default ProductList;
