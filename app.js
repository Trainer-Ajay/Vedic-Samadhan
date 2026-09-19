/* ==========================================================
   VEDIC SAMADHAN — App logic
   No backend. No database. Payment verification is manual,
   via the WhatsApp screenshot the client sends at the end
   of the flow — exactly as designed in the original brief.
   ========================================================== */

const D = SITE_DATA;

/* ---------------- Disclaimer gate ---------------- */
(function initGate(){
  const seen = sessionStorage.getItem('vs_gate_seen');
  document.getElementById('gate-text').textContent = D.disclaimer;
  const gate = document.getElementById('gate');
  const checkbox = document.getElementById('gate-accept');
  const enterBtn = document.getElementById('gate-enter');

  if (seen === '1'){ gate.style.display = 'none'; return; }

  checkbox.addEventListener('change', () => { enterBtn.disabled = !checkbox.checked; });
  enterBtn.addEventListener('click', () => {
    sessionStorage.setItem('vs_gate_seen', '1');
    gate.style.display = 'none';
  });
})();

/* ---------------- Header / footer text from data.js ---------------- */
document.getElementById('pundit-title').textContent = D.business.punditTitle;
document.getElementById('pundit-name').textContent = D.business.punditName;
document.getElementById('tagline').textContent = D.business.tagline + ' — ' + D.business.name;
document.getElementById('blessed-counter').textContent = '🕉️ ' + D.business.blessedCounterText;
document.getElementById('footer-name').textContent = D.business.punditName;
document.getElementById('footer-title').textContent = D.business.punditTitle;

const todayStr = new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });
document.getElementById('ticker-inner').textContent =
  `📅 ${todayStr}  •  Tithi: ${D.panchang.tithi}  •  Nakshatra: ${D.panchang.nakshatra}  •  ${D.panchang.rahuKaal}  •  📅 ${todayStr}  •  Tithi: ${D.panchang.tithi}  •  Nakshatra: ${D.panchang.nakshatra}  •  ${D.panchang.rahuKaal}`;

/* ---------------- Nav / routing ---------------- */
const app = document.getElementById('app');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav(view){
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === view));
}

function route(view){
  setActiveNav(view);
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  if (view === 'home') return renderHome();
  if (view === 'consultations') return renderConsultations();
  if (view === 'poojas') return renderPoojas();
  if (view === 'daan') return renderDaan();
  if (view === 'contact') return renderContact();
  renderHome();
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    location.hash = link.dataset.view;
  });
});

window.addEventListener('hashchange', () => {
  route(location.hash.replace('#','') || 'home');
});

/* ---------------- Views ---------------- */

function renderHome(){
  app.innerHTML = `
    <div class="view-intro">
      <h2>Namaste 🙏</h2>
      <p>Book a private Vedic consultation or a full pooja samadhan with ${D.business.punditName}. Every session is confirmed personally on WhatsApp — simple, secure, and direct.</p>
    </div>

    <div class="badges">
      <span class="badge">🛡️ 100% Secure Direct Payment</span>
      <span class="badge">🙏 Authentic Vedic Remedies</span>
      <span class="badge">📞 Personally Confirmed on WhatsApp</span>
    </div>

    <div class="section-block">
      <h3>Consultations</h3>
      <div class="card-grid grid-3" id="home-consult-grid"></div>
    </div>

    <div class="section-block">
      <h3>Popular Poojas</h3>
      <p style="color:var(--ink-soft); font-size:.9rem; margin-top:-8px;">See the full list of 19 poojas across three tiers.</p>
      <button class="btn btn-secondary" onclick="location.hash='poojas'">View All Poojas →</button>
    </div>
  `;
  const grid = document.getElementById('home-consult-grid');
  D.consultations.forEach(c => grid.appendChild(consultCard(c)));
}

function renderConsultations(){
  app.innerHTML = `
    <div class="view-intro">
      <h2>Consultations</h2>
      <p>Choose the length that fits your question. Need a little more time on the call? You can add extra minutes at checkout.</p>
    </div>
    <div class="card-grid grid-3" id="consult-grid"></div>
  `;
  const grid = document.getElementById('consult-grid');
  D.consultations.forEach(c => grid.appendChild(consultCard(c)));
}

