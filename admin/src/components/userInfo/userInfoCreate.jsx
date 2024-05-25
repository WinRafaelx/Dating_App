import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput, DateInput } from 'react-admin';

const genderChoices = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'LGBTQ+', name: 'LGBTQ+' }
];

const userInfoCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="user_info_id" fullWidth/>
            <TextInput source="firstname" fullWidth/>
            <TextInput source="lastname" fullWidth/>
            <TextInput source="profile_picture" fullWidth/>
            <SelectInput source="gender" choices={genderChoices} fullWidth/>
            <DateInput source="birthdate" fullWidth/>
            <TextInput source="Sub-District" fullWidth/>
            <TextInput source="District" fullWidth/>
            <TextInput source="City" fullWidth/>
            <TextInput source="Country" fullWidth/>
            <TextInput source="Postcode" fullWidth/>
            <TextInput source="bio" fullWidth multiline/>
        </SimpleForm>
    </Create>
);

export default  userInfoCreate;
