import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactList from './ContactList/ContactList';
import { Notification } from 'components/Notification/Notification';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    if (contacts.some(contact => contact.number === number)) {
      const filteredNumber = contacts.filter(
        contact => contact.number === number
      )[0].name;
      console.log(filteredNumber);
      alert(`${number} is already in contact with ${filteredNumber} `);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  removeContact = id => {
    const newContactList = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ ...this.state, contacts: newContactList });
  };

  setFilterContacts = (filterValue, contactsArray) => {
    if (!filterValue) {
      return contactsArray;
    } else {
      return contactsArray.filter(contact => {
        return contact.name
          .toLocaleLowerCase()
          .includes(filterValue.toLocaleLowerCase());
      });
    }
  };

  render() {
    const { wrapper } = styles;
    const { contacts, filter } = this.state;
    return (
      <div className={wrapper}>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.onSubmit} />
        </Section>
        <Section title="Contacts">
          {contacts.length > 0 ? (
            <>
              <Filter onChange={this.handleFilter} />
              <ContactList
                contacts={this.setFilterContacts(filter, contacts)}
                removeContact={this.removeContact}
              />
            </>
          ) : (
            <Notification message="Your phonebook is empty" />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
