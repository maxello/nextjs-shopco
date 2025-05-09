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
  sortType?: SearchParamsSortTypeProps,
  min?: string,
  max?: string,
  name?: string,
  limit?: number
}

export type OptionsParams = SearchParams & { limit?: number }


export type FilterStateProps = {
  sizes: string[];
  colors: string[];
  min: number;
  max: number;
  name: string;
}
