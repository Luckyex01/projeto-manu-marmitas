// Macros: TACO v.4 (2011), energia 4/4/9, sem sal de adição. Preço sugerido. Tudo a validar.
const PRATOS = [
  { id: 'frango-arroz-feijao', nome: 'Frango grelhado, arroz e feijão', foto: 'foto6.jpg', peso: 350, kcal: 423, p: 49, c: 47, g: 4, fib: 10, na: 69, preco: 27.9, tags: ['proteina'],
    ing: 'Peito de frango grelhado (130 g), arroz branco (120 g), feijão carioca (100 g), cebolinha.' },
  { id: 'frango-pure', nome: 'Frango grelhado com purê de batata', foto: 'foto7.jpg', peso: 380, kcal: 316, p: 45, c: 26, g: 3, fib: 4, na: 71, preco: 27.9, tags: ['proteina'],
    ing: 'Peito de frango grelhado (130 g), purê de batata (200 g), brócolis (50 g).' },
  { id: 'peixe', nome: 'Peixe branco com arroz integral e legumes', foto: 'foto9.jpg', peso: 360, kcal: 330, p: 39, c: 37, g: 3, fib: 7, na: 163, preco: 29.9, tags: ['proteina'],
    ing: 'Filé de peixe branco assado (130 g), arroz integral (120 g), brócolis (60 g), cenoura (50 g).' },
  { id: 'carne-pure', nome: 'Carne moída com purê e arroz', foto: 'foto8.jpg', peso: 330, kcal: 418, p: 43, c: 42, g: 8, fib: 3, na: 70, preco: 28.9, tags: ['proteina'],
    ing: 'Patinho moído (110 g), purê de batata (120 g), arroz branco (100 g), cebolinha.' },
  { id: 'lowcarb', nome: 'Peixe com legumes (low carb)', foto: 'foto2.jpg', peso: 390, kcal: 236, p: 43, c: 11, g: 2, fib: 6, na: 187, preco: 29.9, tags: ['proteina', 'lowcarb'],
    ing: 'Filé de peixe branco assado (150 g), brócolis (100 g), abobrinha (80 g), cenoura (60 g).' },
  { id: 'falafel', nome: 'Falafel assado com arroz integral e legumes', foto: 'foto3.jpg', peso: 425, kcal: 417, p: 19, c: 73, g: 5, fib: 15, na: 10, preco: 26.9, tags: ['vegano'],
    ing: 'Falafel de grão-de-bico assado (70 g cru), arroz integral (100 g), abobrinha (60 g), cenoura (50 g), brócolis (40 g).' },
];

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const grid = document.getElementById('grid');

function card(x) {
  const total = x.p * 4 + x.c * 4 + x.g * 9;
  const pct = (v, f) => Math.round((v * f / total) * 100);
  return `
  <button class="card" data-id="${x.id}" data-tags="${x.tags.join(' ')}">
    <div class="card__img"><img src="assets/${x.foto}" alt="${x.nome}" loading="lazy">
      ${x.tags.includes('vegano') ? '<span class="badge badge--green">Vegano</span>' : ''}
      ${x.tags.includes('lowcarb') ? '<span class="badge badge--green">Low carb</span>' : ''}
    </div>
    <div class="card__body">
      <h3>${x.nome}</h3>
      <p class="card__meta">${x.peso} g · ${x.kcal} kcal</p>
      <div class="macros">
        <div><strong>${x.p}g</strong><span>proteína</span></div>
        <div><strong>${x.c}g</strong><span>carbo</span></div>
        <div><strong>${x.g}g</strong><span>gordura</span></div>
      </div>
      <div class="bar" aria-hidden="true">
        <i style="width:${pct(x.p, 4)}%" class="bar--p"></i><i style="width:${pct(x.c, 4)}%" class="bar--c"></i><i style="width:${pct(x.g, 9)}%" class="bar--g"></i>
      </div>
      <div class="card__foot"><span class="price">${brl(x.preco)}</span><span class="link">Ver tabela →</span></div>
    </div>
  </button>`;
}

grid.innerHTML = PRATOS.map(card).join('');

document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    grid.querySelectorAll('.card').forEach((el) => {
      el.hidden = f !== 'todos' && !el.dataset.tags.split(' ').includes(f);
    });
  });
});

const dlg = document.getElementById('detalhe');
const body = document.getElementById('detalhe-body');

grid.addEventListener('click', (e) => {
  const el = e.target.closest('.card');
  if (!el) return;
  const x = PRATOS.find((p) => p.id === el.dataset.id);
  body.innerHTML = `
    <button class="modal__close" aria-label="Fechar">×</button>
    <img src="assets/${x.foto}" alt="${x.nome}" class="modal__img">
    <div class="modal__content">
      <h3>${x.nome}</h3>
      <p class="card__meta">Porção ${x.peso} g · ${brl(x.preco)}</p>
      <table class="nutri">
        <caption>Informação nutricional · porção de ${x.peso} g</caption>
        <tr><th>Energia</th><td>${x.kcal} kcal</td></tr>
        <tr><th>Proteínas</th><td>${x.p} g</td></tr>
        <tr><th>Carboidratos</th><td>${x.c} g</td></tr>
        <tr><th>Gorduras totais</th><td>${x.g} g</td></tr>
        <tr><th>Fibra alimentar</th><td>${x.fib} g</td></tr>
        <tr><th>Sódio (sem sal de adição)</th><td>${x.na} mg</td></tr>
      </table>
      <p class="modal__ing"><strong>Ingredientes:</strong> ${x.ing}</p>
      <p class="note">Estimativa TACO 4ª ed. · a validar pela nutricionista.</p>
    </div>`;
  dlg.showModal();
});

dlg.addEventListener('click', (e) => {
  if (e.target === dlg || e.target.classList.contains('modal__close')) dlg.close();
});
