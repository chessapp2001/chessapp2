import AFooter from './Footer_A';
import Menu from './Menu';

export default function Layout({ children }) {
  return (
    <>
      {' '}
      <Menu />
      {children}
      <AFooter />
    </>
  );
}
