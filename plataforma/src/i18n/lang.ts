export const LANGS = [
  { id: "es", label: "ES", title: "Español", html: "es" },
  { id: "en", label: "EN", title: "English", html: "en" },
  { id: "pt", label: "PT", title: "Português", html: "pt" },
  { id: "zh", label: "中", title: "中文", html: "zh-CN" },
  { id: "gn", label: "GN", title: "Guaraní", html: "gn" },
] as const;

export type Lang = (typeof LANGS)[number]["id"];

const KEY = "agronys-lang";
const IDS = new Set<string>(LANGS.map((item) => item.id));

export type LayerId =
  | "ganaderia"
  | "vision"
  | "datos"
  | "agro"
  | "satelital"
  | "orquestacion"
  | "automat"
  | "dataeng"
  | "offline";

export type TipId =
  | "fire"
  | "flood"
  | "drought"
  | "frost"
  | "hail"
  | "storm"
  | "snow"
  | "rain"
  | "fog"
  | "heatHigh"
  | "heat"
  | "wind"
  | "night"
  | "dusk"
  | "dawn"
  | "clear";

type LayerText = {
  title: string;
  kicker: string;
  lead: string;
  brief: string;
  facts: [string, string];
};

type Pack = {
  langLabel: string;
  account: string;
  navLabel: string;
  svc: string;
  climate: string;
  locating: string;
  reading: string;
  demo: string;
  seeLine: string;
  close: string;
  demoMsg: (title: string) => string;
  nav: { portal: string; about: string; approach: string; services: string; products: string; contact: string };
  phase: { night: string; dusk: string; dawn: string; day: string };
  wx: {
    clear: string;
    cloud: string;
    rain: string;
    storm: string;
    hail: string;
    fog: string;
    snow: string;
    flood: string;
    fire: string;
    frost: string;
    drought: string;
  };
  tips: Record<TipId, string>;
  layers: Record<LayerId, LayerText>;
};

