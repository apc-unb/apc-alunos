import React from 'react';
import ReactDOM from 'react-dom';

import HomeScreen from './screens/HomeScreen/Home.view.js';
import Header from './components/Header.js';

import Auth from '../../service/api/Auth';


// Adds header
ReactDOM.render(<Header/>, document.getElementById('header-bar'));
Auth(<HomeScreen />);