import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const ChatList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="User1_ID" />
            <TextField source="User2_ID" />
            <TextField source="Chat_Status" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ChatList;
