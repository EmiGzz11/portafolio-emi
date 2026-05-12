import React, { useState, useEffect } from 'react';

const TIERS = [10, 20, 30, 40, 50];
const TASAS = { 50: 9.99, 40: 10.99, 30: 12.99, 20: 14.99, 10: 16.99, 0: null };

const obtenerTasa = (pct) => {
  if (pct >= 50) return 9.99;
  if (pct >= 40) return 10.99;
  if (pct >= 30) return 12.99;
  if (pct >= 20) return 14.99;
  if (pct >= 10) return 16.99;
  return null; // menos del 10% — no aplica
};

const siguienteTier = (pct) => TIERS.find((t) => t > pct) ?? null;

const CATALOGO = {
  HRV:     { label: 'HR-V',    img: '/src/assets/honda_hrv.png',     versiones: [{ nombre: 'UNIQ CVT', precio: 570600, bono: 0 }, { nombre: 'SPORT', precio: 608900, bono: 60000 }, { nombre: 'TOURING', precio: 636800, bono: 60000 }] },
  CRV:     { label: 'CR-V',    img: '/src/assets/honda_crv.png',     versiones: [{ nombre: 'TURBO PLUS', precio: 768300, bono: 60000 }, { nombre: 'TOURING', precio: 811500, bono: 60000 }, { nombre: 'TOURING HEV', precio: 894700, bono: 50000 }, { nombre: 'SPORT TOURING HEV', precio: 920800, bono: 50000 }] },
  CIVIC:   { label: 'Civic',   img: '/src/assets/honda_civic.png',   versiones: [{ nombre: 'I STYLE', precio: 564900, bono: 40000 }, { nombre: 'SPORT HEV', precio: 662400, bono: 30000 }, { nombre: 'TOURING HEV', precio: 708600, bono: 30000 }] },
  CITY:    { label: 'City',    img: '/src/assets/honda_city.png',    versiones: [{ nombre: 'SPORT', precio: 382500, bono: 40000 }, { nombre: 'PRIME', precio: 411600, bono: 40000 }, { nombre: 'TOURING', precio: 441200, bono: 40000 }] },
  BRV:     { label: 'BR-V',    img: '/src/assets/honda_brv.png',     versiones: [{ nombre: 'UNIQ', precio: 464500, bono: 10000 }, { nombre: 'TOURING', precio: 502700, bono: 40000 }] },
  ODYSSEY: { label: 'Odyssey', img: '/src/assets/honda_odyssey.png', versiones: [{ nombre: 'TOURING', precio: 1120000, bono: 90000 }, { nombre: 'BLACK EDITION', precio: 1147900, bono: 90000 }] },
  PRELUDE: { label: 'Prelude', img: '/src/assets/honda_prelude.png', versiones: [{ nombre: 'HYBRID', precio: 884400, bono: 0 }] },
  ACCORD:  { label: 'Accord',  img: '/src/assets/honda_accord.png',  versiones: [{ nombre: 'TOURING', precio: 871400, bono: 0 }] },
  PILOT:   { label: 'Pilot',   img: '/src/assets/honda_pilot.png',   versiones: [{ nombre: 'TOURING', precio: 1155400, bono: 0 }, { nombre: 'BLACK EDITION', precio: 1183300, bono: 0 }] },
};

const mxn = (n) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

