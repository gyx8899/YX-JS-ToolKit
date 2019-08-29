import React, {useEffect} from "react";
import ReactGA from "react-ga";
// import {GA_TRACKING_ID} from './config';

// Root page
// Dependencies	react-router: ^4.0.0
// import withTracker from './withTracker';
//
// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Route component={withTracker(App, { /* additional attributes */ } )} />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root'),
// );

export const withTracker = (WrappedComponent, options = {}) => {
	const trackPage = page => {
		ReactGA.set({
			page,
			...options
		});
		ReactGA.pageview(page);
	};

	const HOC = props => {
		ReactGA.initialize(GA_TRACKING_ID);
		useEffect(() => trackPage(props.location.pathname), [
			props.location.pathname
		]);

		return <WrappedComponent {...props} />;
	};

	return HOC;
};