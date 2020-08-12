import { VisibilityFilters } from "../_actions";

const Filter = (state = VisibilityFilters.ALL, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_VISIBILITY_FILTER':
            return payload.filter
        default:
            return state;
    }
}

export default Filter;