import React from 'react';
import PropTypes from 'prop-types';

const FilterButton = ({active, handler, children}) => {

    return (
        <button
            disabled={active}
            onClick={() => {
                handler(children)
            }}
            style={{
                marginLeft: '4px'
            }}
        >
            {children}
        </button>
    )
}

FilterButton.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    handler: PropTypes.func.isRequired
}

export default FilterButton;