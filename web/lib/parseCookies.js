import cookie from 'cookie';

const parseCookies = (req) =>
  cookie.parse(req ? req.headers.cookie || '' : document.cookie);

export default parseCookies;
