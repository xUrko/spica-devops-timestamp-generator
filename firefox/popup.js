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

const b = document.getElementById("spica-ext__timestamp");
const gen = document.getElementById("spica-ext__generate");
const tooltip = document.getElementById("spica-ext__tooltip");

function fallbackCopyTextToClipboard() {
  function listener(e) {
    try {
      e.clipboardData.setData("text/html", b.outerHTML);
      tooltip.innerHTML = "Copied to clipboard";
    } catch (err) {
      tooltip.innerHTML = err;
    }
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);

  setTimeout(() => {
    tooltip.innerHTML = "";
  }, 2000);
}

function copyToClip() {
  //ff doesn't fully support the Clipboard API yet
  fallbackCopyTextToClipboard();

  /* if (!navigator.clipboard) {
    fallbackCopyTextToClipboard();
    return;
  }

  console.log("Clipboard API present");

  const blob = new Blob([b.outerHTML], { type: "text/html" });
  const clipboardItem = new window.ClipboardItem({ "text/html": blob });
  navigator.clipboard.write([clipboardItem]).then(
    function () {
      tooltip.innerHTML = "Copied to clipboard";
      setTimeout(() => {
        tooltip.innerHTML = "";
      }, 2000);
    },
    function (err) {
      tooltip.innerHTML = err;
      setTimeout(() => {
        tooltip.innerHTML = "";
      }, 2000);
    }
  ); */
}

function generateTimestamp(canCopy = true) {
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

    b.innerHTML = todayString;

    if (canCopy) copyToClip();
  });
}

window.onload = () => {
  generateTimestamp(false);
};

gen.addEventListener("click", generateTimestamp);
b.addEventListener("click", copyToClip);
