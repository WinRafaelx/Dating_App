import React from 'react';
import { Create, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

const reportTypes = [
    { id: 'spam', name: 'Spam' },
    { id: 'harassment', name: 'Harassment' },
    { id: 'inappropriate_content', name: 'Inappropriate Content' },
    { id: 'fake_profile', name: 'Fake Profile' },
    { id: 'scam', name: 'Scam' },
    { id: 'abusive_language', name: 'Abusive Language' },
    { id: 'violence', name: 'Violence' },
    { id: 'underage_user', name: 'Underage User' },
    { id: 'misleading_information', name: 'Misleading Information' },
    { id: 'other', name: 'Other' },
];

const ReportCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="Reporter_ID" fullWidth/>
            <TextInput source="Reported_ID" fullWidth/>
            <SelectInput source="Report_Type" choices={reportTypes} fullWidth/>
            <TextInput source="Report_Description" fullWidth/>
        </SimpleForm>
    </Create>
);

export default ReportCreate;