const es: Pack = {
  langLabel: "Idioma",
  account: "Cuenta",
  navLabel: "Secciones del sitio",
  svc: "Lecturas del establecimiento",
  climate: "Clima y recomendación",
  locating: "Ubicando…",
  reading: "Lectura del clima en el lugar desde el que abre Agronys.",
  demo: "Solicitar presentación",
  seeLine: "Ver la línea",
  close: "Cerrar",
  demoMsg: (title) => `Buenos días. Solicito una presentación de «${title}» para mi establecimiento.`,
  nav: {
    portal: "Portal",
    about: "Empresa",
    approach: "Método",
    services: "Soluciones",
    products: "Soluciones",
    contact: "Contacto",
  },
  phase: { night: "Noche", dusk: "Atardecer", dawn: "Amanecer", day: "Día" },
  wx: {
    clear: "Despejado",
    cloud: "Nublado",
    rain: "Lluvia",
    storm: "Tormenta",
    hail: "Granizo",
    fog: "Niebla",
    snow: "Nieve",
    flood: "Inundación",
    fire: "Incendio",
    frost: "Helada",
    drought: "Sequía",
  },
  tips: {
    fire: "Alerta de incendio: desplace la hacienda contra el viento, deje una salida del cuadro y no ingrese al lote hasta ubicar el foco.",
    flood: "Alerta de inundación: lleve la hacienda al alto, verifique que no quede hacienda en el bajo y controle que el agua no tape las bebidas.",
    drought: "Sequía: recorra las bebidas por la mañana, deje sombra cerca del agua y no encierren la hacienda en un lote seco.",
    frost: "Helada: no mueva la hacienda hasta la salida del sol, retire el hielo de las bebidas y observe primero los terneros.",
    hail: "Granizo: resguarde la hacienda y no salga al lote hasta que pase.",
    storm: "Tormenta: permanezca fuera del lote y de la manga hasta que pase.",
    snow: "Nieve: verifique que el agua no esté congelada y observe el piso antes de mover la hacienda.",
    rain: "Lluvia en la zona: difiera pulverización y manga. El registro de campo continúa sin señal.",
    fog: "Niebla: espere a ver el lote antes de recorrer o de volar.",
    heatHigh: "Calor alto para la hacienda: sombra, agua y postergue el trabajo de corral.",
    heat: "Calor fuerte para la hacienda: deje sombra y agua, y acorte el encierre de la tarde.",
    wind: "Viento fuerte: no conviene volar un dron, aunque el establecimiento ya cuente con uno.",
    night: "De noche el recorrido espera. Por la mañana, priorice las zonas de menor vigor.",
    dusk: "Cae el sol: cierre la jornada y deje registrado lo ya recorrido.",
    dawn: "Amanece: el primer recorrido conviene en las zonas de menor vigor.",
    clear: "Ventana favorable para recorrer el lote y dejar la jornada registrada.",
  },
  layers: {
    ganaderia: {
      title: "Registro del rodeo",
      kicker: "La campaña, no un día suelto",
      lead: "Pesajes, movimientos y atenciones quedan en la historia de cada animal y de cada lote.",
      brief: "El establecimiento registra pesos, movimientos y atenciones, y los consulta juntos.",
      facts: ["La lectura abarca la campaña, no solo la jornada de manga.", "Potrero y rodeo quedan en el mismo registro."],
    },
    vision: {
      title: "Condición del animal",
      kicker: "Lo que se observa en el lote",
      lead: "La cámara deja constancia de la condición, de una marca visible y del aspecto de la bosta.",
      brief: "Encargado y veterinario observan el mismo registro.",
      facts: ["La observación queda asociada al animal.", "La consulta no depende de un comentario suelto."],
    },
    datos: {
      title: "Jornada en el lote",
      kicker: "Con o sin señal",
      lead: "Pesos, agua y lluvia se registran en el equipo. Cuando vuelve la señal, se sincronizan.",
      brief: "La jornada se carga en el lugar. No hace falta transcribirla en la oficina.",
      facts: ["El registro no queda en el monte.", "Hacienda y potrero comparten el mismo parte."],
    },
    agro: {
      title: "Carga del potrero",
      kicker: "Descanso y movimiento",
      lead: "Se observa qué potrero admite más hacienda y cuál debe descansar.",
      brief: "Pasto, cantidad de animales y descanso del lote, para decidir el movimiento.",
      facts: ["El movimiento no depende solo de la recorrida a ojo.", "Se cuida el potrero y se sigue la evolución del rodeo."],
    },
    satelital: {
      title: "Lectura del pasto",
      kicker: "Dónde mirar primero",
      lead: "La lectura satelital indica qué zona viene floja, sin recorrer todo el establecimiento.",
      brief: "El pasto de menor vigor queda al lado de la evolución de la hacienda.",
      facts: ["El recorrido se dirige a la zona que lo requiere.", "La prioridad sale del dato, no de una impresión general."],
    },
    orquestacion: {
      title: "Aviso a tiempo",
      kicker: "Mientras la decisión todavía cabe",
      lead: "Calor, sanidad y manejo llegan a quien debe actuar ese día.",
      brief: "El aviso nombra el hecho y a quién corresponde.",
      facts: ["La novedad no espera a la recorrida siguiente.", "El titular consulta el campo sin estar en cada lote."],
    },
    automat: {
      title: "Aviso automático",
      kicker: "El hecho dispara el parte",
      lead: "Un hecho del campo genera el mensaje o la planilla, sin una cadena de llamados.",
      brief: "El aviso sale cuando ocurre el hecho configurado.",
      facts: ["No hace falta perseguir a cada responsable.", "Se adapta al modo de trabajo del establecimiento."],
    },
    dataeng: {
      title: "Resultado de la campaña",
      kicker: "Las planillas, en una lectura",
      lead: "Las planillas del establecimiento muestran la evolución del lote, la carga del potrero y las horas de calor.",
      brief: "De carpetas separadas a una pantalla de la campaña.",
      facts: ["Evolución diaria del animal, cuando el dato existe.", "Carga del potrero y horas de calor en la misma lectura."],
    },
    offline: {
      title: "Registro sin señal",
      kicker: "La jornada queda guardada",
      lead: "El trabajo en el monte continúa. Lo registrado aparece en la oficina cuando hay señal.",
      brief: "En el potrero se sigue cargando. Al volver la señal, sincroniza.",
      facts: ["La jornada queda en el equipo.", "No se vuelve a escribir al llegar a la casa."],
    },
  },
};

