import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev.petshare.in:8000/'
})

export default instance;

