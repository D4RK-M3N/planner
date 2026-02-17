import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onPress: () => void;
  label?: string;
  icon?: string;
}

export function FloatingActionButton({
  onPress,
  label = "Dodaj",
  icon = "add",
}: FloatingActionButtonProps) {
  const colors = useColors();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => ({
        position: "absolute",
        bottom: 80,
        right: 16,
        zIndex: 10,
        transform: [{ scale: pressed ? 0.95 : 1 }],
        opacity: pressed ? 0.9 : 1,
      })}
    >
      <View
        className="w-14 h-14 rounded-full items-center justify-center"
        style={{
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name={icon as any} size={24} color="white" />
      </View>
      {label && (
        <Text
          className="text-xs font-semibold mt-1 text-center"
          style={{ color: colors.primary }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
