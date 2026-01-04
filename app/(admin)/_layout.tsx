import { Stack } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

export default function AdminStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The Tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* The Details Screen */}
      <Stack.Screen
        name="society/[id]"
        options={{
          headerShown: true,
          title: "Society Details",
          headerBackTitle: "Back",
          headerTintColor: "#007AFF",
        }}
      />

      {/* The Add/Edit Modal */}
      <Stack.Screen
        name="member-modal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Manage Member",
          headerTintColor: "#007AFF",
        }}
      />

      <Stack.Screen
        name="payment-modal"
        options={{
          presentation: "modal", // Makes it slide up like an iOS sheet
          headerShown: true,
          title: "Payment",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={{ color: "#007AFF", fontSize: 17 }}>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="upgrade-modal"
        options={{
          presentation: "modal",
          headerShown: false, // Full screen experience
        }}
      />
    </Stack>
  );
}
