import { Profile } from "./profile.model";

export interface Comment {
    id: String
    msg: String
    createdAt: String
    updatedAt: String
    owner: Profile
}