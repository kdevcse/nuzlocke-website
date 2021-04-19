export var EventTypes = {
  CAPTURED: 0
}

export default class Event {
  eventType = null;
  date = null;
  html = '';

  constructor(type, date) {
    this.eventType = type;
    this.date = date;
  }

  get object() {
    return Object.assign({}, this);
  }
}