// ─── Cálculo central ───────────────────────────────────────────────────────
function calcular(precio, bono, enganche) {
  // Escenario A: bono reduce el precio de venta
  const precioConBono = precio - bono;
  const pctA = precioConBono > 0 ? (enganche / precioConBono) * 100 : 0;
  const tasaA = obtenerTasa(pctA);
  const sigA  = siguienteTier(pctA);
  const faltaA = sigA ? Math.max(0, (precioConBono * sigA / 100) - enganche) : 0;

  // Escenario B: bono suma al enganche del cliente
  const engancheTotal = enganche + bono;
  const pctB  = (engancheTotal / precio) * 100;
  const tasaB = obtenerTasa(pctB);
  const sigB  = siguienteTier(pctB);
  const faltaB = sigB ? Math.max(0, (precio * sigB / 100) - engancheTotal) : 0;

  // Determinar ganador: menor tasa, o si son iguales → enganche (más flexibilidad)
  let ganador = 'IGUAL';
  if (tasaA !== null && tasaB !== null) ganador = tasaA < tasaB ? 'PRECIO' : tasaB < tasaA ? 'ENGANCHE' : 'IGUAL';
  else if (tasaA !== null) ganador = 'PRECIO';
  else if (tasaB !== null) ganador = 'ENGANCHE';

  return { pctA, tasaA, faltaA, sigA, pctB, tasaB, faltaB, sigB, ganador };
}

