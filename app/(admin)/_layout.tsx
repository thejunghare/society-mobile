import { Stack } from "expo-router";

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
    </Stack>
  );
}
