import React  from 'react';
import { useDispatch } from "react-redux";
import {VisibilityFilters, setVisibilityFilter} from "../_actions";
import FilterList from './../components/FilterList';

const VisibleFilterContainer = () => {
    const dispatch = useDispatch();

    const onClickFilterHandler = (filter) => {
        dispatch(setVisibilityFilter(filter));
    }

    return(
        <div>
            <span>Show: </span>
            <FilterList list={Object.values(VisibilityFilters)} handler={onClickFilterHandler}/>
        </div>
    )
}


export default VisibleFilterContainer