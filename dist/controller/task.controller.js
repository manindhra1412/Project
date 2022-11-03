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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("../service/task.service");
const path_1 = require("path");
const fs_1 = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const handler_1 = require("../utils/handler");
const parameter_validator_1 = require("parameter-validator");
let TaskController = class TaskController {
    constructor(taskService, Handler) {
        this.taskService = taskService;
        this.Handler = Handler;
    }
    async createBook(response, request, task, file) {
        try {
            let param = await (0, parameter_validator_1.validateAsync)(task, ['type']);
            let requestBody = {};
            if (file && task && task.type == "bulk") {
                const csvFilePath = (0, path_1.resolve)(`./public/${file.filename}`);
                const fileContent = (0, fs_1.readFileSync)(csvFilePath, { encoding: 'utf-8' });
                const records = fileContent.split("\n");
                const res = await this.Handler.processRecords(records, request);
                const result = this.Handler.success(response, res);
                return result;
            }
            else {
                requestBody = Object.assign({ createdBy: request.user._id }, task);
            }
            const newTask = await this.taskService.createTask(requestBody);
            const result = this.Handler.success(response, newTask);
            return result;
        }
        catch (error) {
            return this.Handler.errorException(response, error);
        }
    }
    async read(id) {
        return await this.taskService.readProduct(id);
    }
};
__decorate([
    (0, common_1.Post)('/addProduct'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createBook", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "read", null);
TaskController = __decorate([
    (0, common_1.Controller)('/api/v1/task'),
    __metadata("design:paramtypes", [task_service_1.taskService, handler_1.Handler])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map