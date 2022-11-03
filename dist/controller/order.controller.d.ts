import { Order } from "../model/order.schema";
import { orderService } from "../service/order.service";
import { Handler } from "src/utils/handler";
export declare class OrderController {
    private Handler;
    private orderService;
    constructor(Handler: Handler, orderService: orderService);
    addOrders(response: any, request: any, order: Order): Promise<any>;
    CancelOrders(response: any, order: Order): Promise<any>;
    findOrders(type: any, search: any): Promise<any>;
    getProduct(response: any, type: string, search: string): Promise<any>;
}
