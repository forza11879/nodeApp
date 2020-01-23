import axios from 'axios';

const getWithRetry = async (url, numRetries = 3) => {
  let lastError = null;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numRetries; ++i) {
    try {
      const response = await axios.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      lastError = error;
      console.log('getWithRetry error: ', error);
    }
  }
  throw lastError;
};

export { getWithRetry };
