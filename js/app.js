import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/+esm';
import { CONFIG } from './config.js';
export { CONFIG };
export const sb = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => '&#' + c.charCodeAt(0) + ';');
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch {}

export function toast(m) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.append(t); }
  t.textContent = m; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

// UX gate only. The real protection is Row Level Security in schema.sql.
export async function guard() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { location.replace('login.html'); return null; }
  const { data: profile } = await sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
  if (!profile) { await sb.auth.signOut(); location.replace('login.html?denied=1'); return null; }
  document.body.classList.remove('hidden');
  return { user: session.user, profile };
}

const PAGES = [['index', 'Home'], ['gallery', 'Gallery']]; // add new pages here
export function renderNav(active) {
  const n = document.createElement('nav'); n.className = 'nav';
  n.innerHTML = `<span class="logo">${esc(CONFIG.HER_NAME)} &amp; ${esc(CONFIG.MY_NAME)}</span>` +
    PAGES.map(([p, t]) => `<a href="${p}.html"${p === active ? ' class="on"' : ''}>${t}</a>`).join('') +
    '<button id="th" aria-label="Toggle night mode">☾</button><button id="out">Log out</button>';
  document.body.prepend(n);
  n.querySelector('#th').onclick = () => {
    const d = document.documentElement, v = d.dataset.theme === 'dark' ? 'light' : 'dark';
    d.dataset.theme = v; try { localStorage.setItem('theme', v); } catch {}
  };
  n.querySelector('#out').onclick = async () => { await sb.auth.signOut(); location.replace('login.html'); };
}

export function hearts(n = 16) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const w = document.createElement('div'); w.className = 'hearts';
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span'); s.textContent = ['💖', '💗', '💕', '✨'][i % 4];
    s.style.cssText = `left:${Math.random() * 100}%;font-size:${12 + Math.random() * 18}px;animation-duration:${9 + Math.random() * 10}s;animation-delay:${-Math.random() * 14}s`;
    w.append(s);
  }
  document.body.append(w);
}

// Years, months, days, hours, minutes, seconds since a date string
export function diff(from) {
  const a = new Date(from), n = new Date();
  let y = n.getFullYear() - a.getFullYear(), m = n.getMonth() - a.getMonth(), d = n.getDate() - a.getDate(),
    h = n.getHours() - a.getHours(), mi = n.getMinutes() - a.getMinutes(), s = n.getSeconds() - a.getSeconds();
  if (s < 0) { s += 60; mi--; } if (mi < 0) { mi += 60; h--; } if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); m--; } if (m < 0) { m += 12; y--; }
  return { y, m, d, h, mi, s };
}
