import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Package, BarChart3, Sparkles } from "lucide-react";
import { useProductContext } from "@/Context/ProductContext";
import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductForm } from "./ProductForm";

export function Hero() {
  const { filteredProducts } = useProductContext();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleFormClose = (open: boolean) => {
    setFormOpen(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  const stats = [
    {
      label: "Total Products",
      value: filteredProducts.length,
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "Categories",
      value: new Set(filteredProducts.map((p) => p.category)).size,
      icon: BarChart3,
      color: "text-purple-500",
    },
    {
      label: "In Stock",
      value: filteredProducts.filter((p) => p.stock > 0).length,
      icon: TrendingUp,
      color: "text-green-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20 border-b border-border"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main heading */}
            <motion.div variants={itemVariants} className="mb-6">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Product Management System
                </span>
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
              Manage Your Products
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                With Ease
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Streamline your inventory, track products, and manage your catalog
              all in one beautiful, intuitive interface.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                onClick={handleAddNew}
                className="group relative overflow-hidden h-12 px-8 text-base font-semibold"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                />
                <span className="relative flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Product
                </span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`${stat.color} mb-3`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <motion.div
                        className="text-3xl font-bold mb-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <ProductForm
        open={formOpen}
        onOpenChange={handleFormClose}
        product={editingProduct}
      />
    </>
  );
}

