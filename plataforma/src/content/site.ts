export const WA = "https://wa.me/543704022201";
export const CONTACT = "contacto@agronys.com";
export const MAIL = `mailto:${CONTACT}`;
export const APP_VERSION = "0.1.0";

export function waDemo(topic: string) {
  const text = `Hola, quiero pedir una demo de ${topic}.`;
  return `${WA}?text=${encodeURIComponent(text)}`;
}

export const products = [
  {
    id: "nutrogan",
    name: "Nutrogan",
    line: "Tu establecimiento, en el bolsillo",
    image: "/media/ui/nutrogan-mockup.png",
    chips: ["Seguís sin señal", "Sabés cuánto gana cada lote", "Agua y pasto a la vista"],
    from: "El día en el campo no espera a que vuelva la señal. Si lo anotás después, se pierde y te cuesta plata.",
    work: "Anotás pesos, movimientos, el agua y la lluvia en el celular. El mapa te muestra los potreros y cómo viene el pasto. Cuando hay señal, sube solo: te ahorrás escribirlo otra vez en la oficina.",
    out: "Vas a ver qué lote está ganando y qué aguada hay que mirar, sin recorrer todo el campo para enterarte.",
    app: "https://nutrogan.site",
  },
  {
    id: "sigag",
    name: "SIGAG",
    line: "El día de trabajo, resuelto",
    image: "/media/ui/sigag-mockup.png",
    chips: ["Hacienda y potrero juntos", "El pasto y el calor", "Cámara y voz"],
    from: "Corral y potrero pasan en la misma jornada. Hoy esa información se te escapa entre papeles.",
    work: "Llevás la hacienda, los potreros, la comida y el clima en el teléfono. La cámara te muestra cómo está el animal y podés hablar para anotar la tarea. El pasto se ve desde el satélite y el calor te avisa antes de que el encierre te saque kilos.",
    out: "Cerrás el día una sola vez. Menos vueltas, menos olvidos y una decisión más rápida sobre dónde mover la hacienda.",
  },
  {
    id: "precision",
    name: "Los números de tu campaña",
    line: "Dónde se te va la plata",
    image: "/media/ui/dashboard-mockup.png",
    chips: ["Tus planillas, claras", "Cuánto gana el lote", "El calor, a la vista"],
    from: "Ya tenés planillas. Lo que te falta es ver, de un vistazo, si la campaña te está dejando plata.",
    work: "Las ordenamos y te mostramos cuánto gana cada animal por día, cuánta hacienda aguanta el potrero, cuántas horas de calor te jugaron en contra y cómo viene la condición del rodeo.",
    out: "Vas a decidir con la campaña a la vista, y no cuando el resultado ya pasó.",
  },
] as const;

