import React from "react";
import PropTypes from "prop-types";
import s from './Alert.module.css';

const Alert = ({ message }) => (
    <div className={s.alert}>
        {message}
    </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;