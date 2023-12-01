import LFooter from './Footer_L';
import MenuL from './MenuL';

export default function Layout({ children }) {
  return (
    <>
      {' '}
      <MenuL />
      {children}
      <LFooter />
    </>
  );
}
