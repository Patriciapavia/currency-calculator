import './App.css';
import Converter from './components/Converter';
import { Provider } from 'react-redux';
import store from './store';
function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<Converter />
			</Provider>
		</div>
	);
}

export default App;
