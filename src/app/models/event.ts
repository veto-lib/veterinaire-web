import { IPatient } from './patient';

export interface IEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  patient: IPatient;
  notes: string;
  callId: string;
}
