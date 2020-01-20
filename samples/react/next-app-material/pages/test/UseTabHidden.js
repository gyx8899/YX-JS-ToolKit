import React from 'react';
import dynamic from 'next/dynamic';

const UseTabHidden = dynamic(() => import('./_useTabHidden'), {ssr: false});

function App() {

	return <UseTabHidden />;
}

export default App;