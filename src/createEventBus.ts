export type EventBusListener = (value: unknown) => void;

export type EventBusEvent = {
  eventName: string;
  listener: EventListener;
};

export type EventBus = {
  on: (eventName: string, listener: EventBusListener) => Event;
  off: (event: EventBusEvent) => void;
};

export const createEventBus = () => {
  const _events = new Map();

  const on = (eventName: string, listener: EventBusListener): EventBusEvent => {
    if (!_events.has(eventName)) {
      const newEvent = new Set();
      _events.set(eventName, newEvent);
    }

    const listeners = _events.get(eventName);

    if (listeners.has(listener)) {
      throw new Error(`Listener already subscribed for event: ${eventName}`);
    }

    listeners.add(listener);

    return { eventName, listener };
  };

  const off = ({ eventName, listener }: EventBusEvent) => {
    if (_events.has(eventName)) {
      _events.get(eventName).delete(listener);
    }
  };

  const emit = (eventName: string, payload: unknown) => {
    if (_events.has(eventName)) {
      const listeners = _events.get(eventName);
      for (const listener of listeners) listener(payload);
    }
  };

  return { on, off, emit };
};
