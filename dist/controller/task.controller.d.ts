/// <reference types="multer" />
import { TaskDocument } from "../model/task.schema";
import { taskService } from "../service/task.service";
import { Handler } from "src/utils/handler";
export declare class TaskController {
    private readonly taskService;
    private readonly Handler;
    constructor(taskService: taskService, Handler: Handler);
    createBook(response: any, request: any, task: TaskDocument, file: Express.Multer.File): Promise<any>;
    read(id: any): Promise<Object>;
}
