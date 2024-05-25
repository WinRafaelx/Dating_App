import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';

const roleChioces = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'data-analyst', name: 'Data Analyst' },
];

const UserAuthEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" fullWidth/>
            <TextInput source="email" fullWidth/>
            <TextInput source="password" fullWidth/>
            <SelectInput source="role" choices={roleChioces} fullWidth/>
        </SimpleForm>
    </Edit>
);

export default UserAuthEdit;
