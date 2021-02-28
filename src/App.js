import React, { Component } from 'react';
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

  /*addContact = ({ name, number }) => {
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
  };*/
  
  /*changeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  }; в actions*/

  /*filterContacts = () => {
    const { contacts, filter } = this.state;
   
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }; в ContactList*/ 

  /*deleteContact = (id) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    }));
    this.setState({ filter: "" })
  }; в ContactList*/

  render() {
    const { contacts, isVisible, message } = this.state;
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
          //onSubmit={this.addContact}
          //onSetMessage={this.setMessage}
        />
        <CSSTransition /*in={contacts.length > 1}*/
          timeout={250}
          classNames={popTransition}
          unmountOnExit>
          <Filter
            //filter={filter}
            //onChange={this.changeFilter}
          />
        </CSSTransition>
          <ContactList
            //contacts={this.filterContacts()}
            //onDeleteContact={this.deleteContact}
          />
      </div>
    );
  }
}

export default App;