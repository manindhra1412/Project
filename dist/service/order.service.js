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
exports.orderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("../model/order.schema");
const user_schema_1 = require("../model/user.schema");
let orderService = class orderService {
    constructor(orderModel, userModel) {
        this.orderModel = orderModel;
        this.userModel = userModel;
    }
    async createOrder(order) {
        const newOrder = new this.orderModel(order);
        let responseData = await newOrder.save();
        return responseData;
    }
    async readOrders(id) {
        if (id.id) {
            return this.orderModel.findOne({ _id: id.id }).populate("createdBy").exec();
        }
        return this.orderModel.findOne(id).populate("createdBy").exec();
    }
    async readOrdersCusto(type, search) {
        let pipeline = [];
        if (type == 'date') {
            pipeline = [
                {
                    '$group': {
                        '_id': {
                            '$dateToString': {
                                'format': '%Y-%m-%d',
                                'date': '$uploadDate'
                            }
                        },
                        'product_count': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$project': {
                        '_id': false,
                        'date': '$_id',
                        'product_count': 1
                    }
                }
            ];
            return this.orderModel.aggregate(pipeline);
        }
        else if (type == 'product') {
            pipeline = [
                {
                    '$group': {
                        '_id': '$orderItem',
                        'number_of_products': {
                            '$sum': 1
                        },
                        'customer': {
                            '$push': {
                                'createdBy': '$createdBy'
                            }
                        }
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'customer.createdBy',
                        'foreignField': '_id',
                        'as': 'customerList'
                    }
                }, {
                    '$project': {
                        '_id': false,
                        'number_of_products': 1,
                        'customerList.fullname': 1,
                        'customerList.email': 1
                    }
                }
            ];
            return this.orderModel.aggregate(pipeline);
        }
        else {
            pipeline = [{
                    '$lookup': {
                        'from': 'orders',
                        'localField': '_id',
                        'foreignField': 'createdBy',
                        'as': 'orders_info'
                    }
                }, {
                    '$project': {
                        'fullname': 1,
                        'email': 1,
                        'orders_info': 1
                    }
                },
                { '$sort': { 'createdDate': 1 } }
            ];
            if (search) {
                pipeline.unshift({ '$match': { 'fullname': { '$regex': search, '$options': 'i' } } });
            }
        }
        return this.userModel.aggregate(pipeline);
    }
    async update(id, order) {
        return await this.orderModel.findByIdAndUpdate(id, order);
    }
};
orderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], orderService);
exports.orderService = orderService;
//# sourceMappingURL=order.service.js.map