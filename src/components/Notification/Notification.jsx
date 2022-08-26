import PropTypes from 'prop-types';
import styles from './Notification.module.css';

export const Notification = ({ message }) => {
  const { notification__msg } = styles;

  return <p className={notification__msg}>{message}</p>;
};

Notification.propTypes = {
  message: PropTypes.string,
};
