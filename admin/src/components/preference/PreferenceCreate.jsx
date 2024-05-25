import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const genderChoices = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'Non-binary', name: 'Non-binary' },
    { id: 'Transgender', name: 'Transgender' },
    { id: 'Genderqueer', name: 'Genderqueer' },
    { id: 'Genderfluid', name: 'Genderfluid' },
    { id: 'Agender', name: 'Agender' },
    { id: 'Bigender', name: 'Bigender' },
    { id: 'Pangender', name: 'Pangender' },
    { id: 'Two-Spirit', name: 'Two-Spirit' },
    { id: 'Other', name: 'Other' },
];

const PreferenceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="user_pref_id" fullWidth/>
            <NumberInput source="preferred_age_min" fullWidth/>
            <NumberInput source="preferred_age_max" fullWidth/>
            <SelectInput source="preferred_gender" choices={genderChoices} fullWidth/>
        </SimpleForm>
    </Create>
);

export default PreferenceCreate;
