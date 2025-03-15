import {
  Container,
} from './styles';
import Loader from '../../components/Loader';

import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

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

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && !hasContacts && !isLoading;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts?.length === 0;

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts ? (
        <InputSearch
          value={search}
          onChange={handleSearch}
        />
      ) : null}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handletryAgain} />}

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound search={search} />}

      {!hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleChangeOrder}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  );
}
