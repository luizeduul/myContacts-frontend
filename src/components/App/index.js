import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import Header from '../Header';
import { Container } from './styles';
import Router from '../../router/index.router';
import ToastContainer from '../Toast/ToastContainer';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <ToastContainer />
      <Container>
        <Header />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
