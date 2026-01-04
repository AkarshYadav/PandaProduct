import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProductContext } from '@/Context/ProductContext';
import { cn } from '@/lib/utils';

export function ViewToggle() {
  const { viewMode, setViewMode } = useProductContext();

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary rounded-lg ">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setViewMode('grid')}
        className={cn(
          'h-9 px-3 rounded-md transition-all cursor-pointer',
          viewMode === 'grid'
            ? 'bg-card shadow-sm text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setViewMode('list')}
        className={cn(
          'h-9 px-3 rounded-md transition-all cursor-pointer',
          viewMode === 'list'
            ? 'bg-card shadow-sm text-primary'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  );
}
