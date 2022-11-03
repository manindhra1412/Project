import * as mongoose from "mongoose";
import { User } from "./user.schema";
import { Task } from "./task.schema";
import { Document } from 'mongoose';
export declare type OrderDocument = Order & Document;
declare class shippingInfo extends Document {
    address: string;
    city: string;
    phoneNo: string;
    postalCode: string;
    country: string;
}
export declare const shippingInfochema: mongoose.Schema<shippingInfo, mongoose.Model<shippingInfo, any, any, any, any>, {}, {}, any, {}, "type", shippingInfo>;
declare class orderItems extends Document {
    name: string;
    title: string;
    quantity: string;
    price: string;
    product: Task;
}
export declare const orderItemsSchema: mongoose.Schema<orderItems, mongoose.Model<orderItems, any, any, any, any>, {}, {}, any, {}, "type", orderItems>;
export declare class Order {
    orderItem: Array<orderItems>;
    shippinginfo: shippingInfo;
    paidAt: Date;
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: string;
    deliveredAt: Date;
    uploadDate: Date;
    transaction_id: string;
    createdBy: User;
}
export declare const OrderSchema: mongoose.Schema<mongoose.Document<Order, any, any>, mongoose.Model<mongoose.Document<Order, any, any>, any, any, any, any>, {}, {}, any, {}, "type", mongoose.Document<Order, any, any>>;
export {};
