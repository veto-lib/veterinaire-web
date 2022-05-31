import { Patient } from './patient';

export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  patient: Patient;
  notes: string;
  callId: string;
}
