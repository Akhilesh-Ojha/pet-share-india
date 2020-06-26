import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://35.154.113.82/'
})

export default instance;

