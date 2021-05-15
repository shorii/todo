import * as React from 'react';
import * as viewModels from 'models/view';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';

export interface TodoAddDialogRefProps {
    dialog: (onSubmit: (form: viewModels.TodoForm) => void) => void;
}

const useForm = () => {
    const initialFormValues = {
        title: '',
        delivery: moment(),
        detail: '',
    } as viewModels.TodoForm;

    const [form, setForm] = React.useState<viewModels.TodoForm>(initialFormValues);

    const changeForm = (field: keyof viewModels.TodoForm, value: any) => {
        setForm((x) => {
            return {
                ...x,
                ...{
                    [field]: value,
                },
            };
        });
    };

    const clearForm = () => {
        setForm(initialFormValues);
    };

    return {
        form,
        changeForm,
        clearForm,
    };
};

const Component = (props: any, ref: React.Ref<TodoAddDialogRefProps>) => {
    const formService = useForm();
    const [submit, setSubmit] = React.useState<any>(null);
    const open = React.useMemo(() => !!submit, [submit]);

    React.useImperativeHandle(ref, () => ({
        dialog: (onSubmit: (form: viewModels.TodoForm) => void) => {
            setSubmit(() => onSubmit);
        },
    }));

    const handleClose = () => {
        setSubmit(null);
        formService.clearForm();
    };

    const handleSubmit = () => {
        submit(formService.form);
        setSubmit(null);
        formService.clearForm();
    };

    const handleChange = (field: keyof viewModels.TodoForm) => (e: any) => {
        const value = e.target.value;
        formService.changeForm(field, value);
    };

    const handleDateChange = (field: keyof viewModels.TodoForm) => (e: any) => {
        const value = e;
        formService.changeForm(field, value);
    };

    if (!open) {
        return null;
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>add todo schedule</DialogTitle>
            <DialogContent>
                <TextField
                    label="title"
                    value={formService.form.title}
                    onChange={handleChange('title')}
                    fullWidth
                />
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/DD/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={formService.form.delivery}
                    onChange={handleDateChange('delivery')}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    fullWidth
                />
                <TextField
                    label="detail"
                    value={formService.form.detail}
                    onChange={handleChange('detail')}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const TodoAddDialog = React.forwardRef(Component);
