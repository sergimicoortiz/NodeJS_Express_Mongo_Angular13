export interface Product {
    slug: String
    name: String
    price: Number
    description: String
    owner: {
        username: String
        image: String
    }
    category: String
    picture: String[]
    date: String
    likes: Number
    haveLike: Boolean
}
