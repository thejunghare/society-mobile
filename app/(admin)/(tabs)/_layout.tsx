import { Tabs } from "expo-router";
import { LayoutDashboard, AlertCircle, User } from "lucide-react-native";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF3B30", // Admin Red
        tabBarStyle: { height: 60, paddingBottom: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="issues"
        options={{
          title: "Complaints",
          tabBarIcon: ({ color }) => <AlertCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
