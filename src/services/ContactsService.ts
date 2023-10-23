
import ContactMapper from "./mappers/ContactMapper";
import HttpClient from "./utils/HttpClient";

interface ContactProps {
  name: string,
  email: string,
  phone: string,
  categoryId: string
}

interface Contact {
  name: string,
  email: string,
  phone: string,
  id: string,
  category_id: string | undefined,
  category_name: string | undefined,
}


class ContactsService {

	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:3001");
	}



	async listContacts(orderBy: string = "asc") {
		const contacts: Contact[] = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);



		return contacts.map(contact => ContactMapper.toDomain(contact)
		);



	}

	async getContactById(id: string, signal: AbortSignal) {

		const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

		return ContactMapper.toDomain(contact);

	}



	createContact(contact: ContactProps) {
		const body = ContactMapper.toPersistence(contact);

		return this.httpClient.post("/contacts", { body });
	}


	updateContact(id: string, contact: ContactProps) {

		const body = ContactMapper.toPersistence(contact);
		return this.httpClient.put(`/contacts/${id}`, { body });
	}

	deleteContact(id: string) {
		return this.httpClient.delete(`/contacts/${id}`);
	}




}


export default new ContactsService();
