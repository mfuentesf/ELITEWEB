"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Car,
  Crown,
  Hotel,
  UserCheck,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- WhatsApp helpers ---
const WHATSAPP_NUMBER = "+52 1 56 2580 0567";
const DEFAULT_WA_MESSAGE = "Hola, me interesa una cotización. ¿Me apoyas, por favor?";

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.11 17.07c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.47.13-.62.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.45 1.07 2.85 1.22 3.04.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35zM16.02 28C9.93 28 5 23.07 5 17c0-3.1 1.21-5.98 3.41-8.16A11.52 11.52 0 0 1 16 5.5c6.07 0 11 4.93 11 11 0 6.07-4.93 11-10.98 11zm0-24.5C9.1 3.5 3.5 9.1 3.5 16c0 2.22.6 4.33 1.65 6.15L3 29l6.99-2.11A12.43 12.43 0 0 0 16.02 28C22.9 28 28.5 22.4 28.5 15.5S22.94 3.5 16.02 3.5z" />
  </svg>
);

type ShadcnButtonProps = React.ComponentProps<typeof Button>;

const WhatsAppButton: React.FC<
  {
    number?: string;
    message?: string;
    className?: string;
    children?: React.ReactNode;
  } & Partial<ShadcnButtonProps>
> = ({ number = WHATSAPP_NUMBER, message = DEFAULT_WA_MESSAGE, className = "", children, ...btnProps }) => {
  const digits = number.replace(/\D/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
      <Button {...btnProps} className={`rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110 ${className}`}>
        <WhatsAppIcon className="mr-2 h-4 w-4" />
        {children ?? "WhatsApp"}
      </Button>
    </a>
  );
};

const FloatingWhatsAppButton: React.FC<{
  number?: string;
  message?: string;
  className?: string;
}> = ({ number = WHATSAPP_NUMBER, message = DEFAULT_WA_MESSAGE, className = "" }) => {
  const digits = number.replace(/\D/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
      <Button
        type="button"
        className={[
          "bg-[#25D366] text-[#0a0d14] hover:brightness-110",
          "h-14 w-14 rounded-full p-0",
          "shadow-xl shadow-black/40",
          "active:scale-95 transition",
          className,
        ].join(" ")}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </Button>
    </a>
  );
};

// --- Branding dinámico (logo + imagen de hero) ---
const BRAND = {
  logoUrl: "/Elitelogo.png",
  heroImageUrl: "/SUVHERO.png",
};

// --- Datos configurables (SERVICIOS con más diseño) ---
const services = [
  {
    title: "Unidades Blindadas",
    kicker: "Protección + confort premium",
    desc: "Blindaje de alto nivel con confort premium y ejecución impecable para agendas sensibles y traslados ejecutivos.",
    icon: Shield,
    bullets: ["Niveles III / IV / V / V+ según contexto", "Planeación operativa", "Privacidad y confort premium a bordo"],
    highlights: ["Confidencialidad", "Coordinación 24/7", "Cobertura nacional"],
    visual: {
      img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
      caption: "Blindaje + experiencia ejecutiva",
    },
  },
  {
    title: "Unidades Ejecutivas",
    kicker: "Movilidad ejecutiva sin fricción",
    desc: "SUVs premium para agenda ejecutiva: puntualidad, confort y una experiencia fluida en cada traslado.",
    icon: Car,
    bullets: ["Interiores ejecutivos y máximo confort", "Planeación operativa", "Conectividad a bordo (carga y uso de dispositivos)"],
    highlights: ["Puntualidad", "Confort premium", "Atención VIP"],
    visual: {
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
      caption: "Interior premium y conectividad",
    },
  },
  {
    title: "Custodia Ejecutiva",
    kicker: "Acompañamiento profesional",
    desc: "Acompañamiento profesional con planeación previa y ejecución sobria, adaptada al nivel de exposición del evento.",
    icon: UserCheck,
    bullets: ["Perfil ejecutivo o de alto impacto", "Planeación operativa", "Coordinación con agenda", "Elementos verificados y comunicación operativa"],
    highlights: ["Perfiles por contexto", "Procesos de verificación", "Operación sobria"],
    visual: {
      img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
      caption: "Coordinación y presencia profesional",
    },
  },
  {
    title: "Sprinter & Vans",
    kicker: "Comitivas y logística",
    desc: "Movilidad para comitivas y eventos: espacio, confort y logística coordinada para que tu grupo llegue junto y a tiempo.",
    icon: Crown,
    bullets: ["Configuración para 8–15 pasajeros", "Espacio para equipaje y comodidad", "Aeropuerto / eventos / roadshows", "Coordinación de pickups y horarios"],
    highlights: ["8–15 pasajeros", "Equipaje", "Pickups coordinados"],
    visual: {
      img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop",
      caption: "Espacio y logística coordinada",
    },
  },
  {
    title: "Alojamientos de Alto Nivel",
    kicker: "Privacidad + ubicación + servicio",
    desc: "Alojamientos para itinerarios exigentes: villas privadas y hotelería 5★ seleccionada por privacidad, ubicación y servicio.",
    icon: Hotel,
    bullets: ["Villas privadas u hotelería 5★", "Selección según ubicación y necesidades", "Privacidad y coordinación de accesos", "Coordinación de reservación y logística"],
    highlights: ["Selección a medida", "Privacidad", "Accesos coordinados"],
    visual: {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
      caption: "Alojamientos con estándar ejecutivo",
    },
  },
];

