import Event, { EventTypes } from './event';

export default class RunStatusEvent extends Event {

  constructor(run) {
    super(EventTypes.RUNSTATUS, run.created);
    this.html = 'Run Started';
  }
}