// ─── Componente ────────────────────────────────────────────────────────────
export default function HondaCalculator() {
  const [unidadKey, setUnidadKey]   = useState('CRV');
  const [versionIdx, setVersionIdx] = useState(0);
  const [enganche, setEnganche]     = useState(150000);
  const [imgErr, setImgErr]         = useState({});

  useEffect(() => setVersionIdx(0), [unidadKey]);

  const unidad  = CATALOGO[unidadKey];
  const version = unidad.versiones[versionIdx];
  const res     = calcular(version.precio, version.bono, enganche);
  const minEnganche = Math.ceil(version.precio * 0.1);

  const engancheValido = enganche >= minEnganche;

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* HEADER */}
        <div style={S.header}>
          <div style={S.redBar} />
          <div>
            <h1 style={S.h1}>Simulador Comercial · Honda 2026</h1>
            <p style={S.sub}>Asesor de ventas · Optimización de tasa por estrategia de bono</p>
          </div>
        </div>

        {/* PASO 1 — UNIDAD */}
        <p style={S.step}>1 · Selecciona la unidad</p>
        <div style={S.unitGrid}>
          {Object.entries(CATALOGO).map(([key, d]) => {
            const on = key === unidadKey;
            return (
              <button key={key} onClick={() => setUnidadKey(key)} style={{ ...S.unitBtn, ...(on ? S.unitOn : {}) }}>
                {imgErr[key]
                  ? <div style={S.imgBox}>🚗</div>
                  : <img src={d.img} alt={d.label} style={S.unitImg} onError={() => setImgErr(p => ({ ...p, [key]: true }))} />}
                <span style={{ ...S.unitLbl, ...(on ? { color: '#ef4444' } : {}) }}>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* PASO 2 — VERSIÓN */}
        <p style={S.step}>2 · Selecciona la versión</p>
        <div style={S.verGrid}>
          {unidad.versiones.map((v, i) => {
            const on = i === versionIdx;
            return (
              <button key={i} onClick={() => setVersionIdx(i)} style={{ ...S.verBtn, ...(on ? S.verOn : {}) }}>
                <span style={{ ...S.verNombre, ...(on ? { color: '#38bdf8' } : {}) }}>{v.nombre}</span>
                <span style={S.verPrecio}>{mxn(v.precio)}</span>
                {v.bono > 0 && <span style={S.badge}>Bono {mxn(v.bono)}</span>}
              </button>
            );
          })}
        </div>

        {/* PASO 3 — INPUT + RESULTADOS */}
        <p style={S.step}>3 · Ingresa el enganche del cliente</p>
        <div style={S.mainGrid}>

          {/* Panel izquierdo */}
          <div style={S.panel}>
            <Field label="Precio público">{mxn(version.precio)}</Field>
            <Field label="Bono de la versión" green={version.bono > 0}>
              {version.bono > 0 ? mxn(version.bono) : 'Sin bono'}
            </Field>
            <div style={S.fieldGroup}>
              <label style={S.lbl}>Enganche del cliente ($)</label>
              <input
                type="number" min={0} value={enganche}
                onChange={e => setEnganche(Number(e.target.value))}
                style={{ ...S.input, ...(engancheValido ? {} : S.inputError) }}
              />
              {!engancheValido && (
                <p style={S.errorMsg}>⚠ Mínimo requerido: {mxn(minEnganche)} (10% del precio)</p>
              )}
            </div>

            {/* Resumen rápido */}
            <div style={S.summaryBox}>
              <Row label="% con bono al precio"   val={`${res.pctA.toFixed(1)}%`} />
              <Row label="% con bono al enganche" val={`${res.pctB.toFixed(1)}%`} cyan />
            </div>
          </div>

          {/* Panel derecho — resultados */}
          <div style={S.resultsCol}>
            {!engancheValido ? (
              <div style={S.alertBox}>
                <p style={S.alertTitle}>⛔ Enganche insuficiente</p>
                <p style={S.alertDesc}>El mínimo es el 10% del precio público: <strong>{mxn(minEnganche)}</strong>.<br />
                  El cliente necesita aportar <strong>{mxn(minEnganche - enganche)}</strong> adicionales para poder financiar.</p>
              </div>
            ) : (
              <>
                {/* Tarjeta A — Bono al Precio */}
                <ScenarioCard
                  title="Bono al Precio"
                  desc={`Precio queda en ${mxn(version.precio - version.bono)}`}
                  pct={res.pctA}
                  tasa={res.tasaA}
                  falta={res.faltaA}
                  sig={res.sigA}
                  winner={res.ganador === 'PRECIO'}
                  color="#ef4444"
                  hasBono={version.bono > 0}
                  label={`Enganche cliente ${mxn(enganche)} sobre precio reducido`}
                />

                {/* Tarjeta B — Bono al Enganche */}
                <ScenarioCard
                  title="Bono al Enganche"
                  desc={`Enganche total: ${mxn(enganche + version.bono)}`}
                  pct={res.pctB}
                  tasa={res.tasaB}
                  falta={res.faltaB}
                  sig={res.sigB}
                  winner={res.ganador === 'ENGANCHE'}
                  color="#38bdf8"
                  hasBono={version.bono > 0}
                  label={`Enganche ${mxn(enganche)} + bono ${mxn(version.bono)}`}
                />

                {/* Recomendación final */}
                <Recomendacion res={res} version={version} enganche={enganche} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-componentes ────────────────────────────────────────────────────────
function Field({ label, children, green }) {
  return (
    <div style={S.fieldGroup}>
      <label style={S.lbl}>{label}</label>
      <div style={{ ...S.readOnly, ...(green ? { color: '#4ade80', fontSize: 20 } : {}) }}>{children}</div>
    </div>
  );
}

function Row({ label, val, cyan }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #1e293b' }}>
      <span style={{ fontSize: 12, color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: cyan ? '#38bdf8' : '#f1f5f9' }}>{val}</span>
    </div>
  );
}

function ScenarioCard({ title, desc, pct, tasa, falta, sig, winner, color, hasBono, label }) {
  const noAplica = tasa === null;
  return (
    <div style={{
      ...S.scenCard,
      borderColor: winner ? color : '#1e293b',
      background: winner ? `${color}10` : 'rgba(15,23,42,0.6)',
      boxShadow: winner ? `0 0 24px ${color}22` : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ ...S.scenTitle, color: winner ? color : '#94a3b8' }}>
            {winner && '★ '}{title}
          </p>
          {hasBono && <p style={S.scenDesc}>{desc}</p>}
          <p style={S.scenLbl}>{label}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          {noAplica
            ? <p style={{ fontSize: 22, fontWeight: 900, color: '#ef4444', margin: 0 }}>No aplica</p>
            : <p style={{ fontSize: 32, fontWeight: 900, color: winner ? color : '#f1f5f9', margin: 0 }}>{tasa}%</p>}
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{pct.toFixed(1)}% enganche</p>
        </div>
      </div>

      {/* Barra de progreso del tier */}
      <TierBar pct={pct} color={color} />

      {/* Upsell mensaje */}
      {!noAplica && falta > 0 && sig && (
        <div style={S.upsell}>
          💡 Faltan <strong>{mxn(Math.ceil(falta))}</strong> para llegar al <strong>{sig}%</strong> y bajar la tasa a <strong>{TASAS[sig]}%</strong>
        </div>
      )}
      {!noAplica && pct >= 50 && (
        <div style={{ ...S.upsell, background: 'rgba(74,222,128,0.08)', borderColor: 'rgba(74,222,128,0.3)', color: '#86efac' }}>
          ✅ ¡Tasa máxima alcanzada! ({tasa}%)
        </div>
      )}
    </div>
  );
}

function TierBar({ pct, color }) {
  const capped = Math.min(pct, 60);
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        {TIERS.map(t => (
          <span key={t} style={{ fontSize: 9, color: pct >= t ? color : '#334155', fontWeight: 700 }}>{t}%</span>
        ))}
      </div>
      <div style={{ height: 6, background: '#1e293b', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(capped / 60) * 100}%`, background: color, borderRadius: 99, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

function Recomendacion({ res, version, enganche }) {
  const { ganador, tasaA, tasaB, pctA, pctB, faltaB, sigB } = res;
  const hasBono = version.bono > 0;

  if (!hasBono) {
    return (
      <div style={S.recoBox('#475569')}>
        <p style={S.recoTitle}>ℹ Esta versión no tiene bono</p>
        <p style={S.recoDesc}>Solo existe un escenario. La tasa depende únicamente del enganche del cliente.</p>
      </div>
    );
  }

  if (ganador === 'IGUAL') {
    return (
      <div style={S.recoBox('#f59e0b')}>
        <p style={S.recoTitle}>⚖ Ambas estrategias dan la misma tasa ({tasaA}%)</p>
        <p style={S.recoDesc}>
          Puedes recomendar el <strong>bono al enganche</strong> para que el cliente sienta que aporta más
          y tenga un mejor historial de crédito en el financiamiento.
          {faltaB > 0 && sigB && ` Con ${mxn(Math.ceil(faltaB))} más bajarían al ${TASAS[sigB]}%.`}
        </p>
      </div>
    );
  }

  if (ganador === 'ENGANCHE') {
    return (
      <div style={S.recoBox('#38bdf8')}>
        <p style={S.recoTitle}>✅ Recomienda: Bono al Enganche ({tasaB}%)</p>
        <p style={S.recoDesc}>
          Con el bono al precio la tasa sería <strong>{tasaA ?? 'No aplica'}%</strong> ({pctA.toFixed(1)}% enganche).
          Aplicando el bono al enganche el cliente alcanza el <strong>{pctB.toFixed(1)}%</strong> y obtiene <strong>{tasaB}%</strong>.
          {faltaB > 0 && sigB && <><br />💡 Si aporta <strong>{mxn(Math.ceil(faltaB))}</strong> adicionales llega al {sigB}% y baja a <strong>{TASAS[sigB]}%</strong>.</>}
        </p>
      </div>
    );
  }

  return (
    <div style={S.recoBox('#ef4444')}>
      <p style={S.recoTitle}>✅ Recomienda: Bono al Precio ({tasaA}%)</p>
      <p style={S.recoDesc}>
        Reducir el precio a <strong>{mxn(version.precio - version.bono)}</strong> hace que el {pctA.toFixed(1)}% de enganche del cliente alcance una mejor tasa (<strong>{tasaA}%</strong>)
        {' '}vs aplicarlo al enganche ({pctB.toFixed(1)}% → <strong>{tasaB ?? 'No aplica'}%</strong>).
      </p>
    </div>
  );
}

// ─── Estilos ────────────────────────────────────────────────────────────────
const S = {
  page:      { minHeight: '100vh', background: '#060610', color: '#f1f5f9', padding: '36px 16px 80px', fontFamily: "'Inter','Segoe UI',sans-serif" },
  wrap:      { maxWidth: 1120, margin: '0 auto' },
  header:    { display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36 },
  redBar:    { width: 5, height: 50, borderRadius: 3, background: 'linear-gradient(#ef4444,#dc2626)', flexShrink: 0 },
  h1:        { fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0, textTransform: 'uppercase' },
  sub:       { color: '#475569', fontSize: 13, marginTop: 4 },
  step:      { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#475569', margin: '28px 0 10px' },

  unitGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: 8 },
  unitBtn:   { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 6px 10px', borderRadius: 14, border: '1.5px solid #1e293b', background: '#0f172a', cursor: 'pointer', outline: 'none', transition: 'all 0.18s' },
  unitOn:    { border: '1.5px solid #ef4444', background: 'rgba(239,68,68,0.08)', boxShadow: '0 0 18px rgba(239,68,68,0.14)' },
  unitImg:   { width: '100%', maxWidth: 84, height: 50, objectFit: 'contain', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.6))' },
  imgBox:    { width: 84, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1e293b', borderRadius: 6, fontSize: 24 },
  unitLbl:   { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b' },

  verGrid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(168px,1fr))', gap: 8 },
  verBtn:    { display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 14px', borderRadius: 12, border: '1.5px solid #1e293b', background: '#0f172a', cursor: 'pointer', textAlign: 'left', outline: 'none', transition: 'all 0.18s' },
  verOn:     { border: '1.5px solid #38bdf8', background: 'rgba(56,189,248,0.07)', boxShadow: '0 0 14px rgba(56,189,248,0.12)' },
  verNombre: { fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#94a3b8' },
  verPrecio: { fontSize: 16, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' },
  badge:     { fontSize: 10, fontWeight: 600, color: '#4ade80', background: 'rgba(74,222,128,0.12)', padding: '2px 7px', borderRadius: 99, alignSelf: 'flex-start' },

  mainGrid:  { display: 'grid', gridTemplateColumns: '380px 1fr', gap: 18, alignItems: 'start' },
  panel:     { background: 'rgba(15,23,42,0.7)', border: '1.5px solid #1e293b', borderRadius: 22, padding: 24 },
  fieldGroup:{ marginBottom: 18 },
  lbl:       { display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 7 },
  readOnly:  { background: '#070712', border: '1.5px solid #1e293b', borderRadius: 10, padding: '12px 14px', fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em', color: '#f1f5f9' },
  input:     { width: '100%', boxSizing: 'border-box', background: '#020617', border: '1.5px solid #334155', borderRadius: 10, padding: '12px 14px', fontSize: 20, fontWeight: 700, color: '#f1f5f9', fontFamily: 'inherit', outline: 'none' },
  inputError:{ borderColor: '#ef4444' },
  errorMsg:  { fontSize: 12, color: '#f87171', marginTop: 6 },
  summaryBox:{ background: '#0a0f1e', borderRadius: 10, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 0 },

  resultsCol:{ display: 'flex', flexDirection: 'column', gap: 14 },
  scenCard:  { borderWidth: 2, borderStyle: 'solid', borderRadius: 18, padding: '18px 20px', transition: 'all 0.3s ease' },
  scenTitle: { fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 2px' },
  scenDesc:  { fontSize: 12, color: '#64748b', margin: '0 0 2px' },
  scenLbl:   { fontSize: 11, color: '#475569', margin: 0 },
  upsell:    { marginTop: 10, background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: 10, padding: '10px 13px', fontSize: 12, color: '#fde68a', lineHeight: 1.6 },

  alertBox:  { background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.3)', borderRadius: 18, padding: '20px 22px' },
  alertTitle:{ fontSize: 16, fontWeight: 800, color: '#ef4444', margin: '0 0 8px' },
  alertDesc: { fontSize: 13, color: '#fca5a5', lineHeight: 1.7, margin: 0 },

  recoBox: (c) => ({ background: `${c}10`, border: `1.5px solid ${c}40`, borderRadius: 16, padding: '16px 20px' }),
  recoTitle: { fontSize: 14, fontWeight: 800, margin: '0 0 8px' },
  recoDesc:  { fontSize: 13, color: '#94a3b8', lineHeight: 1.75, margin: 0 },
};