chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    name: "/change the name in options/",
    h12c: false,
    dow: false,
    dob: true,
    emoji: "🔴",
  });
});
