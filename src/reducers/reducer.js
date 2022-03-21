import {
	FETCH_CURRENCY_SUCCESS,
	FETCH_CURRENCY_REQUEST,
	FETCH_CURRENCY_FAILURE,
	FETCH_COUNTRY_REQUEST,
	FETCH_COUNTRY_SUCCESS,
	FETCH_COUNTRY_FAILURE,
} from '../constants/constant';

export const getCurrencyReducer = (state = {}, action) => {
	switch (action.type) {
		case FETCH_CURRENCY_REQUEST:
			return { loading: true };
		case FETCH_CURRENCY_SUCCESS:
			return { loading: false, currencyData: action.payload };
		case FETCH_CURRENCY_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const getCountryReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_COUNTRY_REQUEST:
			return { loading: true };
		case FETCH_COUNTRY_SUCCESS:
			return { loading: false, countryLists: action.payload };
		case FETCH_COUNTRY_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
