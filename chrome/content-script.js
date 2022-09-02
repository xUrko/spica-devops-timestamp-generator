const tmstmpWrapper = document.createElement("div");
const genTimestamp = document.createElement("button");

genTimestamp.innerHTML = "Timestamp";
genTimestamp.classList.add("btn-gen");
tmstmpWrapper.appendChild(genTimestamp);
let editor = null;
let editorTemp = null;

chrome.storage.sync.get(["devOpsBtn"], (result) => {
  if (result.devOpsBtn) {
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

  chrome.storage.sync.get(
    ["name", "h12c", "emoji", "dateStyle", "timeStyle"],
    (result) => {
      const { name, hour12, emoji, dateStyle, timeStyle } = result;

      const hourCycle = hour12 ? "h12" : "h23";

      let date = new Intl.DateTimeFormat("en-GB", {
        dateStyle: dateStyle,
        timeStyle: timeStyle,
        hourCycle: hourCycle,
      }).format(new Date());

      const todayString = `${emoji} Edited by ${name} on ${date} ${emoji}`;

      const div = document.createElement("div");
      const b = document.createElement("b");
      b.innerHTML = todayString;
      div.appendChild(b);

      const divSpacer = document.createElement("div");
      const br = document.createElement("br");
      divSpacer.appendChild(br);

      if (
        !(
          editor.lastChild.innerHTML.includes("<br>") ||
          editor.lastChild.innerHTML.includes("<br/>")
        ) ||
        editor.lastChild.innerHTML.includes("<img")
      ) {
        const divSpacer1 = document.createElement("div");
        const br1 = document.createElement("br");
        divSpacer1.appendChild(br1);

        editor.appendChild(divSpacer1);
      }

      divSpacer.appendChild(br);
      editor.appendChild(div);
      editor.appendChild(divSpacer);
    }
  );
}

genTimestamp.addEventListener("click", () => {
  generateTimestamp();
  editor.scrollTo(0, editor.parentElement.scrollHeight);
});
