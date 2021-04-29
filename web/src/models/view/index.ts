import * as apiModels from 'models/api';
import moment from 'moment';

export class Todo {
    private data: apiModels.Todo;

    constructor(data: apiModels.Todo) {
        this.data = data;
    }

    get user(): string {
        return this.data.user;
    }

    get title(): string {
        return this.data.title;
    }

    get thumnail(): string | undefined {
        return this.data.thumnail;
    }

    get delivery(): moment.Moment {
        return this.data.delivery;
    }

    get description(): string {
        return this.data.description;
    }

    formattedDelivery(): string {
        return this.data.delivery.format('MMM Do YY');
    }
}
