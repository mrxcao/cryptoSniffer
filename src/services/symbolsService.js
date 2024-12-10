import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function getSymbol(authorization, symbol) {    
    const headers = {authorization}
    const response = await axios.get(`${API_URL}/symbols/getBySymbol/${symbol}`,{headers} );
    return response.data;
}
export async function getSymbols(authorization) {    
    const headers = {authorization}
    const response = await axios.get(`${API_URL}/symbols/get`,{headers} );
    return response.data;
}
export async function updateSymbols(props, authorization) {    
    const headers = {authorization}
    const response = await axios.put(`${API_URL}/symbols`,props,{headers}  );
    return response.data;
}
export async function syncSymbols(authorization) {    
    const headers = {authorization}
    const response = await axios.post(`${API_URL}/symbols/syncro`,{},{headers}  );
    return response.data;
}