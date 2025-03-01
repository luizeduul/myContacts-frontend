/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container, Header, ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
} from './styles';
import Loader from '../../components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/pen.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import ContactsService from '../../services/ContactsService';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);

    try {
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);

      setContacts(contactsList);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
    return () => {
      setContacts([]);
    };
  }, [loadContacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()));
  }, [contacts, search]);

  const handleChangeOrder = () => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handletryAgain = () => {
    loadContacts();
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length ? (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquise pelo nome"
            onChange={handleSearch}
          />
        </InputSearchContainer>
      ) : null}
      <Header justifyContent={
        hasError ? 'flex-end' : (
          contacts.length > 0 ? 'space-between' : 'center'
        )
      }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {contacts.length}
            {' '}
            {contacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/novo">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos</strong>
            <Button
              type="button"
              onClick={handletryAgain}
            >
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length === 0 && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado.
                Clique no botão <strong>"Novo contato"</strong>
                acima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 ? (
            <div>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>
                Nenhum resultado foi encontrado para <strong>{search}</strong>.
              </span>
            </div>
          ) : null}
          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleChangeOrder}>
                <span>Nome</span>
                <img src={arrow} alt="Mudar ordenação" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  <small>{contact.category_name}</small>
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button">
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
