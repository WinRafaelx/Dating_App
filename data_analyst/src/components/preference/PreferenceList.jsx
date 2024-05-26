import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const PreferenceList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="preferred_age_min" />
            <TextField source="preferred_age_max" />
            <TextField source="preferred_gender" />
        </Datagrid>
    </List>
);

export default PreferenceList;
