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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
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

// ---------------- i18n simple (landing) ----------------
type Lang = "es" | "en";

const DICT = {
  es: {
    brand: {
      name: "ELITE",
      tagline: "Armored SUVs • Executive Services",
    },
    nav: {
      services: "Servicios",
      fleet: "Flota",
    },
    hero: {
      h1a: "Llega con calma.",
      h1b: "Nosotros nos encargamos.",
      sub: "Seguridad, lujo y puntualidad para moverte sin fricción: SUV blindadas, escoltas y alojamiento.",
      badges: ["Puntualidad garantizada", "Atención VIP", "Disponibilidad 24/7"],
    },
    wizard: {
      title: "Coordina tu servicio",
      subtitle: "Responde 3 preguntas y te cotizamos por WhatsApp.",
      tip: "Tip: si no estás seguro del nivel, elige “Blindada” + “IV” y nosotros ajustamos con base en tu agenda.",
      steps: ["Servicio", "Unidad", "Detalles"],
      step1Title: "¿Qué necesitas hoy?",
      step1Help: "Elige lo más cercano para cotizar rápido.",
      step2Title: "¿Qué tipo de unidad?",
      step2Help: "No necesitas saber modelos: selecciona el tipo de unidad y te guiamos.",
      step3Title: "Detalles mínimos",
      transferHelp: "Completa los datos mínimos para cotizar el traslado.",
      rentHelp: "Completa fechas y ciudad base para cotizar la disposición.",
      serviceTypes: [
        { key: "Traslado (A → B)", desc: "Traslado ejecutivo coordinado." },
        { key: "Renta por día (Disposición)", desc: "Unidad por horas o por día." },
        { key: "Renta + Custodia", desc: "Disposición con custodia incluida." },
      ],
      unitCards: [
        {
          key: "Ejecutiva",
          title: "Ejecutiva",
          desc: "Agenda diaria y movilidad sin fricción.",
          hint: "Ideal para traslados y disposición.",
        },
        {
          key: "Blindada",
          title: "Blindada",
          desc: "Protección reforzada para agendas sensibles.",
          hint: "Selecciona nivel según contexto.",
        },
        {
          key: "Sprinter/Vans",
          title: "Sprinter/Vans",
          desc: "Comitivas, equipaje y logística coordinada.",
          hint: "Recomendado 8+ pasajeros.",
        },
        { key: "Lujo", title: "Lujo", desc: "VIP, máximo confort.", hint: "Servicio flagship." },
      ],
      armorTitle: "Nivel de blindaje",
      armorHelp:
        "A mayor nivel, mayor protección. Si no estás seguro, IV suele funcionar bien para agenda ejecutiva.",
      paxLabel: "Pasajeros",
      origin: "Origen",
      destination: "Destino",
      date: "Fecha",
      time: "Hora",
      cityBase: "Ciudad base",
      start: "Inicio",
      end: "Fin",
      schedule: "Horario estimado (opcional)",
      zones: "Zonas / agenda (opcional)",
      custodians: "N.º de elementos",
      custodyProfile: "Perfil de custodia",
      sendWA: "Enviar por WhatsApp",
      avgReply: "Respuesta promedio < 10 min.",
      back: "Atrás",
      next: "Continuar",
      restart: "Reiniciar",
      placeholders: {
        origin: "Aeropuerto, hotel o ciudad",
        destination: "Oficina o zona",
        schedule: "Ej. 10:00–20:00",
        zones: "Ej. Polanco, Reforma, Santa Fe",
      },
      paxOptions: ["1–4", "5–7", "8–10", "10+"],
      cityOptions: ["CDMX", "Monterrey", "Guadalajara", "Otra"],
      custodyProfiles: ["Ejecutivo", "Alto impacto"],
      waLinesIntro: "Hola, me interesa una cotización:",
      wa: {
        serviceType: "• Tipo de servicio:",
        unitType: "• Tipo de unidad:",
        armoredLevel: "Nivel",
        passengers: "• Pasajeros:",
        from: "• Origen:",
        to: "• Destino:",
        date: "• Fecha:",
        time: "• Hora:",
        baseCity: "• Ciudad base:",
        start: "• Inicio:",
        end: "• Fin:",
        schedule: "• Horario estimado:",
        zones: "• Zonas/agenda:",
        custody: "• Custodia:",
      },
    },
    services: {
      label: "Servicios",
      titleA: "Experiencia ejecutiva,",
      titleB: "con estándares de seguridad",
      sub: "Selecciona un servicio para ver el alcance exacto. Te guiamos según tu agenda.",
      chips: ["Cobertura nacional", "Coordinación 24/7"],
      waCTA: "Coordinar por WhatsApp",
      recommend: "Recomendación: si no estás seguro, elegimos el nivel y configuración según tu agenda.",
      items: [
        {
          title: "Unidades Blindadas",
          kicker: "Protección + confort premium",
          desc: "Blindaje de alto nivel con confort premium y ejecución impecable para agendas sensibles y traslados ejecutivos.",
          bullets: [
            "Niveles III / IV / V / V+ según contexto",
            "Planeación operativa",
            "Privacidad y confort premium a bordo",
          ],
          highlights: ["Confidencialidad", "Coordinación 24/7", "Cobertura nacional"],
          visual: {
            img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
            caption: "Blindaje + experiencia ejecutiva",
          },
          icon: Shield,
        },
        {
          title: "Unidades Ejecutivas",
          kicker: "Movilidad ejecutiva sin fricción",
          desc: "SUVs premium para agenda ejecutiva: puntualidad, confort y una experiencia fluida en cada traslado.",
          bullets: [
            "Interiores ejecutivos y máximo confort",
            "Planeación operativa",
            "Conectividad a bordo (carga y uso de dispositivos)",
          ],
          highlights: ["Puntualidad", "Confort premium", "Atención VIP"],
          visual: {
            img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
            caption: "Interior premium y conectividad",
          },
          icon: Car,
        },
        {
          title: "Custodia Ejecutiva",
          kicker: "Acompañamiento profesional",
          desc: "Acompañamiento profesional con planeación previa y ejecución sobria, adaptada al nivel de exposición del evento.",
          bullets: [
            "Perfil ejecutivo o de alto impacto",
            "Planeación operativa",
            "Coordinación con agenda",
            "Elementos verificados y comunicación operativa",
          ],
          highlights: ["Perfiles por contexto", "Procesos de verificación", "Operación sobria"],
          visual: {
            img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
            caption: "Coordinación y presencia profesional",
          },
          icon: UserCheck,
        },
        {
          title: "Sprinter & Vans",
          kicker: "Comitivas y logística",
          desc: "Movilidad para comitivas y eventos: espacio, confort y logística coordinada para que tu grupo llegue junto y a tiempo.",
          bullets: [
            "Configuración para 8–15 pasajeros",
            "Espacio para equipaje y comodidad",
            "Aeropuerto / eventos / roadshows",
            "Coordinación de pickups y horarios",
          ],
          highlights: ["8–15 pasajeros", "Equipaje", "Pickups coordinados"],
          visual: {
            img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop",
            caption: "Espacio y logística coordinada",
          },
          icon: Crown,
        },
        {
          title: "Alojamientos de Alto Nivel",
          kicker: "Privacidad + ubicación + servicio",
          desc: "Alojamientos para itinerarios exigentes: villas privadas y hotelería 5★ seleccionada por privacidad, ubicación y servicio.",
          bullets: [
            "Villas privadas u hotelería 5★",
            "Selección según ubicación y necesidades",
            "Privacidad y coordinación de accesos",
            "Coordinación de reservación y logística",
          ],
          highlights: ["Selección a medida", "Privacidad", "Accesos coordinados"],
          visual: {
            img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
            caption: "Alojamientos con estándar ejecutivo",
          },
          icon: Hotel,
        },
      ],
    },
    fleet: {
      title: "Flota",
      sub: "Selecciona categoría y ajusta filtros para ver unidades disponibles.",
      tabs: {
        blindada: "Blindadas",
        blanda: "Ejecutivas",
        van: "Sprinter/Vans",
        lujo: "Lujo",
      },
      filters: {
        passengers: "Pasajeros",
        level: "Nivel",
      },
      empty: "No hay unidades con esos filtros. Ajusta los criterios.",
      available: "Disponible hoy",
      quote: "Cotizar",
      waTemplate: (name: string) => `Hola, me interesa ${name}. ¿Podemos coordinar una cotización?`,
      items: [
        { name: "Chevrolet Suburban Blindada", tags: ["Nivel III", "Hasta 7 pax", "Interior ejecutivo"] },
        { name: "SUV Blindada Nivel IV", tags: ["Nivel IV", "Perfil ejecutivo", "Clima trizona"] },
        { name: "Mercedes-Benz Sprinter Ejecutiva", tags: ["Asientos capitán", "Tomacorrientes", "Luces ambiente"] },
        { name: "Toyota Hiace Ejecutiva", tags: ["Comitiva", "Espacio para equipaje", "Logística coordinada"] },
        { name: "Chevrolet Suburban Ejecutiva", tags: ["Hasta 7 pax", "Interior premium", "Conectividad"] },
        { name: "Escalade V (Flagship)", tags: ["Flagship", "Máximo confort", "VIP"] },
      ],
    },
    footer: {
      about: "Operador de transporte blindado y servicios ejecutivos. Cobertura nacional y coordinación internacional.",
      colServices: "Servicios",
      colContact: "Contacto",
      colLegal: "Legal",
      servicesList: ["Unidades Blindadas", "Unidades Ejecutivas", "Protección Ejecutiva", "Sprinter & Vans", "Alojamientos de Alto Nivel"],
      contactList: ["CDMX · Monterrey · Guadalajara", "+52 (55) 0000 0000", "contacto@luxshield.mx"],
      legalList: ["Privacidad", "Términos", "Aviso de cookies"],
      rights: "Todos los derechos reservados",
    },
    lang: {
      es: "ES",
      en: "EN",
      aria: "Cambiar idioma",
    },
  },

  en: {
    brand: {
      name: "ELITE",
      tagline: "Armored SUVs • Executive Services",
    },
    nav: {
      services: "Services",
      fleet: "Fleet",
    },
    hero: {
      h1a: "Arrive at ease.",
      h1b: "We handle the rest.",
      sub: "Luxury, protection, and precision—armored SUVs, executive security, and high-end accommodations.",
      badges: ["On-time, every time", "VIP concierge support", "24/7 coordination"],
    },
    wizard: {
      title: "Arrange your service",
      subtitle: "Answer 3 questions—we’ll quote via WhatsApp.",
      tip: "Tip: if you’re unsure, choose “Armored” + “Level IV” and we’ll refine based on your itinerary.",
      steps: ["Service", "Vehicle", "Details"],
      step1Title: "What do you need today?",
      step1Help: "Choose the closest option for a fast quote.",
      step2Title: "What vehicle type?",
      step2Help: "No need to pick a model—select a category and we’ll guide you.",
      step3Title: "Minimum details",
      transferHelp: "Provide the essentials to quote your transfer.",
      rentHelp: "Provide dates and base city to quote your day-rate service.",
      serviceTypes: [
        { key: "Traslado (A → B)", desc: "Coordinated executive transfer." },
        { key: "Renta por día (Disposición)", desc: "Hourly or daily on-call service." },
        { key: "Renta + Custodia", desc: "On-call service with security included." },
      ],
      unitCards: [
        { key: "Ejecutiva", title: "Executive", desc: "Smooth, discreet daily mobility.", hint: "Ideal for transfers and on-call." },
        { key: "Blindada", title: "Armored", desc: "Enhanced protection for sensitive itineraries.", hint: "Select a level by context." },
        { key: "Sprinter/Vans", title: "Sprinter / Vans", desc: "Teams, luggage, and coordinated logistics.", hint: "Recommended for 8+ passengers." },
        { key: "Lujo", title: "Luxury", desc: "Flagship VIP comfort.", hint: "Top-tier experience." },
      ],
      armorTitle: "Armor level",
      armorHelp: "Higher level means higher protection. If unsure, Level IV is a strong default for executive itineraries.",
      paxLabel: "Passengers",
      origin: "From",
      destination: "To",
      date: "Date",
      time: "Time",
      cityBase: "Base city",
      start: "Start",
      end: "End",
      schedule: "Estimated schedule (optional)",
      zones: "Areas / itinerary (optional)",
      custodians: "Security staff",
      custodyProfile: "Security profile",
      sendWA: "Send via WhatsApp",
      avgReply: "Typical reply < 10 min.",
      back: "Back",
      next: "Continue",
      restart: "Restart",
      placeholders: {
        origin: "Airport, hotel, or city",
        destination: "Office or area",
        schedule: "e.g., 10:00–20:00",
        zones: "e.g., Polanco, Reforma, Santa Fe",
      },
      paxOptions: ["1–4", "5–7", "8–10", "10+"],
      cityOptions: ["Mexico City", "Monterrey", "Guadalajara", "Other"],
      custodyProfiles: ["Executive", "High-profile"],
      waLinesIntro: "Hello, I’d like a quote:",
      wa: {
        serviceType: "• Service:",
        unitType: "• Vehicle type:",
        armoredLevel: "Level",
        passengers: "• Passengers:",
        from: "• From:",
        to: "• To:",
        date: "• Date:",
        time: "• Time:",
        baseCity: "• Base city:",
        start: "• Start:",
        end: "• End:",
        schedule: "• Estimated schedule:",
        zones: "• Areas/itinerary:",
        custody: "• Security:",
      },
    },
    services: {
      label: "Services",
      titleA: "Executive experience,",
      titleB: "built on security standards",
      sub: "Select a service to see the exact scope. We’ll tailor it to your itinerary.",
      chips: ["Nationwide coverage", "24/7 coordination"],
      waCTA: "Arrange via WhatsApp",
      recommend: "Recommendation: if you’re unsure, we’ll select the right level and configuration for your itinerary.",
      items: [
        {
          title: "Armored SUVs",
          kicker: "Protection + premium comfort",
          desc: "High-level armored transport with premium comfort—built for sensitive itineraries and executive movement.",
          bullets: ["Levels III / IV / V / V+ by context", "Operational planning", "Privacy and premium comfort on board"],
          highlights: ["Discretion", "24/7 coordination", "Nationwide coverage"],
          visual: {
            img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
            caption: "Armor + concierge experience",
          },
          icon: Shield,
        },
        {
          title: "Executive SUVs",
          kicker: "Frictionless executive mobility",
          desc: "Premium SUVs for executive schedules—punctual, smooth, and consistently refined.",
          bullets: ["Executive interiors and maximum comfort", "Operational planning", "On-board connectivity (charging & device use)"],
          highlights: ["Punctuality", "Premium comfort", "VIP care"],
          visual: {
            img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
            caption: "Premium interior & connectivity",
          },
          icon: Car,
        },
        {
          title: "Executive Security",
          kicker: "Professional accompaniment",
          desc: "Discreet security with advance planning—adapted to event exposure and profile.",
          bullets: ["Executive or high-profile coverage", "Operational planning", "Schedule coordination", "Vetted staff & comms discipline"],
          highlights: ["Context-based profiles", "Vetting process", "Discreet execution"],
          visual: {
            img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
            caption: "Coordination & professional presence",
          },
          icon: UserCheck,
        },
        {
          title: "Sprinter & Vans",
          kicker: "Teams and logistics",
          desc: "Group mobility for events: space, comfort, and coordinated logistics—so your team arrives together, on time.",
          bullets: ["8–15 passenger configurations", "Luggage space & comfort", "Airport / events / roadshows", "Pickup and schedule coordination"],
          highlights: ["8–15 pax", "Luggage", "Coordinated pickups"],
          visual: {
            img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?q=80&w=1600&auto=format&fit=crop",
            caption: "Space & coordinated logistics",
          },
          icon: Crown,
        },
        {
          title: "High-End Stays",
          kicker: "Privacy + location + service",
          desc: "Accommodations for demanding itineraries—private villas and curated 5★ hotels selected for privacy, location, and service.",
          bullets: ["Private villas or curated 5★ hotels", "Selection by location & needs", "Privacy and access coordination", "Booking and logistics coordination"],
          highlights: ["Tailored selection", "Privacy", "Coordinated access"],
          visual: {
            img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
            caption: "Executive-grade accommodations",
          },
          icon: Hotel,
        },
      ],
    },
    fleet: {
      title: "Fleet",
      sub: "Select a category and adjust filters to view availability.",
      tabs: {
        blindada: "Armored",
        blanda: "Executive",
        van: "Sprinter/Vans",
        lujo: "Luxury",
      },
      filters: {
        passengers: "Passengers",
        level: "Level",
      },
      empty: "No vehicles match those filters. Adjust your criteria.",
      available: "Available today",
      quote: "Quote",
      waTemplate: (name: string) => `Hello, I’m interested in ${name}. Can we arrange a quote?`,
      items: [
        { name: "Armored Chevrolet Suburban", tags: ["Level III", "Up to 7 pax", "Executive interior"] },
        { name: "Armored SUV (Level IV)", tags: ["Level IV", "Executive profile", "Tri-zone climate"] },
        { name: "Mercedes-Benz Executive Sprinter", tags: ["Captain seats", "Power outlets", "Ambient lighting"] },
        { name: "Toyota Hiace Executive", tags: ["Team transport", "Luggage space", "Coordinated logistics"] },
        { name: "Executive Chevrolet Suburban", tags: ["Up to 7 pax", "Premium interior", "Connectivity"] },
        { name: "Escalade V (Flagship)", tags: ["Flagship", "Maximum comfort", "VIP"] },
      ],
    },
    footer: {
      about: "Armored transportation operator and executive services. Nationwide coverage with international coordination.",
      colServices: "Services",
      colContact: "Contact",
      colLegal: "Legal",
      servicesList: ["Armored SUVs", "Executive SUVs", "Executive Security", "Sprinter & Vans", "High-End Stays"],
      contactList: ["Mexico City · Monterrey · Guadalajara", "+52 (55) 0000 0000", "contacto@luxshield.mx"],
      legalList: ["Privacy", "Terms", "Cookie notice"],
      rights: "All rights reserved",
    },
    lang: {
      es: "ES",
      en: "EN",
      aria: "Change language",
    },
  },
} as const;

