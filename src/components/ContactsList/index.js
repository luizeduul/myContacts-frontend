import {
  Container, Header, ListContainer,
  Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/pen.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>
        <a href="/">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Mudar ordenação" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Luiz</strong>
              <small>Instagram</small>
            </div>
            <span>luizeduardr@gmail.com</span>
            <span>(44) 99999-9999</span>
          </div>
          <div className="actions">
            <a href="?">
              <img src={edit} alt="Edit" />
            </a>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Luiz</strong>
              <small>Instagram</small>
            </div>
            <span>luizeduardr@gmail.com</span>
            <span>(44) 99999-9999</span>
          </div>
          <div className="actions">
            <a href="?">
              <img src={edit} alt="Edit" />
            </a>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
