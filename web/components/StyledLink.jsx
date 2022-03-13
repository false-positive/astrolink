import Link from 'next/link';

const StyledLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href} passHref>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export default StyledLink;
