import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const genderChoices = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'LGBTQ+', name: 'LGBTQ+' }
];

const PreferenceEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="preferred_age_min" fullWidth/>
            <NumberInput source="preferred_age_max" fullWidth/>
            <SelectInput source="preferred_gender" choices={genderChoices} fullWidth/>
        </SimpleForm>
    </Edit>
);

export default PreferenceEdit;
