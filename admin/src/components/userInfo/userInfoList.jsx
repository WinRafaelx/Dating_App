import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const userInfoList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="profile_picture" />
            <TextField source="gender" />
            <DateField source="birthdate" />
            <TextField source="Sub_District" />
            <TextField source="District" />
            <TextField source="City" />
            <TextField source="Country" />
            <TextField source="Postcode" />
            <TextField source="bio" />
            <TextField source="created_at" />
            <TextField source="updated_at" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default userInfoList;
