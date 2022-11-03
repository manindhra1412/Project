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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_schema_1 = require("../model/order.schema");
const order_service_1 = require("../service/order.service");
const handler_1 = require("../utils/handler");
const parameter_validator_1 = require("parameter-validator");
let OrderController = class OrderController {
    constructor(Handler, orderService) {
        this.Handler = Handler;
        this.orderService = orderService;
    }
    async addOrders(response, request, order) {
        try {
            let param = await (0, parameter_validator_1.validateAsync)(order, ['orderItem', 'shippinginfo']);
            let orderDetails = await this.Handler.addOrder(order, request);
            if (orderDetails && orderDetails.transaction_id === null) {
                return this.Handler.errorException(response, orderDetails);
            }
            let result = this.Handler.success(response, orderDetails);
            return result;
        }
        catch (error) {
            return this.Handler.errorException(response, error);
        }
    }
    async CancelOrders(response, order) {
        try {
            let productCancel = await this.Handler.cancelProduct(order);
            if (productCancel && productCancel.status == 1999) {
                return this.Handler.errorException(response, productCancel);
            }
            let result = this.Handler.success(response, productCancel);
            return result;
        }
        catch (error) {
            return this.Handler.errorException(response, error);
        }
    }
    async findOrders(type, search) {
        try {
            const queryResult = await this.orderService.readOrdersCusto(type, search);
            return queryResult;
        }
        catch (error) {
            return {
                status: 1999,
                message: 'Failed to read order'
            };
        }
    }
    async getProduct(response, type, search) {
        try {
            let queryResultData = await this.findOrders(type, search);
            if (queryResultData && queryResultData.status == 1999) {
                return this.Handler.errorException(response, queryResultData);
            }
            let result = this.Handler.success(response, queryResultData);
            return result;
        }
        catch (error) {
            return this.Handler.errorException(response, error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/addOrder'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, order_schema_1.Order]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "addOrders", null);
__decorate([
    (0, common_1.Post)('/cancelOrder'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_schema_1.Order]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "CancelOrders", null);
__decorate([
    (0, common_1.Get)('/product/:type'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getProduct", null);
OrderController = __decorate([
    (0, common_1.Controller)('/api/v1/order'),
    __metadata("design:paramtypes", [handler_1.Handler,
        order_service_1.orderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map