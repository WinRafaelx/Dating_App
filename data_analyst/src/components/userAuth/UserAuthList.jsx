import React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter';

const UserAuthList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="id" sortable />
            <TextField source="username" sortable />
            <EmailField source="email" sortable />
            <TextField source="role" sortable />
            <TextField source="created_at" sortable />
            <TextField source="updated_at" sortable />
        </Datagrid>
    </List>
);

export default UserAuthList;