type FleetCategory = "blindada" | "blanda" | "van" | "lujo";
type ArmorLevel = "III" | "IV" | "V" | "V+";

const fleetData: Array<{
  name: string;
  category: FleetCategory;
  level: ArmorLevel | null;
  seats: number;
  img: string;
  tags: string[];
}> = [
  {
    name: "Chevrolet Suburban Blindada",
    category: "blindada",
    level: "III",
    seats: 7,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
    tags: ["Nivel III", "Hasta 7 pax", "Interior ejecutivo"],
  },
  {
    name: "SUV Blindada Nivel IV",
    category: "blindada",
    level: "IV",
    seats: 5,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    tags: ["Nivel IV", "Perfil ejecutivo", "Clima trizona"],
  },
  {
    name: "Mercedes-Benz Sprinter Ejecutiva",
    category: "van",
    level: null,
    seats: 10,
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
    tags: ["Asientos capitán", "Tomacorrientes", "Luces ambiente"],
  },
  {
    name: "Toyota Hiace Ejecutiva",
    category: "van",
    level: null,
    seats: 12,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    tags: ["Comitiva", "Espacio para equipaje", "Logística coordinada"],
  },
  {
    name: "Chevrolet Suburban Ejecutiva",
    category: "blanda",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Hasta 7 pax", "Interior premium", "Conectividad"],
  },
  {
    name: "Escalade V (Flagship)",
    category: "lujo",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    tags: ["Flagship", "Máximo confort", "VIP"],
  },
];

const testimonials = [
  {
    quote: "Servicio impecable y seguridad total. La unidad blindada fue perfecta para nuestro equipo.",
    author: "Cynthia R.",
    role: "Directora de Operaciones, Grupo Minero",
  },
  {
    quote: "La logística de aeropuerto a hotel y reuniones salió milimétrica. Operación muy profesional.",
    author: "Luis A.",
    role: "Coordinador de Eventos, Agencia BTL",
  },
];

// --- Componentes auxiliares tipados ---
interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}
const Section: React.FC<SectionProps> = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

interface FleetGridProps {
  category: FleetCategory;
  seats: string;
  level: string; // "all" | ArmorLevel
}