const en: Pack = {
  langLabel: "Language",
  account: "Account",
  navLabel: "Site sections",
  svc: "What Agronys sorts out for you",
  climate: "Weather and advice",
  locating: "Locating…",
  reading: "Reading the weather where you open Agronys.",
  demo: "Request a demo",
  seeLine: "See the line",
  close: "Close",
  demoMsg: (title) => `Hello, I would like a demo of ${title}.`,
  nav: { portal: "Portal", about: "Company", approach: "Method", services: "Solutions", products: "Solutions", contact: "Contact" },
  phase: { night: "Night", dusk: "Dusk", dawn: "Dawn", day: "Day" },
  wx: {
    clear: "Clear",
    cloud: "Cloudy",
    rain: "Rain",
    storm: "Storm",
    hail: "Hail",
    fog: "Fog",
    snow: "Snow",
    flood: "Flood",
    fire: "Fire",
    frost: "Frost",
    drought: "Drought",
  },
  tips: {
    fire: "Fire alert: move the herd upwind, leave them a way out of the paddock, and stay out until you locate the flame.",
    flood: "Flood alert: take the herd to high ground, count that nobody is left in the low ground, and check that water is not covering the troughs.",
    drought: "Drought: walk the troughs in the morning, keep shade near the water, and do not pen the herd in a dry paddock.",
    frost: "Frost: do not move the herd until the sun is up, break the ice on the troughs, and look at the calves first.",
    hail: "Hail: shelter the herd and stay out of the paddock until it passes.",
    storm: "Storm: stay out of the paddock and the chute until it passes.",
    snow: "Snow: check that the water is not frozen and see the ground before you move the herd.",
    rain: "Rain in the area: delay spraying and the chute. Field entry still works without signal.",
    fog: "Fog: wait until you can see the paddock before you ride or fly.",
    heatHigh: "High heat for the herd: shade, water, and postpone corral work.",
    heat: "Strong heat for the herd: leave shade and water, and shorten the afternoon penning.",
    wind: "Strong wind: do not fly a drone, even if the ranch already has one.",
    night: "At night the round can wait. Tomorrow, start with the weaker growth.",
    dusk: "The sun is going down: close the day and keep what you already walked.",
    dawn: "Sunrise: the first round belongs on the weaker growth.",
    clear: "A good window to walk the paddock and leave the day recorded.",
  },
  layers: {
    ganaderia: {
      title: "The whole herd, in one place",
      kicker: "The record that pays",
      lead: "Weights, movements, and care for the whole season. You stop deciding from a single day's number.",
      brief: "You record weights, movements, and care for each animal and each lot.",
      facts: ["You see the whole season, not one loose day at the chute.", "The paddock and the herd tell the same story."],
    },
    vision: {
      title: "The camera watches the animal",
      kicker: "How it looks, at a glance",
      lead: "It shows condition, a visible mark, and how the manure looks. You act sooner.",
      brief: "In the field, the camera shows how the animal is and what you can see at a glance.",
      facts: ["Manager and vet look at the same thing.", "You avoid finding the problem after it has already cost weight."],
    },
    datos: {
      title: "Record the day in the paddock",
      kicker: "Even with no signal",
      lead: "Weights, water, and rain stay on the phone. When the signal returns, they upload on their own.",
      brief: "You enter the day right there. You do not write it again at the office.",
      facts: ["The day is not lost in the bush.", "Herd and paddock stay in the same place."],
    },
    agro: {
      title: "Which paddock is paying",
      kicker: "A better move earns more",
      lead: "You know which one can hold more cattle and which one needs to rest.",
      brief: "Grass, head count, and rest of the lot, together, so you move on time.",
      facts: ["You stop deciding the move by eye alone.", "You look after the paddock and the herd's return at once."],
    },
    satelital: {
      title: "The grass, seen from above",
      kicker: "Where to look first",
      lead: "You see which zone is weak without walking the whole place. You go straight there.",
      brief: "The satellite marks the grass that is falling behind, next to how the herd is doing.",
      facts: ["You skip a full ride just to find the problem.", "You arrive first where the lot is costing you."],
    },
    orquestacion: {
      title: "It warns you in time",
      kicker: "Before it gets away",
      lead: "Heat, health, and handling reach you while you can still do something.",
      brief: "The alert reaches whoever has to move that day.",
      facts: ["You avoid the cost of hearing it late.", "You know how the place is doing without being everywhere."],
    },
    automat: {
      title: "The alert goes out on its own",
      kicker: "Less chasing",
      lead: "A fact in the field sends the message or the sheet. Your people hear it on their own.",
      brief: "The alert, the sheet, or the message goes out when something happens.",
      facts: ["You stop chasing each person to tell them.", "It fits the way you already work."],
    },
    dataeng: {
      title: "The numbers of your season",
      kicker: "The money, in sight",
      lead: "Your sheets show what the lot earns, what the paddock can hold, and what the heat cost you.",
      brief: "You leave loose folders for a screen that shows whether the season is paying.",
      facts: ["What each animal earns per day.", "How many head fit the paddock, and how many hours of heat it cost you."],
    },
    offline: {
      title: "You keep going with no signal",
      kicker: "The day is not lost",
      lead: "You work in the bush the same way. What you saved shows up at the office when there is signal.",
      brief: "In the paddock you continue. When the signal returns, it uploads on its own.",
      facts: ["The day stays saved on the phone.", "You do not redo it when you get home."],
    },
  },
};

