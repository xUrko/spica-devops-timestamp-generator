const nameInput = document.getElementById("spica-ext__name");
const emojiInput = document.getElementById("spica-ext__emoji");
const hour12Check = document.getElementById("spica-ext__12h");
const devOpsBtnCheck = document.getElementById("spica-ext__dob");
const dateStyleSelect = document.getElementById("spica-ext__date-style");
const timeStyleSelect = document.getElementById("spica-ext__time-style");
const saveBtn = document.getElementById("spica-ext__save");
const previewBtn = document.getElementById("spica-ext__gen-preview");
const previewDiv1 = document.getElementById("spica-ext__preview-1");
const previewDiv2 = document.getElementById("spica-ext__preview-2");

function save(e) {
  e.preventDefault();

  const setter = {
    name: nameInput.value,
    emoji: emojiInput.value,
    hour12: hour12Check.checked,
    devOpsBtn: devOpsBtnCheck.checked,
    dateStyle: dateStyleSelect.value,
    timeStyle: timeStyleSelect.value,
  };

  console.log(setter);

  browser.storage.sync.set(setter, () => {
    alert("Settings have been saved");
    location.reload();
  });
}

function generateTimestamp(e) {
  if (e) e.preventDefault();

  const hourCycle = hour12Check.checked ? "h12" : "h23";

  let date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: dateStyleSelect.value,
    timeStyle: timeStyleSelect.value,
    hourCycle: hourCycle,
  }).format(new Date("December 17, 1995 00:24:12"));
  let todayString = `${emojiInput.value} Edited by ${nameInput.value} on ${date} ${emojiInput.value}`;
  previewDiv1.innerHTML = todayString;

  date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: dateStyleSelect.value,
    timeStyle: timeStyleSelect.value,
    hourCycle: hourCycle,
  }).format(new Date("January 2, 2008 12:59:36"));
  todayString = `${emojiInput.value} Edited by ${nameInput.value} on ${date} ${emojiInput.value}`;
  previewDiv2.innerHTML = todayString;
}

saveBtn.addEventListener("click", save);
previewBtn.addEventListener("click", generateTimestamp);

window.onload = () => {
  browser.storage.sync.get(
    ["name", "hour12", "emoji", "dateStyle", "timeStyle", "devOpsBtn"],
    (result) => {
      const { name, hour12, emoji, dateStyle, timeStyle, devOpsBtn } = result;
      nameInput.value = name;
      emojiInput.value = emoji;
      hour12Check.checked = hour12;
      devOpsBtnCheck.checked = devOpsBtn;
      dateStyleSelect.value = dateStyle;
      timeStyleSelect.value = timeStyle;

      generateTimestamp();
    }
  );
};
