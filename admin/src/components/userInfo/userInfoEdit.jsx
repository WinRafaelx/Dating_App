import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const genderChoices = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
    { id: 'LGBTQ+', name: 'LGBTQ+' }
];

const userInfoEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="firstname" fullWidth />
            <TextInput source="lastname" fullWidth />
            <TextInput source="profile_picture" fullWidth />
            <SelectInput source="gender" choices={genderChoices} fullWidth/>
            <DateInput source="birthdate" fullWidth />
            <TextInput source="Sub_District" fullWidth />
            <TextInput source="District" fullWidth />
            <TextInput source="City" fullWidth />
            <TextInput source="Country" fullWidth />
            <TextInput source="Postcode" fullWidth />
            <TextInput source="bio" fullWidth multiline />
        </SimpleForm>
    </Edit>
);

export default userInfoEdit;