const pt: Pack = {
  langLabel: "Idioma",
  account: "Conta",
  navLabel: "Seções do site",
  svc: "O que a Agronys resolve para você",
  climate: "Clima e recomendação",
  locating: "Localizando…",
  reading: "Lendo o clima de onde você abre a Agronys.",
  demo: "Pedir demo",
  seeLine: "Ver a linha",
  close: "Fechar",
  demoMsg: (title) => `Olá, quero pedir uma demo de ${title}.`,
  nav: { portal: "Portal", about: "Empresa", approach: "Método", services: "Soluções", products: "Soluções", contact: "Contato" },
  phase: { night: "Noite", dusk: "Entardecer", dawn: "Amanhecer", day: "Dia" },
  wx: {
    clear: "Limpo",
    cloud: "Nublado",
    rain: "Chuva",
    storm: "Tempestade",
    hail: "Granizo",
    fog: "Neblina",
    snow: "Neve",
    flood: "Inundação",
    fire: "Incêndio",
    frost: "Geada",
    drought: "Seca",
  },
  tips: {
    fire: "Alerta de incêndio: leve o gado contra o vento, abra uma saída do potreiro e não entre no lote até achar a chama.",
    flood: "Alerta de inundação: leve o gado para o alto, confira que ninguém ficou no baixo e veja se a água não cobriu os bebedouros.",
    drought: "Seca: percorra os bebedouros de manhã, deixe sombra perto da água e não feche o gado num lote seco.",
    frost: "Geada: não mova o gado até o sol sair, quebre o gelo dos bebedouros e olhe primeiro os bezerros.",
    hail: "Granizo: abrigue o gado e não saia ao lote até passar.",
    storm: "Tempestade: fique fora do lote e do brete até passar.",
    snow: "Neve: confira se a água não congelou e veja o chão antes de mover o gado.",
    rain: "Chuva na zona: adie pulverização e brete. O registro de campo segue sem sinal.",
    fog: "Neblina: espere ver o lote antes de percorrer ou voar.",
    heatHigh: "Calor alto para o gado: sombra, água e deixe o trabalho de curral para depois.",
    heat: "Calor forte para o gado: deixe sombra, água e encurte o encerramento da tarde.",
    wind: "Vento forte: não convém voar um drone, mesmo que o estabelecimento já tenha um.",
    night: "De noite o percurso espera. Amanhã, comece pelas zonas de menor vigor.",
    dusk: "O sol cai: feche a jornada e deixe registrado o que você já percorreu.",
    dawn: "Amanhece: o primeiro percurso convém nas zonas de menor vigor.",
    clear: "Janela boa para percorrer o lote e deixar a jornada registrada.",
  },
  layers: {
    ganaderia: {
      title: "Todo o rebanho, num só lugar",
      kicker: "A história que faz ganhar",
      lead: "Pesagens, movimentos e cuidados da campanha inteira. Você deixa de decidir com o dado de um só dia.",
      brief: "Você anota pesos, movimentos e cuidados de cada animal e de cada lote.",
      facts: ["Você vê a campanha inteira, não um dia solto de brete.", "O potreiro e o rebanho contam a mesma história."],
    },
    vision: {
      title: "A câmera olha o animal",
      kicker: "Como está, à primeira vista",
      lead: "Mostra a condição, uma marca visível e como está o esterco. Você age antes.",
      brief: "No campo, a câmera mostra como o animal está e o que se vê à primeira vista.",
      facts: ["Encarregado e veterinário olham a mesma coisa.", "Você evita descobrir o problema quando ele já pesou."],
    },
    datos: {
      title: "Anote o dia no lote",
      kicker: "Mesmo sem sinal",
      lead: "Pesos, água e chuva ficam no celular. Quando o sinal volta, sobem sozinhos.",
      brief: "Você registra a jornada ali mesmo. Não escreve de novo no escritório.",
      facts: ["O dia não se perde no mato.", "Gado e potreiro ficam no mesmo lugar."],
    },
    agro: {
      title: "Qual potreiro rende",
      kicker: "Mover melhor é ganhar mais",
      lead: "Você sabe qual aguenta mais gado e qual precisa descansar.",
      brief: "O pasto, a quantidade de animais e o descanso do lote, juntos, para mover a tempo.",
      facts: ["Você deixa de decidir o movimento só no olho.", "Cuida do potreiro e do ganho do rebanho ao mesmo tempo."],
    },
    satelital: {
      title: "O pasto, visto de cima",
      kicker: "Onde olhar primeiro",
      lead: "Você vê qual zona está fraca sem caminhar o campo inteiro. Vai direto.",
      brief: "O satélite marca o pasto que vem fraco, ao lado de como vem o gado.",
      facts: ["Você evita um percurso inteiro só para achar o problema.", "Chega primeiro onde o lote está custando."],
    },
    orquestacion: {
      title: "Avisa a tempo",
      kicker: "Antes que escape",
      lead: "Calor, sanidade e manejo chegam enquanto você ainda pode fazer algo.",
      brief: "O aviso chega a quem tem que se mover nesse dia.",
      facts: ["Você evita o custo de saber tarde.", "Sabe como o campo está sem estar em todo lado."],
    },
    automat: {
      title: "O aviso sai sozinho",
      kicker: "Menos perseguição",
      lead: "Um fato do campo dispara a mensagem ou a planilha. Sua gente fica sabendo sozinha.",
      brief: "O aviso, a planilha ou a mensagem saem quando algo acontece.",
      facts: ["Você deixa de correr atrás de cada um para avisar.", "Encaixa no jeito como você já trabalha."],
    },
    dataeng: {
      title: "Os números da sua campanha",
      kicker: "O dinheiro, à vista",
      lead: "Suas planilhas mostram quanto o lote ganha, quanto o potreiro aguenta e quanto o calor custou.",
      brief: "Você sai de pastas soltas para uma tela onde se vê se a campanha rende.",
      facts: ["Quanto cada animal ganha por dia.", "Quanto gado entra no potreiro e quantas horas de calor custaram."],
    },
    offline: {
      title: "Você segue mesmo sem sinal",
      kicker: "O dia não se perde",
      lead: "Você trabalha no mato do mesmo jeito. O que guardou aparece no escritório quando há sinal.",
      brief: "No potreiro você segue. Quando o sinal volta, sobe sozinho.",
      facts: ["A jornada fica guardada no celular.", "Você não refaz quando chega em casa."],
    },
  },
};

