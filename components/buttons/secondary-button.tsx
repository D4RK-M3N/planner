import { Pressable, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function SecondaryButton({
  onPress,
  title,
  disabled = false,
  loading = false,
  size = "medium",
  className,
}: SecondaryButtonProps) {
  const colors = useColors();

  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const sizeStyles = {
    small: "px-4 py-2",
    medium: "px-6 py-3",
    large: "px-8 py-4",
  };

  const fontSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
        transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
      })}
    >
      <View
        className={cn(
          "rounded-xl items-center justify-center border-2",
          sizeStyles[size],
          className
        )}
        style={{
          borderColor: colors.primary,
          backgroundColor: "transparent",
        }}
      >
        <Text
          className={cn("font-semibold", fontSizes[size])}
          style={{ color: colors.primary }}
        >
          {loading ? "Ładowanie..." : title}
        </Text>
      </View>
    </Pressable>
  );
}
