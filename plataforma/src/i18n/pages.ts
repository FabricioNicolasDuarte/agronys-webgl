import type { ProductId, ServiceId } from "@/content/site";

type Card = { title: string; text: string };
type Trio = [string, string, string];
type ProductText = {
  name: string;
  line: string;
  chips: Trio;
  from: string;
  work: string;
  out: string;
};

export type Pages = {
  about: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    facts: Trio;
    factLabels: Trio;
    body: string;
    why: string;
    whyLead: string;
    cmpLabel: string;
    rows: [{ name: string; note: string }, { name: string; note: string }, { name: string; note: string }];
    score: (name: string, n: number) => string;
    caption: string;
    colNeed: string;
    needs: [string, string, string, string, string, string];
    yes: string;
    no: string;
    note: string;
    can: string;
    canItems: [Card, Card, Card, Card];
    cta: string;
    ctaMsg: string;
  };
  approach: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    steps: [Card, Card, Card, Card];
  };
  services: {
    meta: string;
    eyebrow: string;
    h1: string;
    simulate: string;
    groups: string;
    all: string;
    allLine: string;
    families: {
      celular: { label: string; line: string };
      drones: { label: string; line: string };
      sensores: { label: string; line: string };
      automatizacion: { label: string; line: string };
    };
    add: (title: string) => string;
    remove: (title: string) => string;
    inTeam: (n: number) => string;
    wantTeam: string;
    ask: (titles: string) => string;
    know: string;
    hardware: string;
    items: Record<ServiceId, Card>;
  };
  products: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    tabs: string;
    costs: string;
    helps: string;
    achieve: string;
    see: (name: string) => string;
    seeMsg: (name: string) => string;
    openApp: string;
    screens: (name: string) => string;
    items: Record<ProductId, ProductText>;
  };
  contact: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    mail: string;
    presence: string;
    foot: string;
    soon: string;
  };
  cookies: {
    meta: string;
    eyebrow: string;
    h1: string;
    aria: string;
    items: [Card, Card, Card];
    bar: string;
    more: string;
    accept: string;
  };
};

