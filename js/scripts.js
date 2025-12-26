const PRODUCTS = [
  {
    id: 'p1',
    name: 'CD-ROM Drive 24X',
    brand: 'Samsung',
    category: 'cdrom',
    speed: '24X',
    short: 'Reliable 24X CD-ROM drive suitable for legacy systems.',
    doc: 'docs/CDROM_24X.doc',
    image: 'images/pexels-tanasovich-2588757.jpg'
  },
  {
    id: 'p2',
    name: 'CD-ROM Drive 52X',
    brand: 'LG',
    category: 'cdrom',
    speed: '52X',
    short: 'High-speed 52X CD-ROM drive with improved cooling.',
    doc: 'docs/CDROM_52X.doc',
    image: 'images/pic1.jpg'
  },
  {
    id: 'p3',
    name: 'Printable CD-R (700MB)',
    brand: 'Sony',
    category: 'compact',
    speed: '48X',
    short: '700MB CD-R discs for audio, data backup and distribution.',
    doc: 'docs/CDR_700.doc',
    image: 'images/pic2.jpg'
  },
  {
    id: 'p4',
    name: 'Floppy Disk 1.44MB',
    brand: 'Generic',
    category: 'floppy',
    speed: 'n/a',
    short: 'Legacy 3.5 inch floppy disks for older equipment.',
    doc: 'docs/FLOPPY_1_44.doc',
    image: 'images/pic3.jpg'
  },
   {
    id: 'p3',
    name: 'Printable CD-R (700MB)',
    brand: 'Sony',
    category: 'compact',
    speed: '48X',
    short: '700MB CD-R discs for audio, data backup and distribution.',
    doc: 'docs/CDR_700.doc',
    image: 'images/pic2.jpg'
  },
    {
    id: 'p1',
    name: 'CD-ROM Drive 24X',
    brand: 'Samsung',
    category: 'cdrom',
    speed: '24X',
    short: 'Reliable 24X CD-ROM drive suitable for legacy systems.',
    doc: 'docs/CDROM_24X.doc',
    image: 'images/pexels-tanasovich-2588757.jpg'
  },
   {
    id: 'p4',
    name: 'Floppy Disk 1.44MB',
    brand: 'Generic',
    category: 'floppy',
    speed: 'n/a',
    short: 'Legacy 3.5 inch floppy disks for older equipment.',
    doc: 'docs/FLOPPY_1_44.doc',
    image: 'images/pic3.jpg'
  },
  {
    id: 'p4',
    name: 'Floppy Disk 1.44MB',
    brand: 'Generic',
    category: 'floppy',
    speed: 'n/a',
    short: 'Legacy 3.5 inch floppy disks for older equipment.',
    doc: 'docs/FLOPPY_1_44.doc',
    image: 'images/pic3.jpg'
  },
  {
    id: 'p2',
    name: 'CD-ROM Drive 52X',
    brand: 'LG',
    category: 'cdrom',
    speed: '52X',
    short: 'High-speed 52X CD-ROM drive with improved cooling.',
    doc: 'docs/CDROM_52X.doc',
    image: 'images/pic1.jpg'
  },
  {
    id: 'p1',
    name: 'CD-ROM Drive 24X',
    brand: 'Samsung',
    category: 'cdrom',
    speed: '24X',
    short: 'Reliable 24X CD-ROM drive suitable for legacy systems.',
    doc: 'docs/CDROM_24X.doc',
    image: 'images/pexels-tanasovich-2588757.jpg'
  },
];

// Utility: get element by id
const $ = id => document.getElementById(id);

// Render product cards
function renderProducts(filterBrand = 'all', filterCat = null) {
  const grid = $('products-grid');
  if (!grid) return;
  grid.innerHTML = ''; 

  const list = PRODUCTS.filter(p => {
    if (filterBrand !== 'all' && p.brand !== filterBrand) return false;
    if (filterCat && p.category !== filterCat) return false;
    return true;
  });

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img alt="${p.name}" src="${p.image}" />
      <h3>${p.name}</h3>
      <p><strong>Brand:</strong> ${p.brand} &nbsp; <strong>Speed:</strong> ${p.speed}</p>
      <p>${p.short}</p>
      <div style="display:flex;gap:6px;align-items:center;">
        <label style="display:flex;align-items:center;gap:6px;">
          <input type="checkbox" class="compare-checkbox" data-id="${p.id}" />
          Compare
        </label>
        <a class="cta" href="${p.doc}" download>Download Specs</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Setup filters + compare
function setupProductsPage() {
  if (!$('products-grid')) return;

  renderProducts();

  $('brand-select').addEventListener('change', e => {
    renderProducts(e.target.value);
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      $('brand-select').value = 'all';
      renderProducts('all', cat);
    });
  });

  $('compare-btn').addEventListener('click', () => {
    const checked = Array.from(document.querySelectorAll('.compare-checkbox:checked'))
      .map(cb => cb.dataset.id);

    if (checked.length < 2) {
      alert('Select at least two products to compare.');
      return;
    }

    showComparison(checked);
  });

  $('close-compare').addEventListener('click', () => {
    $('comparison-area').hidden = true;
  });
}

// Build comparison table
function showComparison(ids) {
  const area = $('comparison-area');
  const table = $('comparison-table');

  const items = PRODUCTS.filter(p => ids.includes(p.id));

  table.innerHTML = '';

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Feature</th>' +
    items.map(p => `<th>${p.name}</th>`).join('');
  table.appendChild(headerRow);

  const rows = [
    ['Brand', ...items.map(i => i.brand)],
    ['Speed', ...items.map(i => i.speed)],
    ['Short Description', ...items.map(i => i.short)],
    ['Spec File', ...items.map(i => `<a href="${i.doc}" download>Download</a>`)]
  ];

  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = r.map(cell => `<td>${cell}</td>`).join('');
    table.appendChild(tr);
  });

  area.hidden = false;
}

document.addEventListener('DOMContentLoaded', setupProductsPage);
