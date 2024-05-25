import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

const PreferenceCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source="preferred_age_min" />
            <NumberInput source="preferred_age_max" />
            <TextInput source="preferred_gender" />
        </SimpleForm>
    </Create>
);

export default PreferenceCreate;