const es: Pages = {
  about: {
    meta: "Quiénes somos · Agronys",
    eyebrow: "Quiénes somos",
    h1: "La mejor forma de ver tu campo, hecha para cómo trabajás.",
    lead: "Agronys arma la herramienta de tu establecimiento. No te deja un paquete genérico. Nutrogan, SIGAG y los números de la campaña juntan el rodeo, el pasto y la plata en un solo lugar. Decidís antes, te ahorrás vueltas y ves dónde se te va el resultado.",
    factLabels: ["Origen", "Base operativa", "Alcance"],
    facts: ["Argentina · desde 2022", "NEA, Paraguay y Uruguay", "Solución a medida"],
    body: "Un programa de hacienda te anota el animal. Otro te muestra el cultivo. Tu campo necesita las dos cosas, más el descanso del potrero, y poder cargar el día aunque no haya señal. Agronys te lo deja junto, para que encargado, veterinario y dueño miren lo mismo y muevan a tiempo.",
    why: "Por qué es la mejor opción",
    whyLead: "Mirá qué te resuelve cada alternativa. Agronys es la que junta las seis cosas que tu campo pide para cuidar la plata.",
    cmpLabel: "Cobertura de seis necesidades del establecimiento mixto",
    rows: [
      { name: "Software de rodeo", note: "IPECUS, Huella, GEN.ar, Biotraza" },
      { name: "Plataforma de cultivo", note: "Auravant, SIMA, GeoAgro, OneSoil, FieldView" },
      { name: "Agronys", note: "Nutrogan, SIGAG y los números de tu campaña, a la medida de tu campo" },
    ],
    score: (name, n) => `${name}: ${n} de 6`,
    caption: "Qué resuelve cada alternativa",
    colNeed: "Necesidad del establecimiento",
    needs: [
      "La historia de cada animal",
      "Ver el pasto desde arriba",
      "Saber qué potrero aguanta y cuál descansa",
      "Seguir el día aunque no haya señal",
      "Del celular al dron, al sensor o a la manga, en la misma pantalla",
      "Una herramienta hecha para tu campo",
    ],
    yes: "Sí",
    no: "No",
    note: "Lo demás te resuelve una parte. Agronys te deja el rodeo, el pasto, el día sin señal y una herramienta armada para tu campo. Por eso es la opción que te hace decidir antes y te ahorra enterarte cuando la plata ya se fue.",
    can: "Lo que vas a poder hacer",
    canItems: [
      { title: "Una sola mirada", text: "El rodeo, el pasto y el día del lote se ven juntos. Movés antes de volver a la casa." },
      { title: "El día queda cargado", text: "Aunque no haya señal, lo que hiciste en el monte no se pierde ni se escribe dos veces." },
      { title: "Todos ven lo mismo", text: "Encargado, veterinario y dueño deciden sobre la misma historia del campo." },
      { title: "Te enterás a tiempo", text: "El calor, el potrero cargado y el pasto corto dejan de avisarte cuando el resultado ya se fue." },
    ],
    cta: "Quiero verlo en mi campo",
    ctaMsg: "Hola, quiero ver cómo Agronys me ayuda a decidir antes en mi campo.",
  },
  approach: {
    meta: "Enfoque · Agronys",
    eyebrow: "Enfoque · desde 2022",
    h1: "Lo que pasa hoy en el lote tiene que ayudarte a ganar.",
    lead: "El calor, la cantidad de animales, cómo vienen y cómo está el pasto tienen que verse juntos. Así decidís en el campo, no cuando ya volviste a la oficina. Si tu establecimiento pide algo que no está en el catálogo, lo armamos para vos.",
    steps: [
      { title: "El animal no espera.", text: "Un pico de calor o un lote demasiado cargado te saca plata si te enterás cuando ya pasó. Acá lo ves a tiempo." },
      { title: "Seguís aunque no haya señal.", text: "Cargás el día en el monte. Te ahorrás reescribirlo cuando llegás a la casa." },
      { title: "Todos miran lo mismo.", text: "Encargado, veterinario y dueño ven la misma historia del rodeo. Menos idas y vueltas, menos errores caros." },
      { title: "El pasto y la hacienda son la misma plata.", text: "Verlos juntos te dice dónde mover. Separados, la decisión llega tarde." },
    ],
  },
  services: {
    meta: "Servicios · Agronys",
    eyebrow: "Servicios",
    h1: "Lo que suma tu campo",
    simulate: "Simulá",
    groups: "Grupos de servicios",
    all: "Todo",
    allLine: "Dispositivos, drones, sensores y automatización, en la misma oferta.",
    families: {
      celular: { label: "Dispositivos", line: "Teléfono, tablet o computadora. Según el proyecto se elige APK o PWA." },
      drones: { label: "Drones", line: "El lote entero, desde el aire, en el momento justo." },
      sensores: { label: "Sensores", line: "Agua, animal, peso y clima te avisan antes." },
      automatizacion: { label: "Automatización", line: "Manga, comida, cerco y agua trabajan solos." },
    },
    add: (title) => `Sumar ${title}`,
    remove: (title) => `Sacar ${title}`,
    inTeam: (n) => `${n} en tu equipo`,
    wantTeam: "Quiero este equipo",
    ask: (titles) => `Hola, quiero estos servicios: ${titles}.`,
    know: "Hola, quiero conocer los servicios de Agronys.",
    hardware: "El dron, el sensor y el equipo del campo los comprás vos. Agronys los conecta al software y se encarga de la lectura y el procesamiento de lo que ese equipo junta.",
    items: {
      herd: { title: "Todo el rodeo, en un solo lugar", text: "Pesajes, movimientos y atenciones juntos. Vas a ver cómo viene cada animal y cada lote durante toda la campaña, y dejás de decidir con un papel suelto." },
      camera: { title: "La cámara mira el animal", text: "Te muestra cómo está, si hay una señal visible y cómo viene la bosta. Encargado y veterinario miran lo mismo, y actuás antes." },
      alert: { title: "Te avisa a tiempo", text: "Calor, sanidad y manejo te llegan cuando todavía podés hacer algo. Te ahorrás el susto de enterarte tarde." },
      paddock: { title: "Qué potrero rinde", text: "Ves cuánta hacienda aguanta, cómo viene el pasto y cuál lote tiene que descansar. Movés mejor y cuidás la plata del campo." },
      grass: { title: "El pasto, visto desde arriba", text: "Mirá qué zona está floja sin caminar todo el establecimiento. Vas directo adonde hace falta." },
      daylog: { title: "Anotá el día en el lote", text: "Cargás en el lugar, aunque no haya señal. Cuando vuelve, sube solo. Te ahorrás escribirlo de nuevo." },
      autoalert: { title: "El aviso sale solo", text: "Un hecho del campo dispara el mensaje o la planilla. Tu gente se entera sin que tengas que perseguirlos." },
      numbers: { title: "Los números de tu campaña", text: "Tus planillas pasan a una pantalla clara: cuánto gana el lote, cuánto aguanta el potrero y cuánto te jugó el calor." },
      offline: { title: "Seguís aunque no haya señal", text: "El trabajo del día no se corta en el monte. Lo guardás ahí y aparece en la oficina cuando hay señal." },
      droneCount: { title: "El dron que pesa y cuenta", text: "Sobrevolás el lote y ves cuántos animales hay y cómo vienen de peso, sin arrearlos hasta la manga. Te ahorrás el día de juntar hacienda solo para enterarte." },
      droneApply: { title: "El dron que aplica", text: "Cubrís el lote en la ventana justa de clima, sin esperar la máquina lenta. No se te pasa el momento del pasto o del cultivo." },
      water: { title: "Sensores de agua", text: "El tanque y la aguada te avisan antes de quedarse secos. Dejás de recorrer cada bebedero para saber si la hacienda tiene agua." },
      collar: { title: "El collar del animal que importa", text: "Sabés dónde está, si está comiendo y si algo cambió en su día. El aviso te llega al teléfono. Es para el rodeo que no podés darte el lujo de mirar tarde." },
      fence: { title: "El cerco que movés desde el teléfono", text: "Cambiás por dónde come la hacienda sin tender un alambre nuevo. Es lo más nuevo del manejo, y es la forma de rotar el pasto sin una cuadrilla." },
      scale: { title: "La balanza que pesa al pasar", text: "El animal se pesa en el paso de todos los días. Vas a ver quién gana y quién se estancó, sin armar una jornada de manga cada vez que querés un número." },
      feeder: { title: "El comedero que mide lo que come cada uno", text: "Cada animal deja registrado cuánto comió. Vas a quedarte con los que convierten comida en kilos y dejar de alimentar a ciegas." },
      station: { title: "La estación de tu potrero", text: "Lluvia, calor y viento de ese lote, no del pueblo. Te avisa para mover, para no encerrar de tarde y para no volar el dron con viento." },
      chute: { title: "La manga que aparta sola", text: "La caravana reconoce al animal y la puerta lo manda al corral que corresponde, por peso o por lote. La jornada de aparte se achica y se equivoca menos." },
      pump: { title: "La bomba que arrancás desde el teléfono", text: "El agua sale cuando hace falta, sin manejar hasta el molino. Menos viajes y la hacienda no se queda esperando." },
    },
  },
  products: {
    meta: "Productos · Agronys",
    eyebrow: "Productos",
    h1: "Tres formas de cuidar la plata de tu campo",
    lead: "Nutrogan y SIGAG te dejan llevar la hacienda, el potrero, el agua, la lluvia y el pasto en el mismo lugar, aunque no haya señal. Los números de la campaña convierten tus planillas en una pantalla: cuánto gana el lote y dónde se te va la plata. Si tu campo pide otra cosa, la armamos a tu medida. Es lo más completo que podés tener para decidir a tiempo.",
    tabs: "Productos",
    costs: "Lo que hoy te cuesta",
    helps: "Cómo te ayuda",
    achieve: "Lo que vas a lograr",
    see: (name) => `Quiero ver ${name}`,
    seeMsg: (name) => `Hola, quiero pedir una demo de ${name}.`,
    openApp: "Abrir app · nutrogan.site",
    screens: (name) => `Pantallas de ${name}`,
    items: {
      nutrogan: {
        name: "Nutrogan",
        line: "Tu establecimiento, en el bolsillo",
        chips: ["Seguís sin señal", "Sabés cuánto gana cada lote", "Agua y pasto a la vista"],
        from: "El día en el campo no espera a que vuelva la señal. Si lo anotás después, se pierde y te cuesta plata.",
        work: "Anotás pesos, movimientos, el agua y la lluvia en el celular. El mapa te muestra los potreros y cómo viene el pasto. Cuando hay señal, sube solo: te ahorrás escribirlo otra vez en la oficina.",
        out: "Vas a ver qué lote está ganando y qué aguada hay que mirar, sin recorrer todo el campo para enterarte.",
      },
      sigag: {
        name: "SIGAG",
        line: "El día de trabajo, resuelto",
        chips: ["Hacienda y potrero juntos", "El pasto y el calor", "Cámara y voz"],
        from: "Corral y potrero pasan en la misma jornada. Hoy esa información se te escapa entre papeles.",
        work: "Llevás la hacienda, los potreros, la comida y el clima en el teléfono. La cámara te muestra cómo está el animal y podés hablar para anotar la tarea. El pasto se ve desde el satélite y el calor te avisa antes de que el encierre te saque kilos.",
        out: "Cerrás el día una sola vez. Menos vueltas, menos olvidos y una decisión más rápida sobre dónde mover la hacienda.",
      },
      precision: {
        name: "Los números de tu campaña",
        line: "Dónde se te va la plata",
        chips: ["Tus planillas, claras", "Cuánto gana el lote", "El calor, a la vista"],
        from: "Ya tenés planillas. Lo que te falta es ver, de un vistazo, si la campaña te está dejando plata.",
        work: "Las ordenamos y te mostramos cuánto gana cada animal por día, cuánta hacienda aguanta el potrero, cuántas horas de calor te jugaron en contra y cómo viene la condición del rodeo.",
        out: "Vas a decidir con la campaña a la vista, y no cuando el resultado ya pasó.",
      },
    },
  },
  contact: {
    meta: "Contacto · Agronys",
    eyebrow: "Contacto",
    h1: "Solicite una presentación",
    lead: "Indique el tipo de establecimiento y la decisión que desea ordenar primero. El equipo responde por correo o por WhatsApp.",
    mail: "contacto@agronys.com",
    presence: "Presencia",
    foot: "NEA argentino, Paraguay y Uruguay.",
    soon: "Próximamente en Brasil y Bolivia.",
  },
  cookies: {
    meta: "Cookies · Agronys",
    eyebrow: "Marco legal",
    h1: "Cookies",
    aria: "Cookies",
    items: [
      { title: "Preferencia técnica", text: "Se guarda en el navegador cuando se acepta el aviso. Sirve para no volver a mostrarlo." },
      { title: "Sin seguimiento publicitario", text: "Esta versión no usa cookies de marketing ni de publicidad de terceros." },
      { title: "Control", text: "Los datos del sitio se pueden borrar desde el navegador. Consultas: contacto@agronys.com." },
    ],
    bar: "Usamos solo una preferencia técnica para recordar este aviso.",
    more: "Más información",
    accept: "Aceptar",
  },
};

