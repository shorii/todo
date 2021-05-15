import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TodoCard } from './TodoCard';
import * as viewModels from 'models/view';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        paper: {
            padding: 5,
        },
    })
);

interface Props {
    loading: boolean;
    todos: viewModels.Todo[];
    onDelete: (id: string) => void;
    onAdd: () => void;
}

export const Todo: React.FC<Props> = (props: Props) => {
    const { loading, todos, onDelete, onAdd } = props;
    const classes = useStyles({});
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">ToDoList</Typography>
                    <div className={classes.grow}></div>
                    <IconButton color="inherit" onClick={onAdd}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Paper elevation={0} className={classes.paper}>
                {loading ? (
                    <Skeleton variant="rect" />
                ) : (
                    <>
                        {todos.map((todo, idx) => (
                            <TodoCard key={idx} todo={todo} onDelete={onDelete} />
                        ))}
                    </>
                )}
            </Paper>
        </>
    );
};
