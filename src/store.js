import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getCurrencyReducer, getCountryReducer } from './reducers/reducer';
const reducer = combineReducers({
	currencyDetails: getCurrencyReducer,
	countryLists: getCountryReducer,
});

const middleware = [thunk];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
