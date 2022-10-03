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

  //for when it does
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
  browser.storage.local.get(
    ["name", "hour12", "emoji", "dateStyle", "timeStyle"],
    (result) => {
      const { name, hour12, emoji, dateStyle, timeStyle } = result;

      const hourCycle = hour12 ? "h12" : "h23";

      let date = new Intl.DateTimeFormat("en-GB", {
        dateStyle: dateStyle,
        timeStyle: timeStyle,
        hourCycle: hourCycle,
      }).format(new Date());

      const todayString = `${emoji} Edited by ${name} on ${date} ${emoji}`;

      b.innerHTML = todayString;

      if (canCopy) copyToClip();
    }
  );
}

window.onload = () => {
  generateTimestamp(false);
};

gen.addEventListener("click", generateTimestamp);
b.addEventListener("click", copyToClip);
