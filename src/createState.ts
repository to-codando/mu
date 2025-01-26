import type { EventBusListener, EventBusEvent } from "createEventBus";
import type { PlainObject } from "types";

import { createEventBus } from "createEventBus";

export type Model<T> = PlainObject<T>;
export type StateHandler = EventBusListener;
export type State<T> = {
  set: (value: Model<T>) => void;
  get: () => Model<T>;
  on: (stateHandler: StateHandler) => EventBusEvent;
  off: (event: EventBusEvent) => void;
};

export const createState = <T>(initialState: Model<T>): State<T> => {
  let _stateValue: Model<T> = initialState;
  const _eventBus = createEventBus();

  const _getDeepCopy = (value: PlainObject<T>): PlainObject<T> => {
    return JSON.parse(JSON.stringify(value));
  };

  const _getDeepStateCopy = (): PlainObject<T> => {
    return _getDeepCopy(_stateValue) as Model<T>;
  };

  const set = (value: Model<T>) => {
    _stateValue = { ..._getDeepStateCopy(), ..._getDeepCopy(value) };
    _eventBus.emit("stateChange", _getDeepStateCopy());
  };

  const get = (): Model<T> => _getDeepStateCopy();

  const on = (stateHandler: StateHandler): EventBusEvent => {
    return _eventBus.on("stateChange", stateHandler);
  };

  const off = (event: EventBusEvent): void => {
    _eventBus.off(event);
  };

  return {
    get,
    set,
    on,
    off,
  };
};
