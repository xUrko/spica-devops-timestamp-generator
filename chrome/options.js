const nameInput = document.getElementById("spica-ext__name");
const emojiInput = document.getElementById("spica-ext__emoji");
const setName = document.getElementById("spica-ext__name-set");
const setEmoji = document.getElementById("spica-ext__emoji-set");
const set12h = document.getElementById("spica-ext__12h");
const setDow = document.getElementById("spica-ext__dow");
const setDob = document.getElementById("spica-ext__dob");
const curName = document.getElementById("spica-ext__cur-name");
const curEmoji = document.getElementById("spica-ext__cur-emoji");
const cur12h = document.getElementById("spica-ext__cur-12h");
const curDow = document.getElementById("spica-ext__cur-dow");
const curDob = document.getElementById("spica-ext__cur-dob");
const regex = /^\p{Extended_Pictographic}?$/gu;

function saveName(e) {
  e.preventDefault();
  chrome.storage.sync.set({ name: nameInput.value }, () => {
    chrome.storage.sync.get(["name"], (result) => {
      curName.innerHTML = result.name;
    });
  });
}

function saveEmoji(e) {
  e.preventDefault();
  if (!regex.test(emojiInput.value)) {
    curEmoji.innerHTML = "Only emojis or empty string allowed";

    chrome.storage.sync.get(["emoji"], (result) => {
      setTimeout(() => {
        curEmoji.innerHTML = result.emoji;
      }, 2000);
    });

    return;
  }

  chrome.storage.sync.set({ emoji: emojiInput.value }, () => {
    chrome.storage.sync.get(["emoji"], (result) => {
      curEmoji.innerHTML = result.emoji;
    });
  });
}

function save12h() {
  chrome.storage.sync.set({ h12c: set12h.checked }, () => {
    chrome.storage.sync.get(["h12c"], (result) => {
      cur12h.innerHTML = result.h12c;
    });
  });
}

function saveDow() {
  chrome.storage.sync.set({ dow: setDow.checked }, () => {
    chrome.storage.sync.get(["dow"], (result) => {
      curDow.innerHTML = result.dow;
    });
  });
}

function saveDob() {
  chrome.storage.sync.set({ dob: setDob.checked }, () => {
    chrome.storage.sync.get(["dob"], (result) => {
      curDob.innerHTML = result.dob;
    });
  });
}

setName.addEventListener("click", saveName);
setEmoji.addEventListener("click", saveEmoji);
set12h.addEventListener("click", save12h);
setDow.addEventListener("click", saveDow);
setDob.addEventListener("click", saveDob);

window.onload = () => {
  chrome.storage.sync.get(["name", "h12c", "dow", "dob", "emoji"], (result) => {
    curName.innerHTML = result.name;
    curEmoji.innerHTML = result.emoji;
    cur12h.innerHTML = set12h.checked = result.h12c;
    curDow.innerHTML = setDow.checked = result.dow;
    curDob.innerHTML = setDob.checked = result.dob;
  });
};