const zh: Pack = {
  langLabel: "语言",
  account: "账户",
  navLabel: "站点栏目",
  svc: "Agronys 为你解决的事",
  climate: "天气与建议",
  locating: "正在定位…",
  reading: "正在读取你打开 Agronys 时所在地的天气。",
  demo: "申请演示",
  seeLine: "查看产品线",
  close: "关闭",
  demoMsg: (title) => `你好，我想申请${title}的演示。`,
  nav: { portal: "门户", about: "公司", approach: "方法", services: "方案", products: "方案", contact: "联系" },
  phase: { night: "夜晚", dusk: "黄昏", dawn: "黎明", day: "白天" },
  wx: {
    clear: "晴",
    cloud: "多云",
    rain: "雨",
    storm: "雷暴",
    hail: "冰雹",
    fog: "雾",
    snow: "雪",
    flood: "洪涝",
    fire: "火灾",
    frost: "霜冻",
    drought: "干旱",
  },
  tips: {
    fire: "火灾警报：把牛群往上风处赶，留一条出栏的路，找到火点之前不要进地块。",
    flood: "洪涝警报：把牛群赶到高处，数清楚低处没有落下的，并查看水有没有没过饮水点。",
    drought: "干旱：早晨巡查饮水点，让阴凉靠近水，不要把牛群关在干地块里。",
    frost: "霜冻：太阳出来之前不要赶牛，敲开饮水点的冰，先看犊牛。",
    hail: "冰雹：把牛群安置好，停了再进地块。",
    storm: "雷暴：离开地块和赶牛通道，等它过去。",
    snow: "雪：先看水有没有结冰，看清地面再赶牛。",
    rain: "这一带在下雨：推迟喷药和赶牛。没有信号也能继续记当天的事。",
    fog: "雾：看清地块再巡查或起飞。",
    heatHigh: "牛群高温：阴凉、饮水，圈舍的活往后放。",
    heat: "牛群酷热：留好阴凉和饮水，缩短下午关栏的时间。",
    wind: "大风：即使牧场已经有无人机，也不适合飞。",
    night: "夜里巡查可以等。明天先看长势弱的地方。",
    dusk: "太阳落了：收工，并把已经走过的记下来。",
    dawn: "天亮了：第一圈适合走长势弱的地方。",
    clear: "适合巡查地块，并把这一天记下来。",
  },
  layers: {
    ganaderia: {
      title: "整群牛，放在一处",
      kicker: "帮你赚钱的那份记录",
      lead: "整个产季的称重、转群和处置。你不再只凭一天的数做决定。",
      brief: "你记下每头牛、每个批次的体重、转群和处置。",
      facts: ["你看到的是整个产季，不是赶牛通道上单独的一天。", "围栏和牛群讲的是同一件事。"],
    },
    vision: {
      title: "摄像头看着这头牛",
      kicker: "一眼就能看出的状态",
      lead: "它显示体况、可见的标记，以及粪便的样子。你可以更早处理。",
      brief: "在田间，摄像头告诉你这头牛怎么样，以及一眼能看见什么。",
      facts: ["负责人和兽医看的是同一件事。", "你不用等到已经掉了膘才发现。"],
    },
    datos: {
      title: "在地块里记下这一天",
      kicker: "没有信号也行",
      lead: "体重、饮水和降雨留在手机里。信号回来，它们自己上传。",
      brief: "你就在当场记下这一天。不用回办公室再写一遍。",
      facts: ["这一天不会丢在林子里。", "牛群和围栏留在同一个地方。"],
    },
    agro: {
      title: "哪一块围栏在出效益",
      kicker: "赶得对，才赚得多",
      lead: "你知道哪一块还能多放牛，哪一块该休息。",
      brief: "草、头数和地块的休养放在一起，好赶在该赶的时候。",
      facts: ["你不再只凭眼力决定转群。", "你同时照顾围栏和牛群的收益。"],
    },
    satelital: {
      title: "草，从上面看",
      kicker: "先看哪里",
      lead: "不用把整片地走完，就看见哪一带变弱。你直接过去。",
      brief: "卫星标出长势弱的草，并放在牛群状况的旁边。",
      facts: ["你省下为了找问题而走的一整圈。", "你先到正在让你亏的那一块。"],
    },
    orquestacion: {
      title: "它及时提醒你",
      kicker: "在来得及的时候",
      lead: "炎热、健康和操作，在你还能做事的时候到你手上。",
      brief: "提醒会到那天必须行动的人那里。",
      facts: ["你少付一次知道得太晚的代价。", "你不用到处在场，也知道牧场怎么样。"],
    },
    automat: {
      title: "提醒自己发出去",
      kicker: "少追着人",
      lead: "田间的一件事发出消息或表格。你的人自己就知道了。",
      brief: "有事发生时，提醒、表格或消息自己出去。",
      facts: ["你不用再一个个追着通知。", "它接上你已经在用的做法。"],
    },
    dataeng: {
      title: "你这个产季的数字",
      kicker: "钱，看得清",
      lead: "你的表告诉你这一批赚多少、围栏还能放多少、炎热让你亏了多少。",
      brief: "你从散落的文件夹，到一块能看见产季是否划算的屏幕。",
      facts: ["每头牛每天赚多少。", "围栏能进多少头，炎热又花了你多少小时。"],
    },
    offline: {
      title: "没有信号你也继续",
      kicker: "这一天不会丢",
      lead: "你在林子里照样干活。有信号时，存下的东西出现在办公室。",
      brief: "在围栏里你继续。信号回来，它自己上传。",
      facts: ["这一天存在手机里。", "你到家不用再重做一遍。"],
    },
  },
};

