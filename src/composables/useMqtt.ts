import mqtt, { type MqttClient } from "mqtt";
import { ref } from "vue";

const VITE_WIRENBOARD_IP = import.meta.env.VITE_WIRENBOARD_IP;

type Handler = (topic: string, payload: string) => void;

let client: MqttClient | null = null;
const handlers = new Set<Handler>();

const isOnline = ref<boolean>(false);

export function useMqtt(url = `ws://${VITE_WIRENBOARD_IP}/mqtt`) {
  if (!client) {
    client = mqtt.connect(url);

    client.on("connect", () => {
      isOnline.value = true;
    });

    client.on("message", (topic, message) => {
      const payload = message.toString();
      for (const h of handlers) h(topic, payload);
    });

    client.on("reconnect", () => {
      isOnline.value = false;
    });

    client.on("disconnect", () => {
      isOnline.value = false;
    });
  }

  const onMessage = (handler: Handler) => {
    handlers.add(handler);
    return () => handlers.delete(handler);
  };

  const subscribe = (topic: string) => client!.subscribe(topic);
  const unsubscribe = (topic: string) => client!.unsubscribe(topic);
  const publish = (topic: string, payload: string) =>
    client!.publish(topic, payload);
  const getClient = () => client!;

  return { getClient, onMessage, subscribe, unsubscribe, publish, isOnline };
}
