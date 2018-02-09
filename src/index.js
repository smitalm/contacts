import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import AppView from './App'

import reframe from './reframe-hack'

import './handlers'
import './subs'

reframe.dispatchSync(['initializeDb'])
reframe.dispatch(['contacts/load'])

ReactDOM.render(
    <BrowserRouter>
        <AppView />
    </BrowserRouter>,
    document.getElementById('root')
)