const gn: Pack = {
  langLabel: "Ñe'ẽ",
  account: "Mba'ete",
  navLabel: "Tenda vore",
  svc: "Mba'e Agronys ombohovái ndéve",
  climate: "Ára ha ñe'ẽporã",
  locating: "Oheka hína…",
  reading: "Omoñe'ẽ hína ára, upe tenda guive reikehápe Agronys.",
  demo: "Ejerure demo",
  seeLine: "Ehecha pe línea",
  close: "Emboty",
  demoMsg: (title) => `Mba'éichapa, aipota peteĩ jehechauka ${title} rehegua.`,
  nav: { portal: "Portal", about: "Empresa", approach: "Método", services: "Ñembohovái", products: "Ñembohovái", contact: "Ñe'ẽjoaju" },
  phase: { night: "Pyhare", dusk: "Ka'aru", dawn: "Ko'ẽ", day: "Ára" },
  wx: {
    clear: "Arahesakã",
    cloud: "Arai",
    rain: "Ky",
    storm: "Aravo",
    hail: "Yrypy'a",
    fog: "Tatatina",
    snow: "Yrypy'a morotĩ",
    flood: "Yjepyso",
    fire: "Tata",
    frost: "Ro'y",
    drought: "Ñuvã",
  },
  tips: {
    fire: "Marandu tata: eraha vaka kuéra yvytu rovái, eheja peteĩ jehasa ha ani reike pe lote peve rehecha pe tata.",
    flood: "Marandu yjepyso: eraha vaka kuéra yvate gotyo, ema'ẽ ndaipóripa oĩva yvýpe ha ehecha nda'ipóripa y oñuvã pe yryru.",
    drought: "Ñuvã: ko'ẽme eikuaa umi yryru, eheja kuarahy'ã y ypýpe ha ani remboty vaka kuéra peteĩ lote pirúpe.",
    frost: "Ro'y: ani remongy vaka kuéra kuarahy osẽ meve, epe'a yrypy'a umi yryrúgui ha ema'ẽ raẽ mitã vaka rehe.",
    hail: "Yrypy'a: emo'ã vaka kuéra ha ani resẽ pe lote peve ohasa.",
    storm: "Aravo: epyta lote ha manga okápe ohasa peve.",
    snow: "Yrypy'a morotĩ: ehecha y ndo'apy'ái ha ehecha yvy remongy mboyve vaka kuéra.",
    rain: "Ky ko'ápe: emboyke jeky'ái ha manga. Pe ára rejapo va'ekue oĩmeme señal'ỹre.",
    fog: "Tatatina: eha'arõ rehecha pe lote peve reho térã revéve.",
    heatHigh: "Haku eterei vaka kuérape: kuarahy'ã, y ha emboyke korral rembiapo.",
    heat: "Haku vaka kuérape: eheja kuarahy'ã, y ha emombyky ka'arúpe ñemboty.",
    wind: "Yvytu hatã: nahániri revéve dron, oguerekóramo jepe pe estancia.",
    night: "Pyhare pe jere oha'arõkuaa. Ko'ẽrõ, eñepyrũ umi tenda imbovu'ivévagui.",
    dusk: "Kuarahy oho: emboty pe ára ha eheja añeteguáva reho va'ekue.",
    dawn: "Ko'ẽ: pe jere peteĩha oĩ porãve umi tenda imbovu'ivévape.",
    clear: "Ára porã rejere haguã pe lote ha reheja pe ára oñeñongatu haguã.",
  },
  layers: {
    ganaderia: {
      title: "Opa vaka, peteĩ tendápe",
      kicker: "Pe marandu ombohekóva ndéve viru",
      lead: "Pohýi, jehasa ha ñangareko opa campaña. Nderejapovéima peteĩ ára rupive año.",
      brief: "Remoĩ pohýi, jehasa ha ñangareko peteĩteĩva mymba ha lote rehe.",
      facts: ["Rehecha campaña tuichakue, ndaha'éi peteĩ ára año manga pegua.", "Potrero ha vaka kuéra omombe'u peteĩ mba'e."],
    },
    vision: {
      title: "Cámara oma'ẽ mymba rehe",
      kicker: "Mba'éichapa ou, peteĩ ma'ẽme",
      lead: "Ohechauka hekopy, peteĩ marca ojekuaáva ha mba'éichapa ou hetepy. Rejapo mboyve.",
      brief: "Kokuépe, cámara ohechauka mba'éichapa oĩ mymba ha mba'e ojekuaa peteĩ ma'ẽme.",
      facts: ["Encargado ha veterinario oma'ẽ peteĩ mba'e rehe.", "Nderejuhúi pe apañuái oñembyaívoma rire."],
    },
    datos: {
      title: "Emoĩ pe ára pe lote-pe",
      kicker: "Señal'ỹramo jepe",
      lead: "Pohýi, y ha ky opyta pumbyrýpe. Señal ou jey vove, ohupi ijehegui.",
      brief: "Remoĩ pe ára upépe. Nderehaijeyvéima oficina-pe.",
      facts: ["Pe ára ndoikéi ka'aguýpe.", "Vaka ha potrero opyta peteĩ tendápe."],
    },
    agro: {
      title: "Máva potrero ombohekovia",
      kicker: "Remongy porãve, regana hetave",
      lead: "Reikuaa mávapa oguerekokuaa hetave vaka ha mávapa oikotevẽ pytuhẽ.",
      brief: "Kapi'i, vaka retakue ha lote pytuhẽ, oñondive, remongy haguã árape.",
      facts: ["Nderejapovéima jehasa resa rupive año.", "Reñangareko potrero ha vaka ganancia rehe oñondive."],
    },
    satelital: {
      title: "Kapi'i, yvategui ojehecha",
      kicker: "Moõpa ema'ẽ raẽ",
      lead: "Rehecha moõpa imbovu'i, ndereguatái opa kokuépe. Reho tapykue.",
      brief: "Satélite ohechauka kapi'i imbovu'íva, vaka kuéra ykére.",
      facts: ["Nderejerepáima reheka haguã pe apañuái.", "Reguahẽ raẽ upe lote ome'ẽhápe ndéve gasto."],
    },
    orquestacion: {
      title: "Omondýi ndéve árape",
      kicker: "Ndojepovéi mboyve",
      lead: "Haku, tesãi ha manejo oguahẽ ndéve ikatúramo gueteri rejapo.",
      brief: "Pe marandu oguahẽ upe oikotevẽva omýi pe ára.",
      facts: ["Ndehepyme'ẽvéima reikuaa rei haguã.", "Reikuaa mba'éichapa ou kokue, ndereimei opa tendápe."],
    },
    automat: {
      title: "Pe marandu osẽ ijehegui",
      kicker: "Sa'ive ejagarra",
      lead: "Peteĩ mba'e kokuépe omondo marandu térã kuatia. Nde gente oikuaa ijehegui.",
      brief: "Marandu, kuatia térã ñe'ẽ osẽ oiko vove peteĩ mba'e.",
      facts: ["Nderejagarravéima peteĩteĩva emombe'u haguã.", "Oñembojoaju pe rejapoháicha ko'ágã."],
    },
    dataeng: {
      title: "Nde campaña papapy",
      kicker: "Viru, jesareko pe",
      lead: "Nde kuatia ohechauka mboy viru oganápa lote, mboy vaka oguerekokuaápa potrero ha mboy ohepyme'ẽ ndéve haku.",
      brief: "Resẽ umi kuatia opaichagua ha reguahẽ peteĩ pantalla ohechaukahápe campaña ombohekoviapa.",
      facts: ["Mboy viru oganápa peteĩteĩva mymba peteĩ árape.", "Mboy vaka oike potrero-pe ha mboy aravo haku ohepyme'ẽ ndéve."],
    },
    offline: {
      title: "Reku'e señal'ỹramo jepe",
      kicker: "Pe ára ndoikéi",
      lead: "Remba'apo ka'aguýpe avei. Oñeñongatu va'ekue ojekuaa oficina-pe oĩ vove señal.",
      brief: "Potrero-pe reku'e. Señal ou jey vove, ohupi ijehegui.",
      facts: ["Pe ára opyta pumbyrýpe.", "Nderejapojeyvéima reguahẽ vove ógape."],
    },
  },
};

