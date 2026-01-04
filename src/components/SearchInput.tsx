import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "./ui/button";
import { useProductContext } from "@/Context/ProductContext";

function SearchInput() {
  const { setSearchQuery } = useProductContext();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  // update global search query after debounce
  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        type="text"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-9 pr-9 h-10 rounded-full bg-card border-border focus:ring-2 focus:ring-primary/30"
      />

      {/* Clear Button */}
      {inputValue && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-secondary"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

export default SearchInput;
