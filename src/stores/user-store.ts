import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

const usernameStorage = useLocalStorage<string>("username", "");
const isEditingUsername = ref(!usernameStorage.value);

export const useUserStore = () => {
  const setUsername = (username: string) => {
    usernameStorage.value = username;
    isEditingUsername.value = false;
  };
  return { username: usernameStorage, setUsername, isEditingUsername };
};
