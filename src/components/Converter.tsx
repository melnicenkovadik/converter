import React, {useEffect, useState} from "react";
import {ActiveInput, Currency, IConverterState} from "../models/models";
import {useLazyGetConvertedValueQuery} from "../store/currency/currency.api";
import SwitchIcon from "./SwitchIcon";

function Converter() {
    const [state, setState] = useState<IConverterState>({
        currencies: [Currency.EUR, Currency.UAH, Currency.USD],
        firstCurrency: Currency.USD,
        secondCurrency: Currency.EUR,
        activeInput: ActiveInput.First,
        amount: '',
        result: ''
    });
    const [getConvertedValue, {isLoading, isError, error, data: resultData}] = useLazyGetConvertedValueQuery();

    useEffect(() => {
        if (!isLoading && !isError && resultData) {
            setState({
                ...state,
                result: resultData.rates[Object.keys(resultData.rates)[0]].rate_for_amount ?? ''
            });
        }
    }, [state,isLoading, isError, resultData]);

    const handleFirstCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            firstCurrency: e.target.value as Currency
        });
    }

    const handleSecondCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            secondCurrency: e.target.value as Currency
        });
    }

    const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            amount: e.target.value,
            activeInput: ActiveInput.First
        });
    }

    const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            amount: e.target.value,
            activeInput: ActiveInput.Second
        });
    }

    const handleSwap = () => {
        setState({
            ...state,
            firstCurrency: state.secondCurrency,
            secondCurrency: state.firstCurrency
        });
    }

    const handleConvert = () => {
        const {firstCurrency, secondCurrency, amount, activeInput} = state;
        getConvertedValue({firstCurrency, secondCurrency, activeInput, amount: amount ? Number(amount) : 0})
    }

    const {currencies, firstCurrency, secondCurrency, amount, activeInput, result} = state;

    return (
        <div className="converter">
            <div className="converter__first">
                <select value={firstCurrency} onChange={handleFirstCurrencyChange}>
                    {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                </select>
                <input type="number" value={
                    activeInput === ActiveInput.First ? amount : result
                } onChange={handleFirstInputChange}/>
            </div>
            <div className='converter__swap'>
                <SwitchIcon onClick={handleSwap}/>
            </div>
            <div className="converter__second">
                <select value={secondCurrency} onChange={handleSecondCurrencyChange}>
                    {currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                </select>
                <input type="number" value={
                    activeInput === ActiveInput.Second ? amount : result
                } onChange={handleSecondInputChange}/>
            </div>

            <button onClick={handleConvert}>Convert</button>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {
                // @ts-ignore
                error && <p>{error?.message}</p>}
        </div>
    );
}

export default Converter;