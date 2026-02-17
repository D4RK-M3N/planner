/**
 * Event type definitions for the Planner app
 */

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO 8601 format
  endDate: string; // ISO 8601 format
  location?: string;
  reminder?: ReminderTime; // minutes before event
  createdAt: string;
  updatedAt: string;
}

export type ReminderTime = 0 | 5 | 15 | 30 | 60 | 1440; // 0 = none, 1440 = 1 day

export interface ReminderOption {
  label: string;
  value: ReminderTime;
}

export const REMINDER_OPTIONS: ReminderOption[] = [
  { label: "Brak", value: 0 },
  { label: "5 minut przed", value: 5 },
  { label: "15 minut przed", value: 15 },
  { label: "30 minut przed", value: 30 },
  { label: "1 godzina przed", value: 60 },
  { label: "1 dzień przed", value: 1440 },
];

export interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  reminder: ReminderTime;
}
