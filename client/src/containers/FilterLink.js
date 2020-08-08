import { connect } from 'react-redux';
import { setVisibilityFilter } from "../actions";
import Link from '../components/Link';

// ownProps: FilterLink 에서 넘어오는 Prop (at Footer.js)
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Link)