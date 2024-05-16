import { Dayjs } from 'dayjs';

export interface FormData {
    systolic: string;
    diastolic: string;
}

export interface CountryType {
    code: string;
    label: string;
}

export interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface Timetable {
  day: string;
  activity: string;
}