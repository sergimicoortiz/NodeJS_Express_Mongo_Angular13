import { Product } from "./product.model";

export interface Category {
    slug: String;
    category_name: String;
    category_picture: String;
    category_products: Product[]
}