import { Model } from "mongoose";
import { Order, OrderDocument } from "../model/order.schema";
import { UserDocument } from "../model/user.schema";
export declare class orderService {
    private orderModel;
    private userModel;
    constructor(orderModel: Model<OrderDocument>, userModel: Model<UserDocument>);
    createOrder(order: Object): Promise<Order>;
    readOrders(id: any): Promise<any>;
    readOrdersCusto(type: any, search: any): Promise<any>;
    update(id: any, order: any): Promise<Order>;
}
