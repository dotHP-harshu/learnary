import registerSW from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
  },
});
