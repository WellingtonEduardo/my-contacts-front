
import HttpClient from "./utils/HttpClient";

interface ContactProps {
  name: string,
  email: string,
  phone: string,
  category_id: string
}



class ContactsService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:3001");
	}



	listContacts(orderBy: string = "asc") {

		return this.httpClient.get(`/contacts?orderBy=${orderBy}`);

	}

	getContactById(id: string) {

		return this.httpClient.get(`/contacts/${id}`);

	}



	createContact(contact: ContactProps) {
		return this.httpClient.post("/contacts", { body: contact });
	}


	updateContact(id: string, contact: ContactProps) {
		return this.httpClient.put(`/contacts/${id}`, { body: contact });
	}

	deleteContact(id: string) {
		return this.httpClient.delete(`/contacts/${id}`);
	}




}


export default new ContactsService();
