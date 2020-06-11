import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://35.154.113.82/'
})

export default instance;

