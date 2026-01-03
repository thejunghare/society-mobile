import { Tabs } from "expo-router";
import { Home, CreditCard, User } from "lucide-react-native"; // Or your icons

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#007AFF", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="two" // Ensure this matches your filename 'two.tsx'
        options={{
          title: "Payments", // Or whatever 'two' is
          tabBarIcon: ({ color }) => <CreditCard size={24} color={color} />,
        }}
      />
      {/* If you have a profile.tsx inside (tabs), add it here */}
    </Tabs>
  );
}
