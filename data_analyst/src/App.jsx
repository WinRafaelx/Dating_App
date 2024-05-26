import React from 'react';
import { Admin, Resource } from 'react-admin';
import dataProvider from './DataProvider.jsx';

import UserAuthList from './components/userAuth/UserAuthList.jsx';

import PreferenceList from './components/preference/PreferenceList.jsx';

import CustomMenu from './components/CustomMenu'; // Import the custom menu
import './App.css';

const App = () => (
    <Admin dataProvider={dataProvider} menu={CustomMenu}>
        <Resource name="userAuth" list={UserAuthList} />
        <Resource name="preferences" list={PreferenceList} />
    </Admin>
);

export default App;
