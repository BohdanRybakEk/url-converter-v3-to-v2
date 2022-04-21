import axios from "axios";
import { BrandsResult, Category, QueryParams } from "./brandsService.types";
import { BRANDS_QUERY } from "../constants/constants";

const getBrands = async (): Promise<BrandsResult> => {
  const params: QueryParams = {
    query: BRANDS_QUERY,
    operationName: "getCategorizedBrands",
  };

  const response = await axios.get("https://apiv2.klekt.com/shop-api/", {
    params,
  });

  const categories: Category[] = response.data.data.getCategorizedBrands.items;

  const brands = categories.reduce((acc: string[], category) => {
    acc.push(...category.brands.map((brand) => brand.code));
    return acc;
  }, []);

  const brandLines = categories.reduce((acc: string[], category) => {
    const brandLines = category.brands.reduce((brandsAcc: string[], brand) => {
      brandsAcc.push(...brand.brandLines.map((brandLine) => brandLine.code));
      return brandsAcc;
    }, []);
    acc.push(...brandLines);
    return acc;
  }, []);

  return { brands: [...new Set(brands)], brandLines: [...new Set(brandLines)] };
};

export default { getBrands };