const en: Pages = {
  about: {
    meta: "About · Agronys",
    eyebrow: "About",
    h1: "The clearest way to see your ranch, built for how you work.",
    lead: "Agronys builds the tool for your place. It does not hand you a generic package. Nutrogan, SIGAG, and the numbers of the season put the herd, the grass, and the money in one place. You decide sooner, you skip extra trips, and you see where the result is slipping.",
    factLabels: ["Origin", "Operating base", "Reach"],
    facts: ["Argentina · since 2022", "NEA, Paraguay, and Uruguay", "Built to measure"],
    body: "One herd program records the animal. Another shows the crop. Your place needs both, plus paddock rest, and the ability to log the day with no signal. Agronys keeps them together, so the manager, the vet, and the owner look at the same thing and move on time.",
    why: "Why it is the stronger option",
    whyLead: "See what each alternative covers. Agronys is the one that joins the six things your place needs to look after the money.",
    cmpLabel: "Coverage of six needs on a mixed ranch",
    rows: [
      { name: "Herd software", note: "IPECUS, Huella, GEN.ar, Biotraza" },
      { name: "Crop platform", note: "Auravant, SIMA, GeoAgro, OneSoil, FieldView" },
      { name: "Agronys", note: "Nutrogan, SIGAG, and the numbers of your season, built for your place" },
    ],
    score: (name, n) => `${name}: ${n} of 6`,
    caption: "What each alternative covers",
    colNeed: "What the place needs",
    needs: [
      "The record of each animal",
      "See the grass from above",
      "Know which paddock can hold cattle and which one rests",
      "Keep the day going with no signal",
      "From the phone to the drone, the sensor, or the chute, on the same screen",
      "A tool built for your place",
    ],
    yes: "Yes",
    no: "No",
    note: "The rest covers one part. Agronys gives you the herd, the grass, the day with no signal, and a tool built for your place. That is why you decide sooner, and you do not hear about it after the money is already gone.",
    can: "What you will be able to do",
    canItems: [
      { title: "One look", text: "The herd, the grass, and the day on the lot show up together. You move before you get back to the house." },
      { title: "The day stays logged", text: "With no signal, what you did in the bush is not lost and is not written twice." },
      { title: "Everyone sees the same thing", text: "Manager, vet, and owner decide from the same record of the place." },
      { title: "You hear it in time", text: "Heat, an overloaded paddock, and short grass stop reaching you after the result is already gone." },
    ],
    cta: "I want to see it on my place",
    ctaMsg: "Hello, I want to see how Agronys helps me decide sooner on my place.",
  },
  approach: {
    meta: "Approach · Agronys",
    eyebrow: "Approach · since 2022",
    h1: "What happens in the paddock today has to help you earn.",
    lead: "Heat, head count, how the animals look, and how the grass is have to be seen together. That is how you decide in the field, not after you are back at the office. If your place needs something that is not in the catalog, we build it for you.",
    steps: [
      { title: "The animal does not wait.", text: "A heat spike or an overloaded lot costs you money if you hear about it after it has passed. Here you see it in time." },
      { title: "You keep going with no signal.", text: "You log the day in the bush. You skip rewriting it when you get home." },
      { title: "Everyone looks at the same thing.", text: "Manager, vet, and owner see the same herd record. Fewer trips back and forth, fewer expensive mistakes." },
      { title: "Grass and cattle are the same money.", text: "Seeing them together tells you where to move. Apart, the decision arrives late." },
    ],
  },
  services: {
    meta: "Services · Agronys",
    eyebrow: "Services",
    h1: "What your place adds",
    simulate: "Try a set",
    groups: "Service groups",
    all: "All",
    allLine: "Devices, drones, sensors, and automation, in the same offer.",
    families: {
      celular: { label: "Devices", line: "Phone, tablet, or computer. The project chooses APK or PWA." },
      drones: { label: "Drones", line: "The whole lot, from the air, in the right window." },
      sensores: { label: "Sensors", line: "Water, animal, weight, and weather warn you first." },
      automatizacion: { label: "Automation", line: "Chute, feed, fence, and water work on their own." },
    },
    add: (title) => `Add ${title}`,
    remove: (title) => `Remove ${title}`,
    inTeam: (n) => `${n} in your set`,
    wantTeam: "I want this set",
    ask: (titles) => `Hello, I want these services: ${titles}.`,
    know: "Hello, I want to know the Agronys services.",
    hardware: "You buy the drone, the sensor, and the field equipment. Agronys connects them to the software and handles the reading and processing of what that equipment gathers.",
    items: {
      herd: { title: "The whole herd, in one place", text: "Weights, movements, and care together. You see how each animal and each lot is doing through the season, and you stop deciding from a loose sheet." },
      camera: { title: "The camera watches the animal", text: "It shows how it looks, whether there is a visible mark, and how the manure looks. Manager and vet see the same thing, and you act sooner." },
      alert: { title: "It warns you in time", text: "Heat, health, and handling reach you while you can still do something. You skip the cost of hearing it late." },
      paddock: { title: "Which paddock is paying", text: "You see how many head it can hold, how the grass is, and which lot needs to rest. You move better and look after the place's money." },
      grass: { title: "The grass, seen from above", text: "See which zone is weak without walking the whole place. You go straight where it is needed." },
      daylog: { title: "Record the day in the paddock", text: "You enter it on the spot, even with no signal. When the signal returns, it uploads on its own. You skip writing it again." },
      autoalert: { title: "The alert goes out on its own", text: "A fact in the field sends the message or the sheet. Your people hear it without you chasing them." },
      numbers: { title: "The numbers of your season", text: "Your sheets become a clear screen: what the lot earns, what the paddock can hold, and what the heat cost you." },
      offline: { title: "You keep going with no signal", text: "The day's work does not stop in the bush. You save it there and it shows up at the office when there is signal." },
      droneCount: { title: "The drone that weighs and counts", text: "You fly the lot and see how many animals there are and how their weight looks, without driving them to the chute. You skip a whole day of gathering cattle just to find out." },
      droneApply: { title: "The drone that applies", text: "You cover the lot in the right weather window, without waiting on the slow machine. You do not miss the moment for the grass or the crop." },
      water: { title: "Water sensors", text: "The tank and the water point warn you before they run dry. You stop riding to every trough to know if the herd has water." },
      collar: { title: "The collar on the animal that matters", text: "You know where it is, whether it is eating, and whether its day changed. The alert reaches your phone. It is for the herd you cannot afford to look at late." },
      fence: { title: "The fence you move from the phone", text: "You change where the herd grazes without stringing a new wire. It is the newest way to handle grazing, and the way to rotate grass without a crew." },
      scale: { title: "The scale that weighs as they pass", text: "The animal is weighed on the ordinary walk-through. You see who is gaining and who has stalled, without building a chute day every time you want a number." },
      feeder: { title: "The feeder that measures what each one eats", text: "Each animal leaves a record of how much it ate. You keep the ones that turn feed into kilos and stop feeding blind." },
      station: { title: "The station in your paddock", text: "Rain, heat, and wind from that lot, not from town. It warns you to move, to skip a late penning, and to keep the drone on the ground in wind." },
      chute: { title: "The chute that sorts on its own", text: "The tag recognizes the animal and the gate sends it to the right pen, by weight or by lot. Sorting day gets shorter and misses less." },
      pump: { title: "The pump you start from the phone", text: "Water comes when it is needed, without driving out to the mill. Fewer trips, and the herd is not left waiting." },
    },
  },
  products: {
    meta: "Products · Agronys",
    eyebrow: "Products",
    h1: "Three ways to look after your place's money",
    lead: "Nutrogan and SIGAG let you carry the herd, the paddock, the water, the rain, and the grass in the same place, even with no signal. The numbers of the season turn your sheets into a screen: what the lot earns and where the money is going. If your place needs something else, we build it to measure. It is the most complete way to decide on time.",
    tabs: "Products",
    costs: "What it costs you today",
    helps: "How it helps",
    achieve: "What you will get",
    see: (name) => `I want to see ${name}`,
    seeMsg: (name) => `Hello, I would like a demo of ${name}.`,
    openApp: "Open app · nutrogan.site",
    screens: (name) => `${name} screens`,
    items: {
      nutrogan: {
        name: "Nutrogan",
        line: "Your place, in your pocket",
        chips: ["You keep going with no signal", "You know what each lot earns", "Water and grass in sight"],
        from: "The day in the field does not wait for the signal to come back. If you write it later, it is lost and it costs you money.",
        work: "You record weights, movements, water, and rain on the phone. The map shows the paddocks and how the grass is. When there is signal, it uploads on its own: you skip writing it again at the office.",
        out: "You see which lot is gaining and which water point needs a look, without riding the whole place to find out.",
      },
      sigag: {
        name: "SIGAG",
        line: "The working day, settled",
        chips: ["Herd and paddock together", "Grass and heat", "Camera and voice"],
        from: "Corral and paddock happen on the same day. Today that information slips away between papers.",
        work: "You carry the herd, the paddocks, the feed, and the weather on the phone. The camera shows how the animal looks and you can speak to log the job. Grass is seen from the satellite and heat warns you before penning takes kilos off.",
        out: "You close the day once. Fewer trips, fewer misses, and a faster decision on where to move the herd.",
      },
      precision: {
        name: "The numbers of your season",
        line: "Where the money is going",
        chips: ["Your sheets, clear", "What the lot earns", "The heat, in sight"],
        from: "You already have sheets. What you lack is seeing, at a glance, whether the season is leaving you money.",
        work: "We put them in order and show you what each animal earns per day, how many head the paddock can hold, how many hours of heat worked against you, and how the herd's condition is.",
        out: "You decide with the season in sight, not after the result has already passed.",
      },
    },
  },
  contact: {
    meta: "Contact · Agronys",
    eyebrow: "Contact",
    h1: "Request a presentation",
    lead: "State the type of establishment and the decision you want to organize first. The team replies by email or WhatsApp.",
    mail: "contacto@agronys.com",
    presence: "Where we work",
    foot: "Argentine NEA, Paraguay, and Uruguay.",
    soon: "Coming soon in Brazil and Bolivia.",
  },
  cookies: {
    meta: "Cookies · Agronys",
    eyebrow: "Legal notice",
    h1: "Cookies",
    aria: "Cookies",
    items: [
      { title: "Technical preference", text: "It is stored in the browser if you accepted the notice. It keeps the notice from showing again." },
      { title: "No advertising tracking", text: "This version does not use marketing cookies or third-party advertising cookies." },
      { title: "Control", text: "You can delete the site data from the browser. Questions: contacto@agronys.com." },
    ],
    bar: "We use only a technical preference to remember this notice.",
    more: "More information",
    accept: "Accept",
  },
};

