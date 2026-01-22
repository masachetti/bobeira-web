import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import keycloak from "./plugins/keycloak";

keycloak
  .init({
    onLoad: "login-required", // or 'check-sso'
    checkLoginIframe: false,
    pkceMethod: "S256",
  })
  .then((authenticated) => {
    if (!authenticated) {
      window.location.reload();
    } else {
      const app = createApp(App);
      app.config.globalProperties.$keycloak = keycloak;
      // app.use(router)
      app.mount("#app");

      // Auto-refresh token
      setInterval(() => {
        keycloak.updateToken(70).catch(() => {
          console.error("Failed to refresh token");
        });
      }, 60000);
    }
  })
  .catch((error) => {
    console.error("Authentication failed", error);
  });

//createApp(App).mount('#app')
