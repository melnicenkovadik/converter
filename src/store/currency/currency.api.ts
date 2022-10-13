import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ActiveInput, Currency, IResponse} from '../../models/models';

interface IBodyRequest {
       amount: number;
       firstCurrency: Currency;
       secondCurrency: Currency | Currency[];
       activeInput: ActiveInput;
}

export const currencyApi = createApi({
    reducerPath: 'currencyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://currency-converter5.p.rapidapi.com/',
    }),
    endpoints: (builder) => ({
        getConvertedValue: builder.query<IResponse,IBodyRequest >({
            query: (params) => {
                const {amount, firstCurrency, secondCurrency, activeInput} = params;
                return ({
                    url: 'currency/convert',
                    method: 'GET',
                    params: {
                        "format": "json",
                        "from": activeInput === ActiveInput.First
                            ? firstCurrency
                            : secondCurrency ,
                        "to": activeInput === ActiveInput.First
                            ? secondCurrency
                            : firstCurrency,
                        "amount": amount,
                        language: 'ru'
                    },
                    headers: {
                        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
                    }
                })
            },
        }),
    }),
});

export const {useLazyGetConvertedValueQuery} = currencyApi;
