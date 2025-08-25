//didn't code the paste stuff myself --up to line 162


// =====================
// Configuration
// =====================
const STORAGE_KEY = "pastedImages"; // array of images saved in localForage

// =====================
// Insert image at cursor
// =====================
function insertImageAtCursor(img) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    // fallback: just append to focused contenteditable
    const active = document.activeElement;
    if (active && active.isContentEditable) {
      active.appendChild(img);
    }
    return;
  }

  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(img);

  // move caret after image
  range.setStartAfter(img);
  range.setEndAfter(img);
  sel.removeAllRanges();
  sel.addRange(range);
}

// =====================
// Show small preview
// =====================
function createImageElement(src) {
  const img = document.createElement("img");
  img.className = "image-input";
  img.src = src;
  img.style.maxWidth = "500px";
  img.style.maxHeight = "500px";
  img.style.objectFit = "contain";
  img.style.cursor = "pointer";
  img.style.margin = "4px";
  return img;
}

// =====================
// Save images to localForage
// =====================
function saveImage(dataUrl) {
  localforage.getItem(STORAGE_KEY).then(images => {
    const arr = Array.isArray(images) ? images : [];
    arr.push(dataUrl);
    localforage.setItem(STORAGE_KEY, arr);
  });
}

// =====================
// Load saved images
// =====================
function loadSavedImages() {
  localforage.getItem(STORAGE_KEY).then(images => {
    if (!images) return;
    images.forEach(src => {
      const img = createImageElement(src);
      insertImageAtCursor(img); // load into active place (fallback: append)
    });
  });
}

// =====================
// Paste handler
// =====================
document.addEventListener("paste", e => {
  const targetDiv = e.target.closest("[contenteditable='true']");
  if (!targetDiv) return;

  const items = e.clipboardData?.items;
  if (!items) return;

  let handledImage = false;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind === "file") {
      e.preventDefault(); // only block default if pasting an image
      handledImage = true;

      const file = item.getAsFile();
      const reader = new FileReader();
      reader.onload = function (event) {
        const dataUrl = event.target.result;
        const img = createImageElement(dataUrl);
        insertImageAtCursor(img);
        saveImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  }

  // if no image, let text paste normally
  if (!handledImage) return;
});

// =====================
// Large overlay preview
// =====================
function showLargePreview(src) {
  // remove any existing overlay
  const existing = document.querySelector(".image-preview-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.className = "image-preview-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    cursor: "zoom-out",
    overflow: "auto"
  });

  const largeImg = document.createElement("img");
  largeImg.src = src;
  Object.assign(largeImg.style, {
    maxWidth: "80%",
    maxHeight: "80%",
    objectFit: "contain",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    borderRadius: "8px"
  });

  overlay.appendChild(largeImg);

  overlay.addEventListener("click", () => overlay.remove());

  document.body.appendChild(overlay);
}

// =====================
// Global click handler
// =====================
document.addEventListener("click", e => {
  const img = e.target;
  if (img.classList.contains("image-input")) {
    showLargePreview(img.src);
  }
});

// =====================
// Init
// =====================
loadSavedImages();

async function exportData() {
  let exportObj = {};

  
  exportObj.localStorage = { ...localStorage };

  exportObj.localforage = {};
  await localforage.iterate((value, key) => {
    exportObj.localforage[key] = value;
  });

  
  const blob = new Blob([JSON.stringify(exportObj)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "study-tracker-data.json";
  a.click();

  URL.revokeObjectURL(url);
}

document.getElementById("exportBtn").addEventListener("click", exportData);


document.getElementById("importInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const data = JSON.parse(event.target.result);

      
      if (data.localStorage) {
        for (let key in data.localStorage) {
          localStorage.setItem(key, data.localStorage[key]);
        }
      }

      
      if (data.localforage) {
        for (let key in data.localforage) {
          await localforage.setItem(key, data.localforage[key]);
        }
      }

      alert("Data imported! Refresh the page.");
    } catch (err) {
      alert("Invalid file");
      console.error(err);
    }
  };
  reader.readAsText(file);
});




