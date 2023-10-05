
interface PayloadProps {
  type: "default" | "danger" | "success",
  text: string,
  duration?: number
}

export default class EventManager {
	private listeners: Map<string, ((payload: PayloadProps) => void)[]>;

	constructor() {
		this.listeners = new Map();
	}

	addEvenListener(event: string, listener: (payload: PayloadProps) => void) {
		if (!this.listeners.get(event)) {
			this.listeners.set(event, []);
		}

		this.listeners.get(event)?.push(listener);
	}


	emit(event: string, payload: PayloadProps) {

		if (!this.listeners.get(event)) {
			return;
		}

		this.listeners.get(event)?.forEach((listener) => {
			listener(payload);
		});
	}


	removeListener(event: string, listenerToRemove: (payload: PayloadProps) => void) {
		const listeners = this.listeners.get(event);

		if (!listeners) {
			return;
		}

		const filteredListeners = listeners.filter(
			(listener) => listener !== listenerToRemove
		);

		this.listeners.set(event, filteredListeners);

	}




}
