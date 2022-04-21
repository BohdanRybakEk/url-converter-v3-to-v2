export interface QueryParams {
  query: string;
  operationName: string;
}

export interface Category {
  brands: Brand[];
}

interface Brand {
  code: string;
  brandLines: BrandLine[];
}

interface BrandLine {
  code: string;
}

export interface BrandsResult {
  brands: string[];
  brandLines: string[];
}
