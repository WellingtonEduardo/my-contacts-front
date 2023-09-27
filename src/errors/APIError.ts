export default class APIError extends Error {

	response: Response;
	body: { error: string } | null;

	constructor(
		response: Response,
		body: { error: string } | null) {

		super();

		this.name = "APIError";
		this.message = body?.error || `${response.status} - ${response.statusText}`;
		this.response = response;
		this.body = body;

	}


}
