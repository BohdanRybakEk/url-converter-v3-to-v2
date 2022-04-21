const EMPTY_SPACES_REGEX = /\s{2,}/g;

export const BRANDS_QUERY = `
        query getCategorizedBrands {
          getCategorizedBrands {
            items {
              id
              brands {
                code
                brandLines {
                  code
                }
              }
            }
          }
        }
        `.replace(EMPTY_SPACES_REGEX, " ");
