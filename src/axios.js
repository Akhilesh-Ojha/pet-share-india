import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev.petshare.in/'
})

export default instance;

