import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './AddContactsForm/AddContactsForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    console.log(data);
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
    console.log(this.state.contacts);
  };

  // ensureContactUnique = ({name, number}) => {
  //   if (name === this.state.contacts.name && number === this.state.contacts.number) {
  //     return true;
  //   }
  // };

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
        <Form onSubmit={this.formSubmitHandler} />
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactsList
          contacts={filteredList}
          ondeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
export default App;
