"use client";
import Input from './ui/Input';
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useRef, useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchQuery) {
      router.push(`/collections/all-products?name=${searchQuery}`)
    }
  };

  const searchForm = useRef<HTMLFormElement | null>(null);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if(searchQuery) {
        searchForm.current?.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }
  }

  return (
    <form ref={searchForm}
      className="hidden flex-grow lg:flex"
      onSubmit={handleSearch}
    >
      <label htmlFor="search-input" className="w-full bg-input rounded-full flex space-x-3 py-3 px-4">
        <Search strokeWidth={2.25} className="text-muted-foreground" />
        <Input type="text" id="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => handleEnter(e)} placeholder="Search for products..." />
      </label>
    </form>
  );
};

export default SearchBar;