import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const chatStatus = [
    { id: 'Active', name: 'Active' },
    { id: 'Inactive', name: 'Inactive' }
];

const ChatCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="User1_ID" fullWidth />
            <TextInput source="User2_ID" fullWidth />
            <SelectInput source="Chat_status" choices={chatStatus} fullWidth/>
        </SimpleForm>
    </Create>
);

export default ChatCreate;
