const PORT: Number = 8080;
const BASE_URL: String = `http://localhost:${PORT}/api`;
const CATEGORY_BASE = `${BASE_URL}/category`;
const PROFILE_BASE = `${BASE_URL}/profile`;
const USER_BASE = `${BASE_URL}/user`;
const SETTINGS_BASE = `${BASE_URL}/settings`;
const CARUSEL_BASE = `${BASE_URL}/carousel`;
const COMMENT_BASE = `${BASE_URL}/comment`;
const PRODUCT_BASE = `${BASE_URL}/product`;
const PRODUCTS_BASE = `${BASE_URL}/products`;
const PRODUCTS_POPULAR = `${BASE_URL}/products_popular`;
const CARUSEL_CATEGORY = `${CARUSEL_BASE}/category`;

export const environment = {
  production: true,
  BASE_URL: BASE_URL,
  CATEGORY_BASE: CATEGORY_BASE,
  CARUSEL_CATEGORY: CARUSEL_CATEGORY,
  COMMENT_BASE: COMMENT_BASE,
  PRODUCT_BASE: PRODUCT_BASE,
  PRODUCTS_BASE: PRODUCTS_BASE,
  PRODUCTS_POPULAR: PRODUCTS_POPULAR,
  PROFILE_BASE: PROFILE_BASE,
  USER_BASE: USER_BASE,
  SETTINGS_BASE: SETTINGS_BASE
};