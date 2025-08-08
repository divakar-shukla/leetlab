import { create } from "zustand";
import playListService from "@/lib/playListService";
import toast from "react-hot-toast";

const {
  createPlayListQuery,
  getAllPlaylistQuery,
  getPlayListByIdQuery,
  deletePlayListQuery,
  removeProblemInPlayListQuery,
  addProblemInPlayListQuery,
} = playListService;
const usePlayListStore = create((set) => ({
  allPlaylists: [],
  playList: null,
  isLoading: false,

  createPlayList: async (payload) => {
    try {
      set({ isLoading: true });
      const response = await createPlayListQuery(payload);
      console.log(response);
      set((state) => ({
        allPlaylists: [...state.allPlaylists, response.data],
      }));
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  getAllPlayList: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllPlaylistQuery();
      set({ allPlaylists: response.data });
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  getPlayListById: async (PlayListId) => {
    try {
      set({ isLoading: true });
      const response = await getPlayListByIdQuery(PlayListId);
      console.log(response);
      set({ playList: response.data });
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      set({ playList: null });
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoading: false });
    }
  },
  addProblemInPlayList: async (problemId, playListId) => {
    try {
      set({ isLoading: true });
      const response = await addProblemInPlayListQuery(playListId, problemId);
      console.log(response);
      toast.success(response.message);
      return true;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePlayListStore;
