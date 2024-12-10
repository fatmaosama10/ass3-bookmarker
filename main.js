var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var bookmarkList = document.getElementById("bookmark-list");
var siteContainer = JSON.parse(localStorage.getItem("bookmarks")) || [];
var dialog = null;

function isValidURL(url) {
    var pattern = /^(https?:\/\/)([\w\-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return pattern.test(url);
}

function isNameUnique(name) {
    return !siteContainer.some(site => site.name === name);
}

function showRules() {
    if (dialog) {
        dialog.close();
        document.body.removeChild(dialog);
    }

    dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <p>Site Name or Url is not valid, Please follow the rules below :</p>
        <p class="">
           <i class="fa-solid fa-arrow-right"></i> Must start with http:// or https://<br>
          <i class="fa-solid fa-arrow-right"></i>  Should contain a valid domain name<br>
          <i class="fa-solid fa-arrow-right"></i>  Example: https://www.example.com<br>
        <p>
        <button id="close-dialog">Close</button>
        
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    document.getElementById('close-dialog').addEventListener('click', () => {
        dialog.close();
        document.body.removeChild(dialog);
    });
}

function addSite() {
    var site = {
        name: siteName.value,
        URL: siteUrl.value,
    };
    if (!isNameUnique(siteName.value)) {
        alert('Bookmark already exists.');
        return;
    }
    if (!isValidURL(siteUrl.value)) {
        showRules();
        return;
    }
    siteContainer.push(site);
    localStorage.setItem("bookmarks", JSON.stringify(siteContainer));
    displaySite();
    clearInputs();
}

function displaySite() {
    var cartoona = "";
    for (var i = 0; i < siteContainer.length; i++) {
        cartoona += `
            <tr>
               <td>${i + 1}</td>
               <td>${siteContainer[i].name}</td>
               <td><a href="${siteContainer[i].URL}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</a></td>
               <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
            </tr>
        `;
    }
    bookmarkList.innerHTML = cartoona;
}

function deleteSite(index) {
    siteContainer.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(siteContainer));
    displaySite();
}

function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
}
var addButton = document.querySelector("button");
addButton.addEventListener("click", addSite);
displaySite();