import { useState } from 'react';
import logo from './logo.svg';
import * as routers from "./routers";
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import { store, persistor  } from '../src/redux/Store'; 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


/*
function App() {
	const { REACT_APP_API_URL } = process.env;
	const [resp, setResp] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const handleClickTest = async () => {
		console.log('REACT_APP_API_URL', REACT_APP_API_URL);
		setError(null);
		setResp(null);
		setLoading(true);
		await fetch(REACT_APP_API_URL)
			.then((response) => !console.log(response) && response.json())
			.then((data) => {
				console.log(data);
				setResp(data);
			})
			.catch((err) => {
				console.error('err:', err);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Project MBDS 2024 - SKELETON
				</p>
				<br />
				<button type="button" onClick={handleClickTest}>Call API for test</button>
				{loading && <p>loading...</p>}
				{resp && <p>ok = {resp}</p>}
				{error && <p>error = {error}</p>}
			</header>
		</div>
	);
}
*/


function App() {
	return (
		
		<div className="App">
		  <Provider store={store}>
		  <PersistGate loading={null} persistor={persistor}>
		  <routers.RootRouter/>
		  </PersistGate>
		  </Provider>
		</div>
	  );
}

export default App;
