"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const serve_static_1 = require("@nestjs/serve-static");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./utils/constants");
const path_1 = require("path");
const task_controller_1 = require("./controller/task.controller");
const task_service_1 = require("./service/task.service");
const user_service_1 = require("./service/user.service");
const user_controller_1 = require("./controller/user.controller");
const task_schema_1 = require("./model/task.schema");
const user_schema_1 = require("./model/user.schema");
const app_middleware_1 = require("./app.middleware");
const handler_1 = require("./utils/handler");
const order_service_1 = require("./service/order.service");
const order_controller_1 = require("./controller/order.controller");
const order_schema_1 = require("./model/order.schema");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(app_middleware_1.isAuthenticated)
            .exclude({ path: 'api/v1/video/:id', method: common_1.RequestMethod.GET })
            .forRoutes(task_controller_1.TaskController, order_controller_1.OrderController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: task_schema_1.Task.name, schema: task_schema_1.TaskSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema }]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './public',
                    filename: (req, file, cb) => {
                        const ext = file.mimetype.split('/')[1];
                        cb(null, `${(0, uuid_1.v4)()}-${Date.now()}.${ext}`);
                    },
                })
            }),
            jwt_1.JwtModule.register({
                secret: constants_1.secret,
                signOptions: { expiresIn: '8h' },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
        ],
        controllers: [app_controller_1.AppController, task_controller_1.TaskController, user_controller_1.UserController, order_controller_1.OrderController],
        providers: [app_service_1.AppService, task_service_1.taskService, user_service_1.UserService, handler_1.Handler, order_service_1.orderService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map