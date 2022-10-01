import { Product } from "./product.model";

export interface PaginateProduct {
    docs: Product[]
    totalDocs: Number
    offset: Number
    limit: Number
    totalPages: Number
    page: Number
    //pagingCounter: Number
    //hasPrevPage: Boolean
    //hasNextPage: Boolean
    // prevPage: Number
    // nextPage: Number
}