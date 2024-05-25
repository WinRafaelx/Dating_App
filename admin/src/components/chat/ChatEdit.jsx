import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const chatStatus = [
    { id: 'Active', name: 'Active' },
    { id: 'Inactive', name: 'Inactive' }
];

const ChatEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput source="Chat_Status" choices={chatStatus} fullWidth/>
        </SimpleForm>
    </Edit>
);

export default ChatEdit;
