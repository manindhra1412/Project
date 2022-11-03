import { orderService } from "../service/order.service";
import { taskService } from "../service/task.service";
export declare class Handler {
    private orderService;
    private taskService;
    [x: string]: any;
    constructor(orderService: orderService, taskService: taskService);
    cancelProduct(requestBody: any): Promise<{
        transaction_id: any;
        orderList: any[];
        message: string;
        status?: undefined;
    } | {
        status: number;
        transaction_id: any;
        orderList: any[];
        message: string;
    }>;
    getUniqueID(): Promise<string>;
    addOrder(orderInfo: any, request: any): Promise<{
        transaction_id: string;
        totalPrice: number;
        itemsPrice: number;
        orderStatus: string;
        orderItemList: any[];
        orderItemNotOrder: any[];
    } | {
        transaction_id: any;
        itemsPrice: number;
        orderStatus: string;
        orderItemList: any[];
        orderItemNotOrder: any[];
        totalPrice?: undefined;
    }>;
    addProduct(requestBody: any): Promise<import("../model/task.schema").Task>;
    processRecords(records: any, request: any): Promise<{
        recordList: any[];
        errorList: any[];
    }>;
    success(response: any, responseData: any): Promise<any>;
    errorException(response: any, error: any): any;
    successResponse(responseData: any): Promise<{
        status: {
            code: number;
            header: string;
            description: string;
        };
        data: any;
    }>;
    erroresponse(code: any, responseData: any): Promise<{
        status: {
            code: any;
            header: string;
            description: any;
        };
        data: any;
    }>;
}
