import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

const UserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="role" />
            <TextField source="created_at" />
            <TextField source="updated_at" />
        </Datagrid>
    </List>
);

export default UserList;
