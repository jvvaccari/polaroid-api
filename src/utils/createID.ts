import { ObjectId } from "bson";

export const createID = (): string => {
    return new ObjectId().toString();
}