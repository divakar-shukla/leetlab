import problemService from "@/lib/problemService";
import { create } from "zustand";
import toast from "react-hot-toast";
const {
  getProblemsQuery,
  getProblemByIdQuery,
  updateProblemQuery,
  deleteProblemQuery,
  getSolvedProblemQuery,
} = problemService;

const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  getingProblems: false,
  getingProblem: false,
  getingSolvedProblem: false,

  getAllProblems: async () => {
    try {
      set({ getingProblems: true });
      const response = await getProblemsQuery();
      set({ problems: response.data });
      return response.data;
    } catch (error) {
      set({ problems: [] });
      toast.error(error.response.data.message);
    } finally {
      set({ getingProblems: false });
    }
  },
  getProblemById: async (id) => {
    try {
      set({ getingProblem: true });
      const response = await getProblemByIdQuery(id);
      console.log(response);
      set({ problem: response.data });
      return true;
    } catch (error) {
      set({ problem: null });
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ getingProblem: false });
    }
  },
  editProblem: async (values, id) => {
    try {
      const response = await updateProblemQuery(values, id);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteProblem: async (id) => {
    try {
      const response = await deleteProblemQuery(id);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  getSolvedProblem: async () => {
    try {
      set({ getingSolvedProblem: true });
      const response = await getSolvedProblemQuery();
      set({ solvedProblems: response.data });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      set({ getingSolvedProblem: null });
      toast.error(error.response.data.message);
    } finally {
      set({ getingSolvedProblem: false });
    }
  },
}));
export default useProblemStore;