function consultCard(c){
  const el = document.createElement('div');
  el.className = 'svc-card';
  el.innerHTML = `
    <div class="svc-icon">🪔</div>
    <h4>${c.name}</h4>
    <div class="svc-meta">${c.subtitle ? c.subtitle + ' • ' : ''}${c.duration}</div>
    <div class="svc-desc">${c.description}</div>
    <div class="svc-price">₹${c.price}<small> onwards</small></div>
    <button class="btn btn-primary btn-block">Book Now</button>
  `;
  el.querySelector('button').addEventListener('click', () => startBooking('consultation', c));
  return el;
}

function renderPoojas(){
  app.innerHTML = `
    <div class="view-intro">
      <h2>Poojas &amp; Samadhan</h2>
      <p>Every pooja is performed with full vidhi and sankalp in your name. Choose from the list below.</p>
    </div>
    <div id="tier-groups"></div>
  `;
  const wrap = document.getElementById('tier-groups');
  ['basic','standard','premium'].forEach(tierKey => {
    const tier = D.poojaTiers[tierKey];
    const items = D.poojas.filter(p => p.tier === tierKey);
    const group = document.createElement('div');
    group.className = 'tier-group';
    group.innerHTML = `
      <div class="tier-head">
        <h4>${tier.name} Tier</h4>
        <div style="text-align:right;">
          <div class="tier-price">₹${tier.price}</div>
          <div class="tier-note">${tier.note}</div>
        </div>
      </div>
      <ul class="pooja-list"></ul>
    `;
    const list = group.querySelector('.pooja-list');
    items.forEach(p => {
      const li = document.createElement('li');
      li.className = 'pooja-row';
      li.innerHTML = `<span>${p.name}</span>`;
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.textContent = 'Book';
      btn.addEventListener('click', () => startBooking('pooja', { name: p.name, price: tier.price, tierName: tier.name }));
      li.appendChild(btn);
      list.appendChild(li);
    });
    wrap.appendChild(group);
  });
}

function renderDaan(){
  app.innerHTML = `
    <div class="view-intro">
      <h2>Daan Guidance</h2>
      <p>Traditional donations suggested alongside remedies. This list is for guidance only — Pundit Ji will confirm which Daan applies to your specific situation.</p>
    </div>
    <div class="daan-note">This page is informational and not a bookable service. Please discuss your specific remedy during a consultation before making any Daan.</div>
    <ul class="daan-list" id="daan-list"></ul>
  `;
  const list = document.getElementById('daan-list');
  D.daanList.forEach(d => {
    const li = document.createElement('li');
    li.className = 'daan-row';
    li.innerHTML = `<strong>${d.item}</strong><span>${d.benefit}</span>`;
    list.appendChild(li);
  });
}

function renderContact(){
  app.innerHTML = `
    <div class="view-intro">
      <h2>Contact</h2>
      <p>Have a question before booking? Reach out directly.</p>
    </div>
    <div class="contact-card">
      <div style="font-size:2rem;">📞</div>
      <div class="big-phone">${D.business.displayPhone}</div>
      <a class="btn btn-whatsapp" href="https://wa.me/${D.business.whatsappNumber}?text=${encodeURIComponent('Namaste Pundit Ji, I would like to ask a question before booking.')}" target="_blank" rel="noopener">💬 Message on WhatsApp</a>
    </div>
  `;
}

/* ---------------- Booking flow (modal) ---------------- */

