"use client";

import React, { useEffect, useMemo, useState } from "react";
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
  Star,
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
> = ({
  number = WHATSAPP_NUMBER,
  message = DEFAULT_WA_MESSAGE,
  className = "",
  children,
  ...btnProps
}) => {
  const digits = number.replace(/\D/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
      <Button
        {...btnProps}
        className={`rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110 ${className}`}
      >
        <WhatsAppIcon className="mr-2 h-4 w-4" />
        {children ?? "WhatsApp"}
      </Button>
    </a>
  );
};

// --- Branding dinámico (logo + imagen de hero) ---
const BRAND = {
  logoUrl: "/Elitelogo.png",
  heroImageUrl: "/SUVHERO.png",
};

// --- Datos configurables ---
const services = [
  {
    title: "Unidades Blindadas",
    desc: "Blindaje certificado en niveles III, IV, V y V+ con operación discreta y cobertura nacional.",
    icon: Shield,
    bullets: ["Niveles III / IV / V / V+", "Operación discreta", "Cobertura nacional"],
  },
  {
    title: "Unidades Ejecutivas",
    desc: "SUVs premium con interiores ejecutivos y conectividad para agendas de alto nivel.",
    icon: Car,
    bullets: ["SUVs premium", "Interiores ejecutivos", "Conectividad a bordo"],
  },
  {
    title: "Custodia Ejecutiva",
    desc: "Personal de seguridad certificado. Perfiles discretos o de alto impacto según el contexto.",
    icon: UserCheck,
    bullets: ["Certificados", "Perfil discreto o alto impacto", "Coordinación de ruta"],
  },
  {
    title: "Sprinter & Vans",
    desc: "Soluciones para comitivas, aeropuerto y eventos: confort, espacio y logística coordinada.",
    icon: Crown,
    bullets: ["Comitivas y eventos", "Espacio para equipaje", "Logística coordinada"],
  },
  {
    title: "Hospedaje de Alto Nivel",
    desc: "Villas privadas y hoteles 5★ seleccionados a medida de tu itinerario.",
    icon: Hotel,
    bullets: ["Villas privadas", "Hoteles 5★", "Curaduría a medida"],
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
    tags: ["Nivel IV", "Perfil discreto", "Clima trizona"],
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
    tags: ["Comitiva", "Espacio para equipaje", "Logística eventos"],
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
    quote:
      "La logística de aeropuerto a hotel y reuniones salió milimétrica. Operación muy profesional.",
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
      if (category === "blindada" && level !== "all" && item.level !== (level as ArmorLevel))
        return false;
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
              <WhatsAppButton size="sm" message={`Hola, me interesa ${f.name}. ¿Podemos cotizar?`}>
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
  const ActivePanelIcon = active.icon;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const TabIcon = s.icon;
            const isActive = s.title === current;
            return (
              <button
                key={s.title}
                onClick={() => setCurrent(s.title)}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "border-[#e6e6e6] bg-white/10 text-white"
                      : "border-zinc-700 bg-black/40 text-zinc-300 hover:border-zinc-600"
                  }`}
                aria-pressed={isActive}
              >
                <TabIcon className="h-4 w-4" />
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-black/50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <ActivePanelIcon className="h-5 w-5 text-zinc-200" />
                <h3 className="text-xl font-semibold">{active.title}</h3>
              </div>
              <p className="mt-2 text-zinc-300">{active.desc}</p>
              {!!active.bullets?.length && (
                <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-zinc-300 md:grid-cols-2">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="shrink-0">
              <WhatsAppButton
                size="lg"
                message={`Hola, me interesa ${active.title}. ¿Podemos coordinar una cotización?`}
              >
                Coordinar por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
              <div className="flex items-center gap-2">
                <s.icon className="h-4 w-4 text-zinc-200" />
                <p className="font-medium">{s.title}</p>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{s.desc}</p>
              <div className="mt-3">
                <WhatsAppButton
                  size="sm"
                  message={`Hola, me interesa ${s.title}. ¿Podemos coordinar una cotización?`}
                >
                  Coordinar
                </WhatsAppButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ServiceType = "Traslado" | "Renta de unidad" | "Renta de unidad + custodio";
type UnitType = "Blindada" | "Ejecutiva" | "Sprinter/Vans" | "Lujo";

export default function LuxuryTransportHome() {
  // Flota (sección de catálogo)
  const [category, setCategory] = useState<FleetCategory>("blindada");
  const [seats, setSeats] = useState<string>("all");
  const [level, setLevel] = useState<string>("all"); // III | IV | V | V+ | all

  // Cotización (form del hero)
  const [serviceType, setServiceType] = useState<ServiceType>("Traslado");
  const [unitType, setUnitType] = useState<UnitType>("Blindada");
  const [armorLevel, setArmorLevel] = useState<ArmorLevel>("III");
  const [pax, setPax] = useState<string>("1–4");

  // Traslado
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Renta / Disposición
  const [city, setCity] = useState("CDMX");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState(""); // "10:00–20:00" (opcional)
  const [zones, setZones] = useState(""); // "Polanco / Reforma" (opcional)

  // Custodia
  const [custodians, setCustodians] = useState<string>("1");
  const [custodyProfile, setCustodyProfile] = useState<string>("Discreto");

  const showTransfer = serviceType === "Traslado";
  const showRent = serviceType !== "Traslado";
  const showCustody = serviceType === "Renta de unidad + custodio";
  const showArmorLevel = unitType === "Blindada";

  const reservationMessage = useMemo(() => {
    const lines: Array<string | null> = [
      "Hola, me interesa una cotización:",
      `• Tipo de servicio: ${serviceType}`,
      `• Unidad: ${unitType}${showArmorLevel ? ` (Nivel ${armorLevel})` : ""}`,
      `• Pasajeros: ${pax}`,

      showTransfer ? `• Origen: ${origin || "—"}` : null,
      showTransfer ? `• Destino: ${destination || "—"}` : null,
      showTransfer && date ? `• Fecha: ${new Date(date).toLocaleDateString()}` : null,
      showTransfer && time ? `• Hora: ${time}` : null,

      showRent ? `• Ciudad base: ${city || "—"}` : null,
      showRent && startDate ? `• Inicio: ${new Date(startDate).toLocaleDateString()}` : null,
      showRent && endDate ? `• Fin: ${new Date(endDate).toLocaleDateString()}` : null,
      showRent && schedule ? `• Horario estimado: ${schedule}` : null,
      showRent && zones ? `• Zonas/agenda: ${zones}` : null,

      showCustody ? `• Custodia: ${custodians} (${custodyProfile})` : null,
    ];

    return lines.filter(Boolean).join("\n");
  }, [
    serviceType,
    unitType,
    showArmorLevel,
    armorLevel,
    pax,
    showTransfer,
    origin,
    destination,
    date,
    time,
    showRent,
    city,
    startDate,
    endDate,
    schedule,
    zones,
    showCustody,
    custodians,
    custodyProfile,
  ]);

  const reservationHref = useMemo(() => {
    const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
    return `https://wa.me/${digits}?text=${encodeURIComponent(reservationMessage)}`;
  }, [reservationMessage]);

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
                <img
                  src={BRAND.logoUrl}
                  alt="Logo ELITE"
                  className="h-full w-full object-contain object-left"
                />
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
          <img
            src={BRAND.heroImageUrl}
            alt="Unidad ejecutiva blindada"
            className="h-full w-full object-cover object-center"
          />
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
              Traslados ejecutivos, custodia certificada y hospedaje de alto nivel. Un solo equipo
              para coordinar tu itinerario.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>Disponibilidad 24/7</Badge>
              <Badge>Atención bilingüe</Badge>
              <Badge>Custodia disponible</Badge>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cotizar" className="inline-block">
                <Button
                  size="lg"
                  className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                >
                  Coordinar servicio <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#flota" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                >
                  Ver flota
                </Button>
              </a>
            </div>
          </div>

          {/* Card Cotización */}
          <div className="relative flex-1 w-full md:col-start-2 md:row-start-1 self-start">
            <div className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />

            <Card
              id="cotizar"
              className="mt-6 md:mt-0 w-full rounded-2xl border-white/10 bg-black/50 backdrop-blur-md shadow-xl"
            >
              <CardContent className="p-6">
                <p className="mb-4 text-sm font-medium text-zinc-300">Cotización rápida</p>

                <div className="grid grid-cols-1 gap-4">
                  {/* Tipo de servicio */}
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <Shield className="h-4 w-4 text-zinc-400" />
                    <select
                      className="w-full bg-transparent text-sm outline-none"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as ServiceType)}
                    >
                      <option className="bg-black/50">Traslado</option>
                      <option className="bg-black/50">Renta de unidad</option>
                      <option className="bg-black/50">Renta de unidad + custodio</option>
                    </select>
                  </div>

                  {/* Tipo de unidad */}
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <Car className="h-4 w-4 text-zinc-400" />
                    <select
                      className="w-full bg-transparent text-sm outline-none"
                      value={unitType}
                      onChange={(e) => setUnitType(e.target.value as UnitType)}
                    >
                      <option className="bg-black/50">Blindada</option>
                      <option className="bg-black/50">Ejecutiva</option>
                      <option className="bg-black/50">Sprinter/Vans</option>
                      <option className="bg-black/50">Lujo</option>
                    </select>
                  </div>

                  {/* Nivel (solo blindadas) */}
                  {showArmorLevel && (
                    <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
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
                  )}

                  {/* Pasajeros */}
                  <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                    <select
                      className="w-full bg-transparent text-sm outline-none"
                      value={pax}
                      onChange={(e) => setPax(e.target.value)}
                    >
                      <option className="bg-black/50">1–4</option>
                      <option className="bg-black/50">5–7</option>
                      <option className="bg-black/50">8–10</option>
                      <option className="bg-black/50">10+</option>
                    </select>
                  </div>

                  {/* Traslado: origen/destino/fecha/hora */}
                  {showTransfer && (
                    <>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <input
                          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                          placeholder="Origen (aeropuerto, hotel, ciudad)"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <input
                          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                          placeholder="Destino"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        <input
                          type="date"
                          className="w-full bg-transparent text-sm outline-none"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <input
                          type="time"
                          className="w-full bg-transparent text-sm outline-none"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Renta: ciudad/fechas/horario/zonas */}
                  {showRent && (
                    <>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <select
                          className="w-full bg-transparent text-sm outline-none"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          <option className="bg-black/50">CDMX</option>
                          <option className="bg-black/50">Monterrey</option>
                          <option className="bg-black/50">Guadalajara</option>
                          <option className="bg-black/50">Otra</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                          <Calendar className="h-4 w-4 text-zinc-400" />
                          <input
                            type="date"
                            className="w-full bg-transparent text-sm outline-none"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                          <Calendar className="h-4 w-4 text-zinc-400" />
                          <input
                            type="date"
                            className="w-full bg-transparent text-sm outline-none"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <input
                          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                          placeholder="Horario estimado (opcional) ej. 10:00–20:00"
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <MapPin className="h-4 w-4 text-zinc-400" />
                        <input
                          className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                          placeholder="Zonas / agenda (opcional) ej. Polanco, Reforma, Santa Fe"
                          value={zones}
                          onChange={(e) => setZones(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Custodia (solo renta + custodio) */}
                  {showCustody && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <UserCheck className="h-4 w-4 text-zinc-400" />
                        <select
                          className="w-full bg-transparent text-sm outline-none"
                          value={custodians}
                          onChange={(e) => setCustodians(e.target.value)}
                        >
                          <option className="bg-black/50">1</option>
                          <option className="bg-black/50">2</option>
                          <option className="bg-black/50">3+</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                        <UserCheck className="h-4 w-4 text-zinc-400" />
                        <select
                          className="w-full bg-transparent text-sm outline-none"
                          value={custodyProfile}
                          onChange={(e) => setCustodyProfile(e.target.value)}
                        >
                          <option className="bg-black/50">Discreto</option>
                          <option className="bg-black/50">Ejecutivo</option>
                          <option className="bg-black/50">Alto impacto</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <a href={reservationHref} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110">
                      <WhatsAppIcon className="mr-2 h-4 w-4" /> Solicitar cotización
                    </Button>
                  </a>

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
              <p className="mt-2 max-w-2xl text-zinc-400">
                Selecciona categoría y ajusta filtros para ver unidades disponibles.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCategory("blindada")}
                  className={`rounded-xl px-3 py-1 text-sm ${
                    category === "blindada"
                      ? "bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  Blindadas
                </button>
                <button
                  onClick={() => setCategory("blanda")}
                  className={`rounded-xl px-3 py-1 text-sm ${
                    category === "blanda"
                      ? "bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  Ejecutivas
                </button>
                <button
                  onClick={() => setCategory("van")}
                  className={`rounded-xl px-3 py-1 text-sm ${
                    category === "van"
                      ? "bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  Sprinter/Vans
                </button>
                <button
                  onClick={() => setCategory("lujo")}
                  className={`rounded-xl px-3 py-1 text-sm ${
                    category === "lujo"
                      ? "bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  Lujo
                </button>

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
                  <Shield className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Blindaje y protocolos operativos
                  según el contexto de ruta.
                </li>
                <li className="flex gap-3">
                  <UserCheck className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Personal operativo y custodia
                  con procesos de verificación.
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-[#e6e6e6]" /> Coordinación 24/7 y puntualidad
                  orientada a agenda ejecutiva.
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  Niveles: III · IV · V · V+
                </span>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  Operación discreta
                </span>
                <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                  Coordinación nacional
                </span>
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
                  Coordinamos aeropuerto, agenda ejecutiva, custodia y hospedaje de alto nivel con un
                  solo punto de contacto.
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
              Operador de transporte blindado y servicios ejecutivos. Cobertura nacional y coordinación
              internacional.
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">Servicios</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>Unidades Blindadas</li>
              <li>Unidades Ejecutivas</li>
              <li>Custodia Ejecutiva</li>
              <li>Sprinter & Vans</li>
              <li>Hospedaje de Alto Nivel</li>
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
        <WhatsAppButton className="shadow-xl shadow-[#25D366]/30">WhatsApp</WhatsAppButton>
      </div>
    </div>
  );
}
