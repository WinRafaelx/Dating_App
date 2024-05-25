import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';
import GeneralFilter from '../GeneralFilter.jsx';

const LikeList = (props) => (
    <List filters={<GeneralFilter />} {...props}>
        <Datagrid>
            <TextField source="like_id" />
            <TextField source="Liker_ID" />
            <TextField source="Liked_ID" />
            <TextField source="created_at" />
            <TextField source="updated_at" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default LikeList;
