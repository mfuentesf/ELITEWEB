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

// --- Branding dinámico (logo + imagen de hero) ---
const BRAND = {
  logoUrl: "/Elitelogo.png",
  heroImageUrl: "/SUVHERO.png",
};

// ---------------- i18n (Opción A: inline) ----------------
type Lang = "es" | "en";

const I18N = {
  es: {
    brand_tagline: "Armored SUVs • Executive Services",

    nav_services: "Servicios",
    nav_fleet: "Flota",

    hero_title_1: "Llega con calma.",
    hero_title_2: "Nosotros nos encargamos.",
    hero_subtitle: "Seguridad, lujo y puntualidad para moverte sin fricción: SUV blindadas, escoltas y alojamiento.",

    badge_1: "Puntualidad garantizada",
    badge_2: "Atención VIP",
    badge_3: "Disponibilidad 24/7",

    wizard_title: "Coordina tu servicio",
    wizard_subtitle: "Responde 3 preguntas y te cotizamos por WhatsApp.",
    step_service: "Servicio",
    step_unit: "Unidad",
    step_details: "Detalles",

    step1_q: "¿Qué necesitas hoy?",
    step1_help: "Elige lo más cercano para cotizar rápido.",

    step2_q: "¿Qué tipo de unidad?",
    step2_help: "No necesitas saber modelos: selecciona el tipo de unidad y te guiamos.",

    step3_q: "Detalles mínimos",
    step3_help_transfer: "Completa los datos mínimos para cotizar el traslado.",
    step3_help_rent: "Completa fechas y ciudad base para cotizar la disposición.",

    service_transfer: "Traslado (A → B)",
    service_day: "Renta por día (Disposición)",
    service_custody: "Renta + Custodia",

    service_transfer_desc: "Traslado ejecutivo coordinado.",
    service_day_desc: "Unidad por horas o por día.",
    service_custody_desc: "Disposición con custodia incluida.",

    unit_exec_title: "Ejecutiva",
    unit_exec_desc: "Agenda diaria y movilidad sin fricción.",
    unit_exec_hint: "Ideal para traslados y disposición.",

    unit_armored_title: "Blindada",
    unit_armored_desc: "Protección reforzada para agendas sensibles.",
    unit_armored_hint: "Selecciona nivel según contexto.",

    unit_van_title: "Sprinter/Vans",
    unit_van_desc: "Comitivas, equipaje y logística coordinada.",
    unit_van_hint: "Recomendado 8+ pasajeros.",

    unit_lux_title: "Lujo",
    unit_lux_desc: "VIP, máximo confort.",
    unit_lux_hint: "Servicio flagship.",

    armor_title: "Nivel de blindaje",
    armor_help:
      "A mayor nivel, mayor protección. Si no estás seguro, IV suele funcionar bien para agenda ejecutiva.",

    label_pax: "Pasajeros",
    pax_1_4: "1–4",
    pax_5_7: "5–7",
    pax_8_10: "8–10",
    pax_10_plus: "10+",

    label_origin: "Origen",
    ph_origin: "Aeropuerto, hotel o ciudad",
    label_destination: "Destino",
    ph_destination: "Oficina o zona",
    label_date: "Fecha",
    label_time: "Hora",

    label_city: "Ciudad base",
    city_cdmx: "CDMX",
    city_mty: "Monterrey",
    city_gdl: "Guadalajara",
    city_other: "Otra",
    label_start: "Inicio",
    label_end: "Fin",
    label_schedule: "Horario estimado (opcional)",
    ph_schedule: "Ej. 10:00–20:00",
    label_zones: "Zonas / agenda (opcional)",
    ph_zones: "Ej. Polanco, Reforma, Santa Fe",

    label_custodians: "N.º de elementos",
    label_profile: "Perfil de custodia",
    profile_exec: "Ejecutivo",
    profile_high: "Alto impacto",

    btn_back: "Atrás",
    btn_continue: "Continuar",
    btn_restart: "Reiniciar",
    btn_send_whatsapp: "Enviar por WhatsApp",
    avg_reply: "Respuesta promedio < 10 min.",
    tip_line: "Tip: si no estás seguro del nivel, elige “Blindada” + “IV” y nosotros ajustamos con base en tu agenda.",

    services_heading_kicker: "Servicios",
    services_heading_title_1: "Experiencia ejecutiva,",
    services_heading_title_2: "con estándares de seguridad",
    services_heading_desc: "Selecciona un servicio para ver el alcance exacto. Te guiamos según tu agenda.",
    pill_coverage: "Cobertura nacional",
    pill_coord: "Coordinación 24/7",
    services_card_cta: "Coordinar por WhatsApp",

    fleet_title: "Flota",
    fleet_subtitle: "Selecciona categoría y ajusta filtros para ver unidades disponibles.",
    fleet_tab_armored: "Blindadas",
    fleet_tab_exec: "Ejecutivas",
    fleet_tab_vans: "Sprinter/Vans",
    fleet_tab_lux: "Lujo",
    fleet_filter_pax: "Pasajeros",
    fleet_filter_level: "Nivel",
    fleet_no_results: "No hay unidades con esos filtros. Ajusta los criterios.",
    fleet_available: "Disponible hoy",
    fleet_quote: "Cotizar",

    footer_desc:
      "Operador de transporte blindado y servicios ejecutivos. Cobertura nacional y coordinación internacional.",
    footer_services: "Servicios",
    footer_contact: "Contacto",
    footer_legal: "Legal",
    footer_rights: "Todos los derechos reservados",

    // WhatsApp default copy
    wa_default: "Hola, me interesa una cotización. ¿Me apoyas, por favor?",
    wa_quote_prefix: "Hola, me interesa",
    wa_quote_suffix: "¿Podemos coordinar una cotización?",
    wa_reservation_title: "Hola, me interesa una cotización:",
    wa_service_type: "Tipo de servicio",
    wa_unit_type: "Tipo de unidad",
    wa_passengers: "Pasajeros",
    wa_origin: "Origen",
    wa_destination: "Destino",
    wa_date: "Fecha",
    wa_time: "Hora",
    wa_city: "Ciudad base",
    wa_start: "Inicio",
    wa_end: "Fin",
    wa_schedule: "Horario estimado",
    wa_zones: "Zonas/agenda",
    wa_custody: "Custodia",
  },

  en: {
    brand_tagline: "Armored SUVs • Executive Services",

    nav_services: "Services",
    nav_fleet: "Fleet",

    hero_title_1: "Arrive calm.",
    hero_title_2: "We handle the rest.",
    hero_subtitle: "Security, luxury and punctuality to move seamlessly: armored SUVs, executive protection and lodging.",

    badge_1: "On-time guarantee",
    badge_2: "VIP attention",
    badge_3: "24/7 availability",

    wizard_title: "Coordinate your service",
    wizard_subtitle: "Answer 3 questions and we’ll quote via WhatsApp.",
    step_service: "Service",
    step_unit: "Vehicle",
    step_details: "Details",

    step1_q: "What do you need today?",
    step1_help: "Choose the closest option for a quick quote.",

    step2_q: "What type of vehicle?",
    step2_help: "No need to know models: select the vehicle type and we’ll guide you.",

    step3_q: "Minimum details",
    step3_help_transfer: "Fill in the minimum details to quote your transfer.",
    step3_help_rent: "Fill in dates and base city to quote the service.",

    service_transfer: "Transfer (A → B)",
    service_day: "Daily hire (On call)",
    service_custody: "Hire + Protection",

    service_transfer_desc: "Coordinated executive transfer.",
    service_day_desc: "Vehicle by hours or per day.",
    service_custody_desc: "On-call service with protection included.",

    unit_exec_title: "Executive",
    unit_exec_desc: "Daily agenda and seamless mobility.",
    unit_exec_hint: "Ideal for transfers and on-call service.",

    unit_armored_title: "Armored",
    unit_armored_desc: "Enhanced protection for sensitive schedules.",
    unit_armored_hint: "Select level based on context.",

    unit_van_title: "Sprinter/Vans",
    unit_van_desc: "Groups, luggage and coordinated logistics.",
    unit_van_hint: "Recommended for 8+ passengers.",

    unit_lux_title: "Luxury",
    unit_lux_desc: "VIP, maximum comfort.",
    unit_lux_hint: "Flagship service.",

    armor_title: "Armor level",
    armor_help: "Higher level means higher protection. If unsure, Level IV is a solid baseline for executive itineraries.",

    label_pax: "Passengers",
    pax_1_4: "1–4",
    pax_5_7: "5–7",
    pax_8_10: "8–10",
    pax_10_plus: "10+",

    label_origin: "Origin",
    ph_origin: "Airport, hotel, or city",
    label_destination: "Destination",
    ph_destination: "Office or area",
    label_date: "Date",
    label_time: "Time",

    label_city: "Base city",
    city_cdmx: "Mexico City",
    city_mty: "Monterrey",
    city_gdl: "Guadalajara",
    city_other: "Other",
    label_start: "Start",
    label_end: "End",
    label_schedule: "Estimated schedule (optional)",
    ph_schedule: "E.g. 10:00–20:00",
    label_zones: "Areas / itinerary (optional)",
    ph_zones: "E.g. Polanco, Reforma, Santa Fe",

    label_custodians: "No. of agents",
    label_profile: "Protection profile",
    profile_exec: "Executive",
    profile_high: "High-risk",

    btn_back: "Back",
    btn_continue: "Continue",
    btn_restart: "Restart",
    btn_send_whatsapp: "Send via WhatsApp",
    avg_reply: "Avg response < 10 min.",
    tip_line: 'Tip: if unsure, choose “Armored” + “IV” and we’ll adjust based on your itinerary.',

    services_heading_kicker: "Services",
    services_heading_title_1: "Executive experience,",
    services_heading_title_2: "with security standards",
    services_heading_desc: "Select a service to see the exact scope. We’ll guide you based on your agenda.",
    pill_coverage: "Nationwide coverage",
    pill_coord: "24/7 coordination",
    services_card_cta: "Coordinate via WhatsApp",

    fleet_title: "Fleet",
    fleet_subtitle: "Select category and adjust filters to view available vehicles.",
    fleet_tab_armored: "Armored",
    fleet_tab_exec: "Executive",
    fleet_tab_vans: "Sprinter/Vans",
    fleet_tab_lux: "Luxury",
    fleet_filter_pax: "Passengers",
    fleet_filter_level: "Level",
    fleet_no_results: "No vehicles match these filters. Adjust the criteria.",
    fleet_available: "Available today",
    fleet_quote: "Quote",

    footer_desc:
      "Armored transportation operator and executive services. Nationwide coverage and international coordination.",
    footer_services: "Services",
    footer_contact: "Contact",
    footer_legal: "Legal",
    footer_rights: "All rights reserved",

    wa_default: "Hi, I’d like a quote. Can you help me, please?",
    wa_quote_prefix: "Hi, I’m interested in",
    wa_quote_suffix: "Can we coordinate a quote?",
    wa_reservation_title: "Hi, I’d like a quote:",
    wa_service_type: "Service type",
    wa_unit_type: "Vehicle type",
    wa_passengers: "Passengers",
    wa_origin: "Origin",
    wa_destination: "Destination",
    wa_date: "Date",
    wa_time: "Time",
    wa_city: "Base city",
    wa_start: "Start",
    wa_end: "End",
    wa_schedule: "Estimated schedule",
    wa_zones: "Areas/itinerary",
    wa_custody: "Protection",
  },
} as const;

