import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import slideTransition from '../../transitions/slide.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
    <TransitionGroup component="ul" className={s.list}>
        {contacts.map(({ name, number, id }) => (
            <CSSTransition key={id} timeout={250} classNames={slideTransition} unmountOnExit>
            <li key={id} className={s.item}>
                <p className={s.name}>{name}</p>
                <p className={s.number}>{number}</p>
                <button className={s.button} onClick={(() => onDeleteContact(id))}>X</button>
            </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
);

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,).isRequired,
    onDeleteContact: PropTypes.func.isRequired
};


const filterContacts = ( contacts, filter ) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
};

const mapStateToProps = ({contacts: { items, filter }}) => ({
    contacts: filterContacts(items, filter),
});

const mapDispatchToProps = dispatch => ({
    onDeleteContact: id => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);