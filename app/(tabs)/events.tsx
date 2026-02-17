import { ScrollView, View, Text, FlatList } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { EventCard } from "@/components/event-card";
import { useColors } from "@/hooks/use-colors";
import { getUpcomingEvents } from "@/lib/storage";
import type { Event } from "@/types/event";

export default function EventsScreen() {
  const colors = useColors();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const loadEvents = async () => {
    setLoading(true);
    try {
      const upcomingEvents = await getUpcomingEvents();
      setEvents(upcomingEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventPress = (eventId: string) => {
    router.push({
      pathname: "/event-detail",
      params: { eventId },
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-8">
          {/* Header */}
          <View>
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.foreground }}
            >
              Nadchodzące
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: colors.muted }}
            >
              {events.length} {events.length === 1 ? "wydarzenie" : "wydarzeń"}
            </Text>
          </View>

          {/* Events List */}
          {loading ? (
            <View className="items-center py-8">
              <Text style={{ color: colors.muted }}>Ładowanie...</Text>
            </View>
          ) : events.length > 0 ? (
            <FlatList
              scrollEnabled={false}
              data={events}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  onPress={() => handleEventPress(item.id)}
                />
              )}
            />
          ) : (
            <View className="items-center py-12">
              <Text
                className="text-lg"
                style={{ color: colors.muted }}
              >
                Brak nadchodzących wydarzeń
              </Text>
              <Text
                className="text-sm mt-2"
                style={{ color: colors.muted }}
              >
                Dodaj nowe wydarzenie, aby je tutaj zobaczyć
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
