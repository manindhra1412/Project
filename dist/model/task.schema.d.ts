import * as mongoose from "mongoose";
import { User } from "./user.schema";
export declare type TaskDocument = Task & Document;
export declare class Task {
    title: string;
    description: string;
    productId: string;
    type: string;
    quantity: number;
    price: number;
    coverImage: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: string;
    uploadDate: Date;
    createdBy: User;
}
export declare const TaskSchema: mongoose.Schema<mongoose.Document<Task, any, any>, mongoose.Model<mongoose.Document<Task, any, any>, any, any, any, any>, {}, {}, any, {}, "type", mongoose.Document<Task, any, any>>;
