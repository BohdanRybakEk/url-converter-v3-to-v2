import url from "url";

import brandsService from "../services/brandsService";

const convertUrl = async (inputUrl: string) => {
  const { query: v3QueryParams, pathname: v3Path } = url.parse(inputUrl, true);

  let pathParams = v3Path?.split("/").filter((value) => value);

  const category = pathParams?.[0];

  if (category) {
    const { brands: apiBrands, brandLines: apiBrandLines } =
      await brandsService.getBrands();

    pathParams = pathParams?.filter((value) => value !== category);

    const brands = pathParams?.filter((pathParam) =>
      apiBrands.includes(pathParam)
    );

    const brandLines = pathParams?.filter(
      (pathParam) =>
        apiBrandLines.includes(pathParam) && !apiBrands.includes(pathParam)
    );

    const result: {
      categories: string;
      brands?: string;
      brandLines?: string;
      sizeType?: string;
      availability?: string;
      sortBy?: string;
      price?: string;
      sizes?: string;
      searchTags?: string;
      search?: string;
    } = {
      categories: category,
    };

    if (brands && brands.length) {
      result.brands = brands?.join();
    }

    if (brandLines && brandLines.length) {
      result.brandLines = brandLines?.join();
    }

    if (v3QueryParams?.sizeType) {
      result.sizeType = v3QueryParams.sizeType.toString();
    }

    if (v3QueryParams?.availability) {
      result.availability = v3QueryParams.availability.toString();
    }

    if (v3QueryParams?.sortBy) {
      result.sortBy = v3QueryParams.sortBy.toString();
    }

    if (v3QueryParams?.price) {
      result.price = v3QueryParams.price.toString();
    }

    if (v3QueryParams?.searchTags) {
      result.searchTags = v3QueryParams.searchTags.toString();
    }

    if (v3QueryParams?.sizes) {
      result.sizes = v3QueryParams.sizes.toString();
    }

    if (v3QueryParams?.search) {
      result.search = v3QueryParams.search.toString();
    }

    return {
      result,
      convertedUrl: decodeURIComponent(
        "/list?" + new URLSearchParams(result).toString()
      ),
    };
  } else {
    throw Error("Incorrect URL");
  }
};

export default { convertUrl };
