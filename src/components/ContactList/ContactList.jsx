import styles from './ContactList.module.css';
import { Notification } from 'components/Notification/Notification';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
class ContactList extends Component {
  render() {
    const { contacts, removeContact } = this.props;
    const { wrapper, text, button } = styles;

    return (
      <>
        {contacts.length > 0 ? (
          <ul className={wrapper}>
            {contacts.map(contact => {
              return (
                <li className={text} key={contact.id}>
                  <span>{`${contact.name}: ${contact.number}`}</span>
                  <button
                    type="button"
                    className={button}
                    onClick={() => removeContact(contact.id)}
                  >
                    Delete
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <Notification message="You don't have this contact" />
        )}
      </>
    );
  }
}

export default ContactList;
ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  removeContact: PropTypes.func,
};
