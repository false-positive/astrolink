import Cookies from 'cookies';
import getUser from '../../api/token';
import { getTeams } from '../../api/team';

const MyTeams = ({ teams }) => {
  console.log(teams);
  return <h1>Hello</h1>;
};

export default MyTeams;

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  const user = await getUser(token);
  const teams = await getTeams(user.id);

  return {
    props: {
      teams,
    },
  };
};