type I18nKey = keyof typeof I18N.es;
const tt = (lang: Lang, key: I18nKey) => I18N[lang][key] ?? I18N.es[key];

// --- WhatsApp icon ---
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
> = ({ number = WHATSAPP_NUMBER, message = I18N.es.wa_default, className = "", children, ...btnProps }) => {
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
}> = ({ number = WHATSAPP_NUMBER, message = I18N.es.wa_default, className = "" }) => {
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

// ---------------- Data (bilingüe) ----------------
type FleetCategory = "blindada" | "blanda" | "van" | "lujo";
type ArmorLevel = "III" | "IV" | "V" | "V+";

type Bilingual<T> = { es: T; en: T };

const services: Array<{
  title: Bilingual<string>;
  kicker: Bilingual<string>;
  desc: Bilingual<string>;
  icon: React.ElementType;
  bullets: Bilingual<string[]>;
  highlights: Bilingual<string[]>;
  visual: { img: string; caption: Bilingual<string> };
}> = [
  {
    title: { es: "Unidades Blindadas", en: "Armored Units" },
    kicker: { es: "Protección + confort premium", en: "Protection + premium comfort" },
    desc: {
      es: "Blindaje de alto nivel con confort premium y ejecución impecable para agendas sensibles y traslados ejecutivos.",
      en: "High-level protection with premium comfort and flawless execution for sensitive schedules and executive transfers.",
    },
    icon: Shield,
    bullets: {
      es: ["Niveles III / IV / V / V+ según contexto", "Planeación operativa", "Privacidad y confort premium a bordo"],
      en: ["Levels III / IV / V / V+ depending on context", "Operational planning", "Privacy and premium comfort onboard"],
    },
    highlights: {
      es: ["Confidencialidad", "Coordinación 24/7", "Cobertura nacional"],
      en: ["Confidentiality", "24/7 coordination", "Nationwide coverage"],
    },
    visual: {
      img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
      caption: { es: "Blindaje + experiencia ejecutiva", en: "Armor + executive experience" },
    },
  },
  {
    title: { es: "Unidades Ejecutivas", en: "Executive Units" },
    kicker: { es: "Movilidad ejecutiva sin fricción", en: "Seamless executive mobility" },
    desc: {
      es: "SUVs premium para agenda ejecutiva: puntualidad, confort y una experiencia fluida en cada traslado.",
      en: "Premium SUVs for executive itineraries: punctuality, comfort, and a smooth experience on every ride.",
    },
    icon: Car,
    bullets: {
      es: ["Interiores ejecutivos y máximo confort", "Planeación operativa", "Conectividad a bordo (carga y uso de dispositivos)"],
      en: ["Executive interiors and maximum comfort", "Operational planning", "Onboard connectivity (charging and device use)"],
    },
    highlights: {
      es: ["Puntualidad", "Confort premium", "Atención VIP"],
      en: ["On-time", "Premium comfort", "VIP attention"],
    },
    visual: {
      img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
      caption: { es: "Interior premium y conectividad", en: "Premium interior and connectivity" },
    },
  },
  {
    title: { es: "Custodia Ejecutiva", en: "Executive Protection" },
    kicker: { es: "Acompañamiento profesional", en: "Professional coverage" },
    desc: {
      es: "Acompañamiento profesional con planeación previa y ejecución sobria, adaptada al nivel de exposición del evento.",
      en: "Professional coverage with prior planning and discreet execution tailored to the exposure level of the event.",
    },
    icon: UserCheck,
    bullets: {
      es: ["Perfil ejecutivo o de alto impacto", "Planeación operativa", "Coordinación con agenda", "Elementos verificados y comunicación operativa"],
      en: ["Executive or high-risk profile", "Operational planning", "Agenda coordination", "Verified personnel and operational comms"],
    },
    highlights: {
      es: ["Perfiles por contexto", "Procesos de verificación", "Operación sobria"],
      en: ["Context-based profiles", "Verification process", "Discreet operation"],
    },
    visual: {
      img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
      caption: { es: "Coordinación y presencia profesional", en: "Coordination and professional presence" },
    },
  },
  {
    title: { es: "Sprinter & Vans", en: "Sprinter & Vans" },
    kicker: { es: "Comitivas y logística", en: "Groups and logistics" },
    desc: {
      es: "Movilidad para comitivas y eventos: espacio, confort y logística coordinada para que tu grupo llegue junto y a tiempo.",
      en: "Mobility for groups and events: space, comfort, and coordinated logistics so your team arrives together and on time.",
    },
    icon: Crown,
    bullets: {
      es: ["Configuración para 8–15 pasajeros", "Espacio para equipaje y comodidad", "Aeropuerto / eventos / roadshows", "Coordinación de pickups y horarios"],
      en: ["8–15 passenger configurations", "Luggage space and comfort", "Airport / events / roadshows", "Coordinated pickups and timing"],
    },
    highlights: {
      es: ["8–15 pasajeros", "Equipaje", "Pickups coordinados"],
      en: ["8–15 passengers", "Luggage", "Coordinated pickups"],
    },
    visual: {
      img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop",
      caption: { es: "Espacio y logística coordinada", en: "Space and coordinated logistics" },
    },
  },
  {
    title: { es: "Alojamientos de Alto Nivel", en: "High-End Lodging" },
    kicker: { es: "Privacidad + ubicación + servicio", en: "Privacy + location + service" },
    desc: {
      es: "Alojamientos para itinerarios exigentes: villas privadas y hotelería 5★ seleccionada por privacidad, ubicación y servicio.",
      en: "Lodging for demanding itineraries: private villas and 5★ hotels selected for privacy, location, and service.",
    },
    icon: Hotel,
    bullets: {
      es: ["Villas privadas u hotelería 5★", "Selección según ubicación y necesidades", "Privacidad y coordinación de accesos", "Coordinación de reservación y logística"],
      en: ["Private villas or 5★ hotels", "Selection based on location and needs", "Privacy and access coordination", "Reservation and logistics coordination"],
    },
    highlights: {
      es: ["Selección a medida", "Privacidad", "Accesos coordinados"],
      en: ["Tailored selection", "Privacy", "Coordinated access"],
    },
    visual: {
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
      caption: { es: "Alojamientos con estándar ejecutivo", en: "Executive-standard lodging" },
    },
  },
];

const fleetData: Array<{
  name: Bilingual<string>;
  category: FleetCategory;
  level: ArmorLevel | null;
  seats: number;
  img: string;
  tags: Bilingual<string[]>;
}> = [
  {
    name: { es: "Chevrolet Suburban Blindada", en: "Chevrolet Suburban (Armored)" },
    category: "blindada",
    level: "III",
    seats: 7,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Nivel III", "Hasta 7 pax", "Interior ejecutivo"],
      en: ["Level III", "Up to 7 pax", "Executive interior"],
    },
  },
  {
    name: { es: "SUV Blindada Nivel IV", en: "Armored SUV (Level IV)" },
    category: "blindada",
    level: "IV",
    seats: 5,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Nivel IV", "Perfil ejecutivo", "Clima trizona"],
      en: ["Level IV", "Executive profile", "Tri-zone climate"],
    },
  },
  {
    name: { es: "Mercedes-Benz Sprinter Ejecutiva", en: "Mercedes-Benz Sprinter (Executive)" },
    category: "van",
    level: null,
    seats: 10,
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Asientos capitán", "Tomacorrientes", "Luces ambiente"],
      en: ["Captain seats", "Power outlets", "Ambient lighting"],
    },
  },
  {
    name: { es: "Toyota Hiace Ejecutiva", en: "Toyota Hiace (Executive)" },
    category: "van",
    level: null,
    seats: 12,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Comitiva", "Espacio para equipaje", "Logística coordinada"],
      en: ["Group", "Luggage space", "Coordinated logistics"],
    },
  },
  {
    name: { es: "Chevrolet Suburban Ejecutiva", en: "Chevrolet Suburban (Executive)" },
    category: "blanda",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Hasta 7 pax", "Interior premium", "Conectividad"],
      en: ["Up to 7 pax", "Premium interior", "Connectivity"],
    },
  },
  {
    name: { es: "Escalade V (Flagship)", en: "Escalade V (Flagship)" },
    category: "lujo",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    tags: {
      es: ["Flagship", "Máximo confort", "VIP"],
      en: ["Flagship", "Maximum comfort", "VIP"],
    },
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
  lang: Lang;
  category: FleetCategory;
  seats: string;
  level: string; // "all" | ArmorLevel
}

