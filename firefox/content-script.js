const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dowArr = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const tmstmpWrapper = document.createElement("div");
const genTimestamp = document.createElement("button");
genTimestamp.innerHTML = "Timestamp";
genTimestamp.classList.add("btn-gen");
tmstmpWrapper.appendChild(genTimestamp);
let editor = null;
let editorTemp = null;

browser.storage.sync.get(["dob"], (result) => {
  if (result.dob) {
    setInterval(() => {
      editorTemp =
        document.querySelector(".html-editor [aria-label='Description']") ||
        document.querySelector(".html-editor [aria-label='Repro Steps']");

      if (editorTemp && !editor) {
        console.log("Editor found!");
        console.log(editorTemp);
        editor = editorTemp;
        editor.parentElement.parentElement.prepend(tmstmpWrapper);
      } else if (!editorTemp) {
        editor = null;
        console.log("No editor on page");
      }
    }, 2000);
  }
});

function generateTimestamp() {
  editor.focus();

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = months[today.getMonth()];
  const yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  const mi = String(today.getMinutes()).padStart(2, "0");
  const UTC = -today.getTimezoneOffset() / 60;

  browser.storage.sync.get(["name", "h12c", "dow", "emoji"], (result) => {
    let dow = "";
    let time = `${hh}:${mi}`;

    if (result.dow) {
      dow = `${dowArr[today.getDay()]}, `;
    }

    if (result.h12c) {
      const amOrPm = Number(hh) >= 12 ? "PM" : "AM";
      hh = Number(hh) % 12 || 12;

      time = `${String(hh).padStart(2, "0")}:${mi} ${amOrPm}`;
    }

    const todayString = `${result.emoji} Edited by ${
      result.name
    } on ${dow}${dd} ${mm} ${yyyy} at ${time} (UTC ${
      UTC >= 0 ? "+" + UTC : UTC
    }) ${result.emoji}`;

    const div = document.createElement("div");
    const b = document.createElement("b");
    b.innerHTML = todayString;
    div.appendChild(b);
    editor.appendChild(div);
  });
}

genTimestamp.addEventListener("click", () => {
  generateTimestamp();
  editor.parentElement.scrollTo(0, editor.parentElement.scrollHeight);
});
