import PWABadge from './PWABadge';
import Routes from './routes';
import './styles/global.scss';

function App(): JSX.Element {
  return (
    <>
      <PWABadge />
      <Routes />;
    </>
  );
}

export default App;
