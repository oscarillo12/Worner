import { GanttTask, ProjectData, ProjectMetrics } from './types';

export const projectData: ProjectData = {
  name: "Reposición Consultorio Lautaro y Adecuación a CESFAM",
  location: "Lautaro, Región de La Araucanía, Chile",
  contractor: "Constructora Wörner S.A.",
  client: "Ministerio de Obras Públicas (MOP), Dirección de Arquitectura",
  startDate: "2024-11-23",
  durationDays: 720,
  areaSqM: 3480.10,
  awardedAmountCLP: 13668632710,
};

export const phaseColors: { [key: string]: { bg: string; text: string; border: string } } = {
  "Preparación": { bg: "bg-sky-500", text: "text-sky-500", border: "border-sky-700" },
  "Fundaciones": { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-700" },
  "Estructura": { bg: "bg-rose-500", text: "text-rose-500", border: "border-rose-700" },
  "Envolvente": { bg: "bg-green-500", text: "text-green-500", border: "border-green-700" },
  "Interiores": { bg: "bg-indigo-500", text: "text-indigo-500", border: "border-indigo-700" },
  "Terminaciones": { bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-700" },
  "Entrega": { bg: "bg-teal-500", text: "text-teal-500", border: "border-teal-700" },
  "HVAC": { bg: "bg-cyan-500", text: "text-cyan-500", border: "border-cyan-700" },
  "Eléctrico": { bg: "bg-yellow-500", text: "text-yellow-500", border: "border-yellow-700" },
};

export const ganttTasks: GanttTask[] = [
  // Phase 1: Pre-Construction & Site Prep (60 days)
  { id: 1, name: "Movilización e Instalación de Faenas", start: 1, end: 30, progress: 100, dependencies: [], isCritical: true, phase: "Preparación" },
  { id: 2, name: "Permisos Finales y Seguros", start: 1, end: 45, progress: 100, dependencies: [], isCritical: true, phase: "Preparación" },
  { id: 3, name: "Despeje y Nivelación del Terreno", start: 31, end: 60, progress: 95, dependencies: [1], isCritical: true, phase: "Preparación" },

  // Phase 2: Fundaciones y Subestructura (90 days)
  { id: 4, name: "Excavaciones para Fundaciones", start: 61, end: 90, progress: 80, dependencies: [3], isCritical: true, phase: "Fundaciones" },
  { id: 5, name: "Instalación de Tuberías Subterráneas", start: 75, end: 120, progress: 60, dependencies: [4], isCritical: false, phase: "Fundaciones" },
  { id: 6, name: "Hormigonado de Fundaciones", start: 91, end: 150, progress: 50, dependencies: [4], isCritical: true, phase: "Fundaciones" },

  // Phase 3: Superestructura (180 days)
  { id: 7, name: "Montaje Estructura 1er Piso", start: 151, end: 210, progress: 25, dependencies: [6], isCritical: true, phase: "Estructura" },
  { id: 8, name: "Losa Colaborante 2do Piso", start: 211, end: 270, progress: 10, dependencies: [7], isCritical: true, phase: "Estructura" },
  { id: 9, name: "Montaje Estructura 2do Piso", start: 271, end: 300, progress: 5, dependencies: [8], isCritical: true, phase: "Estructura" },
  { id: 10, name: "Estructura de Techumbre", start: 301, end: 330, progress: 0, dependencies: [9], isCritical: true, phase: "Estructura" },

  // Phase 4: Envolvente Exterior y Cubiertas (120 days)
  { id: 11, name: "Cubierta y Aislación Térmica", start: 331, end: 390, progress: 0, dependencies: [10], isCritical: true, phase: "Envolvente" },
  { id: 12, name: "Muros Exteriores y Revestimientos", start: 331, end: 420, progress: 0, dependencies: [8], isCritical: false, phase: "Envolvente" },
  { id: 13, name: "Instalación de Ventanas", start: 421, end: 450, progress: 0, dependencies: [12], isCritical: false, phase: "Envolvente" },

  // Phase 5: Interior y MEP (300 days)
  { id: 14, name: "Tabiquería Interior", start: 361, end: 480, progress: 0, dependencies: [11], isCritical: false, phase: "Interiores" },
  { id: 15, name: "Canalización Eléctrica y Datos", start: 421, end: 540, progress: 0, dependencies: [14], isCritical: true, phase: "Interiores" },
  { id: 16, name: "Ductos de Climatización (HVAC)", start: 435, end: 570, progress: 0, dependencies: [14], isCritical: true, phase: "Interiores" },
  { id: 17, name: "Redes de Agua y Alcantarillado", start: 451, end: 570, progress: 0, dependencies: [14], isCritical: true, phase: "Interiores" },
  { id: 18, name: "Instalación de Cielos Falsos", start: 571, end: 630, progress: 0, dependencies: [15, 16, 17], isCritical: false, phase: "Interiores" },
  { id: 19, name: "Instalación de Luminarias", start: 601, end: 660, progress: 0, dependencies: [18], isCritical: true, phase: "Interiores" },

  // Phase 6: Terminaciones y Paisajismo (90 days)
  { id: 20, name: "Revestimientos de Suelos", start: 631, end: 690, progress: 0, dependencies: [18], isCritical: false, phase: "Terminaciones" },
  { id: 21, name: "Pintura y Terminaciones", start: 661, end: 710, progress: 0, dependencies: [19, 20], isCritical: true, phase: "Terminaciones" },
  { id: 22, name: "Instalación de Artefactos Sanitarios", start: 680, end: 710, progress: 0, dependencies: [20], isCritical: false, phase: "Terminaciones" },
  { id: 23, name: "Obras Exteriores y Paisajismo", start: 600, end: 700, progress: 0, dependencies: [13], isCritical: false, phase: "Terminaciones" },

  // Phase 7: Comisionamiento y Entrega (30 days)
  { id: 24, name: "Pruebas de Sistemas (HVAC, Eléctrico)", start: 691, end: 715, progress: 0, dependencies: [19, 22], isCritical: true, phase: "Entrega" },
  { id: 25, name: "Limpieza Final y Aseo Industrial", start: 711, end: 720, progress: 0, dependencies: [21], isCritical: true, phase: "Entrega" },
  { id: 26, name: "Recepción Provisional y Entrega", start: 720, end: 720, progress: 0, dependencies: [24, 25], isCritical: true, phase: "Entrega" },
];

const totalWeightedProgress = ganttTasks.reduce((acc, task) => {
    const duration = task.end - task.start + 1;
    return acc + (task.progress / 100) * duration;
}, 0);

const totalDuration = ganttTasks.reduce((acc, task) => {
    const duration = task.end - task.start + 1;
    return acc + duration;
}, 0);

export const projectMetrics: ProjectMetrics = {
    scope: { value: `${projectData.areaSqM.toLocaleString('de-DE')} m²`, label: "Construcción CESFAM" },
    time: { value: `${projectData.durationDays} Días`, label: "Plazo Total", progress: Math.round((totalWeightedProgress / totalDuration) * 100) || 0 },
    cost: { value: `$${(projectData.awardedAmountCLP / 1_000_000_000).toFixed(2)} MM`, label: "Monto Adjudicado (CLP)" },
    quality: { value: "ISO 9001:2015", label: "Estándar Requerido" }
};

export const hvacTasks: GanttTask[] = [
    { id: 1, name: "Ingeniería de Detalle y Shop Drawings", start: 1, end: 20, progress: 100, dependencies: [], isCritical: true, phase: "HVAC" },
    { id: 2, name: "Recepción y Bodegaje de Equipos", start: 21, end: 40, progress: 90, dependencies: [1], isCritical: true, phase: "HVAC" },
    { id: 3, name: "Fabricación de Ductos", start: 21, end: 50, progress: 70, dependencies: [1], isCritical: false, phase: "HVAC" },
    { id: 4, name: "Montaje de Soportes", start: 41, end: 60, progress: 50, dependencies: [2], isCritical: true, phase: "HVAC" },
    { id: 5, name: "Instalación Red Principal de Ductos", start: 61, end: 90, progress: 20, dependencies: [4, 3], isCritical: true, phase: "HVAC" },
    { id: 6, name: "Montaje de Unidades (UMA/Fancoil)", start: 75, end: 100, progress: 10, dependencies: [4], isCritical: false, phase: "HVAC" },
    { id: 7, name: "Instalación de Tuberías (Piping)", start: 91, end: 120, progress: 5, dependencies: [5, 6], isCritical: true, phase: "HVAC" },
    { id: 8, name: "Cableado de Control", start: 101, end: 125, progress: 0, dependencies: [6], isCritical: false, phase: "HVAC" },
    { id: 9, name: "Aislación Térmica de Ductos y Tuberías", start: 121, end: 140, progress: 0, dependencies: [7], isCritical: true, phase: "HVAC" },
    { id: 10, name: "Pruebas y Puesta en Marcha", start: 141, end: 150, progress: 0, dependencies: [8, 9], isCritical: true, phase: "HVAC" },
];

export const electricalTasks: GanttTask[] = [
    { id: 1, name: "Replanteo y Trazado", start: 1, end: 10, progress: 100, dependencies: [], isCritical: true, phase: "Eléctrico" },
    { id: 2, name: "Instalación de Canalizaciones Embutidas", start: 11, end: 40, progress: 80, dependencies: [1], isCritical: true, phase: "Eléctrico" },
    { id: 3, name: "Montaje de Bandejas Portaconductores", start: 30, end: 60, progress: 50, dependencies: [1], isCritical: false, phase: "Eléctrico" },
    { id: 4, name: "Tendido de Conductores de Fuerza", start: 41, end: 70, progress: 20, dependencies: [2, 3], isCritical: true, phase: "Eléctrico" },
    { id: 5, name: "Tendido de Corrientes Débiles", start: 50, end: 75, progress: 15, dependencies: [2, 3], isCritical: false, phase: "Eléctrico" },
    { id: 6, name: "Montaje e Instalación de Tableros", start: 61, end: 80, progress: 10, dependencies: [4], isCritical: true, phase: "Eléctrico" },
    { id: 7, name: "Conexionado de Circuitos en Tableros", start: 81, end: 100, progress: 0, dependencies: [6], isCritical: true, phase: "Eléctrico" },
    { id: 8, name: "Montaje de Luminarias", start: 75, end: 95, progress: 0, dependencies: [5], isCritical: false, phase: "Eléctrico" },
    { id: 9, name: "Instalación de Artefactos", start: 96, end: 110, progress: 0, dependencies: [8], isCritical: false, phase: "Eléctrico" },
    { id: 10, name: "Pruebas y Certificación SEC", start: 101, end: 120, progress: 0, dependencies: [7, 9], isCritical: true, phase: "Eléctrico" },
];

export const projectContextForGemini = `
  Contexto del Proyecto de Construcción: "Reposición Consultorio Lautaro y Adecuación a CESFAM".
  - Nombre del Proyecto: Reposición Consultorio Lautaro y Adecuación a CESFAM.
  - Mandante: Ministerio de Obras Públicas (MOP), Dirección de Arquitectura, Región de La Araucanía.
  - Contratista: Constructora Wörner S.A.
  - Ubicación: Lautaro, Región de La Araucanía, Chile.
  - Duración del Contrato: 720 días.
  - Fecha de Inicio: 23 de Noviembre de 2024.
  - Superficie Total: 3.480,10 m².
  - Monto Adjudicado: $13.668.632.710 CLP (IVA incluido).
  - Alcance: Construcción de un Centro de Salud Familiar (CESFAM) de dos pisos, incluyendo estructura de hormigón armado, tabiquería de madera, e instalaciones completas de climatización (HVAC), electricidad, iluminación, y redes sanitarias.
  - Hitos Clave del Cronograma:
    1. Fase de Preparación (Días 1-60): Movilización, permisos, nivelación del terreno.
    2. Fase de Fundaciones (Días 61-150): Excavaciones y hormigonado.
    3. Fase de Estructura (Días 151-330): Montaje de estructura de 1er y 2do piso, y techumbre.
    4. Fase de Envolvente (Días 331-450): Cubierta, muros exteriores y ventanas.
    5. Fase de Interiores y MEP (Días 361-660): Tabiquería, canalizaciones eléctricas, ductos HVAC, redes de agua.
    6. Fase de Terminaciones (Días 631-710): Suelos, pintura, artefactos, paisajismo.
    7. Fase de Entrega (Días 691-720): Pruebas de sistemas, limpieza final y recepción.
  - Normativas y Multas: El contrato se rige por el Reglamento para Contratos de Obras Públicas (RCOP). El no cumplimiento de plazos o instrucciones del Inspector Fiscal puede resultar en multas diarias, según lo estipulado en el Art. 111 del RCOP.
  - Especificaciones Técnicas:
    - Iluminación: Se utilizarán equipos de alta eficiencia energética, principalmente tecnología LED, según el detalle del proyecto de iluminación. Marcas recomendadas por su calidad y durabilidad son Philips o similar.
    - HVAC (Climatización): El sistema contempla unidades manejadoras de aire (UMA), fancoils, y un sistema de bomba de calor para agua fría y caliente. Se busca la eficiencia energética y el confort térmico. Marcas recomendadas para equipos de esta envergadura son Carrier, Trane o similar.
`;
