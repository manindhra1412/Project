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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../model/user.schema");
const bcrypt = require("bcrypt");
const handler_1 = require("../utils/handler");
let UserService = class UserService {
    constructor(userModel, Handler) {
        this.userModel = userModel;
        this.Handler = Handler;
    }
    async signup(user) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash,
            mobileNo: user.mobileNo,
            userType: user.userType
        };
        const newUser = new this.userModel(reqBody);
        let responseData = await newUser.save();
        return responseData;
    }
    async signin(user, jwt) {
        try {
            const foundUser = await this.userModel.findOne({ mobileNo: user.mobileNo }).exec();
            if (foundUser) {
                const { password } = foundUser;
                let checkPassword = await bcrypt.compare(user.password, password);
                if (checkPassword) {
                    const payload = { mobileNo: user.mobileNo };
                    let token = jwt.sign(payload);
                    return this.Handler.successResponse({ token });
                }
                return this.Handler.erroresponse(common_1.HttpStatus.UNAUTHORIZED, 'Incorrect username or password');
            }
            return this.Handler.erroresponse(common_1.HttpStatus.UNAUTHORIZED, 'Incorrect username or password');
        }
        catch (error) {
            return this.Handler.erroresponse(common_1.HttpStatus.UNAUTHORIZED, 'something went wrong please try again later');
        }
    }
    async getOne(mobileNo) {
        return await this.userModel.findOne({ mobileNo }).exec();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        handler_1.Handler])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map