
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



	async listContacts(orderBy: string = "asc") {

		return this.httpClient.get(`/contacts?orderBy=${orderBy}`);

	}


	async createContact(contact: ContactProps) {
		return this.httpClient.post("/contacts", { body: contact });
	}


}


export default new ContactsService();
