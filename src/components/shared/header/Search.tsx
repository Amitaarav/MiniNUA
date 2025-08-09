import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { APP_NAME } from "@/lib/constant";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories } from "@/features/productListingSlice";

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((s) => s.productListing);
  const [searchParams] = useSearchParams();

  const [q, setQ] = useState<string>(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<string>(searchParams.get("category") ?? "all");

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = category && category !== "all" ? category : "all";
    navigate(`/search?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-xl items-stretch h-10 text-2xl text-gray-100"
      role="search"
      aria-label={`${APP_NAME} search`}
    >
      {/* Category Dropdown */}
      <Select value={category} onValueChange={(val) => setCategory(val)}>
        <SelectTrigger
          className="h-full bg-gray-100 text-black focus:ring-2 focus:ring-primary"
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
      <Input
        type="search"
        placeholder={`Search ${APP_NAME} products...`}
        className="flex-1 bg-gray-100 text-black text-base h-full border-none rounded-none focus-visible:ring-2 focus-visible:ring-primary"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search products"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-yellow-400 cursor-pointer text-primary-foreground h-full px-3 py-2 rounded-r hover:bg-yellow-600 focus:ring-2 focus:ring-primary focus:outline-none"
        aria-label="Submit search"
      >
        <SearchIcon className="h-5 w-5 text-black" />
      </button>
    </form>
  );
};
