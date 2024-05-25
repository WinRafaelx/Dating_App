import React from 'react';
import { Edit, SimpleForm, TextInput, NumberInput, SelectInput } from 'react-admin';

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

const ReportEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput source="Report_type" choices={reportTypes} fullWidth/>
            <TextInput source="Report_Description" fullWidth/>
        </SimpleForm>
    </Edit>
);

export default ReportEdit;
