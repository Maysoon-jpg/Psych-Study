 const rm = {
      saveId: 'saveRm',
      link: `<div class="pageOneBar" onclick="openInfoPage(rm);"><p class="info-text">Research Methods> info</p></div>
          <div class="pageOneBar"><p class="essay-text">Research Methods> essay</p></div>`,
      info: {
        getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveRm") || ""}
            <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">
           
           

          </div> <button class="save-button" onclick="saveText(rm.saveId);">SAVE</button>`
      },
      essay: {
        contentpage: 'html for content'
      }
    }




    const si = {
      saveId: 'saveSi',
      link: `<div class="pageOneBar" onclick="openInfoPage(si)"><p class="info-text">Social Influence> info</p></div>
          <div class="pageOneBar"><p class="essay-text">Social Influence> essay</p></div>`,
      info: {
        getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveSi") || ""}
            <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">
           
           

          </div> <button class="save-button" onclick="saveText(si.saveId);">SAVE</button>`
      },
      essay: {
        contentpage: 'html for content'
      }
    }

    const at = {
      saveId: 'saveAt',
      link: `<div class="pageOneBar" onclick="openInfoPage(at);"><p class="info-text">Attatchment> info</p></div>
          <div class="pageOneBar"><p class="essay-text">Attatchment> essay</p></div>`,
      info: {
        getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveAt") || ""}
            <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">
           
           

          </div> <button class="save-button" onclick="saveText(at.saveId);">SAVE</button>`
      },
      essay: {
        contentpage: 'html for content'
      }


    }
    const ap = {
      saveId: 'saveAp',
      link: `<div class="pageOneBar"; onclick="openInfoPage(ap);"><p class="info-text">Approaches> info</p></div>
          <div class="pageOneBar"><p class="essay-text">Approaches> essay</p></div>`,
      info: {
        getContentPage: () => ` <div class="text-box" contenteditable="false">
          ${localStorage.getItem("saveAp") || ""}
            <img src="Images/pencil.png" class="pencil-image" onclick="pencilClick(); ">
           
           

          </div> <button class="save-button" onclick="saveText(ap.saveId);">SAVE</button>`
      },
      essay: {
        contentpage: 'html for content'
      }
    }


    function changeColourOnClick(button) {

      const active = document.querySelector('.subject-content.buttonColourClass');
      if (active) {
        active.classList.remove('buttonColourClass');
      }


      button.classList.add('buttonColourClass')


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
    function saveText(subject) {
      const textBox = document.querySelector('.text-box')



      const savedText = textBox.innerHTML
      console.log("Textbox:", textBox);
      console.log("Saved text:", savedText);
      console.log("Subject key:", subject);


      localStorage.setItem(subject, savedText)
      console.log(subject)
      console.log(localStorage)
      console.log(localStorage.getItem('saveRm'))

    }
