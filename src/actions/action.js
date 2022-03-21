import axios from 'axios';
import {
	FETCH_CURRENCY_SUCCESS,
	FETCH_CURRENCY_REQUEST,
	FETCH_CURRENCY_FAILURE,
	FETCH_COUNTRY_REQUEST,
	FETCH_COUNTRY_SUCCESS,
	FETCH_COUNTRY_FAILURE,
} from '../constants/constant';

export const getCurrencyAction =
	(selectedOne, selectedTwo, amount, fixed) => async (dispatch) => {
		try {
			dispatch({ type: FETCH_CURRENCY_REQUEST });

			const data = await axios.get(
				`https://wnvgqqihv6.execute-api.ap-southeast-2.amazonaws.com/Public/public/rates?Sell=${selectedOne}&Buy=${selectedTwo}&Amount=${amount}&Fixed=${fixed}`
			);

			dispatch({ type: FETCH_CURRENCY_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: FETCH_CURRENCY_FAILURE,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const getCountryAction = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_COUNTRY_REQUEST });

		const { data } = await axios.get('https://restcountries.com/v2/all');

		// const results = data.map(({ name, flag, alpha2Code, currencies }) => ({
		// 	name,
		// 	flag,
		// 	alpha2Code,
		// 	currencies,
		// }));

		dispatch({ type: FETCH_COUNTRY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FETCH_COUNTRY_FAILURE,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
