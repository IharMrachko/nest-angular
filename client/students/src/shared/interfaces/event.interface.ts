export interface EventInterface {
  id?: number;
  coords: CoordsInterface;
  value: ValueEvent[]
}

export interface CoordsInterface {
  indDay: number;
  indWeek: number;
  month: number;
}

export interface ValueEvent {
  id?: number;
  idEvent?: number;
  branch: string;
  date: Date;
  time: string;
  title: string;
  type: string;
}
