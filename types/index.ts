export type FilterItemProps = {
  description: string;
  value: string;
}

export type FilterProps = {
  price: {
    min: number;
    max: number;
  },
  colors: FilterItemProps[],
  sizes: FilterItemProps[]
}

export type SearchParamsSortTypeProps = "ascending" | "descending";
export type SearchParamsSortByProps = "price" | "lastUpdated";

export type SearchParams = {
  page?: string;
  colors?: string,
  sizes?: string,
  sortBy?: SearchParamsSortByProps
  sortType?: SearchParamsSortTypeProps
}