export const COPY: Record<Lang, Pack> = { es, en, pt, zh, gn };

const listeners = new Set<() => void>();

function readStored(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved && IDS.has(saved)) return saved as Lang;
  } catch {
    /* ignore */
  }
  return "es";
}

let current: Lang = "es";

export function getLang() {
  return current;
}

export function getCopy() {
  return COPY[current];
}

export function htmlLang(lang: Lang = current) {
  return LANGS.find((item) => item.id === lang)?.html ?? "es";
}

export function setLang(next: Lang) {
  if (!IDS.has(next) || next === current) return;
  current = next;
  try {
    window.localStorage.setItem(KEY, next);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = htmlLang(next);
  listeners.forEach((listener) => listener());
}

export function subscribeLang(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function applyChrome(root: ParentNode = document) {
  const copy = getCopy();
  root.querySelectorAll<HTMLElement>("[data-layer]").forEach((el) => {
    const id = el.dataset.layer as LayerId | undefined;
    const layer = id ? copy.layers[id] : undefined;
    if (!layer) return;
    if (el.classList.contains("panel") || el.classList.contains("svc-btn")) el.setAttribute("aria-label", layer.title);
  });
  root.querySelector(".svc")?.setAttribute("aria-label", copy.svc);
  root.querySelector(".clima")?.setAttribute("aria-label", copy.climate);
  root.querySelector(".profile")?.setAttribute("aria-label", copy.account);
  document.documentElement.lang = htmlLang();
}

export function bootLang() {
  const stored = readStored();
  if (stored !== current) {
    current = stored;
    listeners.forEach((listener) => listener());
  }
  if (typeof document !== "undefined") document.documentElement.lang = htmlLang();
}

export function isLocating(value: string) {
  return Object.values(COPY).some((pack) => pack.locating === value);
}
