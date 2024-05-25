import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const MessageEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="Message" multiline fullWidth />
            <BooleanInput source="isRead" fullWidth />
            <DateInput source="isRead_time" fullWidth />
        </SimpleForm>
    </Edit>
);

export default MessageEdit;
