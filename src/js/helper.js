import { REQUEST_TIMEOUT } from './config';

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject('Timeout, request took too long.');
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
