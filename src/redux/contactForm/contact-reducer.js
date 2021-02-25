import { combineRaducers } from 'redux';
import types from './contactForm-types';




const items = (state = [], action{ type, payload }) => {
    switch (type) {
        case types.HANDLE_CHANGE:
            return [...state, payload];
        
        case types.HANDLE_SUBMIT:
            return [...state, payload];

            
        default:
            return state;
    }   
};

const filter = (state = '', actions) => {
    return state;
};


export default combineRaducers({
    items,
    filter,
});