import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';
import s from './Filter.module.css';
import PropTypes from 'prop-types';


const Filter = ({ value, onChange }) => (
    <div className={s.filter}>
        <label className={s.label} htmlFor="">Find contacts by name
            <input className={s.input}
                type="text"
                name="filter"
                value={value}
                onChange={onChange}
            />
        </label>
    </div>
);

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
    onChange: (e) => dispatch(actions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);