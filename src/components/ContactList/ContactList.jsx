import React from 'react';
import ContactItem from '../ContactItem';
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ items, filter, deleteContact }) => {
    const normalizedFilter = filter.toLowerCase();
    const filteredItems = items.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
    );
    return (
     <ul className={s.list}>
      {filteredItems &&
        filteredItems.map(({ id, name, number }) => (
          <ContactItem
            key={id}
            name={name}
            number={number}
            onDelete={() => deleteContact(id)}
          />
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  items: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  items: state.contacts.items,
  filter: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  deleteContact: contactId => dispatch(actions.deleteContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);