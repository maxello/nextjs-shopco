"use client";

import { ChevronDown, LoaderCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const selectOptions = [
  {name: "Newest", value: "descending lastUpdated"},
  {name: "Oldest", value: "ascending lastUpdated"},
  {name: "Price (low to high)", value: "ascending price"},
  {name: "Price (high to low)", value: "descending price"},
]

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const sortType = searchParams.get('sortType');
  const sortBy = searchParams.get('sortBy');

  const initialSelectedValue = selectOptions.filter(option => option.value === `${sortType} ${sortBy}`)[0]
  console.log("initialSelectedValue", initialSelectedValue);
  const [selected, setSelected] = useState(initialSelectedValue || selectOptions[0]);

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortType", value.split(" ")[0]);
    params.set("sortBy", value.split(" ")[1]);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as HTMLDivElement)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const [isPending, startTransition] = useTransition();

  return (
    <div className={cn("relative select-none", isPending ? "cursor-auto" : "cursor-pointer")} ref={containerRef}>
      <div
        onClick={() => !isPending && setOpen(!open)}
        className="font-medium w-full flex gap-2 items-center justify-between rounded"
      >
        {selected.name}
        {isPending ? <LoaderCircle size={18} className="animate-spin" /> : <ChevronDown size={18} className={cn(open ? "rotate-180" : "", "transition-transform")} />}
      </div>
      <ul
        className={`duration-1000 bg-primary-foreground py-3 border border-border rounded-xl absolute z-10 w-full top-[100%] min-w-[140px] right-0 mt-2 overflow-y-auto ${
          open ? "block max-h-60" : "hidden max-h-0"
        } `}
      >
        {selectOptions?.map((option) => (
          <li
            key={option?.value}
            className={`p-3 text-sm hover:bg-primary hover:text-primary-foreground
            ${
              option.name.toLowerCase() === selected.name.toLowerCase() &&
              "bg-primary text-primary-foreground"
            }`}
            onClick={() => {
              if (option.name.toLowerCase() !== selected.name.toLowerCase()) {
                setSelected(option);
                setOpen(false);
                startTransition(() => {
                  handleFilterChange(option.value);
                });
              }
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;