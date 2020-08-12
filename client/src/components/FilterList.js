import React from 'react';
import PropTypes from 'prop-types';
import FilterButton from "./FilterButton";

const FilterList = ({ list, handler }) => {
    let selectedFilter = '';

    return (
        list.map((v, i) => (
            <FilterButton key={i} active={false} handler={handler}>{v}</FilterButton>
            )
        )
    )
}

FilterList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
    handler: PropTypes.func.isRequired
}

export default FilterList;