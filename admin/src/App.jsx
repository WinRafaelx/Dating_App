import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './DataProvider.jsx';
import UserList from './components/UserList';
import PreferenceList from './components/PreferenceList';
import PreferenceEdit from './components/PreferenceEdit';
import PreferenceCreate from './components/PreferenceCreate';
import './App.css';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="userAuth" list={UserList} />
        <Resource name="preferences" list={PreferenceList} edit={PreferenceEdit} create={PreferenceCreate} />
    </Admin>
);

export default App;
