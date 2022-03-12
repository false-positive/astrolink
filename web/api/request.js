const makeRequest = (endpoint, options = {}) =>
  // fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}/`, {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}/`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

export default makeRequest;
