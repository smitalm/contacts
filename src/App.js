import React from 'react'
import ContactsList from './ContactsList'
import CreateContact from './CreateContact'
import {Route} from "react-router-dom";

import reframe from './reframe-hack'

const AppView = reframe.view('AppView', function () {
    return (
        <div className='app'>
            <Route exact path='/' render={() => (
                <ContactsList />
            )} />
            <Route path='/create' render={({history}) => (
                <CreateContact history={history}/>
            )} />
        </div>
    );
})

export default AppView;
