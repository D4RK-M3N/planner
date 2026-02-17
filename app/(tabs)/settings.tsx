import { ScrollView, View, Text, Pressable, Switch, Modal } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { getSettings, saveSettings } from "@/lib/storage";
import type { AppSettings } from "@/lib/storage";

export default function SettingsScreen() {
  const colors = useColors();
  const [settings, setSettings] = useState<AppSettings>({
    theme: "auto",
    firstDayOfWeek: 1,
    notificationsEnabled: true,
  });
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showWeekStartPicker, setShowWeekStartPicker] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  const loadSettings = async () => {
    try {
      const appSettings = await getSettings();
      setSettings(appSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleThemeChange = async (theme: "light" | "dark" | "auto") => {
    const updated = { ...settings, theme };
    setSettings(updated);
    await saveSettings(updated);
    setShowThemePicker(false);
  };

  const handleWeekStartChange = async (day: 0 | 1) => {
    const updated = { ...settings, firstDayOfWeek: day };
    setSettings(updated);
    await saveSettings(updated);
    setShowWeekStartPicker(false);
  };

  const handleNotificationsToggle = async (value: boolean) => {
    const updated = { ...settings, notificationsEnabled: value };
    setSettings(updated);
    await saveSettings(updated);
  };

  const themeLabel = {
    light: "Jasny",
    dark: "Ciemny",
    auto: "Automatyczny",
  }[settings.theme];

  const weekStartLabel = settings.firstDayOfWeek === 1 ? "Poniedziałek" : "Niedziela";

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 pb-8">
          {/* Header */}
          <View>
            <Text
              className="text-3xl font-bold"
              style={{ color: colors.foreground }}
            >
              Ustawienia
            </Text>
            <Text
              className="text-sm mt-1"
              style={{ color: colors.muted }}
            >
              Dostosuj aplikację do swoich potrzeb
            </Text>
          </View>

          {/* Theme Setting */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Motyw
            </Text>
            <Pressable
              onPress={() => setShowThemePicker(true)}
              className="rounded-xl p-4 border flex-row items-center justify-between"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name={
                    settings.theme === "dark"
                      ? "moon"
                      : settings.theme === "light"
                        ? "sunny"
                        : "settings"
                  }
                  size={20}
                  color={colors.primary}
                />
                <Text style={{ color: colors.foreground }}>
                  {themeLabel}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          </View>

          {/* Week Start Setting */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Pierwszy dzień tygodnia
            </Text>
            <Pressable
              onPress={() => setShowWeekStartPicker(true)}
              className="rounded-xl p-4 border flex-row items-center justify-between"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="calendar"
                  size={20}
                  color={colors.primary}
                />
                <Text style={{ color: colors.foreground }}>
                  {weekStartLabel}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </Pressable>
          </View>

          {/* Notifications Setting */}
          <View className="gap-2">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              Powiadomienia
            </Text>
            <View
              className="rounded-xl p-4 border flex-row items-center justify-between"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center gap-3">
                <Ionicons
                  name="notifications"
                  size={20}
                  color={colors.primary}
                />
                <Text style={{ color: colors.foreground }}>
                  Włącz powiadomienia
                </Text>
              </View>
              <Switch
                value={settings.notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            </View>
          </View>

          {/* About Section */}
          <View className="gap-2 mt-4">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.foreground }}
            >
              O aplikacji
            </Text>
            <View
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Text style={{ color: colors.muted }}>Wersja</Text>
                  <Text
                    className="font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    1.0.0
                  </Text>
                </View>
                <View
                  className="h-px"
                  style={{ backgroundColor: colors.border }}
                />
                <View className="flex-row items-center justify-between">
                  <Text style={{ color: colors.muted }}>Autor</Text>
                  <Text
                    className="font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    Planner Team
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Theme Picker Modal */}
          <Modal
            visible={showThemePicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowThemePicker(false)}
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
                  Wybierz motyw
                </Text>
                {(["light", "dark", "auto"] as const).map((theme) => (
                  <Pressable
                    key={theme}
                    onPress={() => handleThemeChange(theme)}
                    className="py-3 px-4 rounded-lg mb-2"
                    style={{
                      backgroundColor:
                        settings.theme === theme ? colors.primary : colors.background,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          settings.theme === theme ? "white" : colors.foreground,
                      }}
                    >
                      {theme === "light"
                        ? "Jasny"
                        : theme === "dark"
                          ? "Ciemny"
                          : "Automatyczny"}
                    </Text>
                  </Pressable>
                ))}
                <Pressable
                  onPress={() => setShowThemePicker(false)}
                  className="rounded-xl p-3 mt-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-center font-semibold text-white">
                    Gotowe
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/* Week Start Picker Modal */}
          <Modal
            visible={showWeekStartPicker}
            transparent
            animationType="slide"
            onRequestClose={() => setShowWeekStartPicker(false)}
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
                  Pierwszy dzień tygodnia
                </Text>
                <Pressable
                  onPress={() => handleWeekStartChange(1)}
                  className="py-3 px-4 rounded-lg mb-2"
                  style={{
                    backgroundColor:
                      settings.firstDayOfWeek === 1 ? colors.primary : colors.background,
                  }}
                >
                  <Text
                    style={{
                      color:
                        settings.firstDayOfWeek === 1 ? "white" : colors.foreground,
                    }}
                  >
                    Poniedziałek
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleWeekStartChange(0)}
                  className="py-3 px-4 rounded-lg mb-2"
                  style={{
                    backgroundColor:
                      settings.firstDayOfWeek === 0 ? colors.primary : colors.background,
                  }}
                >
                  <Text
                    style={{
                      color:
                        settings.firstDayOfWeek === 0 ? "white" : colors.foreground,
                    }}
                  >
                    Niedziela
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowWeekStartPicker(false)}
                  className="rounded-xl p-3 mt-2"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Text className="text-center font-semibold text-white">
                    Gotowe
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
