browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    name: "/change the name in options/",
    hour12: false,
    devOpsBtn: true,
    dateStyle: "long",
    timeStyle: "long",
    emoji: "🔴",
  });
});
