export interface Product {
    slug: String
    name: String
    price: Number
    description: String
    owner: String
    category: String
    picture: String[]
    date: String
    likes: Number
    comments: [{
        owner: String
        msg: String
        date: String
        likes: Number
        _id: String
    }]
}