function FleetGrid({ category, seats, level }: FleetGridProps) {
  const filtered = useMemo(() => {
    return fleetData.filter((item) => {
      if (item.category !== category) return false;
      if (seats !== "all" && item.seats < Number(seats)) return false;
      if (category === "blindada" && level !== "all" && item.level !== (level as ArmorLevel)) return false;
      return true;
    });
  }, [category, seats, level]);

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
              <span className="absolute left-3 top-3 rounded-full border border-[#e6e6e6]/30 bg-black/60 px-2 py-0.5 text-xs text-zinc-200">
                Nivel {f.level}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              {f.name}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-full border border-zinc-700 px-2 py-1">{f.seats} pax</span>
              {f.tags?.map((t) => (
                <span key={t} className="rounded-full border border-zinc-700 px-2 py-1">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-zinc-400">Disponible hoy</p>
              <WhatsAppButton size="sm" message={`Hola, me interesa ${f.name}. ¿Podemos coordinar una cotización?`}>
                Cotizar
              </WhatsAppButton>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ServicesTabs() {
  const [current, setCurrent] = useState(services[0].title);
  const active = services.find((s) => s.title === current)!;
  const ActivePanelIcon = active.icon as React.ElementType;

  // ✅ Carrusel + flechas (móvil)
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = tabsRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < maxScroll - 8);
  };

  useEffect(() => {
    updateArrows();
    const el = tabsRef.current;
    if (!el) return;

    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTabs = (dir: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.82);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* ✅ ocultar scrollbar del carrusel (solo para esta sección) */}
      <style jsx global>{`
        .elite-scroll::-webkit-scrollbar {
          display: none;
        }
        .elite-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Header de sección */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Servicios</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            Experiencia ejecutiva,{" "}
            <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              con estándares de seguridad
            </span>
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-400">Selecciona un servicio para ver el alcance exacto. Te guiamos según tu agenda.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">Cobertura nacional</span>
          <span className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">Coordinación 24/7</span>
        </div>
      </div>

      {/* Tabs (✅ móvil carrusel + flechas; desktop wrap) */}
      <div className="relative">
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={() => scrollTabs("left")}
          disabled={!canLeft}
          className={[
  "md:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10",
  "h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur",
  "grid place-items-center shadow-lg shadow-black/30",
  "transition duration-200",
  "opacity-30 hover:opacity-85 active:opacity-90",
  "hover:bg-black/55 active:bg-black/60",
  canLeft ? "pointer-events-auto" : "opacity-0 pointer-events-none",
].join(" ")}

          aria-label="Ver servicios anteriores"
        >
          <ChevronLeft className="h-5 w-5 text-zinc-200" />
        </button>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={() => scrollTabs("right")}
          disabled={!canRight}
          className={[
  "md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10",
  "h-10 w-10 rounded-full border border-white/10 bg-black/40 backdrop-blur",
  "grid place-items-center shadow-lg shadow-black/30",
  "transition duration-200",
  "opacity-30 hover:opacity-85 active:opacity-90",
  "hover:bg-black/55 active:bg-black/60",
  canRight ? "pointer-events-auto" : "opacity-0 pointer-events-none",
].join(" ")}

          aria-label="Ver más servicios"
        >
          <ChevronRight className="h-5 w-5 text-zinc-200" />
        </button>

        <div
          ref={tabsRef}
          className={[
            "elite-scroll flex gap-2 overflow-x-auto -mx-4 px-4",
            "snap-x snap-mandatory",
            "py-1",
            "md:mx-0 md:px-0 md:flex-wrap md:overflow-visible md:py-0",
          ].join(" ")}
        >
          {services.map((s) => {
            const TabIcon = s.icon as React.ElementType;
            const isActive = s.title === current;

            return (
              <button
                key={s.title}
                onClick={() => setCurrent(s.title)}
                className={[
                  // ✅ carrusel: cada tab se “snapea” y no se encoge
                  "snap-start shrink-0 md:shrink",
                  // ✅ más compacto en móvil
                  "min-w-[210px] sm:min-w-[240px] md:min-w-0",
                  "group relative flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition md:px-4 md:py-3",
                  isActive
                    ? "border-[#e6e6e6]/60 bg-white/10 text-white"
                    : "border-zinc-800 bg-black/40 text-zinc-300 hover:border-zinc-700",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <span className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-xl border border-zinc-800 bg-black/50">
                  <TabIcon className="h-4 w-4 text-zinc-200" />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[12px] md:text-[13px] font-medium">{s.title}</span>
                  <span className="block text-[10px] md:text-[11px] text-zinc-500">{(s as any).kicker}</span>
                </span>

                {/* glow cuando está activo */}
                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.16),transparent_70%)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel (✅ móvil: imagen de fondo + card con fade; desktop igual) */}
      <div className="mt-6 relative overflow-hidden rounded-3xl border border-zinc-800 bg-black/40 md:bg-black/50">
        {/* ✅ Fondo de imagen solo en móvil */}
        <div className="absolute inset-0 md:hidden">
          <img src={(active as any).visual?.img} alt={active.title} className="h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5">
          {/* Content */}
          <div className="p-6 md:col-span-3 md:p-8">
            {/* ✅ wrapper que en móvil hace fade y deja ver la imagen abajo */}
            <div className="rounded-3xl -m-6 p-6 md:m-0 md:p-0 md:rounded-none md:bg-transparent bg-[linear-gradient(to_bottom,rgba(0,0,0,0.74),rgba(0,0,0,0.42),rgba(0,0,0,0))] backdrop-blur-sm md:backdrop-blur-0">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-4"
              >
                {/* Icon badge grande */}
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-md" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-black/60">
                    <ActivePanelIcon className="h-6 w-6 text-zinc-100" />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{(active as any).kicker}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{active.title}</h3>
                  <p className="mt-2 text-zinc-200 md:text-zinc-300">{(active as any).desc}</p>

                  {/* highlights */}
                  {!!(active as any).highlights?.length && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(active as any).highlights.map((h: string) => (
                        <span
                          key={h}
                          className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-200 md:text-zinc-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* bullets */}
                  {!!(active as any).bullets?.length && (
                    <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-zinc-200 md:text-zinc-300 md:grid-cols-2">
                      {(active as any).bullets.map((b: string) => (
                        <li key={b} className="flex items-center gap-2">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA (✅ solo WhatsApp) */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <WhatsAppButton
                      size="lg"
                      message={`Hola, me interesa ${active.title}. ¿Podemos coordinar una cotización?`}
                    >
                      Coordinar por WhatsApp
                    </WhatsAppButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Visual (✅ oculto en móvil para no duplicar) */}
          <div className="relative hidden md:block md:col-span-2">
            <div className="absolute inset-0">
              <img src={(active as any).visual?.img} alt={active.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="relative h-full p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {(active as any).visual?.caption ?? "Servicio ejecutivo"}
              </div>

              <div className="mt-auto hidden h-full items-end md:flex">
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-zinc-200 backdrop-blur">
                  Recomendación: si no estás seguro, elegimos el nivel y configuración según tu agenda.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Wizard (Opción 2) ----------------
type ServiceType = "Traslado (A → B)" | "Renta por día (Disposición)" | "Renta + Custodia";
type UnitType = "Ejecutiva" | "Blindada" | "Sprinter/Vans" | "Lujo";

const UNIT_CARDS: Array<{
  key: UnitType;
  title: string;
  desc: string;
  icon: React.ElementType;
  hint: string;
}> = [
  { key: "Ejecutiva", title: "Ejecutiva", desc: "Agenda diaria y movilidad sin fricción.", icon: Car, hint: "Ideal para traslados y disposición." },
  { key: "Blindada", title: "Blindada", desc: "Protección reforzada para agendas sensibles.", icon: Shield, hint: "Selecciona nivel según contexto." },
  { key: "Sprinter/Vans", title: "Sprinter/Vans", desc: "Comitivas, equipaje y logística coordinada.", icon: Crown, hint: "Recomendado 8+ pasajeros." },
  { key: "Lujo", title: "Lujo", desc: "VIP, máximo confort.", icon: Crown, hint: "Servicio flagship." },
];

function StepPill({ index, current, label }: { index: number; current: number; label: string }) {
  const done = current > index;
  const active = current === index;

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs
          ${
            done
              ? "border-[#e6e6e6]/60 bg-white/10 text-white"
              : active
              ? "border-[#e6e6e6] bg-white/10 text-white"
              : "border-zinc-700 text-zinc-400"
          }`}
        aria-hidden="true"
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : index}
      </div>
      <p className={`${active ? "text-zinc-200" : "text-zinc-500"} text-xs`}>{label}</p>
    </div>
  );
}

export default function LuxuryTransportHome() {
  // Flota
  const [category, setCategory] = useState<FleetCategory>("blindada");
  const [seats, setSeats] = useState<string>("all");
  const [level, setLevel] = useState<string>("all"); // III | IV | V | V+ | all

  // Wizard (Hero)
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceType, setServiceType] = useState<ServiceType>("Traslado (A → B)");
  const [unitType, setUnitType] = useState<UnitType>("Ejecutiva");
  const [armorLevel, setArmorLevel] = useState<ArmorLevel>("IV");
  const [pax, setPax] = useState<string>("1–4");

  // Paso 3: datos mínimos
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Renta / Disposición
  const [city, setCity] = useState("CDMX");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [zones, setZones] = useState("");

  // Custodia
  const [custodians, setCustodians] = useState<string>("1");
  const [custodyProfile, setCustodyProfile] = useState<string>("Ejecutivo");

  const isTransfer = serviceType === "Traslado (A → B)";
  const isRent = serviceType !== "Traslado (A → B)";
  const isCustody = serviceType === "Renta + Custodia";
  const isArmored = unitType === "Blindada";

  // Defaults inteligentes
  useEffect(() => {
    if (serviceType === "Renta + Custodia") {
      setUnitType((prev) => (prev === "Blindada" ? prev : "Blindada"));
      setArmorLevel((prev) => (prev ? prev : "IV"));
    }
  }, [serviceType]);

  useEffect(() => {
    if (unitType === "Sprinter/Vans") {
      setPax((prev) => (prev === "1–4" || prev === "5–7" ? "8–10" : prev));
    }
  }, [unitType]);

  const step1Help = "Elige lo más cercano para cotizar rápido.";
  const step2Help = "No necesitas saber modelos: selecciona el tipo de unidad y te guiamos.";
  const step3Help = isTransfer
    ? "Completa los datos mínimos para cotizar el traslado."
    : "Completa fechas y ciudad base para cotizar la disposición.";

  const reservationMessage = useMemo(() => {
    const lines: Array<string | null> = [
      "Hola, me interesa una cotización:",
      `• Tipo de servicio: ${serviceType}`,
      `• Tipo de unidad: ${unitType}${isArmored ? ` (Nivel ${armorLevel})` : ""}`,
      `• Pasajeros: ${pax}`,

      isTransfer ? `• Origen: ${origin || "—"}` : null,
      isTransfer ? `• Destino: ${destination || "—"}` : null,
      isTransfer && date ? `• Fecha: ${new Date(date).toLocaleDateString()}` : null,
      isTransfer && time ? `• Hora: ${time}` : null,

      isRent ? `• Ciudad base: ${city || "—"}` : null,
      isRent && startDate ? `• Inicio: ${new Date(startDate).toLocaleDateString()}` : null,
      isRent && endDate ? `• Fin: ${new Date(endDate).toLocaleDateString()}` : null,
      isRent && schedule ? `• Horario estimado: ${schedule}` : null,
      isRent && zones ? `• Zonas/agenda: ${zones}` : null,

      isCustody ? `• Custodia: ${custodians} (${custodyProfile})` : null,
    ];

    return lines.filter(Boolean).join("\n");
  }, [
    serviceType,
    unitType,
    isArmored,
    armorLevel,
    pax,
    isTransfer,
    origin,
    destination,
    date,
    time,
    isRent,
    city,
    startDate,
    endDate,
    schedule,
    zones,
    isCustody,
    custodians,
    custodyProfile,
  ]);

  const reservationHref = useMemo(() => {
    const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(reservationMessage)}`;
  }, [reservationMessage]);

  const canNext = useMemo(() => {
    if (step === 1) return !!serviceType;
    if (step === 2) return !!unitType;
    if (step === 3) return true;
    return true;
  }, [step, serviceType, unitType]);

  // Glow decorativo responsivo
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div className="min-h-screen bg-[#05060A] text-zinc-100 antialiased">
      {/* Glow decorativo */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#e6e6e6]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#ffffff]/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4">
          <div className="flex items-center gap-0">
            {BRAND.logoUrl ? (
              <div className="flex-none h-10 w-[120px] md:h-11 md:w-[135px]">
                <img src={BRAND.logoUrl} alt="Logo ELITE" className="h-full w-full object-contain object-left" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6e6e6] to-[#ffffff] text-[#0a0d14] font-black">
                LX
              </div>
            )}

            <div className="leading-tight">
              <p className="text-lg font-semibold tracking-wide">ELITE</p>
              <p className="text-xs text-zinc-400">Armored SUVs • Executive Services</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex ml-auto">
            <a href="#servicios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              Servicios
            </a>
            <a href="#flota" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              Flota
            </a>
            <a href="#seguridad" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              Seguridad
            </a>
            <a href="#testimonios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              Clientes
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[80vh] md:min-h-[85vh]">
        <div className="absolute inset-0">
          <img src={BRAND.heroImageUrl} alt="Unidad ejecutiva blindada" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 pt-16 pb-12 md:grid-cols-2 md:pt-24">
          {/* Copy */}
          <div className="flex-1 md:col-start-1 md:row-start-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold tracking-tight md:text-6xl"
            >
              Llega con calma.{" "}
              <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent drop-shadow">
                Nosotros nos encargamos.
              </span>
            </motion.h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-300 md:text-xl">
              Seguridad, lujo y puntualidad para moverte sin fricción: SUV blindadas, escoltas y alojamiento.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>Puntualidad garantizada</Badge>
              <Badge>Atención VIP</Badge>
              <Badge>Disponibilidad 24/7</Badge>
            </div>
          </div>

          {/* Wizard Card */}
          <div className="relative flex-1 w-full md:col-start-2 md:row-start-1 self-start">
            <div className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />

            <Card id="cotizar" className="mt-6 md:mt-0 w-full rounded-2xl border-white/10 bg-black/50 backdrop-blur-md shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Coordina tu servicio</p>
                    <p className="mt-1 text-xs text-zinc-400">Responde 3 preguntas y te cotizamos por WhatsApp.</p>
                  </div>
                  <span className="rounded-full border border-zinc-700 bg-black/40 px-2 py-1 text-[11px] text-zinc-300">
                    {step}/3
                  </span>
                </div>

                {/* Stepper */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <StepPill index={1} current={step} label="Servicio" />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={2} current={step} label="Unidad" />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={3} current={step} label="Detalles" />
                </div>

                {/* Content */}
                <div className="mt-5 space-y-3">
                  {step === 1 && (
                    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-zinc-300" />
                        <p className="text-sm font-medium text-zinc-200">¿Qué necesitas hoy?</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{step1Help}</p>

                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {(["Traslado (A → B)", "Renta por día (Disposición)", "Renta + Custodia"] as ServiceType[]).map((s) => {
                          const activeSel = serviceType === s;
                          return (
                            <button
                              key={s}
                              onClick={() => setServiceType(s)}
                              className={`rounded-2xl border px-4 py-3 text-left transition
                                ${
                                  activeSel
                                    ? "border-[#e6e6e6]/70 bg-white/10"
                                    : "border-zinc-700 bg-black/40 hover:border-zinc-600"
                                }`}
                              aria-pressed={activeSel}
                            >
                              <p className={`text-sm ${activeSel ? "text-white" : "text-zinc-200"}`}>{s}</p>
                              <p className="mt-1 text-xs text-zinc-400">
                                {s === "Traslado (A → B)"
                                  ? "Traslado ejecutivo coordinado."
                                  : s === "Renta por día (Disposición)"
                                  ? "Unidad por horas o por día."
                                  : "Disposición con custodia incluida."}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-zinc-300" />
                        <p className="text-sm font-medium text-zinc-200">¿Qué tipo de unidad?</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{step2Help}</p>

                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {UNIT_CARDS.map((c) => {
                          const Icon = c.icon;
                          const activeSel = unitType === c.key;
                          return (
                            <button
                              key={c.key}
                              onClick={() => setUnitType(c.key)}
                              className={`rounded-2xl border px-4 py-3 text-left transition
                                ${
                                  activeSel
                                    ? "border-[#e6e6e6]/70 bg-white/10"
                                    : "border-zinc-700 bg-black/40 hover:border-zinc-600"
                                }`}
                              aria-pressed={activeSel}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5 rounded-xl border border-zinc-700 bg-black/50 p-2">
                                    <Icon className="h-4 w-4 text-zinc-200" />
                                  </div>
                                  <div>
                                    <p className="text-sm text-zinc-100">{c.title}</p>
                                    <p className="mt-1 text-xs text-zinc-400">{c.desc}</p>
                                    <p className="mt-1 text-[11px] text-zinc-500">{c.hint}</p>
                                  </div>
                                </div>
                                {activeSel && <CheckCircle2 className="h-5 w-5 text-[#e6e6e6]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {isArmored && (
                        <div className="mt-4 rounded-2xl border border-zinc-800 bg-black/50 p-4">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-zinc-300" />
                            <p className="text-sm font-medium text-zinc-200">Nivel de blindaje</p>
                          </div>
                          <p className="mt-1 text-xs text-zinc-400">
                            A mayor nivel, mayor protección. Si no estás seguro, IV suele funcionar bien para agenda ejecutiva.
                          </p>

                          <div className="mt-3 flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                            <Shield className="h-4 w-4 text-zinc-400" />
                            <select
                              className="w-full bg-transparent text-sm outline-none"
                              value={armorLevel}
                              onChange={(e) => setArmorLevel(e.target.value as ArmorLevel)}
                            >
                              <option className="bg-black/50">III</option>
                              <option className="bg-black/50">IV</option>
                              <option className="bg-black/50">V</option>
                              <option className="bg-black/50">V+</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-300" />
                        <p className="text-sm font-medium text-zinc-200">Detalles mínimos</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{step3Help}</p>

                      {/* Pasajeros */}
                      <div className="mt-4">
                        <label className="mb-1 block text-xs font-medium text-zinc-200">Pasajeros</label>
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                          <MapPin className="h-4 w-4 text-zinc-400" />
                          <select
                            className="w-full bg-transparent text-sm outline-none"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                            aria-label="Cantidad de pasajeros"
                          >
                            <option className="bg-black/50">1–4</option>
                            <option className="bg-black/50">5–7</option>
                            <option className="bg-black/50">8–10</option>
                            <option className="bg-black/50">10+</option>
                          </select>
                        </div>
                      </div>

                      {/* Traslado */}
                      {isTransfer && (
                        <>
                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Origen</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder="Aeropuerto, hotel o ciudad"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                aria-label="Origen"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Destino</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder="Oficina o zona"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                aria-label="Destino"
                              />
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">Fecha</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Calendar className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="date"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                  aria-label="Fecha del traslado"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">Hora</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Clock className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="time"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={time}
                                  onChange={(e) => setTime(e.target.value)}
                                  aria-label="Hora del traslado"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Renta */}
                      {isRent && (
                        <>
                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Ciudad base</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                aria-label="Ciudad base"
                              >
                                <option className="bg-black/50">CDMX</option>
                                <option className="bg-black/50">Monterrey</option>
                                <option className="bg-black/50">Guadalajara</option>
                                <option className="bg-black/50">Otra</option>
                              </select>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">Inicio</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Calendar className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="date"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                  aria-label="Fecha de inicio"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">Fin</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Calendar className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="date"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                  aria-label="Fecha de fin"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Horario estimado (opcional)</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <Clock className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder="Ej. 10:00–20:00"
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                aria-label="Horario estimado"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Zonas / agenda (opcional)</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder="Ej. Polanco, Reforma, Santa Fe"
                                value={zones}
                                onChange={(e) => setZones(e.target.value)}
                                aria-label="Zonas o agenda"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Custodia */}
                      {isCustody && (
                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-zinc-200">N.º de elementos</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <UserCheck className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={custodians}
                                onChange={(e) => setCustodians(e.target.value)}
                                aria-label="Número de elementos de custodia"
                              >
                                <option className="bg-black/50">1</option>
                                <option className="bg-black/50">2</option>
                                <option className="bg-black/50">3+</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-medium text-zinc-200">Perfil de custodia</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <UserCheck className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={custodyProfile}
                                onChange={(e) => setCustodyProfile(e.target.value)}
                                aria-label="Perfil de custodia"
                              >
                                <option className="bg-black/50">Ejecutivo</option>
                                <option className="bg-black/50">Alto impacto</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <a href={reservationHref} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110">
                            <WhatsAppIcon className="mr-2 h-4 w-4" /> Enviar por WhatsApp
                          </Button>
                        </a>
                        <p className="mt-2 text-center text-xs text-zinc-400">Respuesta promedio &lt; 10 min.</p>
                      </div>
                    </div>
                  )}

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="outline"
                      className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                      onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as 1 | 2 | 3)))}
                      disabled={step === 1}
                    >
                      Atrás
                    </Button>

                    {step < 3 ? (
                      <Button
                        className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                        onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))}
                        disabled={!canNext}
                      >
                        Continuar <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                        onClick={() => setStep(1)}
                      >
                        Reiniciar
                      </Button>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500">
                    Tip: si no estás seguro del nivel, elige “Blindada” + “IV” y nosotros ajustamos con base en tu agenda.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <Section id="servicios" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <ServicesTabs />
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

            <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ["blindada", "Blindadas"],
                    ["blanda", "Ejecutivas"],
                    ["van", "Sprinter/Vans"],
                    ["lujo", "Lujo"],
                  ] as Array<[FleetCategory, string]>
                ).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => setCategory(k)}
                    className={`rounded-xl px-3 py-1 text-sm ${
                      category === k
                        ? "bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                        : "border border-zinc-700 text-zinc-300 hover:border-zinc-600"
                    }`}
                  >
                    {label}
                  </button>
                ))}

                <div className="mx-3 h-5 w-px bg-zinc-800" />

                <select
                  value={String(seats)}
                  onChange={(e) => setSeats(e.target.value)}
                  className="rounded-xl border border-zinc-700 bg-black/60 px-2 py-1 text-sm"
                >
                  <option value="all">Pasajeros</option>
                  <option value="5">≥ 5</option>
                  <option value="7">≥ 7</option>
                  <option value="9">≥ 9</option>
                  <option value="12">≥ 12</option>
                </select>

                {category === "blindada" && (
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="rounded-xl border border-zinc-700 bg-black/60 px-2 py-1 text-sm"
                  >
                    <option value="all">Nivel</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="V+">V+</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <FleetGrid category={category} seats={seats} level={level} />
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
                <li className="flex gap-3">
                  <Shield className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Blindaje y protocolos operativos según el contexto.
                </li>
                <li className="flex gap-3">
                  <UserCheck className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Personal operativo con procesos de verificación.
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Coordinación 24/7 y puntualidad orientada a agenda ejecutiva.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">Niveles: III · IV · V · V+</span>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">Planeación operativa</span>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">Coordinación nacional</span>
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
                <p className="mt-4 text-sm text-zinc-400">
                  {t.author} · {t.role}
                </p>
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
                  Coordinamos aeropuerto, agenda ejecutiva, custodia y alojamiento de alto nivel con un solo punto de contacto.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <WhatsAppButton size="lg">Hablar con un asesor</WhatsAppButton>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-2xl border-zinc-700 text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                  >
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
                  Agenda tentativa: AICM → Hotel → Reunión → Cena → Hotel
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
              <img src={BRAND.logoUrl} alt="Logo ELITE" className="mb-3 h-12 w-auto object-contain" />
            ) : (
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6e6e6] to-[#ffffff] text-[#0a0d14] font-black">
                EL
              </div>
            )}
            <p className="text-sm text-zinc-400">
              Operador de transporte blindado y servicios ejecutivos. Cobertura nacional y coordinación internacional.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">Servicios</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Unidades Blindadas</li>
              <li>Unidades Ejecutivas</li>
              <li>Custodia Ejecutiva</li>
              <li>Sprinter & Vans</li>
              <li>Alojamientos de Alto Nivel</li>
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
      <div className="fixed bottom-5 right-5 z-50">
        <FloatingWhatsAppButton />
      </div>
    </div>
  );
}
