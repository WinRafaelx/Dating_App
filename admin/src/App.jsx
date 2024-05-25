import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './DataProvider.jsx';

import UserAuthList from './components/userAuth/UserAuthList.jsx';
import UserAuthCreate from './components/userAuth/UserAuthCreate.jsx';
import UserAuthEdit from './components/userAuth/UserAuthEdit.jsx';

import PreferenceList from './components/preference/PreferenceList.jsx';
import PreferenceEdit from './components/preference/PreferenceEdit.jsx';
import PreferenceCreate from './components/preference/PreferenceCreate.jsx';

import CustomMenu from './components/CustomMenu'; // Import the custom menu
import './App.css';

const App = () => (
    <Admin dataProvider={dataProvider} menu={CustomMenu}>
        <Resource name="userAuth" list={UserAuthList} edit={UserAuthEdit} create={UserAuthCreate} />
        <Resource name="preferences" list={PreferenceList} edit={PreferenceEdit} create={PreferenceCreate} />
    </Admin>
);

export default App;
