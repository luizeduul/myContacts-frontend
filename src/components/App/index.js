import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import Header from '../Header';
import { Container } from './styles';
import Routes from '../../routes/index.routes';
import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer />
      <Container>
        <Header />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
