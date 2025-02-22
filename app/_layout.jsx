import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import { LogBox } from "react-native";

LogBox.ignoreLogs(['Warning: TNodeChildrenRenderer', 'Warning: MemoizedTNodeRenderer', 'Warning: TRenderEngineProvider'])

const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    );
};

const MainLayout = () => {
    const { setAuth , setUserData} = useAuth(); 
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            //console.log("session user:", session?.user?.id);

            if (session) {
                setAuth(session?.user);
                updateUserData(session?.user, session?.user?.email);
                router.replace("/home");
            } else {
                setAuth(null);
                router.replace("/welcome");
            }
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const updateUserData = async (user, email) => {
      let res = await getUserData(user?.id);
      if(res.success) setUserData ({...res.data, email});
    }

    return <Stack screenOptions={{ headerShown: false }} />;
};

export default _layout;
