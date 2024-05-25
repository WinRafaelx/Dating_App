import React from 'react';
import { Create, SimpleForm, TextInput, DateInput, BooleanInput } from 'react-admin';

const MessageCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="Chat_ID" fullWidth />
            <TextInput source="Sender_ID" fullWidth />
            <TextInput source="Receiver_ID" fullWidth />
            <TextInput source="Message" multiline fullWidth />
            <BooleanInput source="isRead" fullWidth />
            <DateInput source="isRead_time" fullWidth />
        </SimpleForm>
    </Create>
);

export default MessageCreate;
