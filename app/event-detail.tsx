import { ScrollView, View, Text, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { useColors } from "@/hooks/use-colors";
import { getEventById, deleteEvent } from "@/lib/storage";
import type { Event } from "@/types/event";

export default function EventDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const { eventId } = useLocalSearchParams<{ eventId: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [eventId]);

  const loadEvent = async () => {
    if (!eventId) return;
    try {
      const eventData = await getEventById(eventId);
      setEvent(eventData);
    } catch (error) {
      console.error("Error loading event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    if (!event) return;

    Alert.alert(
      "Usuń Wydarzenie",
      `Czy na pewno chcesz usunąć "${event.title}"?`,
      [
        {
          text: "Anuluj",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Usuń",
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteEvent(event.id);
              router.back();
            } catch (error) {
              console.error("Error deleting event:", error);
              alert("Błąd podczas usuwania wydarzenia");
            } finally {
              setDeleting(false);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleEdit = () => {
    if (!event) return;
    router.push({
      pathname: "/edit-event",
      params: { eventId: event.id },
    });
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.muted }}>Ładowanie...</Text>
      </ScreenContainer>
    );
  }

  if (!event) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text style={{ color: colors.muted }}>Nie znaleziono wydarzenia</Text>
      </ScreenContainer>
    );
  }

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("pl-PL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={colors.primary} />
            </Pressable>
            <Text
              className="text-xl font-bold"
              style={{ color: colors.foreground }}
            >
              Szczegóły
            </Text>
            <View className="w-6" />
          </View>

          {/* Title */}
          <View className="gap-2">
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.foreground }}
            >
              {event.title}
            </Text>
          </View>

          {/* Date & Time */}
          <View
            className="rounded-2xl p-4 gap-3"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Data i czas
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {formatDateTime(startDate)}
                </Text>
              </View>
            </View>

            <View
              className="h-px"
              style={{ backgroundColor: colors.border }}
            />

            <View className="flex-row items-center gap-3">
              <Ionicons name="time" size={20} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Koniec
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {formatTime(endDate)}
                </Text>
              </View>
            </View>
          </View>

          {/* Location */}
          {event.location && (
            <View
              className="rounded-2xl p-4 flex-row items-center gap-3"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons name="location" size={20} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Lokalizacja
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {event.location}
                </Text>
              </View>
            </View>
          )}

          {/* Description */}
          {event.description && (
            <View className="gap-2">
              <Text
                className="text-sm font-semibold"
                style={{ color: colors.foreground }}
              >
                Opis
              </Text>
              <View
                className="rounded-2xl p-4"
                style={{ backgroundColor: colors.surface }}
              >
                <Text
                  className="text-base leading-relaxed"
                  style={{ color: colors.foreground }}
                >
                  {event.description}
                </Text>
              </View>
            </View>
          )}

          {/* Reminder */}
          {event.reminder && event.reminder > 0 && (
            <View
              className="rounded-2xl p-4 flex-row items-center gap-3"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons name="notifications" size={20} color={colors.primary} />
              <View className="flex-1">
                <Text
                  className="text-sm"
                  style={{ color: colors.muted }}
                >
                  Przypomnienie
                </Text>
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {event.reminder === 1440
                    ? "1 dzień przed"
                    : event.reminder === 60
                      ? "1 godzina przed"
                      : `${event.reminder} minut przed`}
                </Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <PrimaryButton
              onPress={handleEdit}
              title="Edytuj Wydarzenie"
            />
            <Pressable
              onPress={handleDelete}
              disabled={deleting}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                className="rounded-xl items-center justify-center py-3"
                style={{
                  backgroundColor: colors.error,
                }}
              >
                <Text className="text-base font-semibold text-white">
                  {deleting ? "Usuwanie..." : "Usuń Wydarzenie"}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
