import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const PreferenceList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid rowClick='edit'>
            <TextField source="id"/>
            <TextField source="preferred_age_min" />
            <TextField source="preferred_age_max" />
            <TextField source="preferred_gender" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default PreferenceList;
