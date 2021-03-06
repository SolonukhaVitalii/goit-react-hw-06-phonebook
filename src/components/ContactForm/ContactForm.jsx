import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  notifyWarn = text => toast.warn(text);
  notifySuccess = text => toast.success(text);

  handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'number'
    ? this.setState({ [name]: value.replace(/[^\d-]/g, '') })
    : this.setState({ [name]: value });
  };
    
  handleSubmit = e => {
    e.preventDefault();
    const newContact = { id: shortid.generate(), ...this.state };
    if (!this.isAlreadyInContacts(newContact)) {
      const { addContact } = this.props;
      addContact(newContact);
      this.notifySuccess('Added successfully');
      this.reset();
    }
  };
    
  reset = () => {
    this.setState({ name: '', number: '' })
  };
  
  isAlreadyInContacts = newContact => {
    const name = newContact.name.toLowerCase();
    const { number } = newContact;
    const { items } = this.props;

    if (name === '' || number === '') {
      this.notifyWarn(`Please enter name and number`);
      return true;
    }

    if (items.find(contact => contact.name.toLowerCase() === name)) {
      this.notifyWarn(`${newContact.name} is already in contacts.`);
      return true;
    }
  };
    
  render() {
    const { name, number } = this.state;
      return (
        <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.label}>
            Name
             <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              id={this.nameInputId}
            /> 
        </label>
        <label className={s.label}>
            Number
             <input
              className={s.input}
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
              id={this.numberInputId}
            /> 
        </label>
        <button type="submit" className={s.button}>Add contact</button>
        </form>
      );
  }
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  items: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
  resetFilter: () => dispatch(actions.resetFilter()),
  addContact: newContact => dispatch(actions.addContact(newContact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
