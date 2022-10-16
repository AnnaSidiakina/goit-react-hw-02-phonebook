import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './App.module.css';
import Form from '../components/AddContactsForm/AddContactsForm';
import ContactsList from '../components/ContactsList/ContactsList';
import Filter from '../components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
  };

  formSubmitHandler = data => {
    const newContact = { ...data, id: nanoid() };
    if (
      this.state.contacts
        .map(contact => contact.name.toLowerCase())
        .includes(data.name.toLowerCase())
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredList = this.getFilteredContacts();

    return (
      <>
        <div className={styles.container}>
          <h1 className={styles.title}>Phonebook</h1>
          <Form onSubmit={this.formSubmitHandler} />
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={filteredList}
            ondeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
