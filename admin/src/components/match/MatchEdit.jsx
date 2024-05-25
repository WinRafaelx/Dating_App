import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const matchStatus = [
    { id: 'Pending', name: 'Pending' },
    { id: 'Accepted', name: 'Accepted' },
    { id: 'Rejected', name: 'Rejected' }
];

const MatchEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput source="Matched_Status" choices={matchStatus} fullWidth/>
        </SimpleForm>
    </Edit>
);

export default MatchEdit;
