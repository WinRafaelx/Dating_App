import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

const PreferenceEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <NumberInput source="preferred_age_min" />
            <NumberInput source="preferred_age_max" />
            <TextInput source="preferred_gender" />
        </SimpleForm>
    </Edit>
);

export default PreferenceEdit;
