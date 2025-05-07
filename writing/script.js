const path = window.location.pathname
const pathElem = document.getElementById("path")
const linkElem = document.createElement("span")
linkElem.href = path	
linkElem.textContent = "zedkaido.com" + path
pathElem.appendChild(linkElem)
