import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const LikeEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <DateInput source="created_at" fullWidth/>
        </SimpleForm>
    </Edit>
);

export default LikeEdit;
