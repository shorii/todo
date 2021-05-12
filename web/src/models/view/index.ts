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

    get detail(): string {
        return this.data.detail;
    }

    formattedDelivery(): string {
        return this.data.delivery.format('MMM Do YY');
    }
}
