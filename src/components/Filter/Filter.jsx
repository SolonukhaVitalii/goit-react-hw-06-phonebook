import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import { connect } from 'react-redux';
import actions from '../../redux/contacts/contacts-actions';

class Filter extends Component {
    componentWillUnmount() {
        this.props.resetFilter();
    }
    render() {
        const { filter, onChange } = this.props;
        return (
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
    }
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    resetFiletr: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    filter: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
    onChange: e => dispatch(actions.changeFilter(e.currentTarget.value)),
    resetFilter: () => dispatch(actions.resetFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);