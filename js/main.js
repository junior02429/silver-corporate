/* ============ Silver Corporate — main.js ============ */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
  const dateFr = d => { const x = new Date(d); return isNaN(x) ? '' : x.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }); };
  const paras = t => String(t || '').split(/\n{2,}/).map(p => '<p>' + esc(p) + '</p>').join('');

  /* ---------- Icônes ---------- */
  const ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    spark: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
    trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'
  };
  const icon = (n, s) => `<svg class="ic" width="${s || 24}" height="${s || 24}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------- Prix ---------- */
  function price(s) {
    const u = s.unite ? '/' + s.unite : '';
    switch (s.type) {
      case 'fixe': return fmt(s.prix) + ' FCFA' + u;
      case 'a_partir': return 'À partir de ' + fmt(s.prix) + ' FCFA' + u;
      case 'fourchette': return fmt(s.prix) + ' à ' + fmt(s.prix_max) + ' FCFA';
      case 'devis': return 'Sur devis';
      case 'volume': return 'Tarif selon volume';
      case 'demande': return 'Sur demande';
    }
    return '';
  }
  const packPrice = p => (p.aPartir ? 'À partir de ' : '') + fmt(p.prix) + ' FCFA';

  /* ---------- En-tête et pied de page ---------- */
  const NAV = [['index.html', 'Accueil'], ['a-propos.html', 'À propos'], ['activites.html', 'Activités'], ['silver-services.html', 'Silver Services'], ['jeunes-inspires.html', 'Jeunes Inspirés'], ['projets.html', 'Projets'], ['realisations.html', 'Réalisations'], ['actualites.html', 'Actualités']];
  const MORE = [['equipe.html', 'Équipe'], ['partenaires.html', 'Partenaires'], ['collaborer.html', 'Collaborer avec nous'], ['ressources.html', 'Documents / Ressources']];
  const here = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  const isHere = h => h.replace(/\.html$/, '') === here;
  const WA = 'https://wa.me/' + SITE.whatsapp;

  function layout() {
    const a = ([h, t]) => `<a href="${h}"${isHere(h) ? ' class="active" aria-current="page"' : ''}>${t}</a>`;
    const moreOn = MORE.some(([h]) => isHere(h));
    const hd = $('#site-header');
    if (hd) hd.outerHTML = `
    <header class="site-header"><div class="container hd">
     <a class="brand" href="index.html" aria-label="Silver Corporate — accueil"><img src="images/logo.png" alt="Silver Corporate" onerror="this.outerHTML='<b class=brand-txt>Silver Corporate</b>'"></a>
      <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav">☰</button>
      <nav class="nav" id="nav" aria-label="Navigation principale">
        ${NAV.map(a).join('')}
        <details class="more"><summary class="${moreOn ? 'active' : ''}">Plus ▾</summary><div class="more-list">${MORE.map(a).join('')}</div></details>
        <a class="btn btn-green" href="contact.html">Contact</a>
      </nav>
    </div></header>`;

    const soc = [['facebook', 'Facebook'], ['linkedin', 'LinkedIn'], ['youtube', 'YouTube'], ['tiktok', 'TikTok']]
      .filter(([k]) => SITE.reseaux[k]).map(([k, l]) => `<li><a href="${esc(SITE.reseaux[k])}" target="_blank" rel="noopener">${l}</a></li>`).join('');
    const ft = $('#site-footer');
    if (ft) ft.outerHTML = `
    <footer class="site-footer"><div class="container">
      <div class="footer-grid">
        <div class="fl has-logo"><img src="images/logo.png" alt="Silver Corporate" onerror="this.parentElement.remove()"></div>
        <div><h4>Le groupe</h4><ul>${[...NAV.slice(1, 3), ...NAV.slice(4), ...MORE].map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>
        <div><h4>Silver Services</h4><ul><li><a href="silver-services.html#tarifs">Tarifs 2026</a></li><li><a href="silver-services.html#packs">Packs</a></li><li><a href="silver-services.html#commande">Commander</a></li><li><a href="silver-services.html#faq">Questions fréquentes</a></li></ul></div>
        <div><h4>Contact</h4><ul>
          <li>${esc(SITE.adresse)}</li>
          <li>WhatsApp : <a href="${WA}" target="_blank" rel="noopener">${esc(SITE.whatsappAffiche)}</a></li>
          <li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li></ul>
          ${soc ? `<h4 style="margin-top:18px">Réseaux</h4><ul>${soc}</ul>` : ''}</div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} Silver Corporate — Structure mère à vocation entrepreneuriale. Tous droits réservés.</div>
    </div></footer>
    <a class="wa-float" href="${WA}" target="_blank" rel="noopener" aria-label="Écrire sur WhatsApp">${icon('chat', 20)}<span>WhatsApp</span></a>`;

    const b = $('.burger'), n = $('#nav');
    if (b && n) b.addEventListener('click', () => { const o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); b.textContent = o ? '✕' : '☰'; });
    document.addEventListener('click', e => { const d = $('.more'); if (d && !d.contains(e.target)) d.removeAttribute('open'); });
    $$('[data-wa]').forEach(el => { el.href = WA; });
    $$('[data-email]').forEach(el => { el.href = 'mailto:' + SITE.email; el.textContent = SITE.email; });
    $$('[data-wa-text]').forEach(el => { el.textContent = SITE.whatsappAffiche; });
    $$('[data-i]').forEach(el => { el.innerHTML = icon(el.dataset.i, el.dataset.s); });
  }

  /* ---------- Logo : cherche le fichier sous plusieurs noms ---------- */
  function initLogo() {
    const imgs = $$('img[data-logo]');
    if (!imgs.length) return;
    const list = [SITE.logo, 'images/logo.png', 'images/logo.jpg', 'images/logo.jpeg', 'images/logo.webp', 'images/logo.svg',
      'images/Logo.png', 'images/Logo.jpg', 'images/Logo.jpeg', 'images/logo.PNG', 'images/logo.JPG']
      .filter((v, i, arr) => v && arr.indexOf(v) === i);
    let i = 0;
    (function next() {
      if (i >= list.length) {
        console.warn('Silver Corporate : logo introuvable. Placez votre fichier dans le dossier "images" sous le nom logo.png (vérifiez que Windows n\'a pas créé logo.png.png).');
        return;
      }
      const url = list[i++], t = new Image();
      t.onload = () => {
        imgs.forEach(im => {
          im.src = url; im.classList.add('ok');
          const p = im.parentElement; if (p) { p.classList.add('has-logo'); const tx = $('.brand-txt', p); if (tx) tx.remove(); }
        });
        const fav = $('link[rel~="icon"]'); if (fav) fav.href = url;
      };
      t.onerror = next;
      t.src = url;
    })();
  }

  /* ---------- Listes de contenu ---------- */
  const img = (src, alt) => src ? `<img class="card-img" loading="lazy" src="${esc(src)}" alt="${esc(alt)}">` : '';
  const stCls = s => /valid|termin|publi/i.test(s) ? 'ok' : /suspend/i.test(s) ? 'wait' : /id[ée]e|pr[ée]par/i.test(s) ? 'grey' : '';

  const R = {
    projets: l => l.map(p => `<article class="card">${img(p.image, p.titre)}
      <div class="badges"><span class="badge ${stCls(p.statut)}">${esc(p.statut)}</span>${p.categorie ? `<span class="badge grey">${esc(p.categorie)}</span>` : ''}</div>
      <h3>${esc(p.titre)}</h3><p>${esc(p.description)}</p>
      ${p.objectif ? `<p class="meta"><strong>Objectif :</strong> ${esc(p.objectif)}</p>` : ''}
      ${p.resultats ? `<p class="meta"><strong>Résultats :</strong> ${esc(p.resultats)}</p>` : ''}
      ${p.date ? `<p class="meta">${dateFr(p.date)}</p>` : ''}
      ${p.lien ? `<a class="go" href="${esc(p.lien)}" target="_blank" rel="noopener">En savoir plus ${icon('arrow', 16)}</a>` : ''}</article>`).join(''),

    realisations: l => l.map(p => `<article class="card">${img(p.image, p.titre)}
      <span class="badge ok">Réalisation</span><h3>${esc(p.titre)}</h3>
      ${p.contexte ? `<p><strong>Contexte :</strong> ${esc(p.contexte)}</p>` : ''}
      ${p.objectif ? `<p><strong>Objectif :</strong> ${esc(p.objectif)}</p>` : ''}
      ${p.resultat ? `<p><strong>Résultat :</strong> ${esc(p.resultat)}</p>` : ''}
      ${p.impact ? `<p><strong>Impact :</strong> ${esc(p.impact)}</p>` : ''}
      ${p.temoignage ? `<div class="quote" style="font-size:.95rem;padding:14px 18px">${esc(p.temoignage)}</div>` : ''}
      ${p.date ? `<p class="meta">${dateFr(p.date)}</p>` : ''}</article>`).join(''),

    actualites: (l, full) => l.map(a => `<article class="card">${img(a.image, a.titre)}
      <span class="badge">${esc(a.categorie)}</span><h3>${esc(a.titre)}</h3>
      <p class="meta">${dateFr(a.date)}${a.auteur ? ' • ' + esc(a.auteur) : ''}</p>
      ${full ? paras(a.contenu) : `<p>${esc(String(a.contenu || '').slice(0, 150))}${(a.contenu || '').length > 150 ? '…' : ''}</p>`}
      ${a.lien ? `<a class="go" href="${esc(a.lien)}" target="_blank" rel="noopener">Lire la suite ${icon('arrow', 16)}</a>` : ''}</article>`).join(''),

    equipe: l => l.map(m => `<article class="card center-card">
      ${m.photo ? `<img class="avatar" loading="lazy" src="${esc(m.photo)}" alt="${esc(m.nom)}">` : `<div class="avatar" aria-hidden="true">${esc(m.nom.charAt(0))}</div>`}
      <h3>${esc(m.nom)}</h3><p style="color:var(--green-d);font-weight:600">${esc(m.fonction)}</p>
      ${m.bio ? `<p>${esc(m.bio)}</p>` : ''}${m.competences ? `<p class="meta">${esc(m.competences)}</p>` : ''}
      ${m.linkedin ? `<a class="go" href="${esc(m.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon('arrow', 16)}</a>` : ''}</article>`).join(''),

    partenaires: l => l.map(p => `<article class="card center-card">
      ${p.logo ? `<img loading="lazy" src="${esc(p.logo)}" alt="Logo ${esc(p.nom)}" style="height:60px;width:auto;object-fit:contain">` : ''}
      <h3>${esc(p.nom)}</h3><p class="meta">${esc([p.domaine, p.type].filter(Boolean).join(' • '))}</p>
      ${p.description ? `<p>${esc(p.description)}</p>` : ''}
      ${p.lien ? `<a class="go" href="${esc(p.lien)}" target="_blank" rel="noopener">Site web ${icon('arrow', 16)}</a>` : ''}</article>`).join(''),

    ressources: l => l.map(r => `<article class="card"><span class="ico blue">${icon('file', 22)}</span><span class="badge">${esc(r.type)}</span>
      <h3>${esc(r.titre)}</h3><p>${esc(r.description)}</p>${r.date ? `<p class="meta">${dateFr(r.date)}</p>` : ''}
      ${r.fichier ? `<a class="btn btn-navy btn-sm" style="align-self:flex-start" href="${esc(r.fichier)}" target="_blank" rel="noopener">Consulter / télécharger</a>` : ''}</article>`).join('')
  };

  function renderLists() {
    const SRC = { projets: PROJETS, realisations: REALISATIONS, actualites: ACTUALITES, equipe: EQUIPE, partenaires: PARTENAIRES, ressources: RESSOURCES };
    $$('[data-render]').forEach(el => {
      const k = el.dataset.render; if (!R[k]) return;
      let items = (SRC[k] || []).slice();
      if (k === 'actualites') items = items.filter(i => i.statut === 'Publié').sort((a, b) => new Date(b.date) - new Date(a.date));
      if (k === 'projets' || k === 'realisations') items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
      if (el.dataset.limit) items = items.slice(0, +el.dataset.limit);
      el.innerHTML = items.length ? R[k](items, el.dataset.full === 'true') : `<div class="empty">${esc(el.dataset.empty || 'Rien à afficher pour le moment.')}</div>`;
    });
  }

  /* ---------- Accueil ---------- */
  function renderHome() {
    const pop = $('#populaires');
    if (pop) {
      const items = []; SERVICES.forEach(c => c.services.forEach(s => { if (s.pop) items.push(s); }));
      pop.innerHTML = items.map(s => `<a class="card mini" href="silver-services.html?service=${encodeURIComponent(s.nom)}#commande"><span class="svc-name">${esc(s.nom)}</span><span class="svc-price">${price(s)}</span><span class="go">Commander ${icon('arrow', 16)}</span></a>`).join('');
    }
    const nbS = SERVICES.reduce((n, c) => n + c.services.length, 0);
    $$('[data-stat="services"]').forEach(e => e.textContent = nbS);
    $$('[data-stat="packs"]').forEach(e => e.textContent = PACKS.length);
  }

  /* ---------- Silver Services ---------- */
  function initServices() {
    const box = $('#catalogue'); if (!box) return;
    const priceOf = {}; SERVICES.forEach(c => c.services.forEach(s => priceOf[s.nom] = price(s))); PACKS.forEach(p => priceOf[p.nom] = packPrice(p));
    let cat = 'all'; const q = $('#filtre'), chips = $('#cat-chips');

    chips.innerHTML = '<button type="button" class="chip active" data-cat="all">Toutes</button>' + SERVICES.map(c => `<button type="button" class="chip" data-cat="${esc(c.nom)}">${esc(c.nom)}</button>`).join('');
    chips.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      cat = b.dataset.cat; $$('.chip', chips).forEach(x => x.classList.toggle('active', x === b)); draw();
    });

    function draw() {
      const term = (q.value || '').trim().toLowerCase();
      const html = SERVICES.filter(c => cat === 'all' || c.nom === cat).map(c => {
        const rows = c.services.filter(s => !term || (s.nom + ' ' + c.nom).toLowerCase().includes(term));
        if (!rows.length) return '';
        return `<article class="card"><div class="svc-h"><span class="ico">${icon(c.icone || 'file', 22)}</span><h3>${esc(c.nom)}</h3></div>
          ${c.note ? `<p class="note">${esc(c.note)}</p>` : ''}
          <ul class="svc-list">${rows.map(s => `<li><span class="svc-name">${esc(s.nom)}</span><span class="svc-price">${price(s)}</span><button type="button" class="pick" data-service="${esc(s.nom)}">Choisir</button></li>`).join('')}</ul></article>`;
      }).join('');
      box.innerHTML = html || '<div class="empty">Aucun service ne correspond à votre recherche. <a href="#commande">Décrivez votre besoin</a> : nous vous répondrons.</div>';
      reveal(box);
    }
    q.addEventListener('input', draw); draw();

    const pk = $('#packs-liste');
    if (pk) pk.innerHTML = PACKS.map(p => `<article class="card pack"><h3>${esc(p.nom)}</h3>
      <div class="pack-price">${p.aPartir ? '<small>À partir de</small> ' : ''}${fmt(p.prix)} FCFA</div>
      <ul>${p.contenu.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      ${p.eco ? `<p class="eco">${esc(p.eco)}</p>` : ''}${p.note ? `<p class="meta">${esc(p.note)}</p>` : ''}
      <button type="button" class="btn btn-ghost btn-sm" data-service="${esc(p.nom)}">Choisir ce pack</button></article>`).join('');

    const sel = $('#service');
    sel.innerHTML = '<option value="">— Choisir un service ou un pack —</option>' +
      SERVICES.map(c => `<optgroup label="${esc(c.nom)}">${c.services.map(s => `<option value="${esc(s.nom)}">${esc(s.nom)} — ${price(s)}</option>`).join('')}</optgroup>`).join('') +
      `<optgroup label="Packs">${PACKS.map(p => `<option value="${esc(p.nom)}">${esc(p.nom)} — ${packPrice(p)}</option>`).join('')}</optgroup>` +
      '<option value="Autre besoin (sur devis)">Autre besoin (sur devis)</option>';
    $('#paiement').innerHTML = '<option value="">— À préciser —</option>' + SITE.paiements.map(m => `<option>${esc(m)}</option>`).join('');

    const pre = new URLSearchParams(location.search).get('service'); if (pre) sel.value = pre;
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-service]'); if (!b) return;
      sel.value = b.dataset.service; $('#commande').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => $('#besoin').focus({ preventScroll: true }), 600);
    });

    const form = $('#form-commande'), msg = $('#cmd-msg');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.elements.website.value) return;
      const v = n => form.elements[n].value.trim();
      if (!v('service') || !v('besoin') || !v('nom') || !v('contact')) { msg.className = 'form-msg err'; msg.textContent = "Merci de remplir tous les champs marqués d'un *."; return; }
      const ref = 'SC-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      const text = ['*Nouvelle demande — Silver Services*', 'Référence : ' + ref, 'Service : ' + v('service') + (priceOf[v('service')] ? ' (' + priceOf[v('service')] + ')' : ''), 'Besoin : ' + v('besoin'), 'Nom : ' + v('nom'), 'Contact : ' + v('contact'), 'Paiement souhaité : ' + (v('paiement') || 'à préciser'), form.elements.fichiers.checked ? "J'ai des fichiers à envoyer dans cette conversation." : ''].filter(Boolean).join('\n');
      const url = WA + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener');
      msg.className = 'form-msg';
      msg.innerHTML = `Référence <strong>${ref}</strong> — WhatsApp s'ouvre avec votre demande. Si rien ne se passe, <a href="${url}" target="_blank" rel="noopener">cliquez ici</a>.`;
      form.reset();
    });
  }

  /* ---------- Contact ---------- */
  function initContact() {
    const f = $('#form-contact'); if (!f) return;
    const msg = $('#contact-msg');
    const o = new URLSearchParams(location.search).get('objet'); if (o) f.elements.objet.value = o;
    f.addEventListener('submit', e => {
      e.preventDefault();
      if (f.elements.website.value) return;
      const v = n => f.elements[n].value.trim();
      if (!v('nom') || !v('contact') || !v('message')) { msg.className = 'form-msg err'; msg.textContent = "Merci de remplir les champs marqués d'un *."; return; }
      const via = (e.submitter && e.submitter.value) || 'wa';
      const body = `Nom : ${v('nom')}\nContact : ${v('contact')}\nObjet : ${v('objet')}\n\n${v('message')}`;
      msg.className = 'form-msg';
      if (via === 'mail') {
        location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('[Site] ' + v('objet'))}&body=${encodeURIComponent(body)}`;
        msg.textContent = "Votre application e-mail s'ouvre pour finaliser l'envoi.";
      } else {
        window.open(WA + '?text=' + encodeURIComponent('*Message depuis le site*\n' + body), '_blank', 'noopener');
        msg.textContent = "WhatsApp s'ouvre avec votre message. Il suffit de l'envoyer.";
      }
    });
  }

  /* ---------- Apparition douce ---------- */
  let io = null;
  function reveal(root) {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    if (!io) io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .06, rootMargin: '0px 0px -24px 0px' });
    $$('.card,.step,.big-card,.section-head,.tl li,.journey,.quote,details.faq', root || document).forEach(el => { if (!el.classList.contains('rv')) { el.classList.add('rv'); io.observe(el); } });
  }

  layout(); initLogo(); renderLists(); renderHome(); initServices(); initContact(); reveal();
})();