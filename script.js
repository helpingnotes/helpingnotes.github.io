var myState = {
    pdf: null,
    currentPage: 1,
    totalPages: 1,
    zoom: 1
}
const changeChap = (chap_url) => {
    pdfjsLib.getDocument(chap_url, {mode:'no-cors'}).then((pdf) => {

        myState.pdf = pdf;
        myState.totalPages = pdf._pdfInfo.numPages;
        document.querySelector('.pageNo').textContent = `1/${myState.totalPages}`
        render();

    });
    document.querySelector(".FileDownload").setAttribute("href", `${chap_url}`)
    document.querySelector(".fullScreen").setAttribute("href", `${chap_url}`)
}

function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {

        var canvas = document.getElementById("pdf-render");
        var ctx = canvas.getContext('2d');

        let container = document.getElementById("canvas-container")
        let containerWidth = container.offsetWidth;
        // myState.zoom = containerWidth;
        // var viewport =(page.getViewport(containerWidth/page.getViewport(myState.zoom).width));
        var viewport =(page.getViewport(10));
        console.log( viewport);
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = "100%"

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
