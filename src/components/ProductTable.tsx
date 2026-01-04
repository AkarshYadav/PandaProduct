import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'out';
    if (stock < 20) return 'low';
    return 'in';
  };

  return (
    <motion.div
      className="bg-card rounded-xl border border-border card-shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="font-semibold text-foreground">Product</TableHead>
            <TableHead className="font-semibold text-foreground">Category</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Price</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Stock</TableHead>
            <TableHead className="font-semibold text-foreground text-right w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                style={{ display: 'contents' }}
              >
                <TableRow
                  className="group hover:bg-secondary/50 transition-colors"
                >
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1 max-w-[300px]">
                        {product.description || 'No description'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={cn(
                        'font-medium',
                        stockStatus === 'out' && 'text-destructive',
                        stockStatus === 'low' && 'text-amber-600',
                        stockStatus === 'in' && 'text-foreground'
                      )}>
                        {product.stock}
                      </span>
                      <div className={cn(
                        'h-2 w-2 rounded-full',
                        stockStatus === 'out' && 'bg-destructive',
                        stockStatus === 'low' && 'bg-amber-500',
                        stockStatus === 'in' && 'bg-emerald-500'
                      )} />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  </TableCell>
                </TableRow>
              </motion.div>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}
