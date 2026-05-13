const manuals = [
    { id: 1, name: "Perfuratriz", image: "assets/images/perfuratriz_n.jpeg", pdfs: ["assets/pdfs/01-perfuratriz.pdf"] },
    { id: 2, name: "Pá Carregadeira", image: "assets/images/pa_carregadeira.jpeg", pdfs: ["assets/pdfs/02-pa_carregadora.pdf"] },
    { id: 3, name: "Caminhão Fora de Estrada", image: "assets/images/foradestrada.jpeg", pdfs: ["assets/pdfs/03-caminhao_fora_estrada.pdf"] },
    { id: 4, name: "Motoniveladora", image: "assets/images/motoniveladora.jpeg", pdfs: ["assets/pdfs/04-motoniveladora.pdf"] },
    { id: 5, name: "Caminhão Tanque", image: "assets/images/caminhao_tanque.png", pdfs: ["assets/pdfs/05-caminhao_tanque.pdf"] },
    { id: 6, name: "Trator de Esteira", image: "assets/images/tratordeesteira_n.jpeg", pdfs: ["assets/pdfs/06-trator_esteira.pdf"] },
    { id: 7, name: "Britador", image: "assets/images/britador.png", pdfs: ["assets/pdfs/07-britador.pdf", "assets/pdfs/07-correia_britador.pdf"] },
    { id: 8, name: "Peneiras", image: "assets/images/peneiramento_eslásticos.jpeg", pdfs: ["assets/pdfs/08-peneira.pdf"] },
    { id: 9, name: "Correias Classificadoras", image: "assets/images/separadormagnético.jpeg", pdfs: ["assets/pdfs/09-correia_transportadora.pdf"] },
    { id: 10, name: "Carregamento por Silo", image: "assets/images/silo.png", pdfs: ["assets/pdfs/10-silo.pdf"] },
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('manuals-grid');
    grid.innerHTML = '';

    manuals.forEach(manual => {
        const card = document.createElement('a');
        card.href = `viewer.html?id=${manual.id}`;
        card.className = 'manual-card';

        card.innerHTML = `
            <div class="image-container">
                <img src="${manual.image}" alt="${manual.name}">
            </div>
            <div class="card-content">
                <h3>${manual.name}</h3>
            </div>
        `;

        grid.appendChild(card);
    });
});