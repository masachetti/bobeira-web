import { reactive } from "vue";

const appStore = reactive({
  currentPage: "home",
  username: "",
});

export const useAppStore = () => {
  const goTo = (pageName: string) => {
    appStore.currentPage = pageName;
  };

  return { appStore, goTo };
};
