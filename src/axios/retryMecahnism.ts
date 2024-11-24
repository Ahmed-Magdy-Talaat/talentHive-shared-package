import { Axios, AxiosError } from 'axios';

/**
 * Retry a failed request with exponential backoff.
 *
 * @param error - The Axios error for the failed request.
 * @param retriesLeft - The number of retries left.
 *
 * This function will retry a request if it failed due to an ECONNABORTED error
 * or a server error. The delay between retries is exponential, with a maximum
 * of 3 retries. After the maximum number of retries is exceeded, the function
 * will return without retrying the request again.
 */
async function retryRequest(
  instance: Axios,
  error: AxiosError,
  retriesLeft: number
) {
  const maxRetries = 3;
  const delay = 1000;
  if (retriesLeft <= 0) {
    throw error;
  }
  if (
    error.code === 'ECONNABORTED' ||
    (error.response && error.response.status >= 500)
  ) {
    console.log(`Retrying request... (${maxRetries - retriesLeft + 1})`);
    await new Promise((res) =>
      setTimeout(res, delay * Math.pow(2, maxRetries - retriesLeft + 1))
    );
    if (error.config) {
      try {
        return await instance.request(error.config);
      } catch (error) {
        return retryRequest(instance, error as AxiosError, retriesLeft - 1);
      }
    } else {
      throw new Error(
        'Request cannot be retried due to missing configuration.'
      );
    }
  } else {
    throw error;
  }
}

export default retryRequest;
