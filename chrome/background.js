chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(null, (result) => {
    if (Object.keys(result).length == 0)
      chrome.storage.local.set({
        name: "/change the name in options/",
        hour12: false,
        devOpsBtn: true,
        dateStyle: "long",
        timeStyle: "long",
        emoji: "🔴",
      });
  });
});
