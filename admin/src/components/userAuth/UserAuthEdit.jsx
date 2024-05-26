import React from 'react';
import { Edit, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { CustomToolbarEdit } from '../CustomToolbar.jsx'; // Adjust the path if needed

const roleChoices = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'data-analyst', name: 'Data Analyst' },
];

const UserAuthEdit = (props) => (
    <Edit {...props}>
        <SimpleForm toolbar={<CustomToolbarEdit />}>
            <TextInput source="username" fullWidth />
            <TextInput source="email" fullWidth />
            <TextInput source="password" fullWidth />
            <SelectInput source="role" choices={roleChoices} fullWidth />
        </SimpleForm>
    </Edit>
);

export default UserAuthEdit;