const rm = {

  saveId: 'saveRm',
  essaySaveId: 'essaySaveRm',
  link: `<div class="pageOneBar"; onclick="openInfoPage(rm);"><p class="info-text">Research Methods> info</p></div>
          <div class="pageOneBar" onclick="openEssayPageTwo('rm'); cycleTopicEntries('rm');"><p class="essay-text">Research Methods> questions</p></div>`,
  info: {
    getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveRm") || ""}
           
           
           

          </div> <button class="save-button" onclick="saveText(rm.saveId);">SAVE</button>
           <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">`
  },
  essay: {
    essayPageOne:''
,

    essayPageTwo: 'html for content'//used function for this
  }
}



const si = {

  saveId: 'saveSi',
  essaySaveId: 'essaySaveSi',
  link: `<div class="pageOneBar"; onclick="openInfoPage(si);"><p class="info-text">Social Influence> info</p></div>
          <div class="pageOneBar" onclick="openEssayPageTwo('si'); cycleTopicEntries('si');"><p class="essay-text">Social Influence> questions</p></div>`,
  info: {
    getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveSi") || ""}
           
           
           

          </div> <button class="save-button" onclick="saveText(si.saveId);">SAVE</button>
           <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">`
  },
  essay: {
    essayPageOne: ''
,

    essayPageTwo: 'html for content'//used function for this
  }
}

const at = {

  saveId: 'saveAt',
  essaySaveId: 'essaySaveAt',
  link: `<div class="pageOneBar"; onclick="openInfoPage(at);"><p class="info-text">Attatchment> info</p></div>
          <div class="pageOneBar" onclick="openEssayPageTwo('at'); cycleTopicEntries('at');"><p class="essay-text">Attatchment> questions</p></div>`,
  info: {
    getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveAt") || ""}
           
           
           

          </div> <button class="save-button" onclick="saveText(at.saveId);">SAVE</button>
           <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">`
  },
  essay: {
    essayPageOne: ''
,

    essayPageTwo: 'html for content'//used function for this
  }
}


const ap = {

  saveId: 'saveAp',
  essaySaveId: 'essaySaveAp',
  link: `<div class="pageOneBar"; onclick="openInfoPage(ap);"><p class="info-text">Approaches> info</p></div>
          <div class="pageOneBar" onclick="openEssayPageTwo('ap'); cycleTopicEntries('ap');"><p class="essay-text">Approaches> questions</p></div>`,
  info: {
    getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveAp") || ""}
           
           
           

          </div> <button class="save-button" onclick="saveText(ap.saveId);">SAVE</button>
           <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">`
  },
  essay: {
    essayPageOne: `<div class="pageOneBar" onclick="openEssayPageTwo('ap'); cycleTopicEntries('ap');">
<p class="info-text">Approaches</p></div>`
,

    essayPageTwo: 'html for content'//used function for this
  }
}
/* localStorage.clear() 
localforage.clear().then(function () {
  console.log("All LocalForage data has been cleared!");
}).catch(function (err) {
  console.error("Error clearing data:", err);
}); */

let entryNum = JSON.parse(localStorage.getItem('entryNumber'));






let entriesObject = {};

async function loadEntries() {
  const saved = await localforage.getItem("key");
  if (saved) {
    entriesObject = saved; 
  } else {
    entriesObject = {};     
    
  }
}


loadEntries(); // call it





function addEntry(topic) {
  entryNum += 1;
  const entryContainer = document.querySelector('.question-info');
  const titleContainer = document.querySelector('.question-title');
  const entryContent = entryContainer.innerHTML;
  const title = titleContainer.innerHTML;

  // Update the in-memory object
  entriesObject["entry" + topic + entryNum] = {
    title: title,
    entries: entryContent,
    subtopic: topic
  };

  

  // Save to localforage, then cycleSubTopics
  localforage.setItem('key', entriesObject).then(() => {
   
    cycleTopicEntries(topic); // run AFTER saving
  });

  localStorage.setItem('entryNumber', JSON.stringify(entryNum));

  entryContainer.innerHTML = ''
  titleContainer.innerHTML = ''
}



 
function cycleTopicEntries(topic) {
  const questionFrame = document.querySelector('.questions-frame');
  let htmlinner = '';

  localforage.getItem('key').then(entriesObject => {
    if (!entriesObject) entriesObject = {};

    for (let key in entriesObject) {
      const entry = entriesObject[key];
      if (entry.subtopic === topic || entry.subtopic === undefined) { // all entries for the topic
        htmlinner += `
<div class="question-title-frame">
  <div class="flag-button" onclick="addFlagClass(this);" data-id="${key}"></div>
  <span class="title-text" onclick="openQuestionAnswerFrame('${key}')">${entry.title}</span>
  <img class="bin-image" src="Images/trash.png" onclick="deleteEntry('${key}', '${topic}')">
</div>`;
      }
    }

    questionFrame.innerHTML = htmlinner;
    loadFlagStates();
  });
}





