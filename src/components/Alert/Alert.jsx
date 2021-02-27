import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import s from './Alert.module.css';

const Alert = ({ message }) => (
    <div className={s.alert}>
        {message}
    </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
    message: () => dispatch(actions.deleteContact()),
});

export default connect(mapDispatchToProps)(Alert);