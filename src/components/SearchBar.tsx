"use client";

import { useEffect, useRef } from "react";

const selectClass =
  "rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-black/40 dark:border-white/15 dark:focus:border-white/40";

export default function SearchBar({
  query,
  category,
  sort,
  categories,
}: {
  query: string;
  category: string;
  sort: string;
  categories: string[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search: submit the form ~400ms after the user stops typing.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    let timer: ReturnType<typeof setTimeout>;
    const onInput = () => {
      clearTimeout(timer);
      timer = setTimeout(() => formRef.current?.requestSubmit(), 400);
    };

    input.addEventListener("input", onInput);
    return () => {
      clearTimeout(timer);
      input.removeEventListener("input", onInput);
    };
  }, []);

  return (
    <form
      ref={formRef}
      action="/"
      method="get"
      className="flex flex-wrap items-center gap-2"
    >
      <input
        ref={inputRef}
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Search products, tags, categories…"
        aria-label="Search products"
        className="min-w-56 flex-1 rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-black/40 focus:border-black/40 dark:border-white/15 dark:placeholder:text-white/40 dark:focus:border-white/40"
      />

      <select
        name="category"
        defaultValue={category || "All"}
        aria-label="Filter by category"
        className={selectClass}
        onChange={() => formRef.current?.requestSubmit()}
      >
        <option value="All">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="sort"
        defaultValue={sort}
        aria-label="Sort products"
        className={selectClass}
        onChange={() => formRef.current?.requestSubmit()}
      >
        <option value="">Default order</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="rating">Top rated</option>
      </select>

      <button
        type="submit"
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