const pt: Pages = {
  about: {
    meta: "Quem somos · Agronys",
    eyebrow: "Quem somos",
    h1: "A melhor forma de ver o seu campo, feita para como você trabalha.",
    lead: "A Agronys arma a ferramenta do seu estabelecimento. Não deixa um pacote genérico. Nutrogan, SIGAG e os números da campanha juntam o rebanho, o pasto e o dinheiro num só lugar. Você decide antes, poupa idas e vê onde o resultado está escapando.",
    factLabels: ["Origem", "Base operativa", "Alcance"],
    facts: ["Argentina · desde 2022", "NEA, Paraguai e Uruguai", "Solução sob medida"],
    body: "Um programa de gado anota o animal. Outro mostra o cultivo. O seu campo precisa dos dois, mais o descanso do potreiro, e de carregar o dia mesmo sem sinal. A Agronys deixa isso junto, para que encarregado, veterinário e dono olhem a mesma coisa e movam a tempo.",
    why: "Por que é a melhor opção",
    whyLead: "Veja o que cada alternativa resolve. A Agronys é a que junta as seis coisas que o seu campo pede para cuidar do dinheiro.",
    cmpLabel: "Cobertura de seis necessidades do estabelecimento misto",
    rows: [
      { name: "Software de rebanho", note: "IPECUS, Huella, GEN.ar, Biotraza" },
      { name: "Plataforma de cultivo", note: "Auravant, SIMA, GeoAgro, OneSoil, FieldView" },
      { name: "Agronys", note: "Nutrogan, SIGAG e os números da sua campanha, sob medida do seu campo" },
    ],
    score: (name, n) => `${name}: ${n} de 6`,
    caption: "O que cada alternativa resolve",
    colNeed: "Necessidade do estabelecimento",
    needs: [
      "A história de cada animal",
      "Ver o pasto de cima",
      "Saber qual potreiro aguenta e qual descansa",
      "Seguir o dia mesmo sem sinal",
      "Do celular ao drone, ao sensor ou ao brete, na mesma tela",
      "Uma ferramenta feita para o seu campo",
    ],
    yes: "Sim",
    no: "Não",
    note: "O resto resolve uma parte. A Agronys deixa o rebanho, o pasto, o dia sem sinal e uma ferramenta armada para o seu campo. Por isso é a opção que faz você decidir antes e evita que você saiba quando o dinheiro já foi.",
    can: "O que você vai poder fazer",
    canItems: [
      { title: "Um só olhar", text: "O rebanho, o pasto e o dia do lote aparecem juntos. Você move antes de voltar para casa." },
      { title: "O dia fica carregado", text: "Mesmo sem sinal, o que você fez no mato não se perde nem se escreve duas vezes." },
      { title: "Todos veem a mesma coisa", text: "Encarregado, veterinário e dono decidem sobre a mesma história do campo." },
      { title: "Você fica sabendo a tempo", text: "O calor, o potreiro carregado e o pasto curto deixam de avisar quando o resultado já foi." },
    ],
    cta: "Quero ver no meu campo",
    ctaMsg: "Olá, quero ver como a Agronys me ajuda a decidir antes no meu campo.",
  },
  approach: {
    meta: "Enfoque · Agronys",
    eyebrow: "Enfoque · desde 2022",
    h1: "O que acontece hoje no lote tem que ajudar você a ganhar.",
    lead: "O calor, a quantidade de animais, como eles vêm e como está o pasto têm que aparecer juntos. Assim você decide no campo, não quando já voltou ao escritório. Se o seu estabelecimento pede algo que não está no catálogo, armamos para você.",
    steps: [
      { title: "O animal não espera.", text: "Um pico de calor ou um lote carregado demais tira dinheiro se você só fica sabendo quando já passou. Aqui você vê a tempo." },
      { title: "Você segue mesmo sem sinal.", text: "Você carrega o dia no mato. Poupa reescrever quando chega em casa." },
      { title: "Todos olham a mesma coisa.", text: "Encarregado, veterinário e dono veem a mesma história do rebanho. Menos idas e voltas, menos erros caros." },
      { title: "O pasto e o gado são o mesmo dinheiro.", text: "Vê-los juntos diz onde mover. Separados, a decisão chega tarde." },
    ],
  },
  services: {
    meta: "Serviços · Agronys",
    eyebrow: "Serviços",
    h1: "O que soma no seu campo",
    simulate: "Simule",
    groups: "Grupos de serviços",
    all: "Tudo",
    allLine: "Dispositivos, drones, sensores e automação, na mesma oferta.",
    families: {
      celular: { label: "Dispositivos", line: "Telefone, tablet ou computador. Conforme o projeto, escolhe-se APK ou PWA." },
      drones: { label: "Drones", line: "O lote inteiro, do ar, no momento certo." },
      sensores: { label: "Sensores", line: "Água, animal, peso e clima avisam antes." },
      automatizacion: { label: "Automação", line: "Brete, comida, cerca e água trabalham sozinhos." },
    },
    add: (title) => `Somar ${title}`,
    remove: (title) => `Tirar ${title}`,
    inTeam: (n) => `${n} no seu conjunto`,
    wantTeam: "Quero este conjunto",
    ask: (titles) => `Olá, quero estes serviços: ${titles}.`,
    know: "Olá, quero conhecer os serviços da Agronys.",
    hardware: "O drone, o sensor e o equipamento de campo você compra. A Agronys conecta ao software e cuida da leitura e do processamento do que esse equipamento junta.",
    items: {
      herd: { title: "Todo o rebanho, num só lugar", text: "Pesagens, movimentos e cuidados juntos. Você vê como vem cada animal e cada lote durante a campanha, e deixa de decidir com um papel solto." },
      camera: { title: "A câmera olha o animal", text: "Mostra como está, se há uma marca visível e como vem o esterco. Encarregado e veterinário olham a mesma coisa, e você age antes." },
      alert: { title: "Avisa a tempo", text: "Calor, sanidade e manejo chegam quando você ainda pode fazer algo. Você evita o susto de ficar sabendo tarde." },
      paddock: { title: "Qual potreiro rende", text: "Você vê quanto gado aguenta, como vem o pasto e qual lote precisa descansar. Move melhor e cuida do dinheiro do campo." },
      grass: { title: "O pasto, visto de cima", text: "Veja qual zona está fraca sem caminhar o estabelecimento inteiro. Você vai direto aonde faz falta." },
      daylog: { title: "Anote o dia no lote", text: "Você carrega no lugar, mesmo sem sinal. Quando volta, sobe sozinho. Você poupa escrever de novo." },
      autoalert: { title: "O aviso sai sozinho", text: "Um fato do campo dispara a mensagem ou a planilha. A sua gente fica sabendo sem que você precise ir atrás." },
      numbers: { title: "Os números da sua campanha", text: "As suas planilhas passam a uma tela clara: quanto o lote ganha, quanto o potreiro aguenta e quanto o calor pesou." },
      offline: { title: "Você segue mesmo sem sinal", text: "O trabalho do dia não corta no mato. Você guarda ali e aparece no escritório quando há sinal." },
      droneCount: { title: "O drone que pesa e conta", text: "Você sobrevoa o lote e vê quantos animais há e como vêm de peso, sem arrebanhar até o brete. Poupa o dia de juntar gado só para ficar sabendo." },
      droneApply: { title: "O drone que aplica", text: "Você cobre o lote na janela certa de clima, sem esperar a máquina lenta. Não perde o momento do pasto ou do cultivo." },
      water: { title: "Sensores de água", text: "O tanque e a aguada avisam antes de secar. Você deixa de percorrer cada bebedouro para saber se o gado tem água." },
      collar: { title: "A coleira do animal que importa", text: "Você sabe onde está, se está comendo e se algo mudou no dia. O aviso chega ao telefone. É para o rebanho que você não pode olhar tarde." },
      fence: { title: "A cerca que você move do telefone", text: "Você muda por onde o gado come sem esticar um arame novo. É o mais novo do manejo, e a forma de rotar o pasto sem uma equipe." },
      scale: { title: "A balança que pesa ao passar", text: "O animal se pesa na passagem de todos os dias. Você vê quem ganha e quem estagnou, sem armar uma jornada de brete cada vez que quer um número." },
      feeder: { title: "O cocho que mede o que cada um come", text: "Cada animal deixa registrado quanto comeu. Você fica com os que convertem comida em quilos e deixa de alimentar no escuro." },
      station: { title: "A estação do seu potreiro", text: "Chuva, calor e vento daquele lote, não da cidade. Avisa para mover, para não fechar tarde e para não voar o drone com vento." },
      chute: { title: "O brete que aparta sozinho", text: "O brinco reconhece o animal e a porteira manda ao curral certo, por peso ou por lote. A jornada de aparte encolhe e erra menos." },
      pump: { title: "A bomba que você liga do telefone", text: "A água sai quando faz falta, sem ir até o moinho. Menos viagens e o gado não fica esperando." },
    },
  },
  products: {
    meta: "Produtos · Agronys",
    eyebrow: "Produtos",
    h1: "Três formas de cuidar do dinheiro do seu campo",
    lead: "Nutrogan e SIGAG deixam você levar o gado, o potreiro, a água, a chuva e o pasto no mesmo lugar, mesmo sem sinal. Os números da campanha transformam as suas planilhas numa tela: quanto o lote ganha e onde o dinheiro está indo. Se o seu campo pede outra coisa, armamos sob medida. É o mais completo que você pode ter para decidir a tempo.",
    tabs: "Produtos",
    costs: "O que hoje custa",
    helps: "Como ajuda",
    achieve: "O que você vai conseguir",
    see: (name) => `Quero ver ${name}`,
    seeMsg: (name) => `Olá, quero pedir uma demo de ${name}.`,
    openApp: "Abrir app · nutrogan.site",
    screens: (name) => `Telas de ${name}`,
    items: {
      nutrogan: {
        name: "Nutrogan",
        line: "O seu estabelecimento, no bolso",
        chips: ["Você segue sem sinal", "Sabe quanto cada lote ganha", "Água e pasto à vista"],
        from: "O dia no campo não espera o sinal voltar. Se você anota depois, perde e custa dinheiro.",
        work: "Você anota pesos, movimentos, a água e a chuva no celular. O mapa mostra os potreiros e como vem o pasto. Quando há sinal, sobe sozinho: você poupa escrever de novo no escritório.",
        out: "Você vai ver qual lote está ganhando e qual aguada precisa de olhar, sem percorrer o campo inteiro para ficar sabendo.",
      },
      sigag: {
        name: "SIGAG",
        line: "O dia de trabalho, resolvido",
        chips: ["Gado e potreiro juntos", "O pasto e o calor", "Câmera e voz"],
        from: "Curral e potreiro passam na mesma jornada. Hoje essa informação escapa entre papéis.",
        work: "Você leva o gado, os potreiros, a comida e o clima no telefone. A câmera mostra como o animal está e você pode falar para anotar a tarefa. O pasto se vê do satélite e o calor avisa antes de o encerramento tirar quilos.",
        out: "Você fecha o dia uma só vez. Menos voltas, menos esquecimentos e uma decisão mais rápida sobre onde mover o gado.",
      },
      precision: {
        name: "Os números da sua campanha",
        line: "Onde o dinheiro está indo",
        chips: ["As suas planilhas, claras", "Quanto o lote ganha", "O calor, à vista"],
        from: "Você já tem planilhas. O que falta é ver, num relance, se a campanha está deixando dinheiro.",
        work: "Organizamos e mostramos quanto cada animal ganha por dia, quanto gado o potreiro aguenta, quantas horas de calor jogaram contra e como vem a condição do rebanho.",
        out: "Você decide com a campanha à vista, e não quando o resultado já passou.",
      },
    },
  },
  contact: {
    meta: "Contato · Agronys",
    eyebrow: "Contato",
    h1: "Solicite uma apresentação",
    lead: "Indique o tipo de estabelecimento e a decisão que deseja ordenar primeiro. A equipe responde por correio ou por WhatsApp.",
    mail: "contacto@agronys.com",
    presence: "Presença",
    foot: "NEA argentino, Paraguai e Uruguai.",
    soon: "Em breve no Brasil e na Bolívia.",
  },
  cookies: {
    meta: "Cookies · Agronys",
    eyebrow: "Marco legal",
    h1: "Cookies",
    aria: "Cookies",
    items: [
      { title: "Preferência técnica", text: "Fica guardada no navegador se você aceitou o aviso. Serve para não mostrá-lo de novo." },
      { title: "Sem rastreamento publicitário", text: "Esta versão não usa cookies de marketing nem de publicidade de terceiros." },
      { title: "Controle", text: "Você pode apagar os dados do site no navegador. Consultas: contacto@agronys.com." },
    ],
    bar: "Usamos só uma preferência técnica para lembrar este aviso.",
    more: "Mais informação",
    accept: "Aceitar",
  },
};

