import { supabase } from "@/lib/supabase";

export const authApi = {
  // 로그인
  loginWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { data, error };
  },

  // 로그아웃
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // 현재 세션 가져오기
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  },

  // 유저 상태 변경 구독 (직접 supabase 객체를 리턴하거나 래핑)
  onAuthStateChange: (callback: (session: any) => void) => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return data.subscription;
  },
};
