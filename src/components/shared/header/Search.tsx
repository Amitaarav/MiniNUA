import { SearchIcon, X as XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_NAME } from "@/lib/constant";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories, fetchProducts } from "@/features/productListingSlice";
import type { Product } from "@/types";

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((s) => s.productListing);
  const products = useAppSelector((s) => s.productListing.products as Product[]);
  const [searchParams] = useSearchParams();

  const [q, setQ] = useState<string>(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>(searchParams.get("category") ?? "all");
  const [openSuggest, setOpenSuggest] = useState(false);
  const blurTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, categories.length, products.length]);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) return;
    const handle = window.setTimeout(() => {
      const cat = category && category !== "all" ? category : "all";
      navigate(`/search?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}`, { replace: true });
    }, 300);
    return () => window.clearTimeout(handle);
  }, [q, category, location.pathname, navigate]);

  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as Product[];
    return (products as Product[])
      .filter((p) => p.title.toLowerCase().includes(query))
      .slice(0, 6);
  }, [q, products]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = category && category !== "all" ? category : "all";
    navigate(`/search?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}`);
  };

  const onClear = () => {
    setQ("");
    if (location.pathname.startsWith("/search")) {
      navigate(`/search?category=${encodeURIComponent(category || "all")}&q=`, { replace: true });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full max-w-xl gap-1 h-10 text-gray-100 items-center"
      role="search"
      aria-label={`${APP_NAME} search`}
    >
      {/* Category Dropdown */}
      <Select value={category} onValueChange={(val) => setCategory(val)}>
        <SelectTrigger
          className="h-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-l-md border border-gray-300 dark:border-gray-700 border-r-0 focus:ring-2 focus:ring-primary"
          aria-label="Select category"
          disabled={loading}
        >
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem key="all" value="all" className="capitalize">
            All
          </SelectItem>
          {categories.map((c) => (
            <SelectItem key={c} value={c} className="capitalize">
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder={`Search ${APP_NAME} products...`}
          className="h-10 w-full bg-gray-100 dark:bg-gray-900 text-black dark:text-white text-base border border-gray-300 dark:border-gray-700 border-l-0 border-r-0 rounded-none focus-visible:ring-2 focus-visible:ring-primary pr-8"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search products"
          onFocus={() => setOpenSuggest(true)}
          onBlur={() => {
            blurTimeout.current = window.setTimeout(() => setOpenSuggest(false), 120);
          }}
        />
        {q && (
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={onClear}
            aria-label="Clear search"
          >
            <XIcon className="w-4 h-4 text-black dark:text-white" />
          </button>
        )}

        {/* Suggestions */}
        {openSuggest && suggestions.length > 0 && (
          <ul
            className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded shadow"
            role="listbox"
            aria-label="Search suggestions"
            onMouseDown={(e) => e.preventDefault()}
          >
            {suggestions.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setQ(p.title);
                    setOpenSuggest(false);
                    window.clearTimeout(blurTimeout.current);
                    const cat = category && category !== "all" ? category : "all";
                    navigate(`/search?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(p.title)}`);
                  }}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="h-10 bg-yellow-400 cursor-pointer text-black px-3 rounded-r-md border border-gray-300 dark:border-gray-700 border-l-0 hover:bg-yellow-500 focus:ring-2 focus:ring-primary focus:outline-none"
        aria-label="Submit search"
      >
        <SearchIcon className="h-5 w-5 text-black" />
      </button>
    </form>
  );
};
