import styles from './App.module.css';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactList from './ContactList/ContactList';
import { Notification } from 'components/Notification/Notification';
import Filter from './Filter/Filter';
import { load, save } from 'services/localStorage';
import contactsItems from 'data/contactsItems';

const localStorageKey = 'contacts';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  getContactFromStorage = () => {
    const localPhonebookContacts = load(localStorageKey);
    return localPhonebookContacts
      ? localPhonebookContacts
      : this.setContactsInStorage(contactsItems);
  };

  setContactsInStorage = contactsArray => {
    save(localStorageKey, contactsArray);
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
      alert(`${number} is already in contact with ${filteredNumber} `);
      return;
    }
    const newContactArray = [newContact, ...contacts];

    this.setContactsInStorage(newContactArray);
    this.setState(() => ({
      contacts: newContactArray,
    }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  removeContact = id => {
    const newContactList = this.state.contacts.filter(
      contact => contact.id !== id
    );
    save(localStorageKey, newContactList);
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

  componentDidMount() {
    const myPhonebookContacts = this.getContactFromStorage();
    this.setState(oldState => ({ ...oldState, contacts: myPhonebookContacts }));
  }

  render() {
    const { wrapper } = styles;
    const { filter } = this.state;
    const phonebookContacts = this.getContactFromStorage();
    return (
      <div className={wrapper}>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.onSubmit} />
        </Section>
        <Section title="Contacts">
          {phonebookContacts.length > 0 ? (
            <>
              <Filter onChange={this.handleFilter} />
              <ContactList
                contacts={this.setFilterContacts(filter, phonebookContacts)}
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
