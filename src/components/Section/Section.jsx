import styles from './Section.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Section extends Component {
  render() {
    const { heading } = styles;
    const { title, children } = this.props;
    return (
      <section>
        <h2 className={heading}>{title}</h2>
        {children}
      </section>
    );
  }
}

export default Section;
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};
