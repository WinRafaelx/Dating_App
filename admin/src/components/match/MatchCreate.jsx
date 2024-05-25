import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const matchStatus = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Accepted', name: 'Accepted' },
    { id: 'Rejected', name: 'Rejected' }
];

const MatchCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="Matcher_ID" fullWidth/>
            <TextInput source="Matched_ID" fullWidth/>
            <SelectInput source="Matched_Status" choices={matchStatus} fullWidth/>
        </SimpleForm>
    </Create>
);

export default MatchCreate;
