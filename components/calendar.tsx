import { View, Text, Pressable, FlatList } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  markedDates?: Set<string>; // ISO date strings
}

export function Calendar({
  selectedDate,
  onDateSelect,
  markedDates = new Set(),
}: CalendarProps) {
  const colors = useColors();

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Create array of days (including empty cells for previous month)
  const days: (number | null)[] = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = firstDay.toLocaleString("pl-PL", { month: "long", year: "numeric" });

  const handlePrevMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    onDateSelect(newDate);
  };

  const handleNextMonth = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    onDateSelect(newDate);
  };

  const handleDayPress = (day: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newDate = new Date(currentYear, currentMonth, day);
    onDateSelect(newDate);
  };

  const isDateMarked = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const isoString = date.toISOString().split("T")[0];
    return markedDates.has(isoString);
  };

  const isDateSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  return (
    <View className="p-4 rounded-2xl" style={{ backgroundColor: colors.surface }}>
      {/* Header with month and navigation */}
      <View className="flex-row items-center justify-between mb-4">
        <Pressable
          onPress={handlePrevMonth}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </Pressable>

        <Text
          className="text-lg font-semibold capitalize"
          style={{ color: colors.foreground }}
        >
          {monthName}
        </Text>

        <Pressable
          onPress={handleNextMonth}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </Pressable>
      </View>

      {/* Weekday headers */}
      <View className="flex-row mb-2">
        {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((day) => (
          <View key={day} className="flex-1 items-center py-2">
            <Text
              className="text-xs font-semibold"
              style={{ color: colors.muted }}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View>
        {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
          <View key={weekIndex} className="flex-row">
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => (
              <View
                key={`${weekIndex}-${dayIndex}`}
                className="flex-1 items-center justify-center py-2"
              >
                {day === null ? (
                  <View className="w-10 h-10" />
                ) : (
                  <Pressable
                    onPress={() => handleDayPress(day)}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <View
                      className="w-10 h-10 items-center justify-center rounded-lg relative"
                      style={{
                        backgroundColor: isDateSelected(day)
                          ? colors.primary
                          : "transparent",
                      }}
                    >
                      <Text
                        className="text-sm font-semibold"
                        style={{
                          color: isDateSelected(day)
                            ? "white"
                            : colors.foreground,
                        }}
                      >
                        {day}
                      </Text>
                      {isDateMarked(day) && !isDateSelected(day) && (
                        <View
                          className="w-1 h-1 rounded-full absolute bottom-1"
                          style={{ backgroundColor: colors.primary }}
                        />
                      )}
                    </View>
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
