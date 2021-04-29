import moment from 'moment';

export interface Todo {
    user: string;
    title: string;
    thumnail?: string;
    delivery: moment.Moment;
    description: string;
}
