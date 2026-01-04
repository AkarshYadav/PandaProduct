import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Panda } from "lucide-react";
import SearchInput from "./SearchInput";
import type { Product } from "@/types/product";
import { ProductForm } from "./ProductForm";

function Navbar() {

    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    
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

  return (
    <motion.header
      className="sticky top-0 z-20 bg-background/70 backdrop-blur-md border-b border-border"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          
          {/* Left: Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Panda className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <motion.h1
              className="text-lg font-semibold tracking-tight"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Panda Products
            </motion.h1>
          </motion.div>

          {/* Center: Search */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <SearchInput />
          </motion.div>

          {/* Right: Action */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleAddNew}
              className="h-9 px-4 gap-2 shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Product</span>
            </Button>
          </motion.div>

        </div>
      </div>

      <ProductForm
        open={formOpen}
        onOpenChange={handleFormClose}
        product={editingProduct}
      />
    </motion.header>
  );
}

export default Navbar;
