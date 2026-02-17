import { ScrollView, View, Text, TextInput, Pressable, Modal, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";
import { PrimaryButton } from "@/components/buttons/primary-button";
import { SecondaryButton } from "@/components/buttons/secondary-button";
import { useColors } from "@/hooks/use-colors";
import { saveEvent, generateId } from "@/lib/storage";
import { REMINDER_OPTIONS, type ReminderTime } from "@/types/event";

export default function AddEventScreen() {
  const colors = useColors();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 3600000)); // +1 hour
  const [reminder, setReminder] = useState<ReminderTime>(15);
  const [loading, setLoading] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowStartDatePicker(false);
    }
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowStartTimePicker(false);
    }
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowEndDatePicker(false);
    }
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleEndTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowEndTimePicker(false);
    }
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Proszę wpisać tytuł wydarzenia");
      return;
    }

    setLoading(true);
    try {
      const newEvent = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        reminder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveEvent(newEvent);
      router.back();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Błąd podczas zapisywania wydarzenia");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const reminderLabel = REMINDER_OPTIONS.find((opt) => opt.value === reminder)?.label || "Brak";

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View className="flex-row items-center justify-between">
            <Text
              className="text-2xl font-bold"
              style={{ color: colors.foreground }}
            >
              Nowe Wydarzenie
            </Text>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="close" size={24} color={colors.muted} />
            </Pressable>
          </View>

          {/* Title Input */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Tytuł *
            </Text>
            <TextInput
              placeholder="Nazwa wydarzenia"
              placeholderTextColor={colors.muted}
              value={title}
              onChangeText={setTitle}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Description Input */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Opis
            </Text>
            <TextInput
              placeholder="Dodaj opis (opcjonalnie)"
              placeholderTextColor={colors.muted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Location Input */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Lokalizacja
            </Text>
            <TextInput
              placeholder="Gdzie się odbędzie?"
              placeholderTextColor={colors.muted}
              value={location}
              onChangeText={setLocation}
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.foreground,
              }}
            />
          </View>

          {/* Start Date & Time */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Data i czas rozpoczęcia
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setShowStartDatePicker(true)}
                className="flex-1 rounded-xl p-3 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.foreground }}>
                  {formatDate(startDate)}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setShowStartTimePicker(true)}
                className="flex-1 rounded-xl p-3 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.foreground }}>
                  {formatTime(startDate)}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* End Date & Time */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Data i czas zakończenia
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setShowEndDatePicker(true)}
                className="flex-1 rounded-xl p-3 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.foreground }}>
                  {formatDate(endDate)}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setShowEndTimePicker(true)}
                className="flex-1 rounded-xl p-3 border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.foreground }}>
                  {formatTime(endDate)}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Reminder */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Przypomnienie
            </Text>
            <Pressable
              onPress={() => setShowReminderPicker(true)}
              className="rounded-xl p-3 border flex-row items-center justify-between"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.foreground }}>
                {reminderLabel}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <PrimaryButton
              onPress={handleSave}
              title="Zapisz Wydarzenie"
              loading={loading}
            />
            <SecondaryButton
              onPress={() => router.back()}
              title="Anuluj"
            />
          </View>
        </View>
      </ScrollView>

      {/* Date/Time Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleStartDateChange}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startDate}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleStartTimeChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleEndDateChange}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endDate}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleEndTimeChange}
        />
      )}

      {/* Reminder Picker Modal */}
      <Modal
        visible={showReminderPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowReminderPicker(false)}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View
            className="rounded-t-3xl p-6"
            style={{ backgroundColor: colors.surface }}
          >
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: colors.foreground }}
            >
              Wybierz przypomnienie
            </Text>
            {REMINDER_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  setReminder(option.value);
                  setShowReminderPicker(false);
                }}
                className="py-3 px-4 rounded-lg mb-2"
                style={{
                  backgroundColor:
                    reminder === option.value ? colors.primary : colors.background,
                }}
              >
                <Text
                  style={{
                    color:
                      reminder === option.value ? "white" : colors.foreground,
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
            <SecondaryButton
              onPress={() => setShowReminderPicker(false)}
              title="Gotowe"
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
