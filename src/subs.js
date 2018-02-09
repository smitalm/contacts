import reframe from './reframe-hack'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

reframe.regSub('contacts/list', function (db) {
    return db.get('contacts')
})

reframe.regSub(
    'contacts/list/filtered',
    () => [
        reframe.subscribe(['contacts/list']),
        reframe.subscribe(['contacts/query'])
    ],
    function ([contacts, query]) {
        const match = new RegExp(escapeRegExp(query), 'i')

        return query
            ? contacts.filter((contact) => (match.test(contact.get('name'))))
            : contacts;
    }
)

reframe.regSub(
    'contacts/list/filtered/sorted',
    () => reframe.subscribe(['contacts/list/filtered']),
    function (contactsFiltered) {
        return contactsFiltered.sort(sortBy('name'))
    }
)

reframe.regSub(
    'contacts/list/filtered/message',
    () => [
        reframe.subscribe(['contacts/list']),
        reframe.subscribe(['contacts/list/filtered'])
    ],
    function ([contacts, contactsFiltered]) {
        return contacts.size === contactsFiltered.size
            ? ''
            : `Now showing ${contactsFiltered.size} of ${contacts.size} total`
    }
)

reframe.regSub('contacts/query', function (db) {
    return db.get('query')
})