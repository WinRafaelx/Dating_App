import React from 'react';
import { Create, SimpleForm, TextInput, SelectInput } from 'react-admin';
import { CustomToolbarCreate } from '../CustomToolbar';

const roleChoices = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'data-analyst', name: 'Data Analyst' },
];

const UserAuthCreate = (props) => {
    return (
        <Create {...props}>
            <SimpleForm toolbar={<CustomToolbarCreate />}>
                <TextInput source="username" fullWidth />
                <TextInput source="email" fullWidth />
                <TextInput source="password" fullWidth />
                <SelectInput source="role" choices={roleChoices} fullWidth />
            </SimpleForm>
        </Create>
    );
};

export default UserAuthCreate;
