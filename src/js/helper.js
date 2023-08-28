import { REQUEST_TIMEOUT } from './config';

export const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Timeout, request took too long.');
    }, sec * 1000);
  });
};
export const wait = function (sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Timeout, request took too long.');
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(REQUEST_TIMEOUT)]);
    const data = await response.json();
    console.log(data);
    if (response.status !== 200) throw new Error("Couldn't fetch data.");
    return data;
  } catch (error) {
    throw error;
  }
};
export const AJAX = async function (url, jsonData = '') {
  try {
    const fetchPromise =
      jsonData !== ''
        ? fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          })
        : fetch(url);
    const response = await Promise.race([
      fetchPromise,
      timeout(REQUEST_TIMEOUT),
    ]);
    if (!response.ok) throw new Error("Couldn't fetch data.");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
