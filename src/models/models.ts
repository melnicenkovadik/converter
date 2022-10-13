
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  UAH = 'UAH',
}

export enum ActiveInput {
  First = 'first',
  Second = 'second'
}

export interface IConverterState {
  currencies: Currency[]
  firstCurrency: Currency
  secondCurrency: Currency
  amount: string
  result: string
  activeInput: ActiveInput
}


export interface Cur {
  currency_name: string;
  rate: string;
  rate_for_amount: string;
}

export interface Rates {
  [key:string]: Cur;
}

export interface IResponse {
  base_currency_code: string;
  base_currency_name: string;
  amount: string;
  updated_date: string;
  rates: Rates;
  status: string;
}
