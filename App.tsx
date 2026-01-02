// import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import { NavigationContainer } from "@react-navigation/native"; // 👈 Import This

// Import Screens & Navigators
import Auth from "./components/Auth";
import { MemberNavigator, AdminNavigator } from "./components/Navigation";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchRole(session.user.id);
      else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchRole(userId: string) {
    // Only fetch if we don't have it yet to prevent flickering
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    if (data) setRole(data.role);
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!session ? (
        <Auth />
      ) : role === "secretary" || role === "admin" ? (
        <AdminNavigator session={session} />
      ) : (
        <MemberNavigator session={session} />
      )}
    </NavigationContainer>
  );
}
