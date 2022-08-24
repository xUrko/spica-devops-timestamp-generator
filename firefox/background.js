browser.runtime.onInstalled.addListener(() => {
  browser.storage.sync.set({
    name: "/change the name in options/",
    h12c: false,
    dow: false,
  });
});
