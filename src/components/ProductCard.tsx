import { motion } from 'framer-motion';
import { Package, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  index?: number;
}

export function ProductCard({ product, onEdit, onDelete, index = 0 }: ProductCardProps) {
  const stockStatus = product.stock === 0 
    ? 'out' 
    : product.stock < 20 
    ? 'low' 
    : 'in';

  return (
    <motion.div
      className="group bg-card rounded-xl border border-border p-5 card-shadow hover:card-shadow-hover transition-all duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
          <Package className="h-6 w-6 text-accent-foreground" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(product)}
            className="h-8 w-8 p-0 hover:bg-secondary"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(product.id)}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
        {product.name}
      </h3>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[40px]">
        {product.description || 'No description available'}
      </p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </span>
        <Badge variant="secondary" className="font-medium">
          {product.category}
        </Badge>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-sm text-muted-foreground">Stock</span>
        <div className="flex items-center gap-2">
          <span className={cn(
            'text-sm font-medium',
            stockStatus === 'out' && 'text-destructive',
            stockStatus === 'low' && 'text-amber-600',
            stockStatus === 'in' && 'text-foreground'
          )}>
            {product.stock} units
          </span>
          <div className={cn(
            'h-2 w-2 rounded-full',
            stockStatus === 'out' && 'bg-destructive',
            stockStatus === 'low' && 'bg-amber-500',
            stockStatus === 'in' && 'bg-emerald-500'
          )} />
        </div>
      </div>
    </motion.div>
  );
}
