import APIError from "@/errors/APIError";
import delay from "@/utils/delay";

interface ContactProps {
  name: string,
  email: string,
  phone: string,
  category_id: string
}


interface OptionProps {
  body?: ContactProps,
  headers?: object
  method: string,
  signal?: AbortSignal
}


class HttpClient {
	private baseURL: string;

	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}


	get(path: string, options?: { headers?: object , signal?: AbortSignal }) {

		return this.makeRequest(path, { method: "get", headers: options?.headers , signal: options?.signal});
	}

	post(path: string, options: {
    body: ContactProps,
    headers?: object
  }) {

		return this.makeRequest(path, {
			body: options?.body,
			headers: options?.headers,
			method: "POST"
		});

	}

	put(path: string, options: {
    body: ContactProps,
    headers?: object
  }) {

		return this.makeRequest(path, {
			body: options?.body,
			headers: options?.headers,
			method: "PUT"
		});

	}

	delete(path: string, options?: {
    headers?: object
  }) {

		return this.makeRequest(path, {
			headers: options?.headers,
			method: "DELETE"
		});

	}



	async makeRequest(path: string, options: OptionProps) {


		await delay(500);

		const headers = new Headers();


		if (options.body) {
			headers.append("Content-Type", "application/json");
		}

		if (options.headers) {
			Object.entries(options.headers).forEach(([key, value]) => {
				headers.append(key, value);
			});
		}

		const response = await fetch(`${this.baseURL}${path}`, {
			method: options.method,
			body: JSON.stringify(options.body),
			headers,
			signal: options.signal
		});


		let body = null;

		const contentType = response.headers.get("Content-Type");
		if (contentType?.includes("application/json")) {
			body = await response.json();
		}

		if (response.ok) {
			return body;
		}

		throw new APIError(response, body);
	}

}

export default HttpClient;
