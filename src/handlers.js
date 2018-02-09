import * as Immutable from 'immutable'
import reframe from './reframe-hack'
import * as ContactsAPI from "./utils/ContactsAPI"
import commonMiddleware from './interceptors'

reframe.regEventFx('initializeDb', commonMiddleware, function ({db}) {
    return {
        db: Immutable.Map({
            contacts: Immutable.List(),
            query: ''
        })
    };
})

// load

reframe.regEventFx('contacts/load', commonMiddleware, function ({db}) {
    return {
        'contacts/load/request': null
    }
})

reframe.regFx('contacts/load/request', function () {
    ContactsAPI.getAll()
        .then((contacts) => {
            reframe.dispatch(['contacts/set', contacts])
        },(error) => {
            reframe.dispatch(['logerror', error])
        })
})

reframe.regEventDb('contacts/set', commonMiddleware, function (db, [contacts]) {
    return db.set('contacts', Immutable.fromJS(contacts))
})

// create

reframe.regEventFx('contacts/create', commonMiddleware, function ({db}, [newContact]) {
    return {
        'contacts/create/request': newContact
    }
})

reframe.regFx('contacts/create/request', function (newContact) {
    ContactsAPI.create(newContact)
        .then((contact) => {
            reframe.dispatch(['contacts/list/add', contact])
        },(error) => {
            reframe.dispatch(['logerror', error])
        })
})

reframe.regEventDb('contacts/list/add', commonMiddleware, function (db, [contact]) {
    return db.update('contacts', (contacts) => contacts.push(Immutable.fromJS(contact)))
})

// delete

reframe.regEventFx('contacts/delete', commonMiddleware, function ({db}, [contact]) {
    return {
        'contacts/delete/request': contact
    }
})

reframe.regFx('contacts/delete/request', function (contact) {
    ContactsAPI.remove(contact.get('id'))
        .then((deletedContact) => {
            reframe.dispatch(['contacts/list/delete', deletedContact])
        },(error) => {
            reframe.dispatch(['logerror', error])
        })
})

reframe.regEventDb('contacts/list/delete', commonMiddleware, function (db, [contact]) {
    return db.update('contacts', (contacts) => contacts.filter((c) => c.get('id') !== contact.id))
})

// search

reframe.regEventDb('contacts/query', commonMiddleware, function (db, [newQuery]) {
    return db.set('query', newQuery)
})

// others

reframe.regEventDb('logerror', commonMiddleware, function (db, [error]) {
    console.log('Error occured', error)
})