// ✅ Tipos “union” para evitar el error ES vs EN
type TServices = typeof DICT["es"]["services"] | typeof DICT["en"]["services"];
type TFleet = typeof DICT["es"]["fleet"] | typeof DICT["en"]["fleet"];

function detectBrowserLang(): Lang {
  if (typeof window === "undefined") return "es";
  const nav = (navigator.language || "es").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
}

function useLang() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("elite_lang") as Lang | null;
      if (saved === "es" || saved === "en") {
        setLang(saved);
        return;
      }
    } catch {}
    setLang(detectBrowserLang());
  }, []);

  const setAndPersist = (l: Lang) => {
    setLang(l);
    try {
      window.localStorage.setItem("elite_lang", l);
    } catch {}
  };

  return { lang, setLang: setAndPersist };
}

// --- Tipos base ---
type FleetCategory = "blindada" | "blanda" | "van" | "lujo";
type ArmorLevel = "III" | "IV" | "V" | "V+";

type ServiceType = "Traslado (A → B)" | "Renta por día (Disposición)" | "Renta + Custodia";
type UnitType = "Ejecutiva" | "Blindada" | "Sprinter/Vans" | "Lujo";

// --- Componentes auxiliares ---
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

function LangPill({
  lang,
  onChange,
  labels,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  labels: { es: string; en: string; aria: string };
}) {
  return (
    <div
      className="inline-flex items-center rounded-2xl border border-zinc-800 bg-black/40 p-1 backdrop-blur"
      role="group"
      aria-label={labels.aria}
    >
      <button
        type="button"
        onClick={() => onChange("es")}
        className={[
          "px-3 py-1.5 text-xs rounded-xl transition",
          lang === "es"
            ? "bg-white/10 text-zinc-100 border border-white/10"
            : "text-zinc-400 hover:text-zinc-200",
        ].join(" ")}
        aria-pressed={lang === "es"}
      >
        {labels.es}
      </button>
      <button
        type="button"
        onClick={() => onChange("en")}
        className={[
          "px-3 py-1.5 text-xs rounded-xl transition",
          lang === "en"
            ? "bg-white/10 text-zinc-100 border border-white/10"
            : "text-zinc-400 hover:text-zinc-200",
        ].join(" ")}
        aria-pressed={lang === "en"}
      >
        {labels.en}
      </button>
    </div>
  );
}

