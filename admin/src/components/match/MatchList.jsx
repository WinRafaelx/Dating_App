import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const MatchList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="match_id" />
            <TextField source="Matcher_ID" />
            <TextField source="Matched_ID" />
            <TextField source="Match_Status" />
            <TextField source="created_at" />
            <TextField source="updated_at" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default MatchList;
