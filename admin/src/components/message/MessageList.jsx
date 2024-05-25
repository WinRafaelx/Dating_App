import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const MessageList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="message_id" />
            <TextField source="Chat_ID" />
            <TextField source="Sender_ID" />
            <TextField source="Receiver_ID" />
            <TextField source="Message" />
            <BooleanField source="isRead" />
            <DateField source="isRead_time" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default MessageList;
