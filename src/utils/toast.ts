import EventManager from "@/lib/EventManager";

interface toastProps {
  type: "danger" | "default" | "success",
  text: string,
  duration?: number
}

export const toastEventManager = new EventManager();

export default function toast({ type, text, duration }: toastProps) {

	toastEventManager.emit("addtoast", { type, text, duration });

}
