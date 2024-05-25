import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const BlockCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="Blocker_ID" fullWidth/>
            <TextInput source="Blocked_ID" fullWidth/>
        </SimpleForm>
    </Create>
);

export default BlockCreate;
