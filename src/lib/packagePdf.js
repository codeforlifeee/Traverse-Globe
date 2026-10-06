// Package quotation PDF generator — client-side.
// Design intent: CLEAN & MINIMAL. Monochrome bias with one orange accent.
// No hero photograph, no busy panels, no stretched logos. Logo renders as a
// square icon + text wordmark drawn in-doc so aspect ratio is always correct.

import { jsPDF } from 'jspdf';
import logoMarkUrl from '../assets/brand/logo-mark.png';

const COLOR = {
  ink: [15, 23, 42],
  body: [51, 65, 85],
  muted: [120, 130, 145],
  faint: [200, 206, 215],
  hair: [230, 234, 240],
  orange: [255, 91, 4],
  trust: [16, 148, 156],
  rose: [220, 38, 38],
  white: [255, 255, 255],
};

const PAGE = { w: 210, h: 297, m: 18 }; // A4 mm, generous side margin
const W = PAGE.w - PAGE.m * 2;

// --- Asset preloader -----------------------------------------------------
let logoMarkData = null;
async function toDataUrl(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

// --- Public entry --------------------------------------------------------
export async function generatePackagePdf({
  detail,
  destination,
  typeLabel,
  categoryName,
  companyInfo,
  onProgress,
}) {
  const prog = typeof onProgress === 'function' ? onProgress : () => {};
  prog(0.05);

  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

  if (!logoMarkData) {
    logoMarkData = await toDataUrl(logoMarkUrl).catch(() => null);
  }
  prog(0.3);

  const title = detail?.title || 'Travel Package';
  const price = Number(detail?.price || 0);
  const strike = detail?.strikePrice ? Number(detail.strikePrice) : null;
  const savings = strike && price ? Math.max(0, Math.round(((strike - price) / strike) * 100)) : 0;
  const refCode = buildRefCode({ typeLabel, categoryName });
  const prepared = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  // Persist header context for multi-page masthead
  const ctx = { refCode, prepared, companyInfo };
  doc._tgCtx = ctx;

  renderHeader(doc, ctx);
  let y = 38;

  // --- Title block ------------------------------------------------------
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR.orange);
  doc.text(`${typeLabel.toUpperCase()} · ${(categoryName || destination || '').toUpperCase()}`, PAGE.m, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLOR.ink);
  const titleLines = doc.splitTextToSize(title, W);
  doc.text(titleLines, PAGE.m, y);
  y += titleLines.length * 6.5 + 2;

  // --- Facts row (plain text, dot-separated) -----------------------------
  const factBits = buildFactStrings(detail, destination);
  if (factBits.length) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLOR.muted);
    doc.text(factBits.join('   ·   '), PAGE.m, y);
    y += 8;
  }

  // --- Price band (soft, not dark) ---------------------------------------
  y = renderPriceBand(doc, y, { price, strike, savings });
  y += 8;

  prog(0.5);

  // --- Overview ---------------------------------------------------------
  if (detail?.overview) {
    y = heading(doc, y, 'About this trip');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR.body);
    const lines = doc.splitTextToSize(detail.overview, W);
    doc.text(lines, PAGE.m, y);
    y += lines.length * 4.8 + 6;
  }

  // --- Highlights -------------------------------------------------------
  if (Array.isArray(detail?.highlights) && detail.highlights.length) {
    y = heading(doc, y, 'Trip highlights');
    y = renderBulletColumns(doc, y, detail.highlights);
    y += 4;
  }

  // --- Itinerary --------------------------------------------------------
  if (detail?.itinerary?.days?.length) {
    y = heading(doc, y, 'Day-by-day itinerary');
    detail.itinerary.days.forEach((day, idx) => {
      y = renderDay(doc, y, idx + 1, day);
    });
    y += 2;
  }

  prog(0.75);

  // --- Inclusions / Exclusions (side-by-side, flat) ----------------------
  const inc = detail?.inclusions || [];
  const exc = detail?.exclusions || [];
  if (inc.length || exc.length) {
    y = heading(doc, y, "What's included");
    y = renderIncExcColumns(doc, y, inc, exc);
    y += 4;
  }

  // --- Hotels -----------------------------------------------------------
  if (detail?.hotels?.options?.length) {
    y = heading(doc, y, detail.hotels.title || 'Accommodation');
    y = renderHotels(doc, y, detail.hotels.options, detail.hotels.note);
  }

  // --- Call to action ---------------------------------------------------
  y = ensureSpace(doc, y, 24);
  y += 4;
  doc.setDrawColor(...COLOR.hair);
  doc.setLineWidth(0.3);
  doc.line(PAGE.m, y, PAGE.w - PAGE.m, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLOR.muted);
  doc.text('Ready to go? Reach out and we\'ll tailor dates, hotels and inclusions.', PAGE.m, y);
  y += 5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR.ink);
  const cta = [
    companyInfo?.phone?.primary,
    companyInfo?.email?.primary,
  ].filter(Boolean).join('   ·   ');
  if (cta) doc.text(cta, PAGE.m, y);

  renderFooters(doc, ctx);
  prog(0.95);

  doc.save(buildFileName(title, categoryName));
  prog(1);
}

