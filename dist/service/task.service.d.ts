import { Model } from "mongoose";
import { Task, TaskDocument } from "../model/task.schema";
export declare class taskService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    createTask(task: Object): Promise<Task>;
    readProduct(req: any): Promise<any>;
    update(id: any, product: any): Promise<any>;
}
