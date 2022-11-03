import { Model } from "mongoose";
import { User, UserDocument } from "../model/user.schema";
import { JwtService } from '@nestjs/jwt';
import { Handler } from "src/utils/handler";
export declare class UserService {
    private userModel;
    private readonly Handler;
    constructor(userModel: Model<UserDocument>, Handler: Handler);
    signup(user: User): Promise<User>;
    signin(user: User, jwt: JwtService): Promise<any>;
    getOne(mobileNo: any): Promise<User>;
}
