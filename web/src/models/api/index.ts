import moment from 'moment';

export interface Todo {
    id: string;
    title: string;
    delivery: moment.Moment;
    detail: string;
}
