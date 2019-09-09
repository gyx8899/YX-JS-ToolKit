import {connect} from "react-redux";
import Link from '../components/Links';
import {setVisibilityFilter} from '../redux/actions/index';

const mapStateToProps = (state, props) => ({
	active: props.filter === state.visibilityFilter
});

const mapDispatchToProps = (dispatch, props) => ({
	onClick: () => dispatch(setVisibilityFilter(props.filter))
});

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(Link)