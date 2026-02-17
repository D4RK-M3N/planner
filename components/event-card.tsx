import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/use-colors";
import { Event } from "@/types/event";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  onPress: () => void;
  onDelete?: () => void;
}

export function EventCard({ event, onPress, onDelete }: EventCardProps) {
  const colors = useColors();

  const startTime = new Date(event.startDate);
  const timeString = startTime.toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = startTime.toLocaleDateString("pl-PL", {
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        className="flex-row items-center rounded-2xl p-4 mb-3 border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftWidth: 4,
          borderLeftColor: colors.primary,
        }}
      >
        {/* Left accent bar handled by border-left */}

        {/* Content */}
        <View className="flex-1 ml-2">
          <Text
            className="text-base font-semibold"
            style={{ color: colors.foreground }}
            numberOfLines={1}
          >
            {event.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.muted}
              style={{ marginRight: 4 }}
            />
            <Text
              className="text-sm"
              style={{ color: colors.muted }}
            >
              {timeString} • {dateString}
            </Text>
          </View>
          {event.location && (
            <View className="flex-row items-center mt-1">
              <Ionicons
                name="location-outline"
                size={14}
                color={colors.muted}
                style={{ marginRight: 4 }}
              />
              <Text
                className="text-xs"
                style={{ color: colors.muted }}
                numberOfLines={1}
              >
                {event.location}
              </Text>
            </View>
          )}
        </View>

        {/* Right icon */}
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.muted}
          style={{ marginLeft: 8 }}
        />
      </View>
    </Pressable>
  );
}
