import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';
import types from './contacts-types';

const addContact = createAction(types.ADD, ({ name, number }) => ({
        payload: {
            id: shortid.generate(),
            name,
            number,
        }
}));
/*const addContact = ({ name, number }) => ({
    type: types.ADD,
    payload: {
        id: shortid.generate(),
        name,
        number,
    }
});*/
const deleteContact = createAction(types.DELETE);
/*const deleteContact = (contacts, contactId) => ({
        type: types.DELETE,
        payload: (contacts, contactId),
});*/

const changeFilter = createAction(types.CHENG_FILTER);
/*const changeFilter = value => ({
    type: types.CHENG_FILTER,
    payload: value,
});*/

const Actions = { addContact, deleteContact, changeFilter };

export default Actions;