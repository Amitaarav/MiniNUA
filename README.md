# MiniNUA — Mini E-commerce SPA (React + Fake Store API)

## Overview
MiniNUA is a front-end focused, single-page e-commerce application built with React + TypeScript. It consumes the public Fake Store API for products, supports product discovery with search and category filtering, a complete cart and checkout flow, and persistent caching for fast revisits.

## Features
- Product Listing (/) with responsive grid
  - Search by title and filter by category
  - Loading states and error handling
- Product Detail (/product/:id)
  - Image, title, description, price, rating
  - Add to Cart with quantity selector (1–5)
- Shopping Cart (/cart)
  - List items with thumbnail, title, unit price, qty selector (1–10)
  - Remove items, update quantity, and view subtotals
  - Grand total and Proceed to Checkout
- Checkout (/checkout)
  - Order summary
  - Validated form: name, email, address
  - Place Order clears cart and shows confirmation
- Data Caching and Persistence
  - Product list and details cached in localStorage
  - Cart state persisted in localStorage
- Global State
  - Redux Toolkit slices for listing, detail, cart, and checkout
- Responsive, accessible UI
  - Keyboard-accessible sidebar
  - Semantic roles/labels on form and search

## Tech Stack
- React 19 + Vite 7 + TypeScript 5
- React Router DOM 7
- Redux Toolkit + React Redux
- Tailwind CSS 4
- Lucide Icons
- Embla Carousel

## API
Using Fake Store API:
- GET `https://fakestoreapi.com/products`
- GET `https://fakestoreapi.com/products/:id`
- GET `https://fakestoreapi.com/products/categories`

No server or API key required.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Routes
- `/` — Home (hero carousel) + Product Listing
- `/search` — Listing with `?category=...&q=...`
- `/product/:id` — Product Detail
- `/cart` — Shopping Cart
- `/checkout` — Checkout

## Project Structure (key paths)
```
src/
  App.tsx                     # Router and page layout
  components/
    shared/
      header/
        index.tsx            # Header + menu, search, sidebar trigger
        Search.tsx           # Search with dynamic categories
        SideBar.tsx          # Slide-in sidebar with categories
      home/
        Home.tsx             # Carousel + section title
        HomeCarousel.tsx     # Embla carousel
    ui/                      # UI primitives
  pages/
    ProductListPage.tsx      # Listing + filters, loading/error
    ProductDetailPage.tsx    # Product detail + add to cart
    CartPage.tsx             # Cart operations and totals
    CheckoutPage.tsx         # Form validation + confirmation
  features/                  # Redux slices
    productListingSlice.ts   # Products, categories, filters
    productDetailsSlice.ts   # Product detail (+ caching)
    shoppingCartSlice.ts     # Cart + localStorage persistence
    checkOutSlice.ts         # Checkout submit state
  store/
    store.ts                 # Configure store
    rootReducer.ts           # Combine slices
    hooks.ts                 # Typed hooks
  types/                     # App types aligned with Fake Store API
```

## State Management
- `productListingSlice`
  - `fetchProducts` loads all products (cached under `cache.products`)
  - `fetchCategories` loads categories (cached under `cache.categories`)
  - `setFilter` and `clearFilter` maintain `{ title, category }`
- `productDetailsSlice`
  - `fetchProductDetail(id)` loads a product (cached under `cache.product.{id}`)
- `shoppingCartSlice`
  - `addItem`, `removeItem`, `updateQuantity`, `clearCart`
  - Cart persisted in localStorage under `cart.state`
- `checkOutSlice`
  - `submitOrder`, `submitOrderSuccess`, `submitOrderFailure`, `resetCheckout`

## Caching & Persistence
- localStorage keys:
  - `cache.products`: Product list
  - `cache.categories`: Categories
  - `cache.product.{id}`: Product detail by id
  - `cart.state`: Cart items and grand total
- Cache is read on revisit to avoid redundant fetches.

## UI/UX Notes
- Sidebar (All) opens from the left and is keyboard dismissible (Escape or overlay click). Focus moves to the close button on open for accessibility.
- Search bar uses dynamic categories and submits via client-side navigation without reload.
- Quantity limits:
  - Add to Cart: 1–5
  - Cart quantity: 1–10

## Environment
No environment variables are required. The app uses the public Fake Store API directly.

## Known Limitations and Next Steps
- No server checkout: order submission is simulated.
- No pagination/infinite scroll on product listing.
- No user auth; cart is device-local.
- Possible enhancements:
  - Debounced search and typeahead suggestions
  - Pagination and sorting
  - Toasts/notifications for cart actions
  - Skeleton loaders

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Type-check and build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

Built with care for clarity, accessibility, and performance. 🚀
