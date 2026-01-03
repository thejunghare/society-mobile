import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    console.log("🔄 App Starting: Checking Session...");

    // 1. Initial Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        console.log("✅ Session Found. User ID:", session.user.id);
        fetchRole(session.user.id);
      } else {
        console.log("❌ No Session Found.");
        setLoading(false);
      }
    });

    // 2. Listen for Login/Logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchRole(session.user.id);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchRole(userId: string) {
    try {
      console.log("🔍 Fetching Role for:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("🛑 Error fetching role:", error.message);
        // Default to member if error occurs, so app doesn't break
        setRole("member");
      } else if (data) {
        console.log("✅ Role found:", data.role);
        setRole(data.role);
      } else {
        console.warn("⚠️ No profile found for user.");
      }
    } catch (e) {
      console.error("💥 Crash in fetchRole:", e);
    } finally {
      // THIS runs no matter what, forcing the loading screen to disappear
      console.log("🔓 Loading Finished.");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAdminGroup = segments[0] === "(admin)";
    const inMemberGroup = segments[0] === "(tabs)";

    console.log(`📍 Nav Check | Role: ${role} | Segment: ${segments[0]}`);

    if (!session && !inAuthGroup) {
      console.log("🔀 Redirecting to Login...");
      router.replace("/(auth)/login");
    } else if (session && role === "secretary" && !inAdminGroup) {
      console.log("🔀 Redirecting to Admin Dashboard...");
      router.replace("/(admin)");
    } else if (session && role === "member" && !inMemberGroup) {
      console.log("🔀 Redirecting to Member Dashboard...");
      router.replace("/(tabs)");
    }
  }, [session, role, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 20, color: "#666" }}>
          Loading Society App...
        </Text>
      </View>
    );
  }

  return <Slot />;
}
