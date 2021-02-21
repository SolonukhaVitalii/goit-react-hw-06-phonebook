import React from 'react';
import s from './Filter.module.css';
import PropTypes from 'prop-types';

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

export default Filter;