export type AnimalType =
  | 'Chat'
  | 'Chien'
  | 'Oiseau'
  | 'Lézard'
  | 'Poisson'
  | 'Cheval'
  | 'Rongeur';

export type EventReason =
  | 'Vaccination'
  | 'Consultation'
  | 'Identification'
  | 'Visite de contrôle';

export type Hours = {
  day: string;
  timeSlot: string;
}[];

export type PaymentMeans = 'CB' | 'Chèques' | 'Liquide';
