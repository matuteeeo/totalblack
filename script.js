document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// Filter products
function filterProducts(cat) {
  // Manejar los botones de filtro activos (principal y tienda)
  document.querySelectorAll('.filter-tab, .filter-btn').forEach(t => t.classList.remove('active'));
  document.querySelectorAll(`.filter-tab[data-filter="${cat}"], .filter-btn[data-filter="${cat}"]`).forEach(btn => {
    btn.classList.add('active');
  });

  // Mantener en sincronía el select de móviles si existe
  const mobileSelect = document.getElementById('mobileFilter');
  if (mobileSelect && mobileSelect.value !== cat) {
    mobileSelect.value = cat;
  }

  // Manejar la visualización de las cartas
  document.querySelectorAll('.prod-card').forEach(card => {
    if (card.classList.contains('view-all')) {
      if (cat === 'todos') {
        card.style.display = 'none';
      } else {
        card.style.display = 'flex';
      }
      return;
    }

    if (cat === 'todos' || card.dataset.cat === cat) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Si fue clickeado desde una tarjeta, aseguremos que el scroll lleve a productos
  // Esto es manejado por el HTML href="#productos" en algunos casos o aquí si lo deseamos.
}
