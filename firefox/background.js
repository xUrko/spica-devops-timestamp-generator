browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get(null, (result) => {
    if (Object.keys(result).length == 0)
      browser.storage.local.set({
        name: "/change the name in options/",
        hour12: false,
        devOpsBtn: true,
        dateStyle: "long",
        timeStyle: "long",
        emoji: "🔴",
      });
  });
});
