import * as apiModels from 'models/api';
import moment from 'moment';

export class Todo {
    private data: apiModels.Todo;

    constructor(data: apiModels.Todo) {
        this.data = data;
    }

    get id(): string {
        return this.data.id;
    }

    get title(): string {
        return this.data.title;
    }

    get delivery(): moment.Moment {
        return this.data.delivery;
    }

    get detail(): string {
        return this.data.detail;
    }
}

export interface TodoForm {
    title: string;
    delivery: moment.Moment;
    detail: string;
}
