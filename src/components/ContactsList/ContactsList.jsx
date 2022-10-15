import React from 'react';

const ContactsList = ({ contacts, ondeleteContact }) => (
  //   deleteContact = contactID => {
  //     this.setState(prevState => ({
  //       contacts: prevState.contacts.filter(contact => contact.id !== contactID),
  //     }));
  //   };

  <>
    <h2>Contacts</h2>
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <span>{name}</span>
          <span>{number}</span>
          <button onClick={() => ondeleteContact(id)}>Delete</button>
        </li>
      ))}
    </ul>
  </>
);

export default ContactsList;

// onClick={() => ondeleteContact(id)}