export const services = [
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/ganaderia.svg",
    id: "herd",
    title: "Todo el rodeo, en un solo lugar",
    text: "Pesajes, movimientos y atenciones juntos. Vas a ver cómo viene cada animal y cada lote durante toda la campaña, y dejás de decidir con un papel suelto.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/vision.svg",
    id: "camera",
    title: "La cámara mira el animal",
    text: "Te muestra cómo está, si hay una señal visible y cómo viene la bosta. Encargado y veterinario miran lo mismo, y actuás antes.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/orquestacion.svg",
    id: "alert",
    title: "Te avisa a tiempo",
    text: "Calor, sanidad y manejo te llegan cuando todavía podés hacer algo. Te ahorrás el susto de enterarte tarde.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/agro.svg",
    id: "paddock",
    title: "Qué potrero rinde",
    text: "Ves cuánta hacienda aguanta, cómo viene el pasto y cuál lote tiene que descansar. Movés mejor y cuidás la plata del campo.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/satelital.svg",
    id: "grass",
    title: "El pasto, visto desde arriba",
    text: "Mirá qué zona está floja sin caminar todo el establecimiento. Vas directo adonde hace falta.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/datos.svg",
    id: "daylog",
    title: "Anotá el día en el lote",
    text: "Cargás en el lugar, aunque no haya señal. Cuando vuelve, sube solo. Te ahorrás escribirlo de nuevo.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/automat.svg",
    id: "autoalert",
    title: "El aviso sale solo",
    text: "Un hecho del campo dispara el mensaje o la planilla. Tu gente se entera sin que tengas que perseguirlos.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/dataeng.svg",
    id: "numbers",
    title: "Los números de tu campaña",
    text: "Tus planillas pasan a una pantalla clara: cuánto gana el lote, cuánto aguanta el potrero y cuánto te jugó el calor.",
  },
  {
    band: "arranque",
    kind: "celular",
    icon: "/icons/offline.svg",
    id: "offline",
    title: "Seguís aunque no haya señal",
    text: "El trabajo del día no se corta en el monte. Lo guardás ahí y aparece en la oficina cuando hay señal.",
  },
  {
    band: "punta",
    kind: "drones",
    icon: "/icons/vision.svg",
    id: "droneCount",
    title: "El dron que pesa y cuenta",
    text: "Sobrevolás el lote y ves cuántos animales hay y cómo vienen de peso, sin arrearlos hasta la manga. Te ahorrás el día de juntar hacienda solo para enterarte.",
  },
  {
    band: "punta",
    kind: "drones",
    icon: "/icons/satelital.svg",
    id: "droneApply",
    title: "El dron que aplica",
    text: "Cubrís el lote en la ventana justa de clima, sin esperar la máquina lenta. No se te pasa el momento del pasto o del cultivo.",
  },
  {
    band: "punta",
    kind: "sensores",
    icon: "/icons/datos.svg",
    id: "water",
    title: "Sensores de agua",
    text: "El tanque y la aguada te avisan antes de quedarse secos. Dejás de recorrer cada bebedero para saber si la hacienda tiene agua.",
  },
  {
    band: "punta",
    kind: "sensores",
    icon: "/icons/ganaderia.svg",
    id: "collar",
    title: "El collar del animal que importa",
    text: "Sabés dónde está, si está comiendo y si algo cambió en su día. El aviso te llega al teléfono. Es para el rodeo que no podés darte el lujo de mirar tarde.",
  },
  {
    band: "punta",
    kind: "automatizacion",
    icon: "/icons/orquestacion.svg",
    id: "fence",
    title: "El cerco que movés desde el teléfono",
    text: "Cambiás por dónde come la hacienda sin tender un alambre nuevo. Es lo más nuevo del manejo, y es la forma de rotar el pasto sin una cuadrilla.",
  },
  {
    band: "punta",
    kind: "sensores",
    icon: "/icons/dataeng.svg",
    id: "scale",
    title: "La balanza que pesa al pasar",
    text: "El animal se pesa en el paso de todos los días. Vas a ver quién gana y quién se estancó, sin armar una jornada de manga cada vez que querés un número.",
  },
  {
    band: "punta",
    kind: "automatizacion",
    icon: "/icons/automat.svg",
    id: "feeder",
    title: "El comedero que mide lo que come cada uno",
    text: "Cada animal deja registrado cuánto comió. Vas a quedarte con los que convierten comida en kilos y dejar de alimentar a ciegas.",
  },
  {
    band: "punta",
    kind: "sensores",
    icon: "/icons/orquestacion.svg",
    id: "station",
    title: "La estación de tu potrero",
    text: "Lluvia, calor y viento de ese lote, no del pueblo. Te avisa para mover, para no encerrar de tarde y para no volar el dron con viento.",
  },
  {
    band: "punta",
    kind: "automatizacion",
    icon: "/icons/ganaderia.svg",
    id: "chute",
    title: "La manga que aparta sola",
    text: "La caravana reconoce al animal y la puerta lo manda al corral que corresponde, por peso o por lote. La jornada de aparte se achica y se equivoca menos.",
  },
  {
    band: "punta",
    kind: "automatizacion",
    icon: "/icons/agro.svg",
    id: "pump",
    title: "La bomba que arrancás desde el teléfono",
    text: "El agua sale cuando hace falta, sin manejar hasta el molino. Menos viajes y la hacienda no se queda esperando.",
  },
];

export const layers = [
  { id: "vision", node: "2", title: "La cámara mira el animal", kicker: "Cómo viene, a simple vista", lead: "Te muestra la condición, una marca visible y cómo viene la bosta. Encargado y veterinario miran la misma foto del día.", href: "/productos#sigag" },
  { id: "ganaderia", node: "1", title: "Todo el rodeo, en un solo lugar", kicker: "La historia que te hace ganar", lead: "Pesajes, movimientos y atenciones de toda la campaña. Dejás de decidir con el dato de un solo día de manga.", href: "/productos#sigag" },
  { id: "orquestacion", node: "4", title: "Te avisa a tiempo", kicker: "Antes de que se te escape", lead: "Calor, sanidad y manejo te llegan cuando todavía podés actuar. Te ahorrás el costo de enterarte tarde.", href: "/productos#sigag" },
  { id: "satelital", node: "5", title: "El pasto, visto desde arriba", kicker: "Dónde mirar primero", lead: "Ves qué zona del potrero está floja sin caminarlo entero. Vas directo y cuidás la jornada.", href: "/productos#sigag" },
  { id: "agro", node: "3", title: "Qué potrero rinde", kicker: "Mover mejor es ganar más", lead: "Sabés cuál aguanta más hacienda y cuál tiene que descansar, al lado de cómo viene el rodeo.", href: "/productos#nutrogan" },
  { id: "datos", node: "0", title: "Anotá el día en el lote", kicker: "Aunque no haya señal", lead: "Pesos, agua y lluvia quedan en el celular. Cuando vuelve la señal, suben solos.", href: "/productos#nutrogan" },
  { id: "automat", node: "", title: "El aviso sale solo", kicker: "Menos persecución", lead: "Un hecho del campo dispara el mensaje o la planilla. Tu gente se entera sin que los busques.", href: "/servicios" },
  { id: "dataeng", node: "", title: "Los números de tu campaña", kicker: "La plata, a la vista", lead: "Tus planillas te muestran cuánto gana el lote, cuánto aguanta el potrero y cuánto te jugó el calor.", href: "/productos#precision" },
  { id: "offline", node: "", title: "Seguís aunque no haya señal", kicker: "El día no se pierde", lead: "Trabajás en el monte igual. Lo guardado aparece en la oficina cuando hay señal.", href: "/servicios" },
];

export type ServiceId = (typeof services)[number]["id"];
export type ProductId = (typeof products)[number]["id"];
