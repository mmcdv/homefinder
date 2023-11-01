import React from 'react'
import axios from 'axios';
import { rapidApiKey } from '../content';

export const fetchMortgageRate = async (postalCode) => {
  try {
    
    const response = await axios.get('https://realty-in-us.p.rapidapi.com/mortgage/v2/check-rates', {
      params: {
        postal_code: postalCode,
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'realtor.p.rapidapi.com',
      },
    });

    const mortgageData = response.data.data.loan_analysis.market.mortgage_data.average_rates;
    
    return mortgageData;
    
  } catch (error) {
    throw error;
  }
}