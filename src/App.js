import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Alert from './components/Alert';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import titleTransition from './transitions/title.module.css';
import popTransition from './transitions/pop.module.css';
import alertTransition from './transitions/alert.module.css';


const INITIAL_STATE = {
  isVisible: false,
  message: "",
};
  
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
    ...INITIAL_STATE,
  };
  
  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };
  
  setMessage = (message) => {
    this.setState({ isVisible: true, message: message });
    setTimeout(() => {
      this.setState({
        ...INITIAL_STATE,
      });
    }, 1500);
  };

  addContact = ({ name, number }) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(name);

    if (searchSameName) {
     this.setState({
        isVisible: true,
        message: "Contact already exists!",
      });
      setTimeout(() => {
        this.setState({
          ...INITIAL_STATE,
        });
      }, 1500);
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number
      };
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };
  
  changeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
   
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  

  deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
    this.setState({ filter: "" })
  };

  render() {
    const { contacts, filter, isVisible, message } = this.state;
    
    return (
      <div className="app">
        <CSSTransition in timeout={500} classNames={titleTransition} appear>
          <h1 className="title">Phonebook</h1>
        </CSSTransition>
        <CSSTransition
          in={isVisible}
          timeout={250}
          classNames={alertTransition}
          unmountOnExit
        >
          <Alert message={message} />
        </CSSTransition>
        <ContactForm
          onSubmit={this.addContact}
          onSetMessage={this.setMessage}
        />
        <CSSTransition in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit>
          <Filter
            filter={filter}
            onChange={this.changeFilter}
          />
        </CSSTransition>
          <ContactList
            contacts={this.filterContacts()}
            onDeleteContact={this.deleteContact}
          />
      </div>
    );
  }
}

export default App;

