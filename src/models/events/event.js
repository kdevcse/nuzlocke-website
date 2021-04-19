export var EventTypes = {
  RUNSTATUS: 0,
  CAPTURED: 1,
  DEATH: 2,
  LVLUP: 3,
  EVOLVED: 4
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
