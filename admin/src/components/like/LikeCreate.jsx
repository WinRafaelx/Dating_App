import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const LikeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="Liker_ID" fullWidth/>
            <TextInput source="Liked_ID" fullWidth/>
        </SimpleForm>
    </Create>
);

export default LikeCreate;