const zh: Pages = {
  about: {
    meta: "关于我们 · Agronys",
    eyebrow: "关于我们",
    h1: "看清你的牧场，按你干活的方式来做。",
    lead: "Agronys 为你的场子做工具，不丢给你一套通用软件。Nutrogan、SIGAG 和产季数字把牛群、草和钱放在一处。你更早做决定，少跑路，也看得见结果从哪里漏掉。",
    factLabels: ["起点", "作业范围", "做到哪一步"],
    facts: ["阿根廷 · 自 2022", "东北部、巴拉圭和乌拉圭", "按你的场子来做"],
    body: "一套养牛软件记下牲畜。另一套给你看作物。你的场子两样都要，还要围栏休息，并且没信号也能记下这一天。Agronys 把它们放在一起，让负责人、兽医和场主看同一件事，并及时挪动。",
    why: "为什么这是更合适的选择",
    whyLead: "看看每种做法能解决什么。Agronys 把你的场子看住钱所需要的六件事放在一处。",
    cmpLabel: "混合牧场六项需要的覆盖",
    rows: [
      { name: "牛群软件", note: "IPECUS、Huella、GEN.ar、Biotraza" },
      { name: "作物平台", note: "Auravant、SIMA、GeoAgro、OneSoil、FieldView" },
      { name: "Agronys", note: "Nutrogan、SIGAG 和你这个产季的数字，按你的场子来做" },
    ],
    score: (name, n) => `${name}：6 项里的 ${n} 项`,
    caption: "每种做法解决什么",
    colNeed: "场子需要什么",
    needs: [
      "每头牛的记录",
      "从上面看草",
      "知道哪一块围栏还能扛、哪一块该休息",
      "没有信号也继续这一天",
      "从手机到无人机、传感器或分群通道，同一块屏幕",
      "按你的场子做的工具",
    ],
    yes: "是",
    no: "否",
    note: "别的做法只解决一块。Agronys 给你牛群、草、没信号的一天，以及按你的场子做的工具。所以你更早做决定，不必等钱已经走了才知道。",
    can: "你将能做的事",
    canItems: [
      { title: "一眼看全", text: "牛群、草和地块上的这一天放在一起。你回到房子之前就能挪动。" },
      { title: "这一天留得住", text: "没有信号，你在林子里做的事也不会丢，也不用写两遍。" },
      { title: "大家看的是同一件事", text: "负责人、兽医和场主按同一份场子记录做决定。" },
      { title: "你及时知道", text: "高温、装得太满的围栏和短草，不必等结果已经没了才告诉你。" },
    ],
    cta: "我想在我的场子上看",
    ctaMsg: "你好，我想看看 Agronys 怎么帮我在场子上更早做决定。",
  },
  approach: {
    meta: "方法 · Agronys",
    eyebrow: "方法 · 自 2022",
    h1: "今天地块里发生的事，要帮你赚到。",
    lead: "高温、头数、牛的样子和草的情况要一起看见。这样你在场上做决定，而不是回到办公室以后。如果你的场子要的东西不在目录里，我们按你的来做。",
    steps: [
      { title: "牛不等你。", text: "一阵高温或一块装得太满的地，等你事后才知道，钱已经没了。在这里你及时看见。" },
      { title: "没有信号你也继续。", text: "你在林子里记下这一天。回到家里不用再写一遍。" },
      { title: "大家看的是同一件事。", text: "负责人、兽医和场主看同一份牛群记录。少来回，少犯贵的错。" },
      { title: "草和牛群是同一笔钱。", text: "放在一起看，才知道往哪挪。分开看，决定就晚了。" },
    ],
  },
  services: {
    meta: "服务 · Agronys",
    eyebrow: "服务",
    h1: "给你的场子加上的东西",
    simulate: "试一组",
    groups: "服务分组",
    all: "全部",
    allLine: "设备、无人机、传感器和自动化，在同一份方案里。",
    families: {
      celular: { label: "设备", line: "手机、平板或电脑。按项目选 APK 或 PWA。" },
      drones: { label: "无人机", line: "整块地，从空中，赶在合适的时候。" },
      sensores: { label: "传感器", line: "水、牲畜、体重和天气先提醒你。" },
      automatizacion: { label: "自动化", line: "分群通道、饲料、围栏和水自己干活。" },
    },
    add: (title) => `加上${title}`,
    remove: (title) => `去掉${title}`,
    inTeam: (n) => `你的组合里有 ${n} 项`,
    wantTeam: "我要这一组",
    ask: (titles) => `你好，我要这些服务：${titles}。`,
    know: "你好，我想了解 Agronys 的服务。",
    hardware: "无人机、传感器和场上的设备由你购买。Agronys 把它们接到软件上，负责读取和处理这些设备收集到的内容。",
    items: {
      herd: { title: "整群牛，放在一处", text: "称重、调动和照料放在一起。整个产季你看得到每头牛、每一块地怎么样，不再靠一张散页做决定。" },
      camera: { title: "摄像头看着这头牛", text: "它显示体况、有没有看得见的标记、粪便怎么样。负责人和兽医看同一件事，你更早动手。" },
      alert: { title: "它及时提醒你", text: "高温、健康和操作在你还来得及的时候送到。你少付事后才知道的代价。" },
      paddock: { title: "哪一块围栏在出效益", text: "你看见能扛多少头、草怎么样、哪一块该休息。调动更准，也看住场上的钱。" },
      grass: { title: "草，从上面看", text: "不用走遍整场，就看见哪一带弱了。你直接去该去的地方。" },
      daylog: { title: "在地块里记下这一天", text: "你在原地记，没有信号也行。信号回来，它自己上传。你不用再写一遍。" },
      autoalert: { title: "提醒自己发出去", text: "场上的一件事发出消息或表格。你的人自己知道，不用你一个个去追。" },
      numbers: { title: "你这个产季的数字", text: "你的表格变成一块清楚的屏幕：地块赚多少、围栏能扛多少、高温花了你多少。" },
      offline: { title: "没有信号你也继续", text: "这一天的活在林子里不停。你存在那里，有信号时它出现在办公室。" },
      droneCount: { title: "称重和点数的无人机", text: "你飞过地块，看见有多少头、体重怎么样，不用把它们赶到分群通道。你省下整天聚牛只为了知道一个数。" },
      droneApply: { title: "施药的无人机", text: "你在合适的天气窗口覆盖地块，不用等慢机器。草或作物的时机不会错过。" },
      water: { title: "水传感器", text: "水箱和饮水点在干之前提醒你。你不用跑遍每个水槽才知道牛有没有水。" },
      collar: { title: "关键牲畜的项圈", text: "你知道它在哪、在不在吃、这一天有没有变。提醒送到手机。这是你不能晚看的那群牛。" },
      fence: { title: "从手机挪动的围栏", text: "你改牛在哪吃草，不用新拉一道铁丝。这是最新的放牧办法，也是不用一队人就轮牧的办法。" },
      scale: { title: "走过就称的磅", text: "牛在每天经过时被称重。你看见谁在增、谁停了，不用每次想要一个数就安排一整天分群。" },
      feeder: { title: "量出每头吃了多少的料槽", text: "每头牛留下吃了多少的记录。你留下把饲料变成公斤的，不再瞎喂。" },
      station: { title: "你这块围栏的气象站", text: "雨、高温和风来自这一块地，不是镇上。它提醒你该挪、下午别关栏，以及有风时别飞无人机。" },
      chute: { title: "自己分群的通道", text: "耳标认出这头牛，门按体重或地块把它送到该去的栏。分群这一天更短，也更少分错。" },
      pump: { title: "从手机启动的泵", text: "需要水的时候水就来，不用开车到风车那边。少跑路，牛也不用干等。" },
    },
  },
  products: {
    meta: "产品 · Agronys",
    eyebrow: "产品",
    h1: "看住场上这笔钱的三种做法",
    lead: "Nutrogan 和 SIGAG 让你把牛群、围栏、水、雨和草放在同一处，没有信号也行。产季数字把你的表格变成一块屏幕：地块赚多少、钱从哪里走。如果你的场子要别的，我们按你的来做。这是你能及时做决定的最完整办法。",
    tabs: "产品",
    costs: "今天它花你什么",
    helps: "它怎么帮你",
    achieve: "你会得到什么",
    see: (name) => `我想看 ${name}`,
    seeMsg: (name) => `你好，我想要 ${name} 的演示。`,
    openApp: "打开应用 · nutrogan.site",
    screens: (name) => `${name} 的画面`,
    items: {
      nutrogan: {
        name: "Nutrogan",
        line: "你的场子，在口袋里",
        chips: ["没有信号也继续", "知道每一块地赚多少", "水和草都看得见"],
        from: "场上的这一天不等信号回来。事后再记，就丢了，也花你的钱。",
        work: "你在手机上记体重、调动、水和雨。地图显示围栏和草的情况。有信号时它自己上传：你不用在办公室再写一遍。",
        out: "你看得见哪一块地在增重、哪一处饮水该看，不用跑遍整场才知道。",
      },
      sigag: {
        name: "SIGAG",
        line: "这一天的活，收干净",
        chips: ["牛群和围栏在一起", "草和高温", "摄像头和语音"],
        from: "牛栏和围栏发生在同一天。今天这些情况散在纸页之间。",
        work: "你在手机上带着牛群、围栏、饲料和天气。摄像头显示牛怎么样，你也可以说话记下这件事。草从卫星上看，高温在关栏掉公斤之前提醒你。",
        out: "这一天你只收一次。少跑、少忘，也更快决定把牛往哪挪。",
      },
      precision: {
        name: "你这个产季的数字",
        line: "钱从哪里走",
        chips: ["你的表格，清楚", "地块赚多少", "高温，看得见"],
        from: "你已经有表格。缺的是一眼看清这个产季有没有给你留下钱。",
        work: "我们把它们理清，给你看每头牛每天赚多少、围栏能扛多少头、多少小时高温跟你作对，以及牛群状况怎么样。",
        out: "你看着这个产季做决定，而不是等结果已经过去。",
      },
    },
  },
  contact: {
    meta: "联系 · Agronys",
    eyebrow: "联系",
    h1: "申请一次介绍",
    lead: "请说明牧场类型，以及希望先理清的决策。团队通过邮件或 WhatsApp 回复。",
    mail: "contacto@agronys.com",
    presence: "我们在的地方",
    foot: "阿根廷东北部、巴拉圭和乌拉圭。",
    soon: "即将进入巴西和玻利维亚。",
  },
  cookies: {
    meta: "Cookies · Agronys",
    eyebrow: "法律说明",
    h1: "Cookies",
    aria: "Cookies",
    items: [
      { title: "技术偏好", text: "如果你接受了这条提示，它存在浏览器里。用来不再重复显示。" },
      { title: "没有广告跟踪", text: "这个版本不使用营销 cookie，也不使用第三方广告 cookie。" },
      { title: "控制", text: "你可以在浏览器里删除本站数据。咨询：contacto@agronys.com。" },
    ],
    bar: "我们只用一项技术偏好来记住这条提示。",
    more: "更多说明",
    accept: "接受",
  },
};