const modalOverlay = document.getElementById('booking-modal');
const modalBody = document.getElementById('modal-body');
document.getElementById('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

let booking = null; // current booking state

function startBooking(type, service){
  booking = {
    type,                     // 'consultation' | 'pooja'
    service,                  // the object clicked
    bufferClicks: 0,
    form: { name:'', dob:'', tob:'', pob:'', whatsapp:'' }
  };
  openModal();
  renderStepForm();
}

function openModal(){ modalOverlay.hidden = false; document.body.style.overflow = 'hidden'; }
function closeModal(){ modalOverlay.hidden = true; document.body.style.overflow = ''; booking = null; }

function currentAmount(){
  const base = booking.service.price;
  if (booking.type === 'consultation'){
    return base + (booking.bufferClicks * D.buffer.pricePerClick);
  }
  return base;
}

/* Step 1: Devotee intake form */
function renderStepForm(){
  const s = booking.service;
  modalBody.innerHTML = `
    <h3>${s.name}</h3>
    <p class="step-sub">Step 1 of 3 — Your details</p>
    <div class="field"><label for="f-name">Full Name</label><input id="f-name" type="text" placeholder="Your full name"></div>
    <div class="field"><label for="f-dob">Date of Birth</label><input id="f-dob" type="date"></div>
    <div class="field"><label for="f-tob">Exact Time of Birth</label><input id="f-tob" type="time"></div>
    <div class="field"><label for="f-pob">Place of Birth (City / Town)</label><input id="f-pob" type="text" placeholder="e.g. Patna, Bihar"></div>
    <div class="field"><label for="f-wa">Your WhatsApp Number</label><input id="f-wa" type="tel" placeholder="10-digit mobile number"></div>
    <button class="btn btn-primary btn-block" id="to-step-2">Continue →</button>
  `;
  document.getElementById('to-step-2').addEventListener('click', () => {
    booking.form.name = document.getElementById('f-name').value.trim();
    booking.form.dob = document.getElementById('f-dob').value;
    booking.form.tob = document.getElementById('f-tob').value;
    booking.form.pob = document.getElementById('f-pob').value.trim();
    booking.form.whatsapp = document.getElementById('f-wa').value.trim();

    if (!booking.form.name || !booking.form.pob || !booking.form.whatsapp){
      alert('Please fill in your name, place of birth, and WhatsApp number to continue.');
      return;
    }
    if (booking.type === 'consultation'){
      renderStepBuffer();
    } else {
      renderStepSummary();
    }
  });
}

/* Step 2 (consultations only): buffer add-on */
function renderStepBuffer(){
  modalBody.innerHTML = `
    <h3>${booking.service.name}</h3>
    <p class="step-sub">Step 2 of 3 — Add extra time (optional)</p>
    <div class="buffer-row">
      <div class="buffer-label">➕ Add ${D.buffer.minutesPerClick} minutes<br><small>₹${D.buffer.pricePerClick} per add-on · up to ${D.buffer.maxClicks}×</small></div>
      <div class="stepper">
        <button id="buf-minus" ${booking.bufferClicks === 0 ? 'disabled' : ''}>−</button>
        <span id="buf-count">${booking.bufferClicks}</span>
        <button id="buf-plus" ${booking.bufferClicks >= D.buffer.maxClicks ? 'disabled' : ''}>+</button>
      </div>
    </div>
    <div class="summary-box">
      <div class="summary-row"><span>${booking.service.name} (${booking.service.duration})</span><span>₹${booking.service.price}</span></div>
      <div class="summary-row" id="buf-line" style="${booking.bufferClicks === 0 ? 'display:none' : ''}"><span>Extra time (${booking.bufferClicks * D.buffer.minutesPerClick} mins)</span><span>₹${booking.bufferClicks * D.buffer.pricePerClick}</span></div>
      <div class="summary-row total"><span>Total</span><span id="buf-total">₹${currentAmount()}</span></div>
    </div>
    <div class="actions-row">
      <button class="btn btn-ghost" id="buf-back">← Back</button>
      <button class="btn btn-primary" id="to-step-3">Continue →</button>
    </div>
  `;
  function refresh(){
    document.getElementById('buf-count').textContent = booking.bufferClicks;
    document.getElementById('buf-minus').disabled = booking.bufferClicks === 0;
    document.getElementById('buf-plus').disabled = booking.bufferClicks >= D.buffer.maxClicks;
    const bufLine = document.getElementById('buf-line');
    bufLine.style.display = booking.bufferClicks === 0 ? 'none' : 'flex';
    bufLine.innerHTML = `<span>Extra time (${booking.bufferClicks * D.buffer.minutesPerClick} mins)</span><span>₹${booking.bufferClicks * D.buffer.pricePerClick}</span>`;
    document.getElementById('buf-total').textContent = `₹${currentAmount()}`;
  }
  document.getElementById('buf-minus').addEventListener('click', () => { booking.bufferClicks = Math.max(0, booking.bufferClicks - 1); refresh(); });
  document.getElementById('buf-plus').addEventListener('click', () => { booking.bufferClicks = Math.min(D.buffer.maxClicks, booking.bufferClicks + 1); refresh(); });
  document.getElementById('buf-back').addEventListener('click', renderStepForm);
  document.getElementById('to-step-3').addEventListener('click', renderStepSummary);
}

/* Step 2b / 3: Summary + confirm -> go to payment */
function renderStepSummary(){
  const s = booking.service;
  const isConsult = booking.type === 'consultation';
  modalBody.innerHTML = `
    <h3>Confirm Your Booking</h3>
    <p class="step-sub">Step ${isConsult ? '3' : '2'} of 3 — Review</p>
    <div class="summary-box">
      <div class="summary-row"><span>Service</span><span>${s.name}</span></div>
      ${isConsult ? `<div class="summary-row"><span>Duration</span><span>${s.duration}${booking.bufferClicks ? ' + ' + (booking.bufferClicks*D.buffer.minutesPerClick) + ' min' : ''}</span></div>` : `<div class="summary-row"><span>Tier</span><span>${s.tierName}</span></div>`}
      <div class="summary-row"><span>Name</span><span>${booking.form.name}</span></div>
      <div class="summary-row"><span>Place of Birth</span><span>${booking.form.pob}</span></div>
      <div class="summary-row"><span>WhatsApp</span><span>${booking.form.whatsapp}</span></div>
      <div class="summary-row total"><span>Amount Payable</span><span>₹${currentAmount()}</span></div>
    </div>
    <div class="actions-row">
      <button class="btn btn-ghost" id="sum-back">← Back</button>
      <button class="btn btn-primary" id="to-payment">Proceed to Payment →</button>
    </div>
  `;
  document.getElementById('sum-back').addEventListener('click', () => {
    isConsult ? renderStepBuffer() : renderStepForm();
  });
  document.getElementById('to-payment').addEventListener('click', renderStepPayment);
}

/* Step: Payment */
function renderStepPayment(){
  const amount = currentAmount();
  const upiLink = `upi://pay?pa=${encodeURIComponent(D.business.upiId)}&pn=${encodeURIComponent(D.business.punditName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(booking.service.name + ' - Vedic Samadhan')}`;

  modalBody.innerHTML = `
    <h3>Pay Securely</h3>
    <p class="step-sub">Pay exactly the amount below via any UPI app</p>
    <div class="pay-amount">₹${amount}</div>
    <div class="pay-sub">for ${booking.service.name}</div>
    <div class="pay-btn-row">
      <a class="btn btn-primary btn-block" href="${upiLink}">📱 Pay with UPI App (GPay / PhonePe / Paytm)</a>
      <button class="btn btn-secondary btn-block" id="copy-upi">📋 Copy UPI ID</button>
    </div>
    <div class="upi-id-box">UPI ID: <code>${D.business.upiId}</code><br><small>On desktop, scan/enter this ID in your UPI app instead.</small></div>
    <button class="btn btn-primary btn-block" id="paid-btn">✅ I've Completed the Payment</button>
    <button class="btn btn-ghost btn-block" id="pay-back" style="margin-top:10px;">← Back</button>
  `;
  document.getElementById('pay-back').addEventListener('click', renderStepSummary);
  document.getElementById('copy-upi').addEventListener('click', () => {
    navigator.clipboard?.writeText(D.business.upiId).then(() => {
      const b = document.getElementById('copy-upi');
      const old = b.textContent; b.textContent = '✅ Copied!';
      setTimeout(() => b.textContent = old, 1500);
    });
  });
  document.getElementById('paid-btn').addEventListener('click', renderStepWhatsApp);
}

/* Step: WhatsApp share + confirmation */
function renderStepWhatsApp(){
  const amount = currentAmount();
  const s = booking.service;
  const isConsult = booking.type === 'consultation';
  const message =
`Namaste Pundit Ji, I have paid ₹${amount} for ${s.name}${isConsult && booking.bufferClicks ? ' (+' + (booking.bufferClicks*D.buffer.minutesPerClick) + ' min extra)' : ''}.

Name: ${booking.form.name}
DOB: ${booking.form.dob || 'N/A'}
Time of Birth: ${booking.form.tob || 'N/A'}
Place of Birth: ${booking.form.pob}
WhatsApp: ${booking.form.whatsapp}

I am attaching my payment screenshot. Please confirm my slot. 🙏`;

  const waLink = `https://wa.me/${D.business.whatsappNumber}?text=${encodeURIComponent(message)}`;

  modalBody.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-check">🕉️</div>
      <h3>Almost Done</h3>
      <p class="step-sub">Send your payment screenshot on WhatsApp to confirm your slot</p>
    </div>
    <a class="btn btn-whatsapp btn-block" href="${waLink}" target="_blank" rel="noopener" id="wa-share">📤 Tap to Share Receipt on WhatsApp</a>
    <p style="font-size:.82rem; color:var(--ink-soft); text-align:center; margin-top:14px;">
      This opens WhatsApp with your details pre-filled — just attach your payment screenshot and hit send. Pundit Ji's team will confirm your exact slot shortly after.
    </p>
    <button class="btn btn-secondary btn-block" id="done-btn" style="margin-top:10px;">Done</button>
  `;
  document.getElementById('done-btn').addEventListener('click', closeModal);
}

/* ---------------- Init ---------------- */
route(location.hash.replace('#','') || 'home');
