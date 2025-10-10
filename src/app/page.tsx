"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Shield, Car, Crown, Hotel, UserCheck, Phone, MapPin, Clock, Calendar, ChevronRight, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // si usas Badge en la página

// --- Branding dinámico (logo + imagen de hero) ---
const BRAND = {
  logoUrl: "", // centro de la rueda mostrará “ELITE”
  heroImageUrl:
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1920&auto=format&fit=crop",
};

// --- Datos configurables (fácil de escalar) ---
const services = [
  {
    title: "Camionetas Blindadas",
    desc: "Niveles III+ a V, chofer bilingüe y cobertura nacional.",
    icon: Shield,
    bullets: ["Nivel III+ a V", "Chofer bilingüe", "Cobertura nacional"],
  },
  {
    title: "Camionetas Blandas",
    desc: "SUVs premium con interiores ejecutivos y Wi‑Fi a bordo.",
    icon: Car,
    bullets: ["SUVs premium", "Interiores ejecutivos", "Wi‑Fi a bordo"],
  },
  {
    title: "Custodios / Escoltas",
    desc: "Profesionales certificados, perfiles discretos o de alto impacto.",
    icon: UserCheck,
    bullets: ["Certificados", "Perfil discreto o alto impacto", "Planeación de ruta"],
  },
  {
    title: "Transporte Lujoso",
    desc: "Sedanes de alta gama y Sprinter ejecutiva para comitivas.",
    icon: Crown,
    bullets: ["Sedanes alta gama", "Sprinter ejecutiva", "Para comitivas"],
  },
  {
    title: "Alojamiento Lujoso",
    desc: "Villas privadas y hoteles 5★ seleccionados a tu medida.",
    icon: Hotel,
    bullets: ["Villas privadas", "Hoteles 5★", "Curaduría a medida"],
  },
];

const fleetData = [
  {
    name: "Chevrolet Suburban Blindada",
    category: "blindada",
    level: "III+",
    seats: 7,
    drive: "4x2",
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
    tags: ["Nivel III+", "Hasta 7 pax", "Wi‑Fi"],
  },
  {
    name: "Toyota Land Cruiser Blindada",
    category: "blindada",
    level: "IV",
    seats: 5,
    drive: "4x4",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    tags: ["Nivel IV", "4x4", "Clima trizona"],
  },
  {
    name: "Mercedes‑Benz Sprinter Ejecutiva",
    category: "blanda",
    level: null,
    seats: 10,
    drive: "4x2",
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
    tags: ["Asientos capitán", "Tomacorrientes", "Luces ambiente"],
  },
  {
    name: "Chevrolet Suburban Premium",
    category: "blanda",
    level: null,
    seats: 7,
    drive: "4x2",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Hasta 7 pax", "Leather", "Wi‑Fi"],
  },
];

const testimonials = [
  {
    quote:
      "Servicio impecable y seguridad total. La Suburban blindada fue perfecta para nuestro equipo.",
    author: "Cynthia R.",
    role: "Directora de Operaciones, Grupo Minero",
  },
  {
    quote:
      "La logística de aeropuerto a hotel y reuniones salió milimétrica. Choferes muy profesionales.",
    author: "Luis A.",
    role: "Coordinador de Eventos, Agencia BTL",
  },
];

// --- Componentes auxiliares ---
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>{children}</section>
);

// --- Página principal ---

