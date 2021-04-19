import Event, { EventTypes } from './event';

export default class RunStatusEvent extends Event {

  constructor(run) {
    super(EventTypes.RUNSTATUS, run.created);
    this.html = `<strong>${run.trainerName}</strong> begins their Pokemon journey!`;
  }
}