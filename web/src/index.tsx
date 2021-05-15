import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ReactDOM from 'react-dom';
import Todo from './containers/Todo';

ReactDOM.render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
        <Todo />
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);
