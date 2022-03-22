import React, { useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import spinner from '../images/spinner.svg';
import { getCurrencyAction, getCountryAction } from '../actions/action';
import { useDispatch, useSelector } from 'react-redux';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Converter = () => {
	const [selectedOne, setSelectedOne] = useState([]);
	const [selectedTwo, setSelectedTwo] = useState([]);
	const [amount, setAmount] = useState('');
	const [exchange, setExchange] = useState({});
	const fixed = 'sell';

	const dispatch = useDispatch();

	const { currencyData } = useSelector((state) => state.currencyDetails);
	const { countryLists } = useSelector((state) => state.countryLists);

	useEffect(() => {
		dispatch(getCountryAction());
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			getCurrencyAction(
				selectedOne.currencies[0].code,
				selectedTwo.currencies[0].code,
				amount,
				fixed
			)
		);

		setExchange({
			from: selectedOne.currencies[0].code,
			to: selectedTwo.currencies[0].code,
		});
	};

	function checkObj(obj) {
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return obj;
	}
	function swapConversion() {
		setSelectedOne(selectedTwo);
		setSelectedTwo(selectedOne);
	}

	const rateCharge = 0.5 / 100;

	return (
		<div>
			{!countryLists ? (
				<>
					<div className='animate-spin h-10 w-10 m-auto mt-14'>
						<img src={spinner} alt='spinner loading' />
					</div>
				</>
			) : (
				<>
					<section className='pt-14 bg-white px-6 pb-14 shadow'>
						<h1 className='text-black text-2xl mb-10 font-semibold'>
							Paytron Exchange Rate
						</h1>
						<form onSubmit={onSubmit}>
							<div className='flex flex-row mb-6 gap-9 items-end'>
								<div className='flex-1'>
									<label
										className='font-bold text-sm mb-3 block'
										htmlFor='text'
									>
										Amount
									</label>
									<input
										type='number'
										className='focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2'
										value={amount}
										size='lg'
										onChange={(e) => setAmount(e.target.value)}
										placeholder='Enter amount'
									/>
								</div>
								<div className='flex-1'>
									<Listbox value={selectedOne} onChange={setSelectedOne}>
										{({ open }) => (
											<>
												<Listbox.Label className='font-bold text-sm mb-3 block'>
													From
												</Listbox.Label>
												<div className='mt-1 relative'>
													<Listbox.Button className='w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm'>
														<span className='flex items-center'>
															<img
																src={selectedOne.flag}
																alt=''
																className='flex-shrink-0 h-6 w-6 rounded-full'
															/>
															<span className='ml-3 block truncate'>
																{selectedOne.name}
															</span>
														</span>
														<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
															<SelectorIcon
																className='h-5 w-5 text-gray-400'
																aria-hidden='true'
															/>
														</span>
													</Listbox.Button>

													<Transition
														show={open}
														as={Fragment}
														leave='transition ease-in duration-100'
														leaveFrom='opacity-100'
														leaveTo='opacity-0'
													>
														<Listbox.Options
															static
															className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
														>
															{countryLists?.map((list, index) => (
																<Listbox.Option
																	key={index}
																	className={({ active }) =>
																		classNames(
																			active
																				? 'text-white bg-green-600'
																				: 'text-gray-900',
																			'cursor-default select-none relative py-2 pl-3 pr-9'
																		)
																	}
																	value={list}
																>
																	{({ selectedOne, active }) => (
																		<>
																			<div className='flex items-center'>
																				<img
																					src={list.flag}
																					alt={list.name}
																					className='flex-shrink-0 h-6 w-6 rounded-full'
																				/>
																				<span
																					className={classNames(
																						selectedOne
																							? 'font-semibold'
																							: 'font-normal',
																						'ml-3 block truncate'
																					)}
																				>
																					{list.name},
																				</span>
																			</div>

																			{selectedOne ? (
																				<span
																					className={classNames(
																						active
																							? 'text-white'
																							: 'text-green-600',
																						'absolute inset-y-0 right-0 flex items-center pr-4'
																					)}
																				>
																					<CheckIcon
																						className='h-5 w-5'
																						aria-hidden='true'
																					/>
																				</span>
																			) : null}
																		</>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</>
										)}
									</Listbox>
								</div>
								<div
									onClick={() => swapConversion()}
									className='border-2 border-blue-100 rounded-full p-4 cursor-pointer hover:border-green-300'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 17 17'
										aria-hidden='true'
										className='w-4 h-4 text-green-500 miscellany___StyledIconSwap-sc-1r08bla-1 fZJuOo'
									>
										<path
											fill='currentColor'
											fillRule='evenodd'
											d='M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z'
											clipRule='evenodd'
										></path>
									</svg>
								</div>
								<div className='flex-1'>
									<Listbox value={selectedTwo} onChange={setSelectedTwo}>
										{({ open }) => (
											<>
												<Listbox.Label className='block font-bold text-sm mb-3'>
													To
												</Listbox.Label>
												<div className='mt-1 relative'>
													<Listbox.Button className='w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm'>
														<span className='flex items-center'>
															<img
																src={selectedTwo.flag}
																alt=''
																className='flex-shrink-0 h-6 w-6 rounded-full'
															/>
															<span className='ml-3 block truncate'>
																{selectedTwo.name}
															</span>
														</span>
														<span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
															<SelectorIcon
																className='h-5 w-5 text-gray-400'
																aria-hidden='true'
															/>
														</span>
													</Listbox.Button>

													<Transition
														show={open}
														as={Fragment}
														leave='transition ease-in duration-100'
														leaveFrom='opacity-100'
														leaveTo='opacity-0'
													>
														<Listbox.Options
															static
															className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'
														>
															{countryLists?.map((list, index) => (
																<Listbox.Option
																	key={index}
																	className={({ active }) =>
																		classNames(
																			active
																				? 'text-white bg-green-600'
																				: 'text-gray-900',
																			'cursor-default select-none relative py-2 pl-3 pr-9'
																		)
																	}
																	value={list}
																>
																	{({ selectedTwo, active }) => (
																		<>
																			<div className='flex items-center'>
																				<img
																					src={list.flag}
																					alt={list.name}
																					className='flex-shrink-0 h-6 w-6 rounded-full'
																				/>
																				<span
																					className={classNames(
																						selectedTwo
																							? 'font-semibold'
																							: 'font-normal',
																						'ml-3 block truncate'
																					)}
																				>
																					{list.name}
																				</span>
																			</div>

																			{selectedTwo ? (
																				<span
																					className={classNames(
																						active
																							? 'text-white'
																							: 'text-green-600',
																						'absolute inset-y-0 right-0 flex items-center pr-4'
																					)}
																				>
																					<CheckIcon
																						className='h-5 w-5'
																						aria-hidden='true'
																					/>
																				</span>
																			) : null}
																		</>
																	)}
																</Listbox.Option>
															))}
														</Listbox.Options>
													</Transition>
												</div>
											</>
										)}
									</Listbox>
								</div>
							</div>
							<div className='flex justify-between mt-10  items-center'>
								<div>
									{checkObj(exchange) ? (
										<div>
											<p className='flex items-center text-xs font-regular text-gray-400'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-4 w-4'
													viewBox='0 0 20 20'
													fill='currentColor'
												>
													<path
														fillRule='evenodd'
														d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
														clipRule='evenodd'
													/>
												</svg>
												&nbsp; This conversion uses midmarket rates.
											</p>
										</div>
									) : !currencyData ? (
										<>
											<div className='animate-spin h-10 w-10 m-auto mt-14'>
												<img src={spinner} alt='spinner loading' />
											</div>
										</>
									) : (
										<>
											<div>
												<h1>Base Rate</h1>
												<div className='flex gap-1 mb-1'>
													<p className='font-semibold text-sm text-gray-500'>
														{currencyData.data.clientSellAmount} &nbsp;&nbsp;
														{currencyData.data.clientSellCurrency}
													</p>
													&nbsp;
													<p className='font-semibold text-sm text-gray-500'>
														rate &nbsp;&nbsp;
														{currencyData.data.midMarketRate} =
													</p>
												</div>
												<div className='flex gap-1 font-normal items-baseline'>
													<p className='text-xl font-bold'>
														{currencyData.data.clientBuyAmount}{' '}
														{currencyData.data.clientBuyCurrency}
													</p>
												</div>
											</div>
											<div>
												<h1>Paytron Rate</h1>
												<div className='flex gap-1 mb-1'>
													<p className='font-semibold text-sm text-gray-500'>
														{currencyData.data.clientSellAmount} &nbsp;
														{exchange.from}
													</p>
													<p className='font-semibold text-sm text-gray-500'>
														&nbsp;rate &nbsp;&nbsp;
														{parseFloat(
															currencyData.data.midMarketRate -
																rateCharge * currencyData.data.midMarketRate
														).toFixed(4)}
													</p>
													<p className='font-semibold text-sm text-gray-500'>
														&nbsp;&nbsp;charge &nbsp;
														{(
															currencyData.data.clientBuyAmount * rateCharge
														).toFixed(4)}{' '}
														=
													</p>
												</div>
												<div className='flex gap-1 font-normal items-baseline'>
													<p className='text-xl font-bold'>
														{currencyData.data.clientBuyAmount -
															(currencyData.data.clientBuyAmount * 0.5) / 100}
														{currencyData.data.clientBuyCurrency}
													</p>
												</div>
											</div>
										</>
									)}
								</div>
								<div>
									<button
										className={
											!amount
												? 'cursor-not-allowed inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-gray-300'
												: 'inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md text-white bg-green-500 hover:bg-green-600'
										}
									>
										Convert
									</button>
								</div>
							</div>
						</form>
					</section>
				</>
			)}
		</div>
	);
};

export default Converter;
