var counter = 1;
var tabActual;
var textMap = new Map();
var consola;

function mostarPestaniaR(evt, tabId) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontentR");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinksR");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.className += " active";
  
}

function mostarPestania(evt, tabId) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabId).style.display = "block";
  evt.currentTarget.className += " active";
  tabActual = tabId;
}

function nuevaPestaña() { 
  var tabLinks = document.getElementById("tabslinks");
  var tabs = document.getElementById("tabs");
  var tabName = "Tab " + counter++;
  //Creacion del boton
  var btn = document.createElement("BUTTON");
  btn.innerHTML = tabName;
  btn.onclick = function () { mostarPestania(event, tabName) };
  btn.className = "tablinks";
  btn.id = "button" + tabName;
  tabLinks.appendChild(btn);
  //Creacion del cuadro de texto
  var divTab = document.createElement("DIV");
  divTab.id = tabName;
  divTab.className = "tabcontent"
  var textArea = document.createElement("TEXTAREA");//Creacion del textarea
  textArea.className = "tabedText";
  textArea.id = "text" + tabName;
  var identificador = "text" + tabName;
  divTab.appendChild(textArea);
  tabs.appendChild(divTab);

  var tempo = CodeMirror.fromTextArea(document.getElementById(identificador),{
      lineNumbers : true,
      mode: "modo",
      theme : "base16-dark",
  });
  tempo.setSize(null,655);
  tempo.setValue("\n\n\n\n\n\n\n\n\n\n");
  
  //Guardo la referencia del nuevo textmirror para la pestaña nueva
  textMap.set(identificador,tempo);
 
  document.getElementById("button" + tabName).click();
}

function inicializarConsola() {
  var tempo = CodeMirror.fromTextArea(document.getElementById("consola"),{
    lineNumbers : true,
    mode: "modo",
    theme : "base16-dark",
  });
  tempo.setSize(null,250);
  tempo.setValue("\n\n\n\n\n\n\n\n\n\n");
  //Guardo la referencia del nuevo textmirror para la pestaña que contiene la consola
  consola = tempo;
  document.getElementById("buttonConsola").click();
}

function interpretar() {
  console.log("Interpetando la entrada...")
  //Obtengo el textarea del tab actual 
  let tempo = textMap.get("text" + tabActual); 
  //Imprimo el texto que esta en el textarea de codemirror
  console.log(tempo.getValue());
  /*
  textMap.forEach( (value, key, map) => {
    console.log(`${key}: ${value}`); 
  });
  */
  //correr();
}