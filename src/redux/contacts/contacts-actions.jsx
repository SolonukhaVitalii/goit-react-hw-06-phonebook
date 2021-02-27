import types from './contacts-types';
import shortid from 'shortid';

const addContact = ({ name, number }) => ({
    type: types.ADD,
    payload: {
        id: shortid.generate(),
        name,
        number,
    }
});

const deleteContact = (contacts, contactId) => ({
        type: types.DELETE,
        payload: (contacts, contactId),
});

const filterContacts = (contacts) => ({
    type: types.FILTER_CONTACTS,
    payload: { contacts },
});

const changeFilter = value => ({
    type: types.CHENG_FILTER,
    payload: value,
});

const Actions = { addContact, deleteContact, filterContacts, changeFilter };

export default Actions;