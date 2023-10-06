import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";


interface CategoryProps {
  id: string | undefined,
  name: string | undefined,
}

class CategoriesService {
	private httpClient: HttpClient;

	constructor() {
		this.httpClient = new HttpClient("http://localhost:3001");
	}

	async listCategories() {
		const categories: CategoryProps[] = await this.httpClient.get("/categories");

		return categories.map(category => CategoryMapper.toDomain(category));

	}


}


export default new CategoriesService();
