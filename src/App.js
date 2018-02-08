import React, {Component}from 'react';
import ContactsList from './ContactsList';
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'
import {Route} from "react-router-dom";

class App extends Component {
    state = {
        contacts: []
    }

    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState({contacts});
        })
    }

    removeContact = (contact) => {
        this.setState((state) => ({
            contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))
        ContactsAPI.remove(contact)
    }

    createContact = (newContact) => {
        ContactsAPI.create(newContact).then((contact) => {
            this.setState((state) => ({
                contacts: state.contacts.concat([contact])
            }))
        })
    }

    render() {
        return (
            <div className='app'>
                <Route exact path='/' render={() => (
                    <ContactsList
                        contacts={this.state.contacts}
                        onDeleteContact={this.removeContact}
                    />
                )} />
                <Route path='/create' render={({history}) => (
                    <CreateContact
                        onCreateContact={(contact) => {
                            this.createContact(contact)
                            history.push('/')
                        }}/>
                )} />
            </div>
        );
    }
}

export default App;
