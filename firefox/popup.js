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

/* function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand("copy");
    if (successful) {
      tooltip.innerHTML = "Copied to clipboard";
    } else {
      tooltip.innerHTML = "Couldn't copy";
    }
  } catch (err) {
    tooltip.innerHTML = err;
  }
  setTimeout(() => {
    tooltip.innerHTML = "";
  }, 2000);
  document.body.removeChild(textArea);
}

function copyToClip(text) {
  if (!navigator.clipboard) {
    this.fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    () => {
      tooltip.innerHTML = "Copied to clipboard";
      setTimeout(() => {
        tooltip.innerHTML = "";
      }, 2000);
    },
    (err) => {
      tooltip.innerHTML = err;
      setTimeout(() => {
        tooltip.innerHTML = "";
      }, 2000);
    }
  );
} */

function copyToClip() {
  const r = document.createRange();
  r.selectNode(b);
  const s = window.getSelection();
  s.removeAllRanges();
  s.addRange(r);

  //ff specific to copy the boldness
  s.modify("move", "forward", "character");

  try {
    var successful = document.execCommand("copy");
    if (successful) {
      tooltip.innerHTML = "Copied to clipboard";
    } else {
      tooltip.innerHTML = "Couldn't copy";
    }
  } catch (err) {
    tooltip.innerHTML = err;
  }

  //r.collapse();

  setTimeout(() => {
    tooltip.innerHTML = "";
  }, 2000);
}

function generateTimestamp(canCopy = true) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = months[today.getMonth()];
  const yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, "0");
  const mi = String(today.getMinutes()).padStart(2, "0");
  const UTC = -today.getTimezoneOffset() / 60;

  browser.storage.sync.get(["name", "h12c", "dow"], (result) => {
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

    const todayString = `🔴 Edited by ${
      result.name
    } on ${dow}${dd} ${mm} ${yyyy} at ${time} (UTC ${
      UTC >= 0 ? "+" + UTC : UTC
    })  🔴`;

    b.innerHTML = todayString;

    if (canCopy) copyToClip();
  });
}

window.onload = () => {
  generateTimestamp(false);
};

gen.addEventListener("click", generateTimestamp);
b.addEventListener("click", copyToClip);
