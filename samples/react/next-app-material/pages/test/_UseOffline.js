import React, {useEffect} from "react";
import useOffline from '../hook/UseOffline';
import {SnackbarProvider, useSnackbar} from 'notistack';

function App() {
	const {enqueueSnackbar} = useSnackbar();
	const [isOffline, isReOnline] = useOffline();

	useEffect(() => {
		// variant could be success, error, warning, info, or default
		if (isOffline) {
			enqueueSnackbar(`Sorry, you are offline ...`, {variant: 'warning'});
		}
	}, [isOffline]);

	useEffect(() => {
		// variant could be success, error, warning, info, or default
		if (isReOnline) {
			enqueueSnackbar('You are Re-online ...', {variant: 'success'});
		}
	}, [isReOnline]);

	return null;
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  );
}