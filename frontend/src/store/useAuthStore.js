import { create } from "zustand";
import authService from "../lib/authService";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      isRegistering: false,
      isLoging: false,
      isGetingProfile: false,

      getProfile: async () => {
        try {
          set({ isGetingProfile: true });
          const res = await authService.profile();
          set({ authUser: res.data });
          if (res.success) {
            return false;
          }
          return true;
        } catch (error) {
          set({ authUser: null });
        } finally {
          set({ isGetingProfile: false });
        }
      },

      login: async (data) => {
        try {
          set({ isLoging: true });
          const res = await authService.login(data);
          console.log(res);
          set({ authUser: res.data });
          toast.success(res.message);
          if (res.success) {
            return false;
          }
          return true;
        } catch (error) {
          console.log("Error while login", error);
          toast.error(
            error.response ? error.response.data.message : error.message,
          );
          set({ authUser: null });
          return null;
        } finally {
          set({ isLoging: false });
        }
      },

      Register: async (data) => {
        try {
          set({ isRegistering: true });
          const res = await authService.register(data);
          console.log(res);
          set({ authUser: res.data });
          toast.success(res.message);
          if (res.success) {
            return false;
          }
          return true;
        } catch (error) {
          console.error("Error while signing up", error);
          toast.error(
            error.response ? error.response.data.message : error.message,
          );
          set({ authUser: null });
        } finally {
          set({ isRegistering: false });
        }
      },

      LogOut: async () => {
        try {
          const res = await authService.logOut();
          set({ authUser: null });
          toast.success(res.message);
        } catch (error) {
          console.log("Error in logout processing", error);
          toast.error(
            error.response.data.message
              ? error.response.data.message
              : error.message,
          );
        }
      },
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({ authUser: state.authUser }), // persist only authUser
    },
  ),
);
