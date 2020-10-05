import axios from 'axios';

const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
});

const requestAll = (promiseArr)=>axios.all(promiseArr)

export {request,requestAll};
 