// Componente de grid filtrado
function FleetGrid({ category, seats, drive4x4, level }) {
  const filtered = useMemo(() => {
    return fleetData.filter((item) => {
      if (item.category !== category) return false;
      if (seats !== 'all' && item.seats < Number(seats)) return false;
      if (drive4x4 && item.drive !== '4x4') return false;
      if (category === 'blindada' && level !== 'all' && item.level !== level) return false;
      return true;
    });
  }, [category, seats, drive4x4, level]);

  if (!filtered.length) {
    return (
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/50 p-6 text-zinc-400">
        No hay unidades con esos filtros. Ajusta los criterios.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {filtered.map((f) => (
        <motion.div
          key={f.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/50"
        >
          <div className="relative">
            <img src={f.img} alt={f.name} className="h-48 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {f.level && (
              <span className="absolute left-3 top-3 rounded-full border border-[#e6e6e6]/30 bg-black/60 px-2 py-0.5 text-xs text-zinc-200">Nivel {f.level}</span>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">{f.name}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-full border border-zinc-700 px-2 py-1">{f.seats} pax</span>
              <span className="rounded-full border border-zinc-700 px-2 py-1">{f.drive}</span>
              {f.tags?.map((t) => (
                <span key={t} className="rounded-full border border-zinc-700 px-2 py-1">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-zinc-400">Disponible hoy</p>
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]">
                Cotizar
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ServicesWheel() {
  const items = services.map(({ title, desc, icon, bullets }) => ({ title, desc, Icon: icon, bullets }));
  const [active, setActive] = useState(0);
  const [guided, setGuided] = useState(true); // bloquea hasta revelar todo
  const stepAngle = 360 / items.length;
  const radius = 260;

  // Altura total: N servicios + 1 escena final (zoom‑out)
  const totalScenes = items.length + 1;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scene = useTransform(scrollYProgress, (p) => Math.min(totalScenes - 1, Math.floor(p * totalScenes)));

  // Rotación con resorte + escala del zoom‑out
  const rot = useSpring(0, { stiffness: 42, damping: 20 });
  const scale = useSpring(1, { stiffness: 50, damping: 18 });
  // Zoom de entrada: al llegar a la sección hace un pequeño zoom‑in y luego se estabiliza
  const lockThreshold = 0.06;
  const lockedBoostRaw = useTransform(scrollYProgress, [0, lockThreshold, lockThreshold + 0.001, 1], [1, 1, 1.4, 1.4]);
  const lockedBoost = useSpring(lockedBoostRaw, { stiffness: 120, damping: 18 });
  const wheelScale = useTransform([scale, lockedBoost], ([s, lb]) => s * lb);

  useEffect(() => {
    const unsub = scene.on("change", (s) => {
      if (s < items.length) {
        setActive(s);
        rot.set(-s * stepAngle);
        setGuided(true);
        scale.set(1);
      } else {
        // escena final → mostrar todo y hacer zoom‑out
        setGuided(false);
        scale.set(0.86);
      }
    });
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [scene, items.length, stepAngle, rot, scale]);

  const ActiveIcon = items[active].Icon;
  

  return (
    <div ref={sectionRef} className="relative" style={{ height: (totalScenes * 85) + 'vh' }}>
      {/* Sticky: bloquea scroll hasta terminar el reveal */}
      <div className="sticky top-[calc(50vh-40vmin+15px)] flex h-screen items-start justify-center">
        {/* Full‑bleed container (la rueda ocupa el ancho visual) */}
        <div className="flex w-full max-w-none flex-col items-center gap-8 px-4">
          {/* Encabezado fijo arriba de la rueda: Alojamiento Lujoso */}
          <div className="mb-6 text-center">
            <Badge>Servicios integrales</Badge>
            <h3 className="mt-3 text-2xl font-semibold md:text-3xl bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              {items[active].title}
            </h3>
            <p className="mt-2 text-zinc-400">{items[active].desc}</p>
            {!!items[active].bullets?.length && (
              <ul className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-sm text-zinc-300">
                {items[active].bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />{b}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Rueda */}
          <motion.div style={{ scale: wheelScale, transformOrigin: '50% 30%' }} className="relative mt-10 md:mt-12 aspect-square w-[80vmin] max-w-[1100px] select-none">
            {/* Aro base luxury */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent_70%)] ring-1 ring-white/10" />
            {/* Ticks por servicio */}
            <div className="absolute inset-6">
              {Array.from({ length: items.length }).map((_, i) => (
                <div key={i} className="absolute left-1/2 top-0 origin-bottom h-4 w-[2px] rounded bg-white/15" style={{ transform: `rotate(${i * stepAngle}deg) translateY(12px)` }} />
              ))}
            </div>
            {/* Progreso (reveal) */}
            <div className="absolute inset-6 rounded-full" style={{ background: `conic-gradient(#f5f5f5 ${(Math.min(active + 1, items.length) / items.length) * 360}deg, rgba(255,255,255,0.08) 0)` }} />
            {/* Marcador superior */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 h-8 w-[3px] rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,0.5)]" />

            {/* Cinta giratoria con iconos */}
            <motion.div className="absolute inset-10 rounded-full ring-1 ring-white/15 bg-black/30 backdrop-blur" style={{ rotate: rot }}>
              {items.map((it, i) => {
                const angle = i * stepAngle;
                const style = { transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)` } as React.CSSProperties;
                const isActive = active === i;
                const showOnlyCurrent = guided ? i === active : true; // en guided solo se ve el actual
                return (
                  <button
                    key={it.title}
                    onClick={() => { setActive(i); rot.set(-i * stepAngle); }}
                    className={`absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16 rounded-2xl border ${isActive ? 'border-white/70 bg-white/10' : 'border-white/20 bg-black/40'} backdrop-blur flex items-center justify-center shadow-[0_8px_30px_rgba(255,255,255,0.06)] transition-opacity duration-500 ${showOnlyCurrent ? 'opacity-100' : 'opacity-0'}`}
                    style={style}
                    aria-label={it.title}
                    aria-pressed={isActive}
                  >
                    <it.Icon className={`h-6 w-6 ${isActive ? 'text-white' : 'text-zinc-300'}`} />
                  </button>
                );
              })}
            </motion.div>

            {/* Centro: sólo logo o texto “ELITE” */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative h-48 w-48 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_20px_80px_rgba(255,255,255,0.05)]">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent_70%)]" />
                <div className="relative flex h-full items-center justify-center p-4">
                  {BRAND.logoUrl ? (
                    <img src={BRAND.logoUrl} alt="ELITE" className="h-16 w-auto opacity-90" />
                  ) : (
                    <span className="text-2xl font-semibold tracking-[0.35em] bg-[linear-gradient(110deg,_#f7f7f7,_#dcdcdc_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent drop-shadow">ELITE</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function LuxuryTransportHome() {
  const [category, setCategory] = useState('blindada');
  const [seats, setSeats] = useState('all');
  const [drive4x4, setDrive4x4] = useState(false);
  const [level, setLevel] = useState('all');
  return (
    <div className="min-h-screen bg-[#05060A] text-zinc-100 antialiased">
      {/* Fondo fijo (parallax) */}
      
      
      {/* Glow decorativo */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e6e6e6]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#ffffff]/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {BRAND.logoUrl ? (
              <img src={BRAND.logoUrl} alt="Logo" className="h-10 w-auto rounded-xl" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6e6e6] to-[#ffffff] text-[#0a0d14] font-black">LX</div>
            )}
            <div>
              <p className="text-lg font-semibold tracking-wide">ELITE Transport</p>
              <p className="text-xs text-zinc-400">Blindaje · Custodia · Hospitality</p>
            </div>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#servicios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">Servicios</a>
            <a href="#flota" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">Flota</a>
            <a href="#seguridad" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">Seguridad</a>
            <a href="#testimonios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">Clientes</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]">
              <Phone className="mr-2 h-4 w-4" /> Cotizar ahora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[80vh] md:min-h-[85vh]">
        <div className="absolute inset-0">
          <img src={BRAND.heroImageUrl} alt="Suburban negra blindada" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        </div>
        
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pt-16 pb-12 md:grid-cols-2 md:pt-24">
          <div className="flex-1 md:col-start-1 md:row-start-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold tracking-tight md:text-6xl"
            >
              Seguridad blindada,
              <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent drop-shadow">
                &nbsp;lujo absoluto
              </span>
            </motion.h1>
            <p className="mt-4 max-w-2xl text-lg text-zinc-300 md:text-xl">
              Traslados ejecutivos, custodios certificados y hospedaje de alto nivel. Un solo equipo para todo tu itinerario.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>Disponibilidad 24/7</Badge>
              <Badge>Choferes bilingües</Badge>
              <Badge>Facturación</Badge>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]">
                Reservar traslado <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]">
                Ver flota
              </Button>
            </div>
          </div>

          <div className="relative flex-1 w-full md:col-start-2 md:row-start-1 self-start">
            <div className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />
            <Card className="mt-6 md:mt-0 w-full rounded-2xl border-white/10 bg-black/50 backdrop-blur-md shadow-xl">
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-medium text-zinc-300">Reserva rápida</p>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <input className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="Origen / Ciudad" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <input className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" placeholder="Destino" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <input type="date" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <input type="time" className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500" />
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <Shield className="h-4 w-4 text-zinc-400" />
                    <select className="w-full bg-transparent text-sm outline-none">
                      <option className="bg-black/50">Camioneta Blindada</option>
                      <option className="bg-black/50">Camioneta Blanda</option>
                      <option className="bg-black/50">Sedán de Lujo</option>
                      <option className="bg-black/50">Sprinter Ejecutiva</option>
                      <option className="bg-black/50">Con Custodio</option>
                    </select>
                  </div>
                  <Button className="w-full rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]">Solicitar cotización</Button>
                  <p className="-mt-1 text-center text-xs text-zinc-400">Respuesta promedio &lt; 10 min.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          
        </div>

      </div>

{/* Servicios */}
      <Section id="servicios" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <ServicesWheel />
        </div>
      </Section>

      {/* Flota */}
      <Section id="flota" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Flota</h2>
              <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#e6e6e6] to-transparent" />
              <p className="mt-2 max-w-2xl text-zinc-400">Selecciona categoría y ajusta filtros para ver unidades disponibles.</p>
            </div>

            {/* Controles */}
            <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setCategory('blindada')} className={`rounded-xl px-3 py-1 text-sm ${category==='blindada' ? 'bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]' : 'border border-zinc-700 text-zinc-300 hover:border-zinc-600'}`}>Blindadas</button>
                <button onClick={() => setCategory('blanda')} className={`rounded-xl px-3 py-1 text-sm ${category==='blanda' ? 'bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]' : 'border border-zinc-700 text-zinc-300 hover:border-zinc-600'}`}>Blandas</button>

                <div className="mx-3 h-5 w-px bg-zinc-800" />

                <select value={String(seats)} onChange={(e)=>setSeats(e.target.value)} className="rounded-xl border border-zinc-700 bg-black/60 px-2 py-1 text-sm">
                  <option value="all">Pasajeros</option>
                  <option value="5">≥ 5</option>
                  <option value="7">≥ 7</option>
                  <option value="9">≥ 9</option>
                </select>
                <select value={drive4x4? '4x4':'cualquiera'} onChange={(e)=>setDrive4x4(e.target.value==='4x4')} className="rounded-xl border border-zinc-700 bg-black/60 px-2 py-1 text-sm">
                  <option value="cualquiera">Tracción</option>
                  <option value="4x4">4x4</option>
                </select>
                {category==='blindada' && (
                  <select value={level} onChange={(e)=>setLevel(e.target.value)} className="rounded-xl border border-zinc-700 bg-black/60 px-2 py-1 text-sm">
                    <option value="all">Nivel</option>
                    <option value="III+">III+</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <FleetGrid category={category} seats={seats} drive4x4={drive4x4} level={level} />
        </div>
      </Section>

      {/* Seguridad / Diferenciales */}
      <Section id="seguridad" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">Operación con estándares de seguridad</h2>
              <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#e6e6e6] to-transparent" />
              <ul className="mt-6 space-y-4 text-zinc-300">
                <li className="flex gap-3"><Shield className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Blindaje certificado (NIJ) y protocolos de ruta.</li>
                <li className="flex gap-3"><UserCheck className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Choferes y custodios con control de confianza.</li>
                <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Monitoreo 24/7 y puntualidad garantizada.</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <img src="https://dummyimage.com/80x40/1c1f2b/ffffff&text=ISO" alt="Certificación" className="rounded" />
                <img src="https://dummyimage.com/80x40/1c1f2b/ffffff&text=NIJ" alt="NIJ" className="rounded" />
                <img src="https://dummyimage.com/80x40/1c1f2b/ffffff&text=I+V" alt="Nivel" className="rounded" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop"
                alt="Interior ejecutivo"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-black/50 px-3 py-2 text-xs backdrop-blur">
                Interior ejecutivo con privacidad y conectividad
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonios */}
      <Section id="testimonios" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold md:text-3xl">La experiencia de nuestros clientes</h2>
            <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#e6e6e6] to-transparent" />
            <div className="hidden items-center gap-1 md:flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#e6e6e6] text-[#e6e6e6]" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-zinc-800 bg-black/50 p-6"
              >
                <p className="text-zinc-200">“{t.quote}”</p>
                <p className="mt-4 text-sm text-zinc-400">{t.author} · {t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-3xl border border-[#e6e6e6]/20 bg-gradient-to-br from-[#12182a] to-[#0b1120] p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold md:text-3xl">Listos para tu próximo itinerario</h3>
                <p className="mt-3 max-w-xl text-zinc-300">
                  Coordinamos aeropuerto, agenda ejecutiva, custodios y hospedaje de lujo con un solo punto de contacto.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button size="lg" className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]">
                    Hablar con un asesor
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-2xl border-zinc-700 text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]">
                    Descargar brochure
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop"
                  alt="Convoy ejecutivo"
                  className="h-64 w-full rounded-2xl object-cover md:h-72"
                />
                <div className="absolute inset-x-0 -bottom-6 mx-auto w-[90%] rounded-2xl border border-[#e6e6e6]/20 bg-black/70 p-4 text-xs text-zinc-300 backdrop-blur">
                  Agenda tentativa: AICM → Hotel Four Seasons → Reunión Reforma → Cena Polanco → Hotel
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black/60 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
          <div>
            {BRAND.logoUrl ? (
            <img src={BRAND.logoUrl} alt="Logo" className="mb-3 h-10 w-auto rounded-xl" />
          ) : (
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6e6e6] to-[#ffffff] text-[#0a0d14] font-black">EL</div>
          )}
            <p className="text-sm text-zinc-400">
              Operador de transporte blindado y de lujo. Cobertura nacional y coordinación internacional.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">Servicios</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Camionetas Blindadas</li>
              <li>Camionetas Blandas</li>
              <li>Custodios</li>
              <li>Sedanes de Lujo</li>
              <li>Sprinter Ejecutiva</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">Contacto</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>CDMX · Monterrey · Guadalajara</li>
              <li>+52 (55) 0000 0000</li>
              <li>contacto@luxshield.mx</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">Legal</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Privacidad</li>
              <li>Términos</li>
              <li>Aviso de cookies</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} ELITE Transport · Todos los derechos reservados
        </div>
      </footer>

      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5">
        <Button size="lg" className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] shadow-xl shadow-[#e6e6e6]/20 text-[#0a0d14]">
          <Phone className="mr-2 h-4 w-4" /> Cotizar ahora
        </Button>
      </div>
    </div>
  );
}