// --- Header / Footer ----------------------------------------------------

function renderHeader(doc, { refCode, prepared }) {
  // Thin orange hairline at very top — a single accent, not a filled band
  doc.setDrawColor(...COLOR.orange);
  doc.setLineWidth(0.6);
  doc.line(0, 0.3, PAGE.w, 0.3);

  // Logo mark: square 10×10 preserves aspect
  const markY = 10;
  if (logoMarkData) {
    try { doc.addImage(logoMarkData, 'PNG', PAGE.m, markY, 10, 10); } catch { /* ignore */ }
  }

  // Wordmark drawn in jsPDF — guaranteed crisp, correct aspect
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLOR.ink);
  doc.text('traverse', PAGE.m + 13, markY + 7);
  const brandW = doc.getTextWidth('traverse');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLOR.orange);
  doc.text('GLOBE', PAGE.m + 13 + brandW + 1.5, markY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLOR.muted);
  doc.text('travel made easier', PAGE.m + 13, markY + 11);

  // Right side meta
  const rx = PAGE.w - PAGE.m;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLOR.muted);
  doc.text('TRAVEL QUOTATION', rx, markY + 2, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLOR.ink);
  doc.text(refCode, rx, markY + 7, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR.muted);
  doc.text(prepared, rx, markY + 11, { align: 'right' });

  // Thin divider
  doc.setDrawColor(...COLOR.hair);
  doc.setLineWidth(0.3);
  doc.line(PAGE.m, 28, PAGE.w - PAGE.m, 28);
}

function renderFooters(doc, { refCode, companyInfo }) {
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);

    doc.setDrawColor(...COLOR.hair);
    doc.setLineWidth(0.3);
    doc.line(PAGE.m, PAGE.h - 15, PAGE.w - PAGE.m, PAGE.h - 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLOR.muted);
    const contact = [
      companyInfo?.phone?.primary,
      companyInfo?.email?.primary,
    ].filter(Boolean).join('  ·  ');
    doc.text(contact || 'Traverse Globe', PAGE.m, PAGE.h - 10);
    doc.text(`${refCode}   ·   Page ${i} of ${total}`, PAGE.w - PAGE.m, PAGE.h - 10, { align: 'right' });
  }
}

// --- Section helpers ----------------------------------------------------

function heading(doc, y, label) {
  y = ensureSpace(doc, y, 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLOR.ink);
  doc.text(label, PAGE.m, y);
  // Tiny orange underline — single tasteful accent per heading
  const w = doc.getTextWidth(label);
  doc.setDrawColor(...COLOR.orange);
  doc.setLineWidth(0.8);
  doc.line(PAGE.m, y + 1.5, PAGE.m + Math.min(w, 20), y + 1.5);
  return y + 7;
}

function renderPriceBand(doc, y, { price, strike, savings }) {
  // Flat, light surface — no dark fill, no accent bar
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...COLOR.hair);
  doc.setLineWidth(0.3);
  doc.roundedRect(PAGE.m, y, W, 20, 2, 2, 'FD');

  // Left: price
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...COLOR.muted);
  doc.text('STARTING FROM', PAGE.m + 5, y + 6);

  // Price (compute width WITH this font so strike price lines up)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(...COLOR.ink);
  const priceText = `${rupee()}${Number(price).toLocaleString('en-IN')}`;
  doc.text(priceText, PAGE.m + 5, y + 14);
  const priceW = doc.getTextWidth(priceText);

  // Strike price — only placed AFTER measuring the big price
  if (strike) {
    const sx = PAGE.m + 5 + priceW + 5;
    const sy = y + 13.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...COLOR.muted);
    const strikeText = `${rupee()}${Number(strike).toLocaleString('en-IN')}`;
    doc.text(strikeText, sx, sy);
    const strikeW = doc.getTextWidth(strikeText);
    doc.setDrawColor(...COLOR.muted);
    doc.setLineWidth(0.3);
    doc.line(sx, sy - 1.3, sx + strikeW, sy - 1.3);
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLOR.muted);
  doc.text('per person · twin sharing · ex-GST', PAGE.m + 5, y + 18);

  // Right: savings — simple text, not a filled chip
  if (savings > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLOR.trust);
    doc.text(`Save ${savings}%`, PAGE.w - PAGE.m - 5, y + 12.5, { align: 'right' });
  }

  return y + 20;
}

function renderBulletColumns(doc, y, items) {
  const colW = (W - 6) / 2;
  const left = [], right = [];
  items.forEach((h, i) => (i % 2 === 0 ? left : right).push(h));
  const starts = [y, y];
  const ends = [y, y];
  [left, right].forEach((col, ci) => {
    const cx = PAGE.m + ci * (colW + 6);
    let cy = starts[ci];
    col.forEach((item) => {
      cy = ensureSpace(doc, cy, 6);
      doc.setFillColor(...COLOR.orange);
      doc.circle(cx + 1.5, cy - 1.3, 0.8, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...COLOR.body);
      const lines = doc.splitTextToSize(item, colW - 5);
      doc.text(lines, cx + 4.5, cy);
      cy += lines.length * 4.6 + 1.5;
    });
    ends[ci] = cy;
  });
  return Math.max(ends[0], ends[1]);
}

