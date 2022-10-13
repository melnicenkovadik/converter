import {useLazyGetConvertedValueQuery} from "../store/currency/currency.api";
import React, {useEffect} from "react";
import {ActiveInput, Currency} from "../models/models";

function AppHeader() {
    const [getConvertedValue, {isLoading, isError, error, data: resultData}] = useLazyGetConvertedValueQuery();
    useEffect(() => {
        getConvertedValue({
            amount: 100,
            firstCurrency: Currency.UAH,
            secondCurrency: [Currency.EUR, Currency.USD],
            activeInput: ActiveInput.First
        });
    }, [getConvertedValue]);

    return (
        <header className="app-header">

            {isLoading && !isError
                ? <div>Loading...</div>
                : <div className='d-flex'>
                    <div>EUR {resultData?.rates.EUR.rate}</div>
                    <div className='ml-2'>USD {resultData?.rates.USD.rate}</div>
                </div>}
            {isError && <div className='error'>{
                // @ts-ignore
                error?.message}</div>}
        </header>
    );
}
export default AppHeader;