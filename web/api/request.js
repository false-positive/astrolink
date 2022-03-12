export const makeNonJsonRequest = (endpoint, options = {}) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}/`, {
    ...options,
    headers: {
      ...options.headers,
    },
  });

const makeRequest = (endpoint, options = {}) =>
  makeNonJsonRequest(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

export default makeRequest;
