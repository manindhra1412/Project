import { User } from "../model/user.schema";
import { UserService } from "../service/user.service";
import { JwtService } from '@nestjs/jwt';
import { Handler } from "src/utils/handler";
export declare class UserController {
    private readonly userServerice;
    private jwtService;
    private Handler;
    constructor(userServerice: UserService, jwtService: JwtService, Handler: Handler);
    Signup(response: any, user: User): Promise<any>;
    SignIn(response: any, user: User): Promise<any>;
}
