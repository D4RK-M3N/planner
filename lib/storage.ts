/**
 * Storage service for managing events in AsyncStorage
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Event } from "@/types/event";

const EVENTS_KEY = "@planner_events";
const SETTINGS_KEY = "@planner_settings";

export interface AppSettings {
  theme: "light" | "dark" | "auto";
  firstDayOfWeek: 0 | 1; // 0 = Sunday, 1 = Monday
  notificationsEnabled: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: "auto",
  firstDayOfWeek: 1, // Monday
  notificationsEnabled: true,
};

/**
 * Get all events from storage
 */
export async function getEvents(): Promise<Event[]> {
  try {
    const data = await AsyncStorage.getItem(EVENTS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading events:", error);
    return [];
  }
}

/**
 * Save an event (create or update)
 */
export async function saveEvent(event: Event): Promise<void> {
  try {
    const events = await getEvents();
    const existingIndex = events.findIndex((e) => e.id === event.id);

    if (existingIndex >= 0) {
      // Update existing event
      events[existingIndex] = {
        ...event,
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Add new event
      events.push({
        ...event,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("Error saving event:", error);
    throw error;
  }
}

/**
 * Delete an event by ID
 */
export async function deleteEvent(eventId: string): Promise<void> {
  try {
    const events = await getEvents();
    const filtered = events.filter((e) => e.id !== eventId);
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

/**
 * Get a single event by ID
 */
export async function getEventById(eventId: string): Promise<Event | null> {
  try {
    const events = await getEvents();
    return events.find((e) => e.id === eventId) || null;
  } catch (error) {
    console.error("Error getting event:", error);
    return null;
  }
}

/**
 * Get events for a specific date
 */
export async function getEventsByDate(date: Date): Promise<Event[]> {
  try {
    const events = await getEvents();
    const targetDate = date.toISOString().split("T")[0];

    return events.filter((event) => {
      const eventDate = new Date(event.startDate).toISOString().split("T")[0];
      return eventDate === targetDate;
    });
  } catch (error) {
    console.error("Error getting events by date:", error);
    return [];
  }
}

/**
 * Get upcoming events (from today onwards)
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const events = await getEvents();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return events
      .filter((event) => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  } catch (error) {
    console.error("Error getting upcoming events:", error);
    return [];
  }
}

/**
 * Get app settings
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const data = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    console.error("Error loading settings:", error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save app settings
 */
export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  try {
    const current = await getSettings();
    const updated = { ...current, ...settings };
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving settings:", error);
    throw error;
  }
}

/**
 * Generate a unique ID for events
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
