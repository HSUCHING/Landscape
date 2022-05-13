import axios from 'axios';

axios.defaults.timeout = 50000;
 
//http request interceptors
axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Accept": "application/vnd.github.inertia-preview+json",
      // "Authorization": "Bearer t-9690b36e308150d839ffbbaeb90b884b2166a7ae"
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response interceptors
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return response;
    } else {
      return Promise.reject(response.status);
    }
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * GET request
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function fetch(url,headers){
  const axiosInstance = axios.create({
    headers: Object.assign({},headers)
  });
  return new Promise((resolve, reject) => {
    axiosInstance.get(url)
      .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

export async function post(url,params,headers){
  const axiosInstance = axios.create({
    headers: Object.assign({},headers)
  });
  return new Promise((resolve, reject) => {
    axiosInstance.post(url,params)
      .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

