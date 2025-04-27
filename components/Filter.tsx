"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const sortType = searchParams.get('sortType') || "descending";
  const sortBy = searchParams.get('sortBy') || "lastUpdated";

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (name === "sort") {
      params.set("sortType", value.split(" ")[0]);
      params.set("sortBy", value.split(" ")[1]);
    } else {
      params.set(name, value);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      name="sort"
      defaultValue={`${sortType} ${sortBy}`}
      className="py-2 px-4 rounded-2xl text-base font-medium focus:outline-none"
      onChange={handleFilterChange}
    >
      <option value="descending lastUpdated">Newest</option>
      <option value="ascending lastUpdated">Oldest</option>
      <option value="ascending price">Price (low to high)</option>
      <option value="descending price">Price (high to low)</option>
    </select>
  );
};

export default Filter;