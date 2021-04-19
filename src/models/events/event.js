export var EventTypes = {
  RUNSTATUS: 0,
  CAPTURED: 1
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
