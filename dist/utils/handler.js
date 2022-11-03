"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../service/order.service");
const task_service_1 = require("../service/task.service");
let Handler = class Handler {
    constructor(orderService, taskService) {
        this.orderService = orderService;
        this.taskService = taskService;
    }
    async cancelProduct(requestBody) {
        let orderList = [];
        try {
            const getOrder = await this.orderService.readOrders(requestBody);
            if (getOrder) {
                for (const item of getOrder.orderItem) {
                    let getProduct = await this.taskService.readProduct({ id: item.product });
                    if (getProduct) {
                        orderList.push(item);
                        let newQty = parseInt(getProduct.quantity) + parseInt(item.quantity);
                        let updateProuct = await this.taskService.update(item.product, { quantity: newQty });
                    }
                }
                const updateOrder = await this.orderService.update(getOrder._id, { orderStatus: "CANCEL" });
                return {
                    transaction_id: getOrder.transaction_id,
                    orderList,
                    message: 'You will get refund next 3 working days'
                };
            }
            else {
                return {
                    status: 1999,
                    transaction_id: getOrder.transaction_id,
                    orderList,
                    message: 'Failed to cancel order'
                };
            }
        }
        catch (error) {
            return {
                status: 1999,
                transaction_id: requestBody.transaction_id,
                orderList,
                message: 'Failed to cancel order'
            };
        }
    }
    async getUniqueID() {
        let id = "";
        for (var i = 0; i < 5; i++)
            id = Date.now() + ((Math.random() * 100000).toFixed());
        return id;
    }
    async addOrder(orderInfo, request) {
        let orderList = [];
        let orderErrorList = [];
        try {
            let totalPrice = 0;
            for (const item of orderInfo.orderItem) {
                let getProduct = await this.taskService.readProduct({ title: item.name, quantity: { $gte: item.quantity } });
                if (getProduct) {
                    let obj = new Object();
                    let productCost = getProduct.price * item.quantity;
                    totalPrice = totalPrice + productCost;
                    let productsize = getProduct.quantity - item.quantity;
                    obj = {
                        name: getProduct.title,
                        title: getProduct.title,
                        price: productCost,
                        product: getProduct.id,
                        quantity: item.quantity
                    };
                    orderList.push(obj);
                    let updateProuct = await this.taskService.update(getProduct.id, { quantity: productsize });
                }
                else {
                    orderErrorList.push(item);
                }
            }
            if (orderList.length > 0) {
                let tot_price = totalPrice + (totalPrice * 0.18);
                let uid = await this.getUniqueID();
                let reqObj = {
                    orderItem: orderList,
                    shippinginfo: orderInfo.shippinginfo,
                    taxPrice: tot_price,
                    itemsPrice: totalPrice,
                    orderStatus: "CONFIRM",
                    paidAt: Date.now(),
                    transaction_id: uid,
                    createdBy: request.user._id
                };
                const newOrder = await this.orderService.createOrder(reqObj);
                return {
                    transaction_id: newOrder.transaction_id,
                    totalPrice: newOrder.taxPrice,
                    itemsPrice: newOrder.itemsPrice,
                    orderStatus: newOrder.orderStatus,
                    orderItemList: orderList,
                    orderItemNotOrder: orderErrorList
                };
            }
            else {
                return {
                    transaction_id: null,
                    itemsPrice: 0,
                    orderStatus: "PENDING",
                    orderItemList: [],
                    orderItemNotOrder: orderErrorList
                };
            }
        }
        catch (error) {
            return {
                transaction_id: null,
                itemsPrice: 0,
                orderStatus: "PENDING",
                orderItemList: [],
                orderItemNotOrder: []
            };
        }
    }
    async addProduct(requestBody) {
        try {
            const newTask = await this.taskService.createTask(requestBody);
            return newTask;
        }
        catch (error) {
            return null;
        }
    }
    async processRecords(records, request) {
        try {
            let requestBody;
            let recordList = [];
            let errorList = [];
            for (let i = 1; i < records.length - 1; i++) {
                let product = records[i].split(",");
                let [title, price, quantity, name] = product;
                requestBody = { createdBy: request.user._id, title, price, quantity, name };
                let insert = false;
                for (const item in requestBody) {
                    if (requestBody[item] == "") {
                        insert = true;
                    }
                }
                if (insert) {
                    errorList.push(requestBody);
                }
                else {
                    let resultData = await this.addProduct(requestBody);
                    recordList.push(resultData);
                }
            }
            return {
                recordList,
                errorList
            };
        }
        catch (error) {
            return null;
        }
    }
    async success(response, responseData) {
        return response.status(common_1.HttpStatus.CREATED).json({
            status: {
                code: 1000,
                header: "success",
                description: "sucess"
            },
            data: responseData
        });
    }
    errorException(response, error) {
        let message = 'something went wrong please try again later';
        if (error && error.code == 11000) {
            message = "Duplicate value";
        }
        if (typeof error === "string") {
            message = error;
        }
        console.log(error);
        return response.status(400).json({
            status: {
                code: (error && error.code) || 1999,
                header: "Invalid request",
                description: message
            },
            data: null
        });
    }
    async successResponse(responseData) {
        return {
            status: {
                code: 1000,
                header: "success",
                description: "sucess"
            },
            data: responseData
        };
    }
    async erroresponse(code, responseData) {
        return {
            status: {
                code: code || 1999,
                header: "Invalid request",
                description: responseData
            },
            data: null
        };
    }
};
Handler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [order_service_1.orderService,
        task_service_1.taskService])
], Handler);
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map