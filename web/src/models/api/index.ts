import moment from 'moment';

export interface Todo {
    id: string;
    user: string;
    title: string;
    thumnail?: string;
    delivery: moment.Moment;
    detail: string;
}
