import parseCookies from './parseCookies';

const withAuth = (f) => (ctx) => {
  const cookies = parseCookies(ctx.req);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return f(ctx);
};

export default withAuth;
