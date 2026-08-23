/* ==========================================================================
   16-BIT ARCADE INTERACTIVE LOGIC — DHRUVANSHI PATEL PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. REAL CREDENTIALS TICKER LOGIC (6 CREDENTIALS) ---
  const credentials = [
    "FULL-STACK DEVELOPER & CE STUDENT @ DDU GUJARAT 🏫",
    "16-BIT ARCADE ENGINE & PROFILE GENERATOR BUILDER 👾",
    "PEERUP CREATOR · OMNIKON HACKATHON VERCEL APP 🚀",
    "C++ & JAVASCRIPT PROGRAMMER · CGPA 9.08 (92%) ⚡",
    "DEVOPS, FINOPS & CLOUD SECURITY ARCHITECT ☁️",
    "TIC TECH TOE '26 PARTICIPANT @ DA-IICT GANDHINAGAR 🏆"
  ];

  let currentCredIndex = 0;
  const credentialTextEl = document.getElementById('credentialText');
  const credPills = document.querySelectorAll('.cred-pill');

  function updateCredential(index) {
    currentCredIndex = index;
    
    // Fade Out
    credentialTextEl.style.opacity = '0';
    
    setTimeout(() => {
      credentialTextEl.textContent = credentials[currentCredIndex];
      credentialTextEl.style.opacity = '1';

      // Update Active Pill
      credPills.forEach((pill, idx) => {
        if (idx === currentCredIndex) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }, 200);
  }

  // Automatic Credentials Cycler every 3.5 seconds
  let credInterval = setInterval(() => {
    const nextIndex = (currentCredIndex + 1) % credentials.length;
    updateCredential(nextIndex);
  }, 3500);

  // Manual Pill Click
  credPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      playSfx(600, 'sine', 0.08);
      clearInterval(credInterval);
      const index = parseInt(pill.getAttribute('data-index'), 10);
      updateCredential(index);
      // Restart interval after manual click
      credInterval = setInterval(() => {
        const nextIndex = (currentCredIndex + 1) % credentials.length;
        updateCredential(nextIndex);
      }, 3500);
    });
  });

  // Spacebar to Cycle Credentials
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      playSfx(750, 'square', 0.1);
      const nextIndex = (currentCredIndex + 1) % credentials.length;
      updateCredential(nextIndex);
    }
  });


  // --- 2. WEB AUDIO API 8-BIT RETRO SFX ---
  let sfxEnabled = true;
  const sfxToggleBtn = document.getElementById('sfxToggleBtn');
  const sfxStateEl = document.getElementById('sfxState');

  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    return audioCtx;
  }

  function playSfx(freq = 440, type = 'square', duration = 0.08) {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      // Audio fallback
    }
  }

  sfxToggleBtn.addEventListener('click', () => {
    sfxEnabled = !sfxEnabled;
    sfxStateEl.textContent = sfxEnabled ? 'ON' : 'OFF';
    if (sfxEnabled) {
      playSfx(880, 'triangle', 0.15);
    }
  });

  // Add SFX to all buttons
  document.querySelectorAll('button, a.pixel-btn, .hud-link').forEach(btn => {
    btn.addEventListener('click', () => {
      playSfx(520, 'square', 0.06);
    });
  });


  // --- 3. TERMINAL COMMAND RUNNER ---
  const whoamiJsonEl = document.getElementById('whoamiJson');
  const runWhoamiBtn = document.getElementById('runWhoamiBtn');
  const runSuperpowersBtn = document.getElementById('runSuperpowersBtn');
  const runStatsBtn = document.getElementById('runStatsBtn');

  const contentMap = {
    whoami: `{
  <span class="json-key">"name"</span>: <span class="json-str">"Dhruvanshi Patel"</span>,
  <span class="json-key">"email"</span>: <span class="json-str">"pateldhruvanshi0@gmail.com"</span>,
  <span class="json-key">"phone"</span>: <span class="json-str">"+91 8849269913"</span>,
  <span class="json-key">"linkedin"</span>: <span class="json-str">"dhruvanshi-patel-070105e18"</span>,
  <span class="json-key">"college"</span>: <span class="json-str">"Dharmsinh Desai University (DDU), Gujarat"</span>,
  <span class="json-key">"cgpa"</span>: <span class="json-num">9.08</span>,
  <span class="json-key">"status"</span>: <span class="json-str">"🟢 CE Student & Full-Stack Developer"</span>
}`,
    superpowers: `[
  <span class="json-str">"🏫 Academic Distinction @ DDU Gujarat — CGPA 9.08 / 10 (92%)"</span>,
  <span class="json-str">"👾 16-Bit Arcade Web Engine & SVG Header Generator Builder"</span>,
  <span class="json-str">"🚀 PeerUp — Omnikon Hackathon Skill Exchange Platform (Vercel App)"</span>,
  <span class="json-str">"🏆 Tic Tech Toe '26 Hackathon Innovation @ DA-IICT Gandhinagar"</span>,
  <span class="json-str">"⚡ Proficient in C++, JavaScript, PHP & SQL / MS SQL Server"</span>,
  <span class="json-str">"☁️ DevOps, FinOps & Cloud Security Architecture 2026"</span>
]`,
    stats: `{
  <span class="json-key">"email"</span>: <span class="json-str">"pateldhruvanshi0@gmail.com"</span>,
  <span class="json-key">"phone"</span>: <span class="json-str">"+91 8849269913"</span>,
  <span class="json-key">"unstop_user"</span>: <span class="json-str">"ce072pat15689"</span>,
  <span class="json-key">"github_user"</span>: <span class="json-str">"Dhruvanshi-Patel"</span>,
  <span class="json-key">"academic_cgpa"</span>: <span class="json-num">9.08</span>
}`
  };

  function setTerminal(content, activeBtn) {
    whoamiJsonEl.innerHTML = content;
    [runWhoamiBtn, runSuperpowersBtn, runStatsBtn].forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  runWhoamiBtn.addEventListener('click', () => setTerminal(contentMap.whoami, runWhoamiBtn));
  runSuperpowersBtn.addEventListener('click', () => setTerminal(contentMap.superpowers, runSuperpowersBtn));
  runStatsBtn.addEventListener('click', () => setTerminal(contentMap.stats, runStatsBtn));


  // --- 4. EMAIL COPY TO CLIPBOARD ---
  const emailCopyBtn = document.getElementById('emailCopyBtn');
  const toastEl = document.getElementById('toast');

  emailCopyBtn.addEventListener('click', () => {
    const email = 'pateldhruvanshi0@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      playSfx(800, 'sine', 0.12);
      toastEl.classList.add('show');
      setTimeout(() => {
        toastEl.classList.remove('show');
      }, 2500);
    });
  });


  // --- 5. RETRO STARFIELD CANVAS BACKGROUND ---
  const canvas = document.getElementById('pixelCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const stars = [];
  const numStars = 70;
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() < 0.2 ? 3 : 2,
      color: Math.random() < 0.4 ? '#ff007f' : (Math.random() < 0.7 ? '#00ffff' : '#ffffff'),
      speed: Math.random() * 0.5 + 0.1
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.fillStyle = star.color;
      ctx.fillRect(star.x, star.y, star.size, star.size);

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(renderStars);
  }
  renderStars();

});
