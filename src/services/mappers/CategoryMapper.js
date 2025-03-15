class CategoryMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
    };
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
    };
  }
}

export default new CategoryMapper();
