import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import * as viewModels from 'models/view';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        space: {
            padding: 5,
        },
        root: {
            width: '100%',
        },
        avatar: {
            backgroundColor: blueGrey[500],
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        expandContent: {
            wordBreak: 'break-all',
        },
    })
);

interface Props {
    todo: viewModels.Todo;
    onDelete: (id: string) => void;
}

export const TodoCard: React.FC<Props> = (props: Props) => {
    const { todo, onDelete } = props;
    const classes = useStyles({});
    const [expanded, setExpanded] = React.useState(false);

    const handleDelete = (id: string) => () => {
        onDelete(id);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const renderAvatar = () => {
        const head = todo.id.slice(0, 1).toUpperCase();
        return <Avatar className={classes.avatar}>{head}</Avatar>;
    };

    return (
        <div className={classes.space}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={renderAvatar()}
                    title={todo.title}
                    subheader={todo.delivery}
                />
                <CardActions disableSpacing>
                    <IconButton onClick={handleDelete(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" className={classes.expandContent}>
                            {todo.detail}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
};
