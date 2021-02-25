import React from 'react';
import s from './Filter.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import contactForm from '../../redux/contactForm/contactForm-actions';

const Filter = ({ filter, onChange }) => (
    <div className={s.filter}>
        <label className={s.label} htmlFor="">Find contacts by name
            <input className={s.input}
                type="text"
                name="filter"
                value={filter}
                onChange={onChange}
            />
        </label>
    </div>
);

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    filter: state.filter
    
})

const mapDispatchToProps = dispatch => ({
  onChange: dispatch(contactForm.cangeFilter(e.target.value)),  
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);