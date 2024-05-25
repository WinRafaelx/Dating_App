import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin';

const roleChioces = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'data-analyst', name: 'Data Analyst' },
];

const UserAuthCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="username" fullWidth/>
            <TextInput source="email" fullWidth/>
            <TextInput source="password" fullWidth/>
            <SelectInput source="role" choices={roleChioces} fullWidth/>
        </SimpleForm>
    </Create>
);

export default UserAuthCreate;