function FleetGrid({ lang, category, seats, level }: FleetGridProps) {
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
        {tt(lang, "fleet_no_results")}
      </div>
    );
  }

  const defaultWA = tt(lang, "wa_default");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {filtered.map((f) => {
        const waMessage = `${tt(lang, "wa_quote_prefix")} ${f.name[lang]}. ${tt(lang, "wa_quote_suffix")}`;
        return (
          <motion.div
            key={f.name.es}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/50"
          >
            <div className="relative">
              <img src={f.img} alt={f.name[lang]} className="h-48 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {f.level && (
                <span className="absolute left-3 top-3 rounded-full border border-[#e6e6e6]/30 bg-black/60 px-2 py-0.5 text-xs text-zinc-200">
                  Level {f.level}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-medium bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
                {f.name[lang]}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                <span className="rounded-full border border-zinc-700 px-2 py-1">{f.seats} pax</span>
                {f.tags?.[lang]?.map((t) => (
                  <span key={t} className="rounded-full border border-zinc-700 px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-zinc-400">{tt(lang, "fleet_available")}</p>
                <WhatsAppButton size="sm" message={waMessage || defaultWA}>
                  {tt(lang, "fleet_quote")}
                </WhatsAppButton>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ServicesTabs({ lang }: { lang: Lang }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const active = services[currentIndex];
  const ActivePanelIcon = active.icon as React.ElementType;

  // --- Tabs row (móvil) ---
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // --- Cards carousel (móvil) ---
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const isMobile = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  const updateTabArrows = () => {
    const el = tabsRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < maxScroll - 8);
  };

  const scrollTabs = (dir: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.82);
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const scrollToTab = (index: number) => {
    const el = tabsRef.current;
    if (!el) return;
    const tab = el.querySelector<HTMLButtonElement>(`button[data-tab-index="${index}"]`);
    tab?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const selectService = (index: number) => {
    setCurrentIndex(index);
    if (isMobile()) {
      scrollToCard(index);
      scrollToTab(index);
    }
  };

  // Mantener arrows de tabs actualizados
  useEffect(() => {
    updateTabArrows();
    const el = tabsRef.current;
    if (!el) return;

    const onScroll = () => updateTabArrows();
    el.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => updateTabArrows();
    window.addEventListener("resize", onResize);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Detectar card activa cuando el usuario hace swipe (móvil)
  useEffect(() => {
    if (!isMobile()) return;

    const root = cardsRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!best) return;

        const idx = Number((best.target as HTMLElement).dataset.cardIndex);
        if (!Number.isNaN(idx)) {
          setCurrentIndex(idx);
          scrollToTab(idx);
        }
      },
      { root, threshold: [0.55, 0.65, 0.75] }
    );

    cardRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const defaultWA = tt(lang, "wa_default");

  return (
    <div className="mx-auto max-w-7xl">
      <style jsx global>{`
        .elite-scroll::-webkit-scrollbar {
          display: none;
        }
        .elite-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{tt(lang, "services_heading_kicker")}</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            {tt(lang, "services_heading_title_1")}{" "}
            <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              {tt(lang, "services_heading_title_2")}
            </span>
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-400">{tt(lang, "services_heading_desc")}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">
            {tt(lang, "pill_coverage")}
          </span>
          <span className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300">
            {tt(lang, "pill_coord")}
          </span>
        </div>
      </div>

      {/* Pills (móvil carrusel; desktop wrap) */}
      <div className="relative">
        {/* ✅ Flechas: ocultas en móvil (como pediste) */}
        <button
          type="button"
          onClick={() => scrollTabs("left")}
          disabled={!canLeft}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
        <button
          type="button"
          onClick={() => scrollTabs("right")}
          disabled={!canRight}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        <div
          ref={tabsRef}
          className={[
            "elite-scroll flex gap-2 overflow-x-auto -mx-4 px-4",
            "snap-x snap-mandatory",
            "py-1",
            "md:mx-0 md:px-0 md:flex-wrap md:overflow-visible md:py-0",
          ].join(" ")}
        >
          {services.map((s, idx) => {
            const TabIcon = s.icon as React.ElementType;
            const isActive = idx === currentIndex;

            return (
              <button
                key={s.title.es}
                data-tab-index={idx}
                onClick={() => selectService(idx)}
                className={[
                  "snap-start shrink-0 md:shrink",
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
                  <span className="block text-[12px] md:text-[13px] font-medium">{s.title[lang]}</span>
                  <span className="block text-[10px] md:text-[11px] text-zinc-500">{s.kicker[lang]}</span>
                </span>

                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.16),transparent_70%)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE: carrusel de cards (swipe) + sincronizado */}
      <div className="mt-6 md:hidden">
        <div
          ref={cardsRef}
          className={["elite-scroll -mx-4 px-4", "flex gap-4 overflow-x-auto", "snap-x snap-mandatory"].join(" ")}
        >
          {services.map((s, idx) => {
            const Icon = s.icon as React.ElementType;

            const waMessage = `${tt(lang, "wa_quote_prefix")} ${s.title[lang]}. ${tt(lang, "wa_quote_suffix")}`;

            return (
              <div
                key={s.title.es}
                data-card-index={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="snap-start shrink-0 w-[88%] sm:w-[78%]"
              >
                <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black/40">
                  {/* bg image */}
                  <div className="absolute inset-0">
                    <img src={s.visual.img} alt={s.title[lang]} className="h-full w-full object-cover opacity-55" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25" />
                  </div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-md" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-black/60">
                          <Icon className="h-6 w-6 text-zinc-100" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{s.kicker[lang]}</p>
                        <h3 className="mt-1 text-2xl font-semibold">{s.title[lang]}</h3>
                        <p className="mt-2 text-zinc-200">{s.desc[lang]}</p>

                        {!!s.highlights?.[lang]?.length && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.highlights[lang].map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-200"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}

                        {!!s.bullets?.[lang]?.length && (
                          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-zinc-200">
                            {s.bullets[lang].map((b) => (
                              <li key={b} className="flex items-center gap-2">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-6">
                          <WhatsAppButton
                            size="lg"
                            message={waMessage || defaultWA}
                            className="w-full justify-center"
                          >
                            {tt(lang, "services_card_cta")}
                          </WhatsAppButton>
                        </div>

                        {/* indicador sutil */}
                        <div className="mt-4 flex justify-center gap-1.5">
                          {services.map((_, dot) => (
                            <span
                              key={dot}
                              className={[
                                "h-1.5 w-1.5 rounded-full",
                                dot === currentIndex ? "bg-white/80" : "bg-white/25",
                              ].join(" ")}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* fade abajo para ver imagen */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP: panel clásico */}
      <div className="mt-6 hidden md:block overflow-hidden rounded-3xl border border-zinc-800 bg-black/50">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="p-6 md:col-span-3 md:p-8">
            <motion.div
              key={active.title.es}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-4"
            >
              <div className="relative">
                <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-md" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-black/60">
                  <ActivePanelIcon className="h-6 w-6 text-zinc-100" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{active.kicker[lang]}</p>
                <h3 className="mt-1 text-2xl font-semibold">{active.title[lang]}</h3>
                <p className="mt-2 text-zinc-300">{active.desc[lang]}</p>

                {!!active.highlights?.[lang]?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.highlights[lang].map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {!!active.bullets?.[lang]?.length && (
                  <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-zinc-300 md:grid-cols-2">
                    {active.bullets[lang].map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <WhatsAppButton
                    size="lg"
                    message={`${tt(lang, "wa_quote_prefix")} ${active.title[lang]}. ${tt(lang, "wa_quote_suffix")}`}
                  >
                    {tt(lang, "services_card_cta")}
                  </WhatsAppButton>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative md:col-span-2">
            <div className="absolute inset-0">
              <img src={active.visual.img} alt={active.title[lang]} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="relative h-full p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {active.visual.caption[lang]}
              </div>

              <div className="mt-auto hidden h-full items-end md:flex">
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-zinc-200 backdrop-blur">
                  {lang === "es"
                    ? "Recomendación: si no estás seguro, elegimos el nivel y configuración según tu agenda."
                    : "Recommendation: if you’re unsure, we’ll choose the level and setup based on your itinerary."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- Wizard ----------------
type ServiceType = "Traslado (A → B)" | "Renta por día (Disposición)" | "Renta + Custodia";
type UnitType = "Ejecutiva" | "Blindada" | "Sprinter/Vans" | "Lujo";

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
  // idioma (detecta navegador y guarda preferencia)
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("elite_lang") as Lang | null) : null;
    if (saved === "es" || saved === "en") {
      setLang(saved);
      return;
    }

    const nav = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "es";
    const next: Lang = nav.startsWith("en") ? "en" : "es";
    setLang(next);
    localStorage.setItem("elite_lang", next);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      localStorage.setItem("elite_lang", next);
      return next;
    });
  };

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

  const step3Help = isTransfer ? tt(lang, "step3_help_transfer") : tt(lang, "step3_help_rent");

  const serviceOptions = useMemo(() => {
    const map: Record<ServiceType, { label: string; desc: string }> = {
      "Traslado (A → B)": { label: tt(lang, "service_transfer"), desc: tt(lang, "service_transfer_desc") },
      "Renta por día (Disposición)": { label: tt(lang, "service_day"), desc: tt(lang, "service_day_desc") },
      "Renta + Custodia": { label: tt(lang, "service_custody"), desc: tt(lang, "service_custody_desc") },
    };
    return map;
  }, [lang]);

  const unitCards = useMemo(() => {
    const cards: Array<{
      key: UnitType;
      title: string;
      desc: string;
      icon: React.ElementType;
      hint: string;
    }> = [
      { key: "Ejecutiva", title: tt(lang, "unit_exec_title"), desc: tt(lang, "unit_exec_desc"), icon: Car, hint: tt(lang, "unit_exec_hint") },
      { key: "Blindada", title: tt(lang, "unit_armored_title"), desc: tt(lang, "unit_armored_desc"), icon: Shield, hint: tt(lang, "unit_armored_hint") },
      { key: "Sprinter/Vans", title: tt(lang, "unit_van_title"), desc: tt(lang, "unit_van_desc"), icon: Crown, hint: tt(lang, "unit_van_hint") },
      { key: "Lujo", title: tt(lang, "unit_lux_title"), desc: tt(lang, "unit_lux_desc"), icon: Crown, hint: tt(lang, "unit_lux_hint") },
    ];
    return cards;
  }, [lang]);

  const paxLabels = useMemo(() => {
    return {
      "1–4": tt(lang, "pax_1_4"),
      "5–7": tt(lang, "pax_5_7"),
      "8–10": tt(lang, "pax_8_10"),
      "10+": tt(lang, "pax_10_plus"),
    };
  }, [lang]);

  // Mensaje WhatsApp del wizard
  const reservationMessage = useMemo(() => {
    const serviceLabel = serviceOptions[serviceType]?.label ?? serviceType;

    const unitLabelMap: Record<UnitType, string> = {
      "Ejecutiva": tt(lang, "unit_exec_title"),
      "Blindada": tt(lang, "unit_armored_title"),
      "Sprinter/Vans": tt(lang, "unit_van_title"),
      "Lujo": tt(lang, "unit_lux_title"),
    };
    const unitLabel = unitLabelMap[unitType] ?? unitType;

    const paxShown = paxLabels[pax as keyof typeof paxLabels] ?? pax;

    const fmtDate = (d: string) => {
      try {
        return new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "es-MX");
      } catch {
        return d;
      }
    };

    const lines: Array<string | null> = [
      tt(lang, "wa_reservation_title"),
      `• ${tt(lang, "wa_service_type")}: ${serviceLabel}`,
      `• ${tt(lang, "wa_unit_type")}: ${unitLabel}${isArmored ? ` (Level ${armorLevel})` : ""}`,
      `• ${tt(lang, "wa_passengers")}: ${paxShown}`,

      isTransfer ? `• ${tt(lang, "wa_origin")}: ${origin || "—"}` : null,
      isTransfer ? `• ${tt(lang, "wa_destination")}: ${destination || "—"}` : null,
      isTransfer && date ? `• ${tt(lang, "wa_date")}: ${fmtDate(date)}` : null,
      isTransfer && time ? `• ${tt(lang, "wa_time")}: ${time}` : null,

      isRent ? `• ${tt(lang, "wa_city")}: ${city || "—"}` : null,
      isRent && startDate ? `• ${tt(lang, "wa_start")}: ${fmtDate(startDate)}` : null,
      isRent && endDate ? `• ${tt(lang, "wa_end")}: ${fmtDate(endDate)}` : null,
      isRent && schedule ? `• ${tt(lang, "wa_schedule")}: ${schedule}` : null,
      isRent && zones ? `• ${tt(lang, "wa_zones")}: ${zones}` : null,

      isCustody ? `• ${tt(lang, "wa_custody")}: ${custodians} (${custodyProfile})` : null,
    ];

    return lines.filter(Boolean).join("\n");
  }, [
    lang,
    serviceOptions,
    paxLabels,
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

  // Footer lists (bilingüe)
  const footerServices = useMemo(() => services.map((s) => s.title[lang]), [lang]);
  const footerContactLines = useMemo(
    () =>
      lang === "es"
        ? ["CDMX · Monterrey · Guadalajara", "+52 (55) 0000 0000", "contacto@luxshield.mx"]
        : ["Mexico City · Monterrey · Guadalajara", "+52 (55) 0000 0000", "contact@luxshield.mx"],
    [lang]
  );
  const footerLegalLines = useMemo(
    () => (lang === "es" ? ["Privacidad", "Términos", "Aviso de cookies"] : ["Privacy", "Terms", "Cookie notice"]),
    [lang]
  );

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
              <p className="text-xs text-zinc-400">{tt(lang, "brand_tagline")}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex ml-auto">
            <a href="#servicios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              {tt(lang, "nav_services")}
            </a>
            <a href="#flota" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              {tt(lang, "nav_fleet")}
            </a>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className="ml-2 rounded-xl border border-zinc-700 bg-black/40 px-3 py-1 text-sm text-zinc-200 hover:border-zinc-500"
              aria-label="Cambiar idioma"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </nav>

          {/* Mobile: solo botón idioma */}
          <div className="ml-auto md:hidden">
            <button
              type="button"
              onClick={toggleLang}
              className="rounded-xl border border-zinc-700 bg-black/40 px-3 py-1 text-sm text-zinc-200 hover:border-zinc-500"
              aria-label="Cambiar idioma"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative min-h-[80vh] md:min-h-[85vh]">
        <div className="absolute inset-0">
          <img src={BRAND.heroImageUrl} alt="Unidad ejecutiva" className="h-full w-full object-cover object-center" />
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
              {tt(lang, "hero_title_1")}{" "}
              <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent drop-shadow">
                {tt(lang, "hero_title_2")}
              </span>
            </motion.h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-300 md:text-xl">{tt(lang, "hero_subtitle")}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge>{tt(lang, "badge_1")}</Badge>
              <Badge>{tt(lang, "badge_2")}</Badge>
              <Badge>{tt(lang, "badge_3")}</Badge>
            </div>
          </div>

          {/* Wizard Card */}
          <div className="relative flex-1 w-full md:col-start-2 md:row-start-1 self-start">
            <div className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />

            <Card id="cotizar" className="mt-6 md:mt-0 w-full rounded-2xl border-white/10 bg-black/50 backdrop-blur-md shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{tt(lang, "wizard_title")}</p>
                    <p className="mt-1 text-xs text-zinc-400">{tt(lang, "wizard_subtitle")}</p>
                  </div>
                  <span className="rounded-full border border-zinc-700 bg-black/40 px-2 py-1 text-[11px] text-zinc-300">
                    {step}/3
                  </span>
                </div>

                {/* Stepper */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <StepPill index={1} current={step} label={tt(lang, "step_service")} />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={2} current={step} label={tt(lang, "step_unit")} />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={3} current={step} label={tt(lang, "step_details")} />
                </div>

                {/* Content */}
                <div className="mt-5 space-y-3">
                  {step === 1 && (
                    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-zinc-300" />
                        <p className="text-sm font-medium text-zinc-200">{tt(lang, "step1_q")}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{tt(lang, "step1_help")}</p>

                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {(["Traslado (A → B)", "Renta por día (Disposición)", "Renta + Custodia"] as ServiceType[]).map((s) => {
                          const activeSel = serviceType === s;
                          const lbl = serviceOptions[s]?.label ?? s;
                          const desc = serviceOptions[s]?.desc ?? "";
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
                              <p className={`text-sm ${activeSel ? "text-white" : "text-zinc-200"}`}>{lbl}</p>
                              <p className="mt-1 text-xs text-zinc-400">{desc}</p>
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
                        <p className="text-sm font-medium text-zinc-200">{tt(lang, "step2_q")}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{tt(lang, "step2_help")}</p>

                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {unitCards.map((c) => {
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
                            <p className="text-sm font-medium text-zinc-200">{tt(lang, "armor_title")}</p>
                          </div>
                          <p className="mt-1 text-xs text-zinc-400">{tt(lang, "armor_help")}</p>

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
                        <p className="text-sm font-medium text-zinc-200">{tt(lang, "step3_q")}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{step3Help}</p>

                      {/* Pasajeros */}
                      <div className="mt-4">
                        <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_pax")}</label>
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_origin")}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={tt(lang, "ph_origin")}
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                aria-label="Origen"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_destination")}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={tt(lang, "ph_destination")}
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                aria-label="Destino"
                              />
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_date")}</label>
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
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_time")}</label>
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_city")}</label>
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
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_start")}</label>
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
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_end")}</label>
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_schedule")}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <Clock className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={tt(lang, "ph_schedule")}
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                                aria-label="Horario estimado"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_zones")}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={tt(lang, "ph_zones")}
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_custodians")}</label>
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{tt(lang, "label_profile")}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <UserCheck className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={custodyProfile}
                                onChange={(e) => setCustodyProfile(e.target.value)}
                                aria-label="Perfil de custodia"
                              >
                                <option className="bg-black/50">{tt(lang, "profile_exec")}</option>
                                <option className="bg-black/50">{tt(lang, "profile_high")}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <a href={reservationHref} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110">
                            <WhatsAppIcon className="mr-2 h-4 w-4" /> {tt(lang, "btn_send_whatsapp")}
                          </Button>
                        </a>
                        <p className="mt-2 text-center text-xs text-zinc-400">{tt(lang, "avg_reply")}</p>
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
                      {tt(lang, "btn_back")}
                    </Button>

                    {step < 3 ? (
                      <Button
                        className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                        onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))}
                        disabled={!canNext}
                      >
                        {tt(lang, "btn_continue")} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                        onClick={() => setStep(1)}
                      >
                        {tt(lang, "btn_restart")}
                      </Button>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500">{tt(lang, "tip_line")}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <Section id="servicios" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <ServicesTabs lang={lang} />
        </div>
      </Section>

      {/* Flota */}
      <Section id="flota" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{tt(lang, "fleet_title")}</h2>
              <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#e6e6e6] to-transparent" />
              <p className="mt-2 max-w-2xl text-zinc-400">{tt(lang, "fleet_subtitle")}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ["blindada", tt(lang, "fleet_tab_armored")],
                    ["blanda", tt(lang, "fleet_tab_exec")],
                    ["van", tt(lang, "fleet_tab_vans")],
                    ["lujo", tt(lang, "fleet_tab_lux")],
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
                  <option value="all">{tt(lang, "fleet_filter_pax")}</option>
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
                    <option value="all">{tt(lang, "fleet_filter_level")}</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="V+">V+</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <FleetGrid lang={lang} category={category} seats={seats} level={level} />
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
            <p className="text-sm text-zinc-400">{tt(lang, "footer_desc")}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{tt(lang, "footer_services")}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {footerServices.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{tt(lang, "footer_contact")}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {footerContactLines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{tt(lang, "footer_legal")}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {footerLegalLines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} ELITE Transport · {tt(lang, "footer_rights")}
        </div>
      </footer>

      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5 z-50">
        <FloatingWhatsAppButton message={tt(lang, "wa_default")} />
      </div>
    </div>
  );
}
