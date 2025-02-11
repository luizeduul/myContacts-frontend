/* eslint-disable arrow-body-style */
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Container, Header, ListHeader,
  Card,
  InputSearchContainer,
} from './styles';
import Loader from '../../components/Loader';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/pen.svg';
import trash from '../../assets/images/icons/trash.svg';
import delay from '../../utils/delay';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function loadContacts() {
      fetch(`http://localhost:3333/contacts?orderBy=${orderBy}`)
        .then(async (response) => {
          await delay(3000);
          const json = await response.json();
          setContacts(json);
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }

    loadContacts();

    return () => {
      setContacts([]);
    };
  }, [orderBy]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase()));
  }, [contacts, search]);

  const handleChangeOrder = () => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquise pelo nome"
          onChange={handleSearch}
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {contacts.length}
          {' '}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/novo">Novo contato</Link>
      </Header>

      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleChangeOrder}>
          <span>Nome</span>
          <img src={arrow} alt="Mudar ordenação" />
        </button>
      </ListHeader>

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              <small>{contact.category}</small>
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
    </Container>
  );
}
