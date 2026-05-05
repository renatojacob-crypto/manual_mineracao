pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

const manuals = [
	{
		id: 1, 
		pdfs: [
			{ path: "assets/pdfs/01_trem.pdf", title: "Manual de Montagem do Trem de Carga" },
			{ path: "assets/pdfs/01_aspersor.pdf", title: "Manual de Montagem do Aspersor de Polímeros" }
		]
	},
	{
		id: 2,
		pdfs: [
			{ path: "assets/pdfs/02_virador.pdf", title: "Manual de Montagem do Virador de Vagões"  }
		]
	},
	{
		id: 3,
		pdfs: [
			{ path: "assets/pdfs/03_moinho.pdf", title: "Manual de Montagem do Moinho de Bolas" }
		]
	},
	{
		id: 4,
		pdfs: [
			{ path: "assets/pdfs/04_tanque.pdf", title: "Manual de Montagem do Tanque de Homogeinização" }
		]
	},
	{
		id: 5,
		pdfs: [
			{ path: "assets/pdfs/05_prensa.pdf", title: "Manual de Montagem da Prensa de Rolos" }
		]
	},
	{
		id: 6,
		pdfs: [
			{ path: "assets/pdfs/06_aglomerantes.pdf", title: "Manual de Montagem da Adição de Aglomerantes" }
		]
	},
	{
		id: 7,
		pdfs: [
			{ path: "assets/pdfs/07_pelotamento.pdf", title: "Manual de Montagem do Disco de Pelotamento" }
		]
	},
	{
		id: 8,
		pdfs: [
			{ path: "assets/pdfs/08_peneiramento.pdf", title: "Manual de Montagem do Peneiramento" }
		]
	},
    {
		id: 9,
		pdfs: [
			{ path: "assets/pdfs/09_carregador.pdf", title: "Manual de Montagem do Carregador de Navios" }
        ]
    }   
    // 👉 Adicione aqui todos os outros IDs,
    // mesmo que tenham apenas 1 PDF
]

const container = document.getElementById("pdf-container");
const topBtn = document.getElementById("topBtn");
const manual = manuals.find(m => m.id === id);

if (!manual) {
    container.innerHTML = `
        <div style="text-align:center; margin-top:100px;">
            <h2>Manual não encontrado</h2>
            <p>Verifique o ID passado na URL.</p>
        </div>
    `;
} else {
    manual.pdfs.forEach(pdf => {
        createPdfViewer(pdf.path, pdf.title);
    });
}

function createPdfViewer(pdfPath, titleText) {

    const block = document.createElement("div");
    block.className = "pdf-block";

    const title = document.createElement("div");
    title.className = "pdf-title";
    title.innerText = titleText;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const controls = document.createElement("div");
    controls.className = "controls";

    const prevBtn = createButton("⬅", "nav-btn");
    const nextBtn = createButton("➡", "nav-btn");
    const zoomIn = createButton("+", "zoom-btn");
    const zoomOut = createButton("−", "zoom-btn");

    const pageInfo = document.createElement("span");

    controls.append(prevBtn, zoomOut, zoomIn, pageInfo, nextBtn);
    block.append(title, canvas, controls);
    container.appendChild(block);

    let pdfDoc = null;
    let currentPage = 1;
    let scale = 1;

    pdfjsLib.getDocument(pdfPath).promise.then(pdf => {
        pdfDoc = pdf;
        renderPage(currentPage);
    }).catch(error => {
        block.innerHTML = `<p style="color:red;">Erro ao carregar PDF.</p>`;
        console.error(error);
    });

    function renderPage(num) {
        pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({ scale });
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            page.render({
                canvasContext: ctx,
                viewport: viewport
            });

            pageInfo.textContent = `Página ${num} de ${pdfDoc.numPages}`;
        });
    }

    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    };

    nextBtn.onclick = () => {
        if (currentPage < pdfDoc.numPages) {
            currentPage++;
            renderPage(currentPage);
        }
    };

    zoomIn.onclick = () => {
        scale += 0.2;
        renderPage(currentPage);
    };

    zoomOut.onclick = () => {
        if (scale > 0.4) {
            scale -= 0.2;
            renderPage(currentPage);
        }
    };

    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "ArrowRight") nextBtn.click();
    });

    let startX = 0;

    canvas.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    canvas.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        if (endX < startX - 50) nextBtn.click();
        if (endX > startX + 50) prevBtn.click();
    });
}

function createButton(text, className) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.className = className;
    return btn;
}

window.onscroll = function() {
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
};