import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
//import Alert from './components/Alert';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import titleTransition from './transitions/title.module.css';
import popTransition from './transitions/pop.module.css';
//import alertTransition from './transitions/alert.module.css';

const App = ({ items }) => {
  return (
    <div className="app">
      <CSSTransition
        in timeout={500}
        classNames={titleTransition}
        appear>
      <h1 className="title">Phonebook</h1>
      </CSSTransition>
      <ContactForm />
      {items.length > 1 &&
      <CSSTransition
        in timeout={250}
        classNames={popTransition}
        unmountOnExit>
      <Filter />
      </CSSTransition>}
      {items.length > 0 ? (
        <ContactList />
      ) : (
        <p>The contact list is empty. Please add a new contact.</p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  items: state.contacts.items,
});

App.propTypes = {
  items: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, null)(App);