const gn: Pages = {
  about: {
    meta: "Ore rehegua · Agronys",
    eyebrow: "Ore rehegua",
    h1: "Pe forma iporãvéva rehecha haguã nde kokue, ojejapóva pe rejapoháicha.",
    lead: "Agronys ojapo pe tembiporu nde estancia pegua. Nome'ẽi ndéve peteĩ paquete oñondiveguáva. Nutrogan, SIGAG ha campaña papapy ombojoaju vaka, kapi'i ha viru peteĩ tendápe. Rejapóta mboyve, sa'ive reho ha rehecha moõpa osẽ pe resultado.",
    factLabels: ["Moõguipa", "Moõpa romba'apo", "Moõ peve"],
    facts: ["Argentina · 2022 guive", "NEA, Paraguái ha Uruguái", "Ojejapo nde kokue rehe"],
    body: "Peteĩ programa vaka rehegua omoĩ mymbápe. Ambue ohechauka ñemitỹ. Nde kokue oikotevẽ mokõive, potrero pytuhẽ avei, ha emoĩ haguã pe ára señal'ỹramo jepe. Agronys oheja oñondive, encargado, veterinario ha jára ohecha haguã peteĩ mba'e ha omýi árape.",
    why: "Mba'érepa kóva porãve",
    whyLead: "Ehecha mba'épa ombohovái peteĩteĩva. Agronys ombojoaju pe poteĩ mba'e nde kokue ojeruréva reñangareko haguã virúre.",
    cmpLabel: "Poteĩ tekotevẽ estancia mixto pegua",
    rows: [
      { name: "Software vaka rehegua", note: "IPECUS, Huella, GEN.ar, Biotraza" },
      { name: "Plataforma ñemitỹ rehegua", note: "Auravant, SIMA, GeoAgro, OneSoil, FieldView" },
      { name: "Agronys", note: "Nutrogan, SIGAG ha nde campaña papapy, nde kokue rehe" },
    ],
    score: (name, n) => `${name}: ${n} 6 gui`,
    caption: "Mba'épa ombohovái peteĩteĩva",
    colNeed: "Mba'e oikotevẽ estancia",
    needs: [
      "Peteĩteĩva mymba marandu",
      "Ehecha kapi'i yvategui",
      "Reikuaa mávapa potrero oguerekokuaa ha mávapa opytuhẽ",
      "Reku'e pe ára señal'ỹramo jepe",
      "Pumbyry guive dron, sensor térã manga peve, peteĩ pantallápe",
      "Peteĩ tembiporu nde kokue rehegua",
    ],
    yes: "Hẽe",
    no: "Nahániri",
    note: "Umi ambue ombohovái peteĩ vore. Agronys ome'ẽ ndéve vaka, kapi'i, pe ára señal'ỹre ha peteĩ tembiporu nde kokue rehegua. Upévare rejapóta mboyve ha ndereikuaái viru oho rire.",
    can: "Mba'e reikokuaáta",
    canItems: [
      { title: "Peteĩ jehecha", text: "Vaka, kapi'i ha pe ára lote-pe ojehecha oñondive. Remongy mboyve reguahẽ ógape." },
      { title: "Pe ára opyta", text: "Señal'ỹramo jepe, rejapóva ka'aguýpe ndoikéi ha ndehaíri mokõi jey." },
      { title: "Opavave ohecha peteĩ mba'e", text: "Encargado, veterinario ha jára ojapo peteĩ marandu kokue rehegua." },
      { title: "Reikuaa árape", text: "Haku, potrero hetáva ha kapi'i mbyky nde'éi ndéve oho rire pe resultado." },
    ],
    cta: "Ahechase nde kokue-pe",
    ctaMsg: "Mba'éichapa, ahechase mba'éichapa Agronys oipytyvõta chéve ajapo mboyve che kokue-pe.",
  },
  approach: {
    meta: "Mba'éichapa · Agronys",
    eyebrow: "Mba'éichapa · 2022 guive",
    h1: "Oikóva ko ára pe lote-pe oipytyvõva'erã ndéve regana haguã.",
    lead: "Haku, mymba retakue, mba'éichapa ou ha mba'éichapa oĩ kapi'i ojehechava'erã oñondive. Upéicha rejapóta kokuépe, ndaha'éi reguahẽ rire oficina-pe. Nde estancia ojeruréramo mba'e ndaipóri catálogo-pe, rojapo ndéve g̃uarã.",
    steps: [
      { title: "Mymba ndoha'arõi.", text: "Peteĩ haku tuicha térã peteĩ lote hetáva ome'ẽ gasto reikuaáramo ohasa rire. Ko'ápe rehecha árape." },
      { title: "Reku'e señal'ỹramo jepe.", text: "Remoĩ pe ára ka'aguýpe. Nderehaijeyvéima reguahẽ vove ógape." },
      { title: "Opavave oma'ẽ peteĩ mba'e rehe.", text: "Encargado, veterinario ha jára ohecha peteĩ marandu vaka rehegua. Sa'ive jehasa, sa'ive jejavy hepy." },
      { title: "Kapi'i ha vaka ha'e peteĩ viru.", text: "Rehecha oñondive, reikuaa moõpa remongy. Oñombyréramo, pe ñe'ẽ osẽ mboyve." },
    ],
  },
  services: {
    meta: "Mba'eporu · Agronys",
    eyebrow: "Mba'eporu",
    h1: "Mba'e omoĩvéva nde kokue",
    simulate: "Eha'ã",
    groups: "Mba'eporu aty",
    all: "Opa",
    allLine: "Dispositivo, dron, sensor ha automatización, peteĩ ofrépe.",
    families: {
      celular: { label: "Dispositivo", line: "Pumbyry, tablet térã computadora. Proyecto rehe oñeiparavo APK térã PWA." },
      drones: { label: "Drones", line: "Pe lote tuichakue, yvategui, pe ára oĩ porãhápe." },
      sensores: { label: "Sensores", line: "Y, mymba, pohýi ha ára omondýi ndéve mboyve." },
      automatizacion: { label: "Automatización", line: "Manga, tembi'u, cerco ha y omba'apo ijehegui." },
    },
    add: (title) => `Emoĩ ${title}`,
    remove: (title) => `Eipe'a ${title}`,
    inTeam: (n) => `${n} nde atýpe`,
    wantTeam: "Aipota ko aty",
    ask: (titles) => `Mba'éichapa, aipota ko'ã mba'eporu: ${titles}.`,
    know: "Mba'éichapa, aikuaase Agronys mba'eporu.",
    hardware: "Dron, sensor ha equipo kokue pegua rejoguákuri nde. Agronys ombojoaju software-pe ha ojapo lectura ha procesamiento upe equipo ombyatyva'ekue rehe.",
    items: {
      herd: { title: "Opa vaka, peteĩ tendápe", text: "Pohýi, jehasa ha ñangareko oñondive. Rehecha mba'éichapa ou peteĩteĩva mymba ha lote campaña pukukue, ha nderejapovéima peteĩ kuatia rupive año." },
      camera: { title: "Cámara oma'ẽ mymba rehe", text: "Ohechauka mba'éichapa oĩ, oĩpa peteĩ marca ojekuaáva ha mba'éichapa ou hetepy. Encargado ha veterinario oma'ẽ peteĩ mba'e rehe, ha rejapo mboyve." },
      alert: { title: "Omondýi ndéve árape", text: "Haku, tesãi ha manejo oguahẽ ikatúramo gueteri rejapo. Ndehepyme'ẽvéima reikuaa rei haguã." },
      paddock: { title: "Máva potrero ombohekovia", text: "Rehecha mboy vaka oguerekokuaápa, mba'éichapa ou kapi'i ha mávapa lote oikotevẽ pytuhẽ. Remongy porãve ha reñangareko virúre." },
      grass: { title: "Kapi'i, yvategui ojehecha", text: "Ehecha moõpa imbovu'i, ndereguatái opa estanciápe. Reho tapykue oikotevẽhápe." },
      daylog: { title: "Emoĩ pe ára pe lote-pe", text: "Remoĩ upépe, señal'ỹramo jepe. Ou jey vove, ohupi ijehegui. Nderehaijeyvéima." },
      autoalert: { title: "Pe marandu osẽ ijehegui", text: "Peteĩ mba'e kokuépe omondo marandu térã kuatia. Nde gente oikuaa, nderejagarrái." },
      numbers: { title: "Nde campaña papapy", text: "Nde kuatia oiko peteĩ pantalla hesakãva: mboy oganápa lote, mboy oguerekokuaápa potrero ha mboy ohepyme'ẽ ndéve haku." },
      offline: { title: "Reku'e señal'ỹramo jepe", text: "Pe ára rembiapo ndopéi ka'aguýpe. Remoĩ upépe ha ojekuaa oficina-pe oĩ vove señal." },
      droneCount: { title: "Dron opohýi ha oipapa", text: "Revove pe lote ha rehecha mboy mymba oĩ ha mba'éichapa ou pohýi, erahá'ỹre manga peve. Nderejerevéima peteĩ ára embyaty haguã vaka reikuaa haguã año." },
      droneApply: { title: "Dron omboja", text: "Remo'ã pe lote pe ára oĩ porãhápe, eha'arõ'ỹre pe máquina imbegue. Nderehasái pe ára kapi'i térã ñemitỹ pegua." },
      water: { title: "Sensor y rehegua", text: "Tanque ha aguada omondýi ndéve opiru mboyve. Nderejerevéima peteĩteĩva yryru reikuaa haguã oĩpa y vaka kuérape." },
      collar: { title: "Collar upe mymba iñimportantéva", text: "Reikuaa moõpa oĩ, ho'úpa ha oñembyaipa pe ára. Pe marandu oguahẽ pumbyrýpe. Ha'e upe rodeo nderehechái rei va'erã." },
      fence: { title: "Cerco remongýva pumbyry guive", text: "Remoambue moõpa ho'u vaka, emoĩ'ỹre alambre pyahu. Ha'e pe manejo ipyahuvéva, ha pe forma erotaciona haguã kapi'i peteĩ cuadrilla'ỹre." },
      scale: { title: "Balanza opohýi ohasávo", text: "Mymba opohy'o pe jehasa ára ha ára. Rehecha mávapa ogana ha mávapa opyta, eguerekó'ỹre peteĩ ára manga rehe rejapo jey vove peteĩ papapy." },
      feeder: { title: "Comedero oha'ãva ho'u peteĩteĩva", text: "Peteĩteĩva mymba oheja mboy ho'u hague. Repytákuri umi ombohasáva tembi'u kilo-pe ha rehejarei ho'u haguã resa'ỹre." },
      station: { title: "Estación nde potrero pegua", text: "Ky, haku ha yvytu upe lote pegua, ndaha'éi táva pegua. Omondýi remongy haguã, ani remboty ka'arúpe ha ani revéve dron yvytu rehe." },
      chute: { title: "Manga oipe'áva ijehegui", text: "Caravana ohechakuaa mymba ha okẽ omondo pe korral oĩ porãvape, pohýi térã lote rupive. Pe ára jepe'a michĩve ha ojavy sa'ive." },
      pump: { title: "Bomba remoñepyrũva pumbyry guive", text: "Y osẽ oikotevẽ vove, reho'ỹre molino peve. Sa'ive jehasa ha vaka kuéra ndoha'arõvéima." },
    },
  },
  products: {
    meta: "Apopyre · Agronys",
    eyebrow: "Apopyre",
    h1: "Mbohapy forma reñangareko haguã virúre nde kokue-pe",
    lead: "Nutrogan ha SIGAG ome'ẽ ndéve rerahávo vaka, potrero, y, ky ha kapi'i peteĩ tendápe, señal'ỹramo jepe. Campaña papapy ombohasa nde kuatia peteĩ pantallápe: mboy oganápa lote ha moõpa osẽ viru. Nde kokue ojeruréramo ambue mba'e, rojapo ndéve g̃uarã. Ha'e pe tuichavéva rejapo haguã árape.",
    tabs: "Apopyre",
    costs: "Mba'e ome'ẽ ndéve gasto ko'ágã",
    helps: "Mba'éichapa oipytyvõ",
    achieve: "Mba'e reguahẽta",
    see: (name) => `Ahechase ${name}`,
    seeMsg: (name) => `Mba'éichapa, aipota peteĩ jehechauka ${name} rehegua.`,
    openApp: "Eike app · nutrogan.site",
    screens: (name) => `${name} pantalla`,
    items: {
      nutrogan: {
        name: "Nutrogan",
        line: "Nde estancia, nde bolsillo-pe",
        chips: ["Reku'e señal'ỹre", "Reikuaa mboy oganápa peteĩteĩva lote", "Y ha kapi'i jesareko pe"],
        from: "Pe ára kokuépe ndoha'arõi señal ou jey. Remoĩ rire, okañy ha ome'ẽ gasto.",
        work: "Remoĩ pohýi, jehasa, y ha ky pumbyrýpe. Mapa ohechauka potrero ha mba'éichapa ou kapi'i. Oĩ vove señal, ohupi ijehegui: nderehaijeyvéima oficina-pe.",
        out: "Rehechákuri mávapa lote ogana ha mávapa aguada ema'ẽ, nderejerepáire opa kokue reikuaa haguã.",
      },
      sigag: {
        name: "SIGAG",
        line: "Pe ára rembiapo, oĩma",
        chips: ["Vaka ha potrero oñondive", "Kapi'i ha haku", "Cámara ha ñe'ẽ"],
        from: "Korral ha potrero oiko peteĩ árape. Ko'ágã upe marandu osẽ kuatia apytépe.",
        work: "Rerahákuri vaka, potrero, tembi'u ha ára pumbyrýpe. Cámara ohechauka mba'éichapa oĩ mymba ha reñe'ẽkuaa remoĩ haguã pe tembiapo. Kapi'i ojehecha satélite guive ha haku omondýi ñemboty ome'ẽ mboyve gasto kilo.",
        out: "Remboty pe ára peteĩ jey. Sa'ive jere, sa'ive nderesarái ha peteĩ ñe'ẽ pya'eve moõpa remongy vaka.",
      },
      precision: {
        name: "Nde campaña papapy",
        line: "Moõpa osẽ viru",
        chips: ["Nde kuatia, hesakã", "Mboy oganápa lote", "Haku, jesareko pe"],
        from: "Reguereko ma kuatia. Nderehechái, peteĩ ma'ẽme, campaña ome'ẽpa ndéve viru.",
        work: "Romoĩ porã ha rohechauka mboy oganápa peteĩteĩva mymba peteĩ árape, mboy vaka oguerekokuaápa potrero, mboy aravo haku ohepyme'ẽ ndéve ha mba'éichapa ou rodeo.",
        out: "Rejapókuri campaña jesareko pe, ndaha'éi resultado ohasa rire.",
      },
    },
  },
  contact: {
    meta: "Ñe'ẽjoaju · Agronys",
    eyebrow: "Ñe'ẽjoaju",
    h1: "Ejerure peteĩ jehechauka",
    lead: "Emoĩ tipo de establecimiento ha mba'épa reipota ñemohenda raẽ. Equipo ombohovái correo térã WhatsApp rupive.",
    mail: "contacto@agronys.com",
    presence: "Moõpa roime",
    foot: "NEA Argentina pegua, Paraguái ha Uruguái.",
    soon: "Ag̃uahẽta Brasil ha Bolivia-pe.",
  },
  cookies: {
    meta: "Cookies · Agronys",
    eyebrow: "Léi",
    h1: "Cookies",
    aria: "Cookies",
    items: [
      { title: "Preferencia técnica", text: "Oñeñongatu navegador-pe reaseptáramo pe marandu. Oipytyvõ ani ojehechauka jey." },
      { title: "Publicidad ñeha'ã'ỹre", text: "Ko versión ndoiporúi cookie marketing rehegua ni publicidad ambue mba'e pegua." },
      { title: "Ñangareko", text: "Reipe'akuaa pe sitio mba'ekuaarã navegador guive. Porandu: contacto@agronys.com." },
    ],
    bar: "Roiporu peteĩ preferencia técnica año roikuaa haguã ko marandu.",
    more: "Marandu hetave",
    accept: "Aasepta",
  },
};

export const PAGES: Record<"es" | "en" | "pt" | "zh" | "gn", Pages> = { es, en, pt, zh, gn };
