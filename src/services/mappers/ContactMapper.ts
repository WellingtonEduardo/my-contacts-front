interface Contact {
  name: string,
  email: string,
  phone: string,

}



interface DomainContact extends Contact {
  categoryId: string
}

interface PersistenceContact extends Contact {
  id: string,
  category_id: string | undefined,
  category_name: string | undefined,

}



class ContactMapper {

	toPersistence(domainContact: DomainContact) {

		return {
			name: domainContact.name,
			email: domainContact.email,
			phone: domainContact.phone,
			category_id: domainContact.categoryId
		};

	}

	toDomain(persistenceContact: PersistenceContact) {
		// console.log("foi", persistenceContact);

		return {
			id: persistenceContact.id,
			name: persistenceContact.name,
			email: persistenceContact.email,
			phone: persistenceContact.phone,
			category: {
				id: persistenceContact.category_id,
				name: persistenceContact.category_name
			}

		};


	}


}



export default new ContactMapper();