// --- Fleet data base (constante visual; textos se traducen abajo) ---
const fleetDataBase: Array<{
  category: FleetCategory;
  level: ArmorLevel | null;
  seats: number;
  img: string;
}> = [
  {
    category: "blindada",
    level: "III",
    seats: 7,
    img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    category: "blindada",
    level: "IV",
    seats: 5,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
  },
  {
    category: "van",
    level: null,
    seats: 10,
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1600&auto=format&fit=crop",
  },
  {
    category: "van",
    level: null,
    seats: 12,
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
  },
  {
    category: "blanda",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    category: "lujo",
    level: null,
    seats: 7,
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
  },
];

interface FleetGridProps {
  category: FleetCategory;
  seats: string;
  level: string; // "all" | ArmorLevel
  // ✅ antes era DICT["es"]["fleet"] y tronaba con EN
  tFleet: TFleet;
}

function FleetGrid({ category, seats, level, tFleet }: FleetGridProps) {
  const fleetData = useMemo(() => {
    return fleetDataBase.map((b, idx) => ({
      ...b,
      name: tFleet.items[idx]?.name ?? "Vehicle",
      tags: tFleet.items[idx]?.tags ?? [],
    }));
  }, [tFleet]);

  const filtered = useMemo(() => {
    return fleetData.filter((item) => {
      if (item.category !== category) return false;
      if (seats !== "all" && item.seats < Number(seats)) return false;
      if (category === "blindada" && level !== "all" && item.level !== (level as ArmorLevel)) return false;
      return true;
    });
  }, [category, seats, level, fleetData]);

  if (!filtered.length) {
    return (
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/50 p-6 text-zinc-400">
        {tFleet.empty}
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
                {tFleet.filters.level} {f.level}
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              {f.name}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-300">
              <span className="rounded-full border border-zinc-700 px-2 py-1">{f.seats} pax</span>
              {f.tags?.map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-700 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-zinc-400">{tFleet.available}</p>
              <WhatsAppButton size="sm" message={tFleet.waTemplate(f.name)}>
                {tFleet.quote}
              </WhatsAppButton>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ServicesTabs({
  tServices,
  lang,
}: {
  // ✅ antes era DICT["es"]["services"] y tronaba con EN
  tServices: TServices;
  lang: Lang;
}) {
  const services = tServices.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const active = services[currentIndex];
  const ActivePanelIcon = active.icon as React.ElementType;

  const tabsRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{tServices.label}</p>
          <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
            {tServices.titleA}{" "}
            <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent">
              {tServices.titleB}
            </span>
          </h2>
          <p className="mt-2 max-w-2xl text-zinc-400">{tServices.sub}</p>
        </div>

        <div className="flex items-center gap-2">
          {tServices.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-zinc-800 bg-black/50 px-3 py-1 text-xs text-zinc-300"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Pills */}
      <div className="relative">
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
                key={s.title}
                data-tab-index={idx}
                onClick={() => selectService(idx)}
                className={[
                  "snap-start shrink-0 md:shrink",
                  "min-w-[175px] sm:min-w-[205px] md:min-w-0",
                  "group relative flex items-center gap-2 rounded-2xl border px-2.5 py-2 text-sm transition md:px-4 md:py-3",
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
                  <span className="block text-[11.5px] md:text-[13px] font-medium">{s.title}</span>
                  <span className="block text-[10px] md:text-[11px] text-zinc-500">{s.kicker}</span>
                </span>

                {isActive && (
                  <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.16),transparent_70%)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE: carrusel */}
      <div className="mt-6 md:hidden">
        <div
          ref={cardsRef}
          className={["elite-scroll -mx-4 px-4", "flex gap-4 overflow-x-auto", "snap-x snap-mandatory"].join(" ")}
        >
          {services.map((s, idx) => {
            const Icon = s.icon as React.ElementType;

            return (
              <div
                key={s.title}
                data-card-index={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="snap-start shrink-0 w-[88%] sm:w-[78%]"
              >
                <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black/40">
                  <div className="absolute inset-0">
                    <img src={s.visual.img} alt={s.title} className="h-full w-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/20" />
                  </div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-md" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-black/50">
                          <Icon className="h-6 w-6 text-zinc-100" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{s.kicker}</p>
                        <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
                        <p className="mt-2 text-zinc-200">{s.desc}</p>

                        {!!s.highlights?.length && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.highlights.map((h) => (
                              <span
                                key={h}
                                className="rounded-full border border-zinc-800 bg-black/35 px-3 py-1 text-xs text-zinc-200 backdrop-blur"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        )}

                        {!!s.bullets?.length && (
                          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-zinc-200">
                            {s.bullets.map((b) => (
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
                            message={
                              lang === "es"
                                ? `Hola, me interesa ${s.title}. ¿Podemos coordinar una cotización?`
                                : `Hello, I’m interested in ${s.title}. Can we arrange a quote?`
                            }
                            className="w-full justify-center"
                          >
                            {tServices.waCTA}
                          </WhatsAppButton>
                        </div>

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

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent)]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div className="mt-6 hidden md:block overflow-hidden rounded-3xl border border-zinc-800 bg-black/50">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="p-6 md:col-span-3 md:p-8">
            <motion.div
              key={active.title}
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
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">{active.kicker}</p>
                <h3 className="mt-1 text-2xl font-semibold">{active.title}</h3>
                <p className="mt-2 text-zinc-300">{active.desc}</p>

                {!!active.highlights?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-300"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {!!active.bullets?.length && (
                  <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-zinc-300 md:grid-cols-2">
                    {active.bullets.map((b) => (
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
                    message={
                      lang === "es"
                        ? `Hola, me interesa ${active.title}. ¿Podemos coordinar una cotización?`
                        : `Hello, I’m interested in ${active.title}. Can we arrange a quote?`
                    }
                  >
                    {tServices.waCTA}
                  </WhatsAppButton>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative md:col-span-2">
            <div className="absolute inset-0">
              <img src={active.visual.img} alt={active.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="relative h-full p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-zinc-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                {active.visual.caption}
              </div>

              <div className="mt-auto hidden h-full items-end md:flex">
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 text-xs text-zinc-200 backdrop-blur">
                  {tServices.recommend}
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
  const { lang, setLang } = useLang();
  const t = DICT[lang];

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
  const [city, setCity] = useState(lang === "en" ? "Mexico City" : "CDMX");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [zones, setZones] = useState("");

  // Custodia
  const [custodians, setCustodians] = useState<string>("1");
  const [custodyProfile, setCustodyProfile] = useState<string>(
    lang === "en" ? "Executive" : "Ejecutivo"
  );

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

  // Ajuste de city/profile cuando cambias de idioma
  useEffect(() => {
    setCity((prev) => {
      if (lang === "en") {
        if (prev === "CDMX") return "Mexico City";
      } else {
        if (prev === "Mexico City") return "CDMX";
      }
      return prev;
    });
    setCustodyProfile((prev) => {
      if (lang === "en") {
        if (prev === "Ejecutivo") return "Executive";
      } else {
        if (prev === "Executive") return "Ejecutivo";
      }
      return prev;
    });
  }, [lang]);

  const step3Help = isTransfer ? t.wizard.transferHelp : t.wizard.rentHelp;

  const reservationMessage = useMemo(() => {
    const w = t.wizard.wa;

    const lines: Array<string | null> = [
      t.wizard.waLinesIntro,
      `${w.serviceType} ${serviceType}`,
      `${w.unitType} ${
        lang === "en"
          ? DICT.en.wizard.unitCards.find((u) => u.key === unitType)?.title ?? unitType
          : unitType
      }${isArmored ? ` (${w.armoredLevel} ${armorLevel})` : ""}`,
      `${w.passengers} ${pax}`,

      isTransfer ? `${w.from} ${origin || "—"}` : null,
      isTransfer ? `${w.to} ${destination || "—"}` : null,
      isTransfer && date ? `${w.date} ${new Date(date).toLocaleDateString()}` : null,
      isTransfer && time ? `${w.time} ${time}` : null,

      isRent ? `${w.baseCity} ${city || "—"}` : null,
      isRent && startDate ? `${w.start} ${new Date(startDate).toLocaleDateString()}` : null,
      isRent && endDate ? `${w.end} ${new Date(endDate).toLocaleDateString()}` : null,
      isRent && schedule ? `${w.schedule} ${schedule}` : null,
      isRent && zones ? `${w.zones} ${zones}` : null,

      isCustody ? `${w.custody} ${custodians} (${custodyProfile})` : null,
    ];

    return lines.filter(Boolean).join("\n");
  }, [
    t,
    lang,
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

  // UNIT_CARDS traducido (con iconos consistentes)
  const UNIT_CARDS = useMemo(
    () =>
      t.wizard.unitCards.map((u) => ({
        key: u.key as UnitType,
        title: u.title,
        desc: u.desc,
        hint: u.hint,
        icon:
          u.key === "Blindada"
            ? Shield
            : u.key === "Ejecutiva"
            ? Car
            : u.key === "Sprinter/Vans"
            ? Crown
            : Crown,
      })),
    [t]
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
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
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
              <p className="text-lg font-semibold tracking-wide">{t.brand.name}</p>
              <p className="text-xs text-zinc-400">{t.brand.tagline}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex ml-auto">
            <a href="#servicios" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              {t.nav.services}
            </a>
            <a href="#flota" className="text-sm text-zinc-300 hover:text-[#e6e6e6]">
              {t.nav.fleet}
            </a>
          </nav>

          {/* Pill idioma */}
          <div className="ml-auto md:ml-0">
            <LangPill lang={lang} onChange={setLang} labels={t.lang} />
          </div>
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
          {/* Copy */}
          <div className="flex-1 md:col-start-1 md:row-start-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold tracking-tight md:text-6xl"
            >
              {t.hero.h1a}{" "}
              <span className="bg-[linear-gradient(110deg,_#f7f7f7,_#cfcfcf_38%,_#9a9a9a_55%,_#ffffff_72%)] bg-clip-text text-transparent drop-shadow">
                {t.hero.h1b}
              </span>
            </motion.h1>

            <p className="mt-4 max-w-2xl text-lg text-zinc-300 md:text-xl">{t.hero.sub}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {t.hero.badges.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
          </div>

          {/* Wizard Card */}
          <div className="relative flex-1 w-full md:col-start-2 md:row-start-1 self-start">
            <div className="pointer-events-none absolute -inset-6 md:-inset-8 rounded-[32px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.18),transparent_70%)] blur-xl" />

            <Card
              id="cotizar"
              className="mt-6 md:mt-0 w-full rounded-2xl border-white/10 bg-black/50 backdrop-blur-md shadow-xl"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{t.wizard.title}</p>
                    <p className="mt-1 text-xs text-zinc-400">{t.wizard.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-zinc-700 bg-black/40 px-2 py-1 text-[11px] text-zinc-300">
                    {step}/3
                  </span>
                </div>

                {/* Stepper */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <StepPill index={1} current={step} label={t.wizard.steps[0]} />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={2} current={step} label={t.wizard.steps[1]} />
                  <div className="h-px flex-1 bg-zinc-800" />
                  <StepPill index={3} current={step} label={t.wizard.steps[2]} />
                </div>

                {/* Content */}
                <div className="mt-5 space-y-3">
                  {step === 1 && (
                    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-zinc-300" />
                        <p className="text-sm font-medium text-zinc-200">{t.wizard.step1Title}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{t.wizard.step1Help}</p>

                      <div className="mt-4 grid grid-cols-1 gap-2">
                        {(t.wizard.serviceTypes as ReadonlyArray<{ key: ServiceType; desc: string }>).map((s) => {
                          const activeSel = serviceType === s.key;
                          return (
                            <button
                              key={s.key}
                              onClick={() => setServiceType(s.key)}
                              className={`rounded-2xl border px-4 py-3 text-left transition
                                ${
                                  activeSel
                                    ? "border-[#e6e6e6]/70 bg-white/10"
                                    : "border-zinc-700 bg-black/40 hover:border-zinc-600"
                                }`}
                              aria-pressed={activeSel}
                            >
                              <p className={`text-sm ${activeSel ? "text-white" : "text-zinc-200"}`}>{s.key}</p>
                              <p className="mt-1 text-xs text-zinc-400">{s.desc}</p>
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
                        <p className="text-sm font-medium text-zinc-200">{t.wizard.step2Title}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{t.wizard.step2Help}</p>

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
                            <p className="text-sm font-medium text-zinc-200">{t.wizard.armorTitle}</p>
                          </div>
                          <p className="mt-1 text-xs text-zinc-400">{t.wizard.armorHelp}</p>

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
                        <p className="text-sm font-medium text-zinc-200">{t.wizard.step3Title}</p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-400">{step3Help}</p>

                      {/* Pasajeros */}
                      <div className="mt-4">
                        <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.paxLabel}</label>
                        <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                          <MapPin className="h-4 w-4 text-zinc-400" />
                          <select
                            className="w-full bg-transparent text-sm outline-none"
                            value={pax}
                            onChange={(e) => setPax(e.target.value)}
                            aria-label="Cantidad de pasajeros"
                          >
                            {t.wizard.paxOptions.map((p) => (
                              <option key={p} className="bg-black/50">
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Traslado */}
                      {isTransfer && (
                        <>
                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.origin}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={t.wizard.placeholders.origin}
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.destination}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={t.wizard.placeholders.destination}
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.date}</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Calendar className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="date"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.time}</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Clock className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="time"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={time}
                                  onChange={(e) => setTime(e.target.value)}
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
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.cityBase}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              >
                                {t.wizard.cityOptions.map((c) => (
                                  <option key={c} className="bg-black/50">
                                    {c}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.start}</label>
                              <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                                <Calendar className="h-4 w-4 text-zinc-400" />
                                <input
                                  type="date"
                                  className="w-full bg-transparent text-sm outline-none"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.end}</label>
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
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.schedule}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <Clock className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={t.wizard.placeholders.schedule}
                                value={schedule}
                                onChange={(e) => setSchedule(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.zones}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <MapPin className="h-4 w-4 text-zinc-400" />
                              <input
                                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
                                placeholder={t.wizard.placeholders.zones}
                                value={zones}
                                onChange={(e) => setZones(e.target.value)}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Custodia */}
                      {isCustody && (
                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.custodians}</label>
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
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-medium text-zinc-200">{t.wizard.custodyProfile}</label>
                            <div className="flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-black/50 px-3 py-2">
                              <UserCheck className="h-4 w-4 text-zinc-400" />
                              <select
                                className="w-full bg-transparent text-sm outline-none"
                                value={custodyProfile}
                                onChange={(e) => setCustodyProfile(e.target.value)}
                              >
                                {t.wizard.custodyProfiles.map((p) => (
                                  <option key={p} className="bg-black/50">
                                    {p}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <a href={reservationHref} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full rounded-2xl bg-[#25D366] text-[#0a0d14] hover:brightness-110">
                            <WhatsAppIcon className="mr-2 h-4 w-4" /> {t.wizard.sendWA}
                          </Button>
                        </a>
                        <p className="mt-2 text-center text-xs text-zinc-400">{t.wizard.avgReply}</p>
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
                      {t.wizard.back}
                    </Button>

                    {step < 3 ? (
                      <Button
                        className="rounded-2xl bg-gradient-to-r from-[#e6e6e6] to-[#ffffff] text-[#0a0d14]"
                        onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as 1 | 2 | 3)))}
                        disabled={!canNext}
                      >
                        {t.wizard.next} <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="rounded-2xl border-zinc-700 bg-transparent text-zinc-200 hover:border-[#e6e6e6] hover:text-[#e6e6e6]"
                        onClick={() => setStep(1)}
                      >
                        {t.wizard.restart}
                      </Button>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500">{t.wizard.tip}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Servicios */}
      <Section id="servicios" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <ServicesTabs tServices={t.services} lang={lang} />
        </div>
      </Section>

      {/* Flota */}
      <Section id="flota" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl">{t.fleet.title}</h2>
              <div className="mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r from-[#e6e6e6] to-transparent" />
              <p className="mt-2 max-w-2xl text-zinc-400">{t.fleet.sub}</p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-black/50 p-3">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ["blindada", t.fleet.tabs.blindada],
                    ["blanda", t.fleet.tabs.blanda],
                    ["van", t.fleet.tabs.van],
                    ["lujo", t.fleet.tabs.lujo],
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
                  <option value="all">{t.fleet.filters.passengers}</option>
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
                    <option value="all">{t.fleet.filters.level}</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                    <option value="V+">V+</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          <FleetGrid category={category} seats={seats} level={level} tFleet={t.fleet} />
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
            <p className="text-sm text-zinc-400">{t.footer.about}</p>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{t.footer.colServices}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {t.footer.servicesList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{t.footer.colContact}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {t.footer.contactList.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-zinc-200">{t.footer.colLegal}</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              {t.footer.legalList.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 py-6 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} {t.brand.name} · {t.footer.rights}
        </div>
      </footer>

      {/* Botón flotante */}
      <div className="fixed bottom-5 right-5 z-50">
        <FloatingWhatsAppButton
          message={
            lang === "es"
              ? "Hola, me interesa una cotización. ¿Me apoyas, por favor?"
              : "Hello, I’d like a quote. Can you help me, please?"
          }
        />
      </div>
    </div>
  );
}
