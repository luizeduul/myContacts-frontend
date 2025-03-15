/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
import { Link } from 'react-router-dom';
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
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import useHome from './useHome';

export default function Home() {
  const {
    contacts,
    filteredContacts,
    orderBy,
    search,
    isLoading,
    hasError,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleChangeOrder,
    handleCloseDeleteModal,
    handleDeleteContact,
    handleDeleteConfirmContact,
    handleSearch,
    handletryAgain,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}?`}
        danger
        confirmLabel="Deletar"
        visible={isDeleteModalVisible}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleDeleteConfirmContact}
        loading={isLoadingDelete}
      >
        <p>Essa ação não poderá ser desfeita!</p>
      </Modal>
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
                  <small>{contact?.category?.name}</small>
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
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