function renderDay(doc, y, number, day) {
  const dayTitle = day.title || '';
  const dayDesc = day.description || '';
  const titleLines = doc.splitTextToSize(dayTitle, W - 20);
  const descLines = dayDesc ? doc.splitTextToSize(dayDesc, W - 20) : [];
  const needed = 4 + titleLines.length * 5.5 + descLines.length * 4.6 + 6;
  y = ensureSpace(doc, y, needed);

  // Minimal numbered marker — no filled box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR.muted);
  doc.text(`DAY ${number}`, PAGE.m, y);

  // Title on same row, after a 20mm gutter
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...COLOR.ink);
  doc.text(titleLines, PAGE.m + 20, y);
  let cy = y + titleLines.length * 5.5;

  if (descLines.length) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR.body);
    doc.text(descLines, PAGE.m + 20, cy + 1);
    cy += descLines.length * 4.6;
  }

  // Thin divider between days
  cy += 3;
  doc.setDrawColor(...COLOR.hair);
  doc.setLineWidth(0.2);
  doc.line(PAGE.m + 20, cy, PAGE.w - PAGE.m, cy);
  return cy + 4;
}

function renderIncExcColumns(doc, y, inc, exc) {
  const colW = (W - 10) / 2;
  const leftX = PAGE.m;
  const rightX = PAGE.m + colW + 10;

  // Sub-headings
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR.trust);
  doc.text('INCLUDED', leftX, y);
  doc.setTextColor(...COLOR.rose);
  doc.text('NOT INCLUDED', rightX, y);
  const startY = y + 5;

  let leftY = startY;
  let rightY = startY;

  (inc || []).forEach((item) => {
    const lines = doc.splitTextToSize(item, colW - 6);
    leftY = ensureSpace(doc, leftY, lines.length * 4.6 + 2);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLOR.trust);
    doc.text('+', leftX, leftY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLOR.body);
    doc.setFontSize(9.5);
    doc.text(lines, leftX + 5, leftY);
    leftY += lines.length * 4.6 + 1.5;
  });

  (exc || []).forEach((item) => {
    const lines = doc.splitTextToSize(item, colW - 6);
    rightY = ensureSpace(doc, rightY, lines.length * 4.6 + 2);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLOR.rose);
    doc.text('–', rightX, rightY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLOR.body);
    doc.setFontSize(9.5);
    doc.text(lines, rightX + 5, rightY);
    rightY += lines.length * 4.6 + 1.5;
  });

  return Math.max(leftY, rightY);
}

function renderHotels(doc, y, hotels, note) {
  hotels.forEach((hotel) => {
    y = ensureSpace(doc, y, 7);
    doc.setFillColor(...COLOR.orange);
    doc.circle(PAGE.m + 1, y - 1.2, 0.9, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...COLOR.body);
    const lines = doc.splitTextToSize(hotel, W - 6);
    doc.text(lines, PAGE.m + 4.5, y);
    y += lines.length * 4.6 + 1.5;
  });
  if (note) {
    y += 1;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLOR.muted);
    const nl = doc.splitTextToSize(note, W);
    doc.text(nl, PAGE.m, y);
    y += nl.length * 4.2;
  }
  return y + 4;
}

// --- Utilities ---------------------------------------------------------

function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE.h - 22) {
    doc.addPage();
    const ctx = doc._tgCtx || {};
    renderHeader(doc, { refCode: ctx.refCode || '', prepared: ctx.prepared || '' });
    return 38;
  }
  return y;
}

function buildFactStrings(detail, destination) {
  const out = [];
  if (detail?.duration) {
    const n = String(detail.duration).match(/(\d+)\s*N/i);
    const d = String(detail.duration).match(/(\d+)\s*D/i);
    out.push(n && d ? `${n[1]} Nights / ${d[1]} Days` : detail.duration);
  }
  if (destination) out.push(destination);
  if (typeof detail?.rating === 'number') {
    out.push(`${detail.rating}/5 (${detail?.reviews || 0} reviews)`);
  }
  return out;
}

function rupee() {
  // Use "Rs. " — helvetica has no reliable ₹ glyph, so it renders as "¹".
  // This fixes the garbled "¹ 39,999" seen in the original output.
  return 'Rs. ';
}

function buildRefCode({ typeLabel, categoryName }) {
  const t = (typeLabel || 'TRIP').slice(0, 3).toUpperCase();
  const c = (categoryName || 'DEST').replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase();
  const stamp = Date.now().toString(36).slice(-5).toUpperCase();
  return `TG-${t}-${c}-${stamp}`;
}

function buildFileName(title, categoryName) {
  const cat = (categoryName || 'Package').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const t = (title || 'quotation').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  const date = new Date().toISOString().slice(0, 10);
  return `TraverseGlobe_${cat}_${t}_${date}.pdf`;
}
