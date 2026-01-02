import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./Home";
import AdminHome from "./AdminHome";
import Profile from "./Profile";
import Payments from "./Payments";
import AdminDashboard from "./AdminDashboard";

const Tab = createBottomTabNavigator();

export function MemberNavigator({ session }: { session: any }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarShowLabel: true, // explicitly boolean
      }}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <Home {...props} session={session} />}
      </Tab.Screen>

      <Tab.Screen name="Payments" component={Payments} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export function AdminNavigator({ session }: { session: any }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF3B30",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />

      <Tab.Screen name="Issues">
        {(props) => <AdminHome {...props} session={session} />}
      </Tab.Screen>

      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
