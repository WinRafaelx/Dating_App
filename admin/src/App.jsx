import React from 'react';
import { Admin, Resource } from 'react-admin';
import DataProvider from './DataProvider';
import UserList from './components/UserList';
import './App.css';

const App = () => (
    <Admin dataProvider={DataProvider}>
        <Resource name="userAuth" list={UserList} />
    </Admin>
);

export default App;
