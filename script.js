var myState = {
    pdf: null,
    currentPage: 1,
    totalPages: 1,
    zoom: 1
}
const changeChap = (chap_url) => {
    pdfjsLib.getDocument(chap_url).then((pdf) => {

        myState.pdf = pdf;
        myState.totalPages = pdf._pdfInfo.numPages;
        document.querySelector('.pageNo').textContent = `1/${myState.totalPages}`
        render();

    });
}
function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {

        var canvas = document.getElementById("pdf-render");
        var ctx = canvas.getContext('2d');

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}
document.querySelector(".next").addEventListener("click", () => {
    if (myState.pdf == null || myState.totalPages == 1) {
        return;
    }
    if (myState.currentPage<myState.totalPages) {
        
        myState.currentPage = myState.currentPage + 1;
        document.querySelector('.pageNo').textContent = `${myState.currentPage}/${myState.totalPages}`
        render();
    }
})
document.querySelector(".prev").addEventListener("click", () => {
    if (myState.pdf == null || myState.currentPage == 1) {
        return;
    }
    myState.currentPage = myState.currentPage - 1;

    document.querySelector('.pageNo').textContent = `${myState.currentPage}/${myState.totalPages}`
    render();
})
document.querySelector(".zoom-out").addEventListener('click', () => {
    if (myState.zoom <= 1) {
        return;
    }
    document.querySelector(".pageSize").innerHTML = parseInt(document.querySelector(".pageSize").innerText) - 100 + "%";
    myState.zoom = myState.zoom - 1;
    render();
})
document.querySelector(".zoom-in").addEventListener('click', () => {
    if (myState.zoom == 6) {
        return;
    }
    document.querySelector(".pageSize").innerHTML = parseInt(document.querySelector(".pageSize").innerText) + 100 + "%"
    myState.zoom = myState.zoom + 1;
    render();
})
function downloadFile(filename, content) {
    const element = document.createElement('a');
    const blob = new Blob([content], {
        type: 'plain/text',
    });
    const fileUrl = URL.createObjectURL(blob);
    element.setAttribute("href", fileUrl);
    element.setAttribute('download', filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function download_note() {
    const filename = "Mynotes.txt";
    const content = document.querySelector('.writtenNotes').value;

    if (filename && content) {
        downloadFile(filename, content);
    }
}
function download_mobile_note() {
    const filename = "Mynotes.txt";
    const content = document.querySelector('.mobile-notepad').value;

    if (filename && content) {
        downloadFile(filename, content);
    }
}
window.addEventListener("resize", ()=>{
    if (window.outerWidth < 999) {
        myState.zoom = (window.outerWidth/1000) + .2
        console.log(myState.zoom);
        render()
    }
    else{
        myState.zoom = 1
        console.log(myState.zoom);
        render()
    }
})
window.addEventListener("onload", ()=>{
    if (window.outerWidth < 999) {
        myState.zoom = (window.outerWidth/1000) + .2
        console.log(myState.zoom);
        render()
    }
    else{
        myState.zoom = 1
        console.log(myState.zoom);
        render()
    }
})

//show chapters 
function show_chapters() {
    if (document.querySelector(".chapters").style.left != "0px") {
        document.querySelector(".chapters").style.left = "0px"
        document.querySelector(".chapters").style.opacity = "1"

    }
    else {
        document.querySelector(".chapters").style.left = "-220px"
        document.querySelector(".chapters").style.opacity = "0"
    }
}
function open_navbar() {
    document.querySelector(".mobile-navbar").classList.add("open-navbar")
    document.querySelector(".mobile-bar-open").style.display = "none"
}
function close_navbar() {
    if (document.querySelector(".mobile-navbar").classList.contains("open-navbar")) {
        document.querySelector(".mobile-navbar").classList.remove("open-navbar")
        document.querySelector(".mobile-bar-open").style.display = "flex"
    }
}

// let paramString = urlString.split('?')[1];
// let params_arr = paramString.split('&');

// for (let i = 0; i < params_arr.length; i++) {
//    let pair = params_arr[i].split('=');
//    console.log("Key is:", pair[0]);
//    console.log("Value is:", pair[1]);
// }

// let subject1 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject1.open("POST", "/"+subject1obj.subjectName);
// subject1.onload = function () {
//     console.log(subject1obj);
//     subname.innerHTML = subject1obj.subjectName+".";
// }
// subject1.send()


// let subject2 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject2.open("POST", "/precalculus");
// subject2.onload = function () {
//     subname.innerHTML = subject2.subjectName+".";
// }
// subject2.send()


// let subject3 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject3.open("POST", "/ap-calculus1");
// subject3.onload = function () {
//     subname.innerHTML = subject3.subjectName+".";
// }
// subject3.send()


// let subject4 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject4.open("POST", "/ap-calculus2");
// subject4.onload = function () {
//     subname.innerHTML = subject4.subjectName+".";
// }
// subject4.send()


// let subject5 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject5.open("POST", "/french");
// subject5.onload = function () {
//     subname.innerHTML = subject5.subjectName+".";
// }
// subject5.send()


// let subject6 = new XMLHttpRequest();
// subname = document.querySelector(".notes-subname");
// subject6.open("POST", "/biology");
// subject6.onload = function () {
//     subname.innerHTML = subject6.subjectName+".";
// }
// subject6.send()
