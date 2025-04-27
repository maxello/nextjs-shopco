"use client";

import Button from './ui/Button';
import Accordion from './Accordion';
import { Check, SlidersHorizontal } from 'lucide-react';
import React, { useState, useTransition } from 'react'
import { FilterItemProps, FilterProps } from '@/types';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FiltersForm = ({filterOptions}: {filterOptions?: FilterProps}) => {
  const searchParams = useSearchParams();
  const sizes = searchParams.get("sizes")?.split(",");
  const colors = searchParams.get("colors")?.split(",");
  // const minPrice = searchParams.get("min");
  // const maxPrice = searchParams.get("max");
 
  const [filterState, setFilterState] = useState({
    sizes: sizes || [],
    colors: colors || [],
    // minPrice: minPrice ? +minPrice : null,
    // maxPrice: maxPrice ? +maxPrice : null
    // price: {
    //   min: minPrice ? +minPrice : null,
    //   max: maxPrice ? +maxPrice : null,
    // }
  });
  
  const pathname = usePathname();
  const { replace } = useRouter();

  
  // const handleFilterApply = (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => {
  //   const { name, value } = e.target;
  //   const params = new URLSearchParams(searchParams);
  //   params.set(name, value);
  //   replace(`${pathname}?${params.toString()}`);
  // };

  const handleCheckboxChange = (data: FilterItemProps, name: "sizes" | "colors") => {
    const isChecked = filterState[name].some(checkedCheckbox => checkedCheckbox === data.description);
    
    if (isChecked) {
      setFilterState((prev) => {
          return {
            ...prev,
            [name]: filterState[name].filter(
              (checkedCheckbox) => checkedCheckbox !== data.description
            )
          }
      });
    } else {
      setFilterState((prev) => {
        return {
          ...prev,
          [name]: filterState[name].concat(data.description)
        }
    });
    }
  };

  const onApplyFilter = () => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(filterState)) {
      if (!value) return;
      params.set(key, value.join());
      params.set("page", "1");
    }
    
    replace(`${pathname}?${params.toString()}`);
  }

  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col gap-8 border border-border rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl text-primary font-bold">Filters</h3>
        <SlidersHorizontal className="rotate-[90deg]" />
      </div>
      {filterOptions?.price && (
        <Accordion label={"Price"}>
          <input type="range" min={filterOptions.price.min} max={filterOptions.price.max} />
        </Accordion>
      )}
      {filterOptions?.colors && (
        <Accordion label={"Colors"}>
          <div className="flex flex-wrap gap-3">
            {filterOptions.colors.map((item, index) => (
              <label key={item.description} style={{background: item.value}} className="cursor-pointer border border-border w-9.5 h-9.5 rounded-full relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  id={`color-${index}`} 
                  checked={filterState['colors'].some(checkedCheckbox => checkedCheckbox === item.description)}
                  onChange={() => handleCheckboxChange(item, "colors")}
                  className="hidden peer"
                  name={item.description}
                />
                <Check style={{filter: "drop-shadow(0 2px 0 rgba(0, 0, 0, .2))"}} size={18} className="text-primary hidden peer-checked:block text-white" />
              </label>
            ))}
          </div>
        </Accordion>
      )}
      {filterOptions?.colors && (
        <Accordion label={"Sizes"}>
          <div className="flex flex-wrap gap-2">
            {filterOptions.sizes.map((item, index) => (
              <div key={item.description}>
                <input 
                  type="checkbox" 
                  id={`size-${index}`} 
                  checked={filterState['sizes'].some(checkedCheckbox => checkedCheckbox === item.description)}
                  onChange={() => handleCheckboxChange(item, "sizes")}
                  name={item.description} 
                  className="hidden peer" 
                />
                <label 
                  htmlFor={`size-${index}`} 
                  className="flex h-9.5 rounded-full items-center border border-secondary px-5 justify-between cursor-pointer w-full bg-secondary peer-checked:bg-primary peer-checked:border-primary text-sm peer-checked:text-white"
                >
                  {item.description}
                </label>
              </div>
            ))}
          </div>
        </Accordion>
      )}
      <Button size={"sm"} disabled={isPending} className="text-sm" onClick={() => {
        startTransition(() => {
          onApplyFilter();
        });
      }}>Apply Filter</Button>
    </div>
  )
}

export default FiltersForm;