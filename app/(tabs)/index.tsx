import { ScrollView, View, Text, FlatList } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { Calendar } from "@/components/calendar";
import { EventCard } from "@/components/event-card";
import { FloatingActionButton } from "@/components/floating-action-button";
import { useColors } from "@/hooks/use-colors";
import { getEventsByDate, getEvents } from "@/lib/storage";
import type { Event } from "@/types/event";

export default function HomeScreen() {
  const colors = useColors();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [markedDates, setMarkedDates] = useState<Set<string>>(new Set());

  // Load all events and marked dates
  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    try {
      const events = await getEvents();
      setAllEvents(events);

      // Create set of marked dates
      const marked = new Set<string>();
      events.forEach((event) => {
        const date = new Date(event.startDate).toISOString().split("T")[0];
        marked.add(date);
      });
      setMarkedDates(marked);

      // Load events for selected date
      const dayEventsData = await getEventsByDate(selectedDate);
      setDayEvents(dayEventsData);
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const handleDateSelect = async (date: Date) => {
    setSelectedDate(date);
    try {
      const events = await getEventsByDate(date);
      setDayEvents(events);
    } catch (error) {
      console.error("Error loading day events:", error);
    }
  };

  const handleAddEvent = () => {
    router.push("/add-event");
  };

  const handleEventPress = (eventId: string) => {
    router.push({
      pathname: "/event-detail",
      params: { eventId },
    });
  };

  const selectedDateString = selectedDate.toLocaleDateString("pl-PL", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View>
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.foreground }}
            >
              Mój Kalendarz
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: colors.muted }}
            >
              Zarządzaj swoimi wydarzeniami
            </Text>
          </View>

          {/* Calendar */}
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            markedDates={markedDates}
          />

          {/* Selected Date Events */}
          <View>
            <Text
              className="text-lg font-semibold mb-3 capitalize"
              style={{ color: colors.foreground }}
            >
              {selectedDateString}
            </Text>

            {dayEvents.length > 0 ? (
              <FlatList
                scrollEnabled={false}
                data={dayEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <EventCard
                    event={item}
                    onPress={() => handleEventPress(item.id)}
                  />
                )}
              />
            ) : (
              <View className="items-center py-8">
                <Text
                  className="text-base"
                  style={{ color: colors.muted }}
                >
                  Brak wydarzeń w tym dniu
                </Text>
              </View>
            )}
          </View>

          {/* Spacer for FAB */}
          <View className="h-20" />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={handleAddEvent}
        label="Dodaj"
        icon="add"
      />
    </ScreenContainer>
  );
}
