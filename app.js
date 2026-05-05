const manuals = [
    { id: 1, name: "Estrada de Ferro Vitória a Minas e o Trem", image: "assets/images/01_trem.png", pdfs: ["assets/pdfs/01_aspersor.pdf"] },
    { id: 2, name: "Virador de Vagões", image: "assets/images/02_virador.png", pdfs: ["assets/pdfs/02_virador.pdf"] },
    { id: 3, name: "Moagem", image: "assets/images/03_moinho.png", pdfs: ["assets/pdfs/03_moinho.pdf"] },
    { id: 4, name: "Homogeneização", image: "assets/images/04_tanque.png", pdfs: ["assets/pdfs/04_tanque.pdf"] },
    { id: 5, name: "Prensa de Rolos", image: "assets/images/05_prensa.png", pdfs: ["assets/pdfs/05_prensa.pdf"] },
    { id: 6, name: "Adição de Aglomerantes", image: "assets/images/06_aglomerantes.png", pdfs: ["assets/pdfs/06_aglomerantes.pdf"] },
    { id: 7, name: "Pelotização", image: "assets/images/07_pelotamento.png", pdfs: ["assets/pdfs/07_pelotamento.pdf"] },
    { id: 8, name: "Peneiramento", image: "assets/images/08_peneiramento.png", pdfs: ["assets/pdfs/08_peneiramento.pdf"] },
    { id: 9, name: "Carregamento de Navios", image: "assets/images/09_carregador.png", pdfs: ["assets/pdfs/09_carregador.pdf"] },
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