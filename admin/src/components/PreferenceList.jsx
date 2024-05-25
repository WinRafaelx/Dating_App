import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const PreferenceList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="preferred_age_min" />
            <TextField source="preferred_age_max" />
            <TextField source="preferred_gender" />
            <EditButton basePath="/preferences" />
            <DeleteButton basePath="/preferences" />
        </Datagrid>
    </List>
);

export default PreferenceList;
