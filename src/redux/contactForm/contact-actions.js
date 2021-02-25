import types from './contactForm-types';

const handleChange = (e) => ({
    type: types.HANDLE_CHANGE,
    payload: e,
});

const handleSubmit = (e) => ({
    type: types.HANDLE_SUBMIT,
    payload: e,
});


export default { handleChange };