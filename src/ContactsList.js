import React from 'react'
import {Link} from "react-router-dom"
import * as personIcon from './icons/person.svg'
import reframe from './reframe-hack'

const ContactsListUi = reframe.ui('ContactsList', {
    _updateQuery: (query) => {
        reframe.dispatch(['contacts/query', query])
    },

    _clearQuery: () => {
        reframe.dispatch(['contacts/query', ''])
    },

    _deleteContact: (contact) => {
        reframe.dispatch(['contacts/delete', contact])
    },

    render: function () {
        const query = this.derefSub(['contacts/query'])

        const contacts = this.derefSub(['contacts/list/filtered/sorted'])

        const contactsFilteredMessage = this.derefSub(['contacts/list/filtered/message'])

        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this._updateQuery(event.target.value)}
                    />
                    <Link to="/create" className='add-contact'>Add contact</Link>
                </div>

                {contactsFilteredMessage && (<div className='showing-contacts'>
                    <span>{contactsFilteredMessage}</span>
                    <button onClick={this._clearQuery}>Show all</button>
                </div>)}

                <ol className='contact-list'>
                    {contacts.map(contact => (
                        <li className='contact-list-item' key={contact.get('id')}>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.get('avatarURL')|| personIcon})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.get('name')}</p>
                                <p>{contact.get('email')}</p>
                            </div>
                            <button className='contact-remove' onClick={() => this._deleteContact(contact)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
});

export default ContactsListUi