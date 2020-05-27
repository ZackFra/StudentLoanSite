import axios from 'axios';

export function login(credentials) {
    return axios.post('/Login', credentials);
}

export function getAccounts() {
    return axios.get('/Data/GetInfo');
}