"use client";

import Button from './ui/Button';
import Accordion from './Accordion';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import React, { useCallback, useEffect, useState, useTransition } from 'react'
import { FilterItemProps, FilterProps, FilterStateProps } from '@/types';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MultiRangeSlider from "multi-range-slider-react";
import { cn, splitPlus } from '@/lib/utils';
import ResetFilters from './ResetFilters';

const initialState = {
  sizes: [],
  colors: [],
  min: 0,
  max: 0
}

const ProductsFilterForm = ({filterOptions, name}: {filterOptions: FilterProps, name: string}) => {
  const searchParams = useSearchParams();
  const [filterState, setFilterState] = useState<FilterStateProps>(initialState);
  const handleInput = (e: {
    minValue: number,
    maxValue: number
  }) => {
    setFilterState((prev) => {
      return {
        ...prev,
        min: e.minValue,
        max: e.maxValue
      }
    });
  };

  const [isFilterStateDirty, setIsFilterStateDirty] = useState(false);

  useEffect(() => {
    const sizes = splitPlus(searchParams.get("sizes")?.trim(), ",") || [];
    const colors = splitPlus(searchParams.get("colors")?.trim(), ",") || [];
    const minPrice = searchParams.get("min");
    const maxPrice = searchParams.get("max");
    const min = typeof minPrice === "string" && minPrice.length > 0 ? +(minPrice.trim()) : filterOptions.price.min;
    const max = typeof maxPrice === "string" && maxPrice.length > 0 ? +(maxPrice.trim()) : filterOptions.price.max;

    const isDirty = sizes.length > 0 
    || colors.length > 0
    || !!(min && min !== filterOptions?.price.min)
    || !!(max && max !== filterOptions?.price.max);
    setIsFilterStateDirty(isDirty);

    setFilterState((prev) => {
      return {
        ...prev,
        sizes,
        colors,
        min: min,
        max: max
      }
    });
  }, [searchParams, filterOptions]);

  const pathname = usePathname();
  const { replace } = useRouter();

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

  const [isFiltersOpened, setIsFiltersOpened] = useState(false);

  const onApplyFilter = () => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(filterState)) {
      if (Array.isArray(value)) {
        params.set(key, value.join());
      } else {
        params.set(key, value.toString());
      }
      params.set("page", "1");
    }
    if (isFiltersOpened) {
      setIsFiltersOpened(false);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleResetFilters = () => {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(filterState)) {
      if (Array.isArray(value)) {
        params.set(key, '');
      } else {
        params.set(key, '');
      }
      params.set("page", "1");
    }
    if (isFiltersOpened) {
      setIsFiltersOpened(false);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (typeof document === undefined) return;
    if (isFiltersOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isFiltersOpened]);

  const handleResize = useCallback(() => {
    if (isFiltersOpened) {
      setIsFiltersOpened(false);
    }
  }, [isFiltersOpened]);

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize]);

  return (
    <>
    <div className="flex items-center justify-between md:hidden mb-3">
      <h1 className="text-2xl xl:text-[2rem] font-bold text-primary">{name}</h1>
      <div className="flex items-center gap-2">
        {isFilterStateDirty ? <ResetFilters onResetFilters={handleResetFilters} /> : null}
        <Button onClick={() => setIsFiltersOpened(true)} className="h-8 w-8 p-0" variant={"secondary"}>
          <SlidersHorizontal className="rotate-[90deg]" />
        </Button>
      </div>
    </div>
    <div 
      className={cn(isFiltersOpened ? "visible opacity-100" : "invisible opacity-0", "md:visible md:opacity-100 transition-opacity z-100 w-full left-0 right-0 top-0 bottom-0 fixed md:sticky md:top-[125px] lg:top-[140px] md:left-auto md:right-auto md:z-10 md:bottom-auto bg-primary/20 md:bg-transparent h-screen md:h-auto")} 
      onClick={() => setIsFiltersOpened(false)} 
    >
    <div 
      className={cn(isFiltersOpened ? "translate-y-0" : "translate-y-full", "md:translate-y-0 flex flex-col transition-all duration-300 border border-border rounded-2xl py-5 bg-background bottom-0 w-full z-[101] absolute md:static max-h-[80%]")} 
      onClick={(e) => {e.stopPropagation()}}
    >
      <div className="flex items-center justify-between px-5 relative after:left-0 after:right-0 after:h-[1px] after:mx-5 after:bg-border after:absolute after:bottom-0 pb-4">
        <h3 className="text-xl text-primary font-bold">Filters</h3>
        <div className="flex items-center gap-2">
        {isFilterStateDirty ? <div className="hidden md:block"><ResetFilters onResetFilters={handleResetFilters} /></div> : null}
          <SlidersHorizontal className="rotate-[90deg] hidden md:block" />
          <button onClick={() => setIsFiltersOpened(false)} className="md:hidden">
            <X className="rotate-[90deg] text-primary/40" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto px-5 flex flex-col gap-8 py-4">
      {filterOptions?.price && (
        <Accordion label={"Price"} isOpened={true}>
          <MultiRangeSlider
            min={filterOptions.price.min}
            max={filterOptions.price.max}
            step={5}
            minValue={filterState.min || filterOptions.price.min}
            maxValue={filterState.max || filterOptions.price.max}
            onChange={(e) => {
              handleInput(e);
            }}
            thumbLeftColor={'#000000'}
            thumbRightColor={'#000000'}
            barInnerColor={'#000000'}
            barLeftColor={'#F0F0F0'}
            barRightColor={'#F0F0F0'}
            style={{border: 0, boxShadow: "none", padding: '15px 10px'}}
            label={false}
            className="max-w-[95%] mx-auto block"
            ruler={false}
          />
        </Accordion>
      )}
      {filterOptions?.colors && (
        <Accordion label={"Colors"} isOpened={true}>
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
                <Check style={{filter: "drop-shadow(0 2px 0 rgba(0, 0, 0, .2))"}} size={18} className="hidden peer-checked:block text-white" />
              </label>
            ))}
          </div>
        </Accordion>
      )}
      {filterOptions?.colors && (
        <Accordion label={"Sizes"} isOpened={true}>
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
      </div>
      <div className="px-5">
        <Button disabled={isPending} className="text-sm" onClick={() => {
          startTransition(() => {
            onApplyFilter();
          });
        }}>Apply Filter</Button>
      </div>
    </div>
    </div>
    </>
  )
}

export default ProductsFilterForm;