function changeColourOnClick(button) {
  const active = document.querySelector('.subject-content.buttonColourClass');
  if (active) {
    active.classList.remove('buttonColourClass');
  }
  button.classList.add('buttonColourClass');
}

function addHTML(button) {
  const mainPage = document.querySelector('.main-bar')

  mainPage.innerHTML = button.link

}

function pencilClick() {
  const textbox = document.querySelector('.text-box')
  if (textbox.contentEditable === "true") {
    textbox.contentEditable = false
  }
  else if (textbox.contentEditable === "false") {
    textbox.contentEditable = true
  }
}

function openInfoPage(button) {
  const mainPage = document.querySelector('.main-bar')

  mainPage.innerHTML = button.info.getContentPage();
}

function openEssayPage(button) {
  const mainPage = document.querySelector('.main-bar')

  mainPage.innerHTML = button.essay.essayPageOne
}

function openEssayPageTwo(topic) {
  const mainPage = document.querySelector('.main-bar')
  mainPage.innerHTML = `
    <div class='questions-frame questions-frame${topic}'></div>
    <div class="enter-questions-text">
      <div class="question-title" contenteditable="true">enter text</div>
      <div class="question-info" contenteditable="true"></div>
      <button class="save-button" onclick="addEntry('${topic}'); cycleTopicEntries('${topic}');">ENTER</button>
    </div>
  `;

  // Show all existing entries immediately
  cycleTopicEntries(topic);
}



function saveText(subject) {
  const textBox = document.querySelector('.text-box')



  const savedText = textBox.innerHTML
  console.log(savedText)



  localStorage.setItem(subject, savedText)


}

function saveQuestionText(key) {
    const textBox = document.querySelector('.text-box')


 



  const savedText = textBox.innerHTML
   entriesObject[key].entries = savedText
  innerText =  entriesObject[key].entries
  console.log(innerText)
  console.log(entriesObject[key].entries)



  localStorage.setItem(key, innerText)
}

function loadFlagStates() {
 
  const flags = JSON.parse(localStorage.getItem('flagStates'))
  document.querySelectorAll('.flag-button').forEach(button => {
    const id = button.dataset.id;
   

    if (flags[id]) {

      button.classList.add('add-flag-class');
    }
  });
}




function addFlagClass(button) {
  const id = button.dataset.id;
  let flags = JSON.parse(localStorage.getItem('flagStates')) || {};



  button.classList.toggle('add-flag-class')
  flags[id] = button.classList.contains('add-flag-class');
  localStorage.setItem('flagStates', JSON.stringify(flags));




}





function deleteEntry(key, subtopic) {
  delete entriesObject[key];
  localforage.setItem('key', entriesObject).then(() => {

    cycleTopicEntries(subtopic);
  });
}

function openQuestionAnswerFrame(key) {
  const Html = ` <div class="text-box" contenteditable="false">

          
           
           
           

  </div> <button class="save-button" onclick="saveQuestionText('${key}');">SAVE</button>
    <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">`



 


  const frame = document.querySelector('.main-bar')
  frame.innerHTML = Html
 
  const textFrame = frame.querySelector('.text-box')
  const innerText = entriesObject[key].entries
  localStorage.setItem(key, innerText )
  const savedText = localStorage.getItem(key)
 
  textFrame.innerHTML = savedText

}





