import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const BlockList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="block_id" />
            <TextField source="Blocker_ID" />
            <TextField source="Blocked_ID" />
            <TextField source="created_at" />
            <TextField source="updated_at" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default BlockList;
