import type { Lang } from "@/i18n/lang";

type Line = { title: string; text: string };
type Product = { id: string; title: string; text: string };
type Group = { title: string; lines: Line[] };

export type SectionPack = {
  company: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    factLabels: [string, string, string];
    facts: [string, string, string];
    productsTitle: string;
    productsLead: string;
    products: [Product, Product, Product];
    pathsTitle: string;
    paths: [Line, Line];
    note: string;
    cta: string;
  };
  method: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    steps: [Line, Line, Line, Line];
    close: string;
  };
  solutions: {
    meta: string;
    eyebrow: string;
    h1: string;
    lead: string;
    productsTitle: string;
    productsLead: string;
    products: [Product, Product, Product];
    servicesTitle: string;
    servicesLead: string;
    groups: Group[];
    linkTitle: string;
    linkLead: string;
    link: Line[];
    note: string;
    cta: string;
  };
};

const productsEs: [Product, Product, Product] = [
  { id: "nutrogan", title: "Nutrogan", text: "Registro de campo en el teléfono: pesos, movimientos, agua, lluvia y mapa de potreros. Sincroniza cuando hay señal." },
  { id: "sigag", title: "SIGAG", text: "Jornada ganadera: hacienda, potrero, alimentación y clima. Puede incluir cámara y voz, según la configuración." },
  { id: "datagronys", title: "Datagronys", text: "Lectura de la campaña. Ordena planillas y datos del establecimiento: evolución, carga, horas de calor y condición, cuando esos datos existen." },
];

const groupsEs: Group[] = [
  {
    title: "Software",
    lines: [
      { title: "Software a medida", text: "La pieza que el establecimiento necesita y que un paquete cerrado no cubre." },
      { title: "Aplicación de campo", text: "El registro ocurre en el lote, con o sin señal." },
      { title: "Plataforma web", text: "La oficina consulta el mismo dato que el campo." },
      { title: "Cuentas y permisos", text: "Cada rol accede a lo que le corresponde: titular, asesor, encargado o veterinario." },
    ],
  },
  {
    title: "Datos",
    lines: [
      { title: "Integración de sistemas", text: "Planillas, software y equipos pasan a un mismo registro." },
      { title: "Tableros", text: "La información queda en una pantalla, sin rehacer la planilla." },
      { title: "Alertas", text: "Un hecho configurado avisa a quien debe actuar." },
      { title: "Historial", text: "Lo ya cargado se migra y permanece disponible." },
      { title: "Trazabilidad", text: "Animal, lote y movimiento quedan asociados." },
    ],
  },
  {
    title: "Producción",
    lines: [
      { title: "Rodeo", text: "Pesajes, sanidad, movimientos y atenciones." },
      { title: "Nutrición", text: "Dieta, suministro y consumo, cuando el dato existe." },
      { title: "Potreros", text: "Carga, descanso y estado del pasto." },
      { title: "Agricultura", text: "Labores, lotes y campaña del cultivo, con el mismo criterio de registro." },
      { title: "Reproducción", text: "Servicios, preñez y destete en la historia del rodeo." },
    ],
  },
  {
    title: "Territorio",
    lines: [
      { title: "Mapas y SIG", text: "El establecimiento se consulta por lote." },
      { title: "Imagen satelital", text: "El vigor del pasto o del cultivo indica por dónde empezar la recorrida." },
      { title: "Clima", text: "La estación del lugar entra a la decisión, no solo la del pueblo." },
    ],
  },
  {
    title: "Acompañamiento",
    lines: [
      { title: "Relevamiento", text: "Se define qué corresponde construir, conectar o dejar afuera." },
      { title: "Capacitación", text: "El equipo queda en condiciones de operar la solución." },
      { title: "Soporte y evolución", text: "La solución se ajusta cuando cambia el establecimiento." },
    ],
  },
];

const linkEs: Line[] = [
  { title: "Dron de conteo y peso", text: "El sobrevuelo entra al registro. Se evita una jornada de manga solo para saber cuántos hay y cómo vienen." },
  { title: "Dron de aplicación", text: "La orden y el registro de la pasada quedan en el mismo sistema, en la ventana de clima del lote." },
  { title: "Sensor de aguada", text: "El tanque y la bebida avisan antes de quedar secos." },
  { title: "Collar", text: "Ubicación y cambio de comportamiento del animal que el establecimiento necesita seguir." },
  { title: "Estación del potrero", text: "Lluvia, calor y viento de ese lote, no los del pueblo." },
  { title: "Balanza de paso", text: "El peso entra al pasar, sin armar una manga cada vez que hace falta un número." },
  { title: "Comedero", text: "El consumo individual queda registrado, si el equipo ya lo mide." },
  { title: "Manga y caravana", text: "La identidad del animal y el aparte entran al registro." },
  { title: "Cerco", text: "El movimiento del pastoreo se ordena a distancia, cuando la infraestructura lo permite." },
  { title: "Bomba", text: "El arranque remoto queda asociado a la aguada." },
  { title: "Monitor de maquinaria", text: "Siembra, aplicación o cosecha que la máquina ya mide se incorpora a la campaña." },
];

const es: SectionPack = {
  company: {
    meta: "Empresa · Agronys",
    eyebrow: "Empresa",
    h1: "Agronys es una empresa de soluciones tecnológicas para el agro.",
    lead: "Desarrolla y comercializa software, datos e integración para el establecimiento. Nutrogan, SIGAG y Datagronys son tres de sus productos. No agotan la oferta: el catálogo cubre los servicios de una empresa de software en el agritech, y también la tecnología que el cliente ya tiene.",
    factLabels: ["Origen", "Operación", "Oficio"],
    facts: ["Argentina, desde 2022", "NEA, Paraguay y Uruguay", "Soluciones tecnológicas"],
    productsTitle: "Productos",
    productsLead: "Tres productos con nombre propio. El resto de la oferta está en Soluciones.",
    products: productsEs,
    pathsTitle: "Además de los productos",
    paths: [
      { title: "Servicios de software", text: "Desarrollo, datos, producción, territorio y acompañamiento. No se limitan a lo que hacen Nutrogan, SIGAG y Datagronys." },
      { title: "Tecnología del cliente", text: "Drones, sensores, balanzas, mangas, cercos, bombas y monitores que el establecimiento ya dispone se conectan a la solución." },
    ],
    note: "Cada proyecto define qué se construye, qué se conecta y qué queda afuera. Esta página no publica rendimientos.",
    cta: "Solicitar una presentación",
  },
  method: {
    meta: "Método · Agronys",
    eyebrow: "Método",
    h1: "Cómo trabaja Agronys con un establecimiento.",
    lead: "Primero se entiende la operación y la tecnología que ya existe. Después se define si corresponde un producto, un desarrollo o una integración.",
    steps: [
      { title: "Relevamiento", text: "Qué se registra hoy, quién decide, qué necesita el asesor y qué equipos ya están en el campo." },
      { title: "Definición", text: "Se elige el alcance: Nutrogan, SIGAG, Datagronys, un servicio de software, o la conexión de un equipo existente." },
      { title: "Puesta en marcha", text: "Se configura, se capacita al equipo y la jornada empieza a quedar registrada, con o sin señal." },
      { title: "Lectura y evolución", text: "Titular, encargado y asesor consultan el mismo registro. La solución se ajusta cuando el establecimiento cambia." },
    ],
    close: "Agronys no reemplaza el criterio del titular ni el del ingeniero. Ordena el dato y la tecnología para que la decisión se tome a tiempo.",
  },
  solutions: {
    meta: "Soluciones · Agronys",
    eyebrow: "Soluciones",
    h1: "Productos, servicios y la tecnología que el establecimiento ya tiene.",
    lead: "Agronys comercializa soluciones tecnológicas. Los productos tienen nombre. Los servicios cubren el trabajo de una empresa de software para el agro. El equipo de campo del cliente se integra: no hace falta reemplazarlo para empezar.",
    productsTitle: "Productos",
    productsLead: "Software con nombre propio, de la empresa.",
    products: productsEs,
    servicesTitle: "Servicios",
    servicesLead: "Lo que la empresa puede desarrollar, integrar o acompañar. No es el manual de un solo producto.",
    groups: groupsEs,
    linkTitle: "Tecnología que el cliente ya dispone",
    linkLead: "Si el establecimiento ya cuenta con el equipo, Agronys lo vincula a la solución y deja resuelto el dato que ese equipo produce.",
    link: linkEs,
    note: "El alcance se acuerda por proyecto. Un ítem de este catálogo no implica que ya esté instalado en todos los campos.",
    cta: "Solicitar una presentación",
  },
};

const productsEn: [Product, Product, Product] = [
  { id: "nutrogan", title: "Nutrogan", text: "Field record on the phone: weights, movements, water, rain and the paddock map. It syncs when there is signal." },
  { id: "sigag", title: "SIGAG", text: "The livestock day: herd, paddock, feed and weather. Camera and voice can be included, as configured." },
  { id: "datagronys", title: "Datagronys", text: "Campaign reading. It arranges the property’s spreadsheets and data: progress, stocking, hours of heat and condition, when those data exist." },
];

const en: SectionPack = {
  company: {
    meta: "Company · Agronys",
    eyebrow: "Company",
    h1: "Agronys is a company that sells technology solutions for agriculture.",
    lead: "It develops and sells software, data and integration for the establishment. Nutrogan, SIGAG and Datagronys are three of its products. They do not exhaust the offer: the catalog covers what a software company can do in agritech, and the technology the client already owns.",
    factLabels: ["Origin", "Operation", "Work"],
    facts: ["Argentina, since 2022", "NEA, Paraguay and Uruguay", "Technology solutions"],
    productsTitle: "Products",
    productsLead: "Three named products. The rest of the offer is under Solutions.",
    products: productsEn,
    pathsTitle: "Beyond the products",
    paths: [
      { title: "Software services", text: "Development, data, production, territory and support. They are not limited to what Nutrogan, SIGAG and Datagronys do." },
      { title: "The client’s technology", text: "Drones, sensors, scales, yards, fences, pumps and monitors the property already owns are connected to the solution." },
    ],
    note: "Each project defines what is built, what is connected and what is left out. This page does not publish yields.",
    cta: "Request a presentation",
  },
  method: {
    meta: "Method · Agronys",
    eyebrow: "Method",
    h1: "How Agronys works with an establishment.",
    lead: "The operation and the technology already in place come first. Then the company defines whether a product, a development or an integration is the right scope.",
    steps: [
      { title: "Survey", text: "What is recorded today, who decides, what the adviser needs, and which devices are already in the field." },
      { title: "Definition", text: "The scope is chosen: Nutrogan, SIGAG, Datagronys, a software service, or the connection of existing equipment." },
      { title: "Start-up", text: "Configuration, training, and the day begins to be recorded, with or without signal." },
      { title: "Reading and change", text: "Owner, manager and adviser consult the same record. The solution is adjusted when the property changes." },
    ],
    close: "Agronys does not replace the owner’s judgment or the agronomist’s. It orders the data and the technology so the decision can be made in time.",
  },
  solutions: {
    meta: "Solutions · Agronys",
    eyebrow: "Solutions",
    h1: "Products, services, and the technology the establishment already owns.",
    lead: "Agronys sells technology solutions. Products have names. Services cover the work of a software company for agriculture. The client’s field equipment is integrated: it does not have to be replaced to begin.",
    productsTitle: "Products",
    productsLead: "Named software, from the company.",
    products: productsEn,
    servicesTitle: "Services",
    servicesLead: "What the company can build, connect or support. This is not the manual of a single product.",
    groups: [
      { title: "Software", lines: [
        { title: "Custom software", text: "The piece the property needs and a closed package does not cover." },
        { title: "Field application", text: "The record is made in the paddock, with or without signal." },
        { title: "Web platform", text: "The office consults the same data as the field." },
        { title: "Accounts and permissions", text: "Each role sees what it should: owner, adviser, manager or veterinarian." },
      ] },
      { title: "Data", lines: [
        { title: "Systems integration", text: "Spreadsheets, software and devices go into one record." },
        { title: "Boards", text: "The information stays on one screen, without rebuilding the spreadsheet." },
        { title: "Alerts", text: "A configured event notifies the person who must act." },
        { title: "History", text: "What was already entered is migrated and remains available." },
        { title: "Traceability", text: "Animal, lot and movement stay linked." },
      ] },
      { title: "Production", lines: [
        { title: "Herd", text: "Weights, health, movements and treatments." },
        { title: "Nutrition", text: "Diet, delivery and intake, when the data exists." },
        { title: "Paddocks", text: "Stocking, rest and pasture condition." },
        { title: "Cropping", text: "Operations, fields and the crop campaign, under the same recording rule." },
        { title: "Reproduction", text: "Mating, pregnancy and weaning in the herd history." },
      ] },
      { title: "Territory", lines: [
        { title: "Maps and GIS", text: "The property is consulted by field." },
        { title: "Satellite imagery", text: "Pasture or crop vigor shows where the inspection should start." },
        { title: "Weather", text: "The local station enters the decision, not only the town’s." },
      ] },
      { title: "Support", lines: [
        { title: "Survey", text: "What should be built, connected or left out." },
        { title: "Training", text: "The team is able to operate the solution." },
        { title: "Support and change", text: "The solution is adjusted when the property changes." },
      ] },
    ],
    linkTitle: "Technology the client already owns",
    linkLead: "If the property already has the device, Agronys connects it and keeps the data that device produces.",
    link: [
      { title: "Count and weight drone", text: "The flight enters the record, without a yard day only to know how many head there are and how they are doing." },
      { title: "Application drone", text: "The order and the pass stay in the same system, inside the paddock’s weather window." },
      { title: "Water sensor", text: "Tank and trough report before they run dry." },
      { title: "Collar", text: "Location and a change in behavior for the animal the property needs to follow." },
      { title: "Paddock station", text: "Rain, heat and wind from that paddock, not from town." },
      { title: "Walk-over scale", text: "Weight is captured in passing, without a yard session each time a number is needed." },
      { title: "Feeder", text: "Individual intake is recorded, if the equipment already measures it." },
      { title: "Race and tag", text: "Animal identity and drafting enter the record." },
      { title: "Fence", text: "Grazing moves are ordered at a distance, when the infrastructure allows it." },
      { title: "Pump", text: "A remote start stays linked to the water point." },
      { title: "Machine monitor", text: "Seeding, application or harvest the machine already measures joins the campaign." },
    ],
    note: "Scope is agreed per project. An item in this catalog does not mean it is already installed on every property.",
    cta: "Request a presentation",
  },
};

const productsPt: [Product, Product, Product] = [
  { id: "nutrogan", title: "Nutrogan", text: "Registro de campo no telefone: pesos, movimentos, água, chuva e mapa de potreiros. Sincroniza quando há sinal." },
  { id: "sigag", title: "SIGAG", text: "Jornada pecuária: rebanho, potreiro, alimentação e clima. Pode incluir câmera e voz, conforme a configuração." },
  { id: "datagronys", title: "Datagronys", text: "Leitura da campanha. Ordena planilhas e dados do estabelecimento: evolução, carga, horas de calor e condição, quando esses dados existem." },
];

const pt: SectionPack = {
  company: {
    meta: "Empresa · Agronys",
    eyebrow: "Empresa",
    h1: "A Agronys é uma empresa de soluções tecnológicas para o agro.",
    lead: "Desenvolve e comercializa software, dados e integração para o estabelecimento. Nutrogan, SIGAG e Datagronys são três dos seus produtos. Não esgotam a oferta: o catálogo cobre os serviços de uma empresa de software no agritech, e também a tecnologia que o cliente já possui.",
    factLabels: ["Origem", "Operação", "Ofício"],
    facts: ["Argentina, desde 2022", "NEA, Paraguai e Uruguai", "Soluções tecnológicas"],
    productsTitle: "Produtos",
    productsLead: "Três produtos com nome próprio. O restante da oferta está em Soluções.",
    products: productsPt,
    pathsTitle: "Além dos produtos",
    paths: [
      { title: "Serviços de software", text: "Desenvolvimento, dados, produção, território e acompanhamento. Não se limitam ao que fazem Nutrogan, SIGAG e Datagronys." },
      { title: "Tecnologia do cliente", text: "Drones, sensores, balanças, mangas, cercas, bombas e monitores que o estabelecimento já possui são conectados à solução." },
    ],
    note: "Cada projeto define o que se constrói, o que se conecta e o que fica de fora. Esta página não publica rendimentos.",
    cta: "Solicitar uma apresentação",
  },
  method: {
    meta: "Método · Agronys",
    eyebrow: "Método",
    h1: "Como a Agronys trabalha com um estabelecimento.",
    lead: "Primeiro se entende a operação e a tecnologia que já existe. Depois se define se cabe um produto, um desenvolvimento ou uma integração.",
    steps: [
      { title: "Levantamento", text: "O que se registra hoje, quem decide, o que o assessor precisa e quais equipamentos já estão no campo." },
      { title: "Definição", text: "Escolhe-se o alcance: Nutrogan, SIGAG, Datagronys, um serviço de software ou a conexão de um equipamento existente." },
      { title: "Implantação", text: "Configura-se, capacita-se a equipe e a jornada passa a ficar registrada, com ou sem sinal." },
      { title: "Leitura e evolução", text: "Titular, encarregado e assessor consultam o mesmo registro. A solução se ajusta quando o estabelecimento muda." },
    ],
    close: "A Agronys não substitui o critério do titular nem o do engenheiro. Ordena o dado e a tecnologia para que a decisão seja tomada a tempo.",
  },
  solutions: {
    meta: "Soluções · Agronys",
    eyebrow: "Soluções",
    h1: "Produtos, serviços e a tecnologia que o estabelecimento já possui.",
    lead: "A Agronys comercializa soluções tecnológicas. Os produtos têm nome. Os serviços cobrem o trabalho de uma empresa de software para o agro. O equipamento do cliente se integra: não é preciso substituí-lo para começar.",
    productsTitle: "Produtos",
    productsLead: "Software com nome próprio, da empresa.",
    products: productsPt,
    servicesTitle: "Serviços",
    servicesLead: "O que a empresa pode desenvolver, integrar ou acompanhar. Não é o manual de um único produto.",
    groups: groupsEs.map((group, index) => ({
      title: ["Software", "Dados", "Produção", "Território", "Acompanhamento"][index],
      lines: group.lines.map((line, lineIndex) => ptLine(index, lineIndex, line)),
    })),
    linkTitle: "Tecnologia que o cliente já possui",
    linkLead: "Se o estabelecimento já conta com o equipamento, a Agronys o vincula à solução e resolve o dado que esse equipamento produz.",
    link: linkEs.map((line, index) => ptLink(index, line)),
    note: "O alcance se acorda por projeto. Um item deste catálogo não significa que já esteja instalado em todos os campos.",
    cta: "Solicitar uma apresentação",
  },
};

function ptLine(group: number, line: number, fallback: Line): Line {
  const table: Line[][] = [
    [
      { title: "Software sob medida", text: "A peça que o estabelecimento precisa e que um pacote fechado não cobre." },
      { title: "Aplicativo de campo", text: "O registro ocorre no lote, com ou sem sinal." },
      { title: "Plataforma web", text: "O escritório consulta o mesmo dado que o campo." },
      { title: "Contas e permissões", text: "Cada papel acessa o que lhe corresponde: titular, assessor, encarregado ou veterinário." },
    ],
    [
      { title: "Integração de sistemas", text: "Planilhas, software e equipamentos passam a um mesmo registro." },
      { title: "Painéis", text: "A informação fica em uma tela, sem refazer a planilha." },
      { title: "Alertas", text: "Um fato configurado avisa quem deve agir." },
      { title: "Histórico", text: "O que já foi carregado é migrado e permanece disponível." },
      { title: "Rastreabilidade", text: "Animal, lote e movimento ficam associados." },
    ],
    [
      { title: "Rebanho", text: "Pesagens, sanidade, movimentos e atendimentos." },
      { title: "Nutrição", text: "Dieta, fornecimento e consumo, quando o dado existe." },
      { title: "Potreiros", text: "Carga, descanso e estado do pasto." },
      { title: "Agricultura", text: "Operações, lotes e campanha do cultivo, com o mesmo critério de registro." },
      { title: "Reprodução", text: "Serviços, prenhez e desmame na história do rebanho." },
    ],
    [
      { title: "Mapas e SIG", text: "O estabelecimento se consulta por lote." },
      { title: "Imagem de satélite", text: "O vigor do pasto ou do cultivo indica por onde começar a recorrida." },
      { title: "Clima", text: "A estação do lugar entra na decisão, não só a do povoado." },
    ],
    [
      { title: "Levantamento", text: "Define-se o que cabe construir, conectar ou deixar de fora." },
      { title: "Capacitação", text: "A equipe fica em condições de operar a solução." },
      { title: "Suporte e evolução", text: "A solução se ajusta quando o estabelecimento muda." },
    ],
  ];
  return table[group]?.[line] ?? fallback;
}

function ptLink(index: number, fallback: Line): Line {
  const table: Line[] = [
    { title: "Drone de contagem e peso", text: "O sobrevoo entra no registro. Evita-se uma jornada de manga só para saber quantos há e como vêm." },
    { title: "Drone de aplicação", text: "A ordem e o registro da passada ficam no mesmo sistema, na janela de clima do lote." },
    { title: "Sensor de água", text: "O tanque e o bebedouro avisam antes de secar." },
    { title: "Colar", text: "Localização e mudança de comportamento do animal que o estabelecimento precisa seguir." },
    { title: "Estação do potreiro", text: "Chuva, calor e vento desse lote, não os do povoado." },
    { title: "Balança de passagem", text: "O peso entra ao passar, sem montar uma manga cada vez que um número faz falta." },
    { title: "Comedouro", text: "O consumo individual fica registrado, se o equipamento já o mede." },
    { title: "Manga e brinco", text: "A identidade do animal e o aparte entram no registro." },
    { title: "Cerca", text: "O movimento do pastoreio se ordena à distância, quando a infraestrutura permite." },
    { title: "Bomba", text: "A partida remota fica associada à água." },
    { title: "Monitor de máquina", text: "Plantio, aplicação ou colheita que a máquina já mede se incorpora à campanha." },
  ];
  return table[index] ?? fallback;
}

const zh: SectionPack = {
  company: {
    meta: "公司 · Agronys",
    eyebrow: "公司",
    h1: "Agronys 是一家面向农业的技术解决方案公司。",
    lead: "公司为牧场开发并销售软件、数据与集成。Nutrogan、SIGAG 和 Datagronys 是其中三款产品。它们不是全部业务：目录覆盖农业科技软件公司可以提供的服务，也覆盖客户已经拥有的设备。",
    factLabels: ["来源", "业务范围", "业务"],
    facts: ["阿根廷，自 2022 年", "东北部、巴拉圭与乌拉圭", "技术解决方案"],
    productsTitle: "产品",
    productsLead: "三款有名称的产品。其余业务在“方案”中。",
    products: [
      { id: "nutrogan", title: "Nutrogan", text: "手机上的田间记录：体重、调动、水、降雨和草地地图。有信号时同步。" },
      { id: "sigag", title: "SIGAG", text: "畜牧一天的工作：牛群、草地、饲喂和天气。按配置可包含影像和语音。" },
      { id: "datagronys", title: "Datagronys", text: "产季读取。整理牧场的表格和数据：进展、载畜、高温时数和状况，以已有数据为限。" },
    ],
    pathsTitle: "产品之外",
    paths: [
      { title: "软件服务", text: "开发、数据、生产、土地和支持。不限于 Nutrogan、SIGAG 和 Datagronys 所做的事。" },
      { title: "客户已有的技术", text: "牧场已经拥有的无人机、传感器、称重、通道、围栏、水泵和机械监视器，接入解决方案。" },
    ],
    note: "每个项目约定建造什么、连接什么、排除什么。本页不公布产量。",
    cta: "申请一次介绍",
  },
  method: {
    meta: "方法 · Agronys",
    eyebrow: "方法",
    h1: "Agronys 如何与一座牧场合作。",
    lead: "先了解现有作业和已有设备。再决定是采用产品、定制开发，还是做集成。",
    steps: [
      { title: "踏勘", text: "今天记录什么、谁做决定、顾问需要什么，以及田间已有哪些设备。" },
      { title: "定义", text: "确定范围：Nutrogan、SIGAG、Datagronys、一项软件服务，或连接已有设备。" },
      { title: "启用", text: "完成配置和培训。当天的工作开始被记录，有无信号均可。" },
      { title: "读取与调整", text: "场主、负责人和顾问查阅同一份记录。牧场变化时，方案随之调整。" },
    ],
    close: "Agronys 不代替场主或农艺师的判断。它整理数据和技术，使决定来得及做出。",
  },
  solutions: {
    meta: "方案 · Agronys",
    eyebrow: "方案",
    h1: "产品、服务，以及牧场已经拥有的技术。",
    lead: "Agronys 销售技术解决方案。产品有名称。服务覆盖一家农业软件公司的工作。客户的田间设备被接入，不必先更换才能开始。",
    productsTitle: "产品",
    productsLead: "公司的具名软件。",
    products: [
      { id: "nutrogan", title: "Nutrogan", text: "手机上的田间记录：体重、调动、水、降雨和草地地图。有信号时同步。" },
      { id: "sigag", title: "SIGAG", text: "畜牧一天的工作：牛群、草地、饲喂和天气。按配置可包含影像和语音。" },
      { id: "datagronys", title: "Datagronys", text: "产季读取。整理牧场的表格和数据：进展、载畜、高温时数和状况，以已有数据为限。" },
    ],
    servicesTitle: "服务",
    servicesLead: "公司可以开发、接入或陪同的工作。这不是某一款产品的说明书。",
    groups: [
      { title: "软件", lines: [
        { title: "定制软件", text: "牧场需要、而成品套件覆盖不了的部分。" },
        { title: "田间应用", text: "记录发生在地块上，有无信号均可。" },
        { title: "网页平台", text: "办公室与田间查阅同一份数据。" },
        { title: "账户与权限", text: "场主、顾问、负责人和兽医各自看到该看的内容。" },
      ] },
      { title: "数据", lines: [
        { title: "系统集成", text: "表格、软件和设备进入同一份记录。" },
        { title: "看板", text: "信息留在一块屏幕上，不必重做表格。" },
        { title: "警报", text: "设定的事件通知应行动的人。" },
        { title: "历史", text: "已录入的内容被迁移并继续可用。" },
        { title: "追溯", text: "牲畜、批次和调动保持关联。" },
      ] },
      { title: "生产", lines: [
        { title: "牛群", text: "称重、卫生、调动和处置。" },
        { title: "营养", text: "日粮、投放和采食，以已有数据为限。" },
        { title: "草地", text: "载畜、休牧和草情。" },
        { title: "种植", text: "作业、地块和作物产季，使用同一套记录规则。" },
        { title: "繁殖", text: "配种、妊娠和断奶记入牛群历史。" },
      ] },
      { title: "土地", lines: [
        { title: "地图与 GIS", text: "按地块查阅牧场。" },
        { title: "卫星影像", text: "牧草或作物的长势指出巡查从哪里开始。" },
        { title: "气象", text: "进入决策的是当地站点，不只是镇上的天气。" },
      ] },
      { title: "陪同", lines: [
        { title: "踏勘", text: "确定建造什么、连接什么、排除什么。" },
        { title: "培训", text: "团队能够操作这套方案。" },
        { title: "支持与调整", text: "牧场变化时，方案随之调整。" },
      ] },
    ],
    linkTitle: "客户已经拥有的技术",
    linkLead: "如果牧场已有设备，Agronys 把它接入方案，并留下该设备产生的数据。",
    link: [
      { title: "计数与称重无人机", text: "飞行进入记录，不必仅为了知道头数和状况而做一天通道作业。" },
      { title: "施药无人机", text: "指令和作业记录留在同一系统里，并落在地块的天气窗口内。" },
      { title: "饮水传感器", text: "水箱和水槽在干涸之前发出通知。" },
      { title: "项圈", text: "牧场需要跟踪的牲畜，其位置和行为变化被记录。" },
      { title: "草地气象站", text: "该地块的雨、高温和风，不是镇上的。" },
      { title: "过道称", text: "体重在经过时进入，不必每次需要数字都组织一次通道作业。" },
      { title: "饲槽", text: "如果设备已经在计量，个体采食被记录。" },
      { title: "通道与耳标", text: "牲畜身份和分群进入记录。" },
      { title: "围栏", text: "在基础设施允许时，放牧调动可以远程安排。" },
      { title: "水泵", text: "远程启动与饮水点保持关联。" },
      { title: "机械监视器", text: "机械已经测量的播种、施用或收获，并入产季。" },
    ],
    note: "范围按项目约定。目录中的一项，并不表示已经安装在每一座牧场。",
    cta: "申请一次介绍",
  },
};

const gn: SectionPack = {
  ...es,
  company: {
    ...es.company,
    meta: "Empresa · Agronys",
    h1: "Agronys ha'e peteĩ empresa de soluciones tecnológicas para el agro.",
    lead: "Odesarrolla ha ovende software, dato ha integración establecimiento-pe. Nutrogan, SIGAG ha Datagronys ha'e mbohapy producto. Ndoipahái oferta: catálogo oguereko servicio de empresa de software agritech-pe, ha avei tecnología cliente oguerekóva.",
    productsLead: "Mbohapy producto réra reheve. Ambue oferta oĩ Soluciones-pe.",
    paths: [
      { title: "Servicios de software", text: "Desarrollo, dato, producción, territorio ha acompañamiento. Noñlimitái Nutrogan, SIGAG ha Datagronys rehe." },
      { title: "Tecnología del cliente", text: "Drone, sensor, balanza, manga, cerco, bomba ha monitor establecimiento oguerekóva oñembojoaju solución-pe." },
    ],
    cta: "Ejerure peteĩ jehechauka",
  },
  method: {
    ...es.method,
    h1: "Mba'éichapa Agronys omba'apo peteĩ establecimiento ndive.",
    lead: "Raẽ ojeikuaa operación ha tecnología oĩmava. Upei oñedefine producto, desarrollo térã integración.",
    steps: [
      { title: "Jehecha", text: "Mba'épa oñemoĩ ko'ágã, mávapa odecide, mba'épa oikotevẽ asesor ha mba'e equipo oĩma kokuépe." },
      { title: "Ñemohenda", text: "Ojeiporavo alcance: Nutrogan, SIGAG, Datagronys, peteĩ servicio de software, térã joaju peteĩ equipo oĩmavape." },
      { title: "Ñepyrũ", text: "Oñemboheko, oñekapacita equipo ha pe ára oñepyrũ oñeñongatu, señal rehe térã señal'ỹre." },
      { title: "Ñemoñe'ẽ ha ñemoambue", text: "Jára, encargado ha asesor ohecha peteĩ registro. Solución oñemohenda jey establecimiento oñemoambue vove." },
    ],
    close: "Agronys nomoambuéi criterio del titular ni del ingeniero. Omohenda dato ha tecnología, decisión ojejapóta a tiempo.",
  },
  solutions: {
    meta: "Ñembohovái · Agronys",
    eyebrow: "Ñembohovái",
    h1: "Apopyre, servicio ha tecnología establecimiento oguerekóma.",
    lead: "Agronys ovende solución tecnológica. Apopyre oguereko téra. Servicio oheja mba'e ojapo peteĩ empresa software agro rehegua. Equipo cliente oñembojoaju: ndojehechaukái oñemoambue raẽ haguã.",
    productsTitle: "Apopyre",
    productsLead: "Software téra reheve, empresa pegua.",
    products: [
      { id: "nutrogan", title: "Nutrogan", text: "Marandu kokuépe pumbyrýpe: pohýi, jehasa, y, ky ha mapa potrero. Oñembojoaju oĩ vove señal." },
      { id: "sigag", title: "SIGAG", text: "Ára vaka rehegua: vaka, potrero, ñemongaru ha ára. Ikatu oguereko cámara ha ñe'ẽ, oñemboheko haguéicha." },
      { id: "datagronys", title: "Datagronys", text: "Ñemoñe'ẽ campaña rehegua. Omohenda kuatia ha dato establecimiento-pe: ñemotenonde, carga, aravo haku ha mba'éichapa oĩ, oĩ ramo umi dato." },
    ],
    servicesTitle: "Servicio",
    servicesLead: "Mba'e empresa ikatu ojapo, ombojoaju térã oipytyvõ. Ndaha'éi peteĩ producto año manual.",
    groups: [
      {
        title: "Software",
        lines: [
          { title: "Software ojejapóva", text: "Pe mba'e establecimiento oikotevẽva ha peteĩ paquete oñembotyva ndohupytýi." },
          { title: "App kokuépe", text: "Marandu ojejapó lote-pe, señal rehe térã señal'ỹre." },
          { title: "Plataforma web", text: "Oficina ohecha peteĩ dato campo ohecháva." },
          { title: "Mba'ete ha ñemoneĩ", text: "Peteĩteĩva rol ohecha ojejapóva: jára, asesor, encargado térã veterinario." },
        ],
      },
      {
        title: "Dato",
        lines: [
          { title: "Sistemas joaju", text: "Kuatia, software ha equipo oho peteĩ registro-pe." },
          { title: "Tablero", text: "Marandu opyta peteĩ pantalla-pe, ndojejapojeyíri kuatia." },
          { title: "Ñemondýi", text: "Peteĩ mba'e oñembohekopyre omomarandu upe omyi va'erãme." },
          { title: "Tembiasakue", text: "Oñemoĩmava oñembohasa ha opyta ojeporukuaa." },
          { title: "Jehechakuaa", text: "Mymba, lote ha jehasa opyta oñondive." },
        ],
      },
      {
        title: "Ñemono'õ",
        lines: [
          { title: "Vaka aty", text: "Pohýi, tesãi, jehasa ha ñangareko." },
          { title: "Ñemongaru", text: "Tembi'u, me'ẽ ha jekaru, oĩ ramo dato." },
          { title: "Potrero", text: "Carga, pytuhẽ ha kapi'i reko." },
          { title: "Ñemitỹ", text: "Tembiapo, lote ha cultivo campaña, peteĩ marandu rekópe." },
          { title: "Ñemoña", text: "Servicio, hyeguasu ha destete vaka aty rembiasakuépe." },
        ],
      },
      {
        title: "Yvy",
        lines: [
          { title: "Mapa ha SIG", text: "Establecimiento ojehecha lote rupive." },
          { title: "Ta'anga satélite", text: "Kapi'i térã cultivo mbarete ohechauka moõgui oñepyrũ jehecha." },
          { title: "Ára", text: "Estación upe tenda pegua oike decisión-pe, ndaha'éi táva año." },
        ],
      },
      {
        title: "Ñepytyvõ",
        lines: [
          { title: "Jehecha", text: "Oñemohenda mba'épa ojejapo, oñembojoaju térã oñeheja okápe." },
          { title: "Ñembokatupyry", text: "Equipo oĩ porã omba'apo haguã solución ndive." },
          { title: "Pytyvõ ha ñemoambue", text: "Solución oñemohenda jey establecimiento oñemoambue vove." },
        ],
      },
    ],
    linkTitle: "Tecnología cliente oguerekóma",
    linkLead: "Establecimiento oguerekóma ramo equipo, Agronys ombojoaju solución-pe ha oheja dato pe equipo ojapóva.",
    link: [
      { title: "Dron oipapa ha oipohýiva", text: "Jehasa yvategui oike registro-pe. Ndojejapoíri peteĩ ára manga año reikuaa haguã mboy ha mba'éichapa ou." },
      { title: "Dron omoĩva", text: "Ñemombe'u ha pasada marandu opyta peteĩ sistema-pe, lote ára oĩ aja." },
      { title: "Sensor ygua", text: "Yryru ha jekaru omomarandu oñehẽ mboyve." },
      { title: "Collar", text: "Moõ oĩ ha mba'éichapa oñemoambue mymba reko, upe establecimiento oho'i va'erã." },
      { title: "Estación potrero pegua", text: "Ky, haku ha yvytu upe lote pegua, ndaha'éi táva pegua." },
      { title: "Balanza jehasa", text: "Pohýi oike ohasávo, ndojejapóiri manga jave oikotevẽ jave peteĩ papapy." },
      { title: "Comedero", text: "Jekaru peteĩteĩva oñemoĩ, equipo omoha'ãma ramo." },
      { title: "Manga ha caravana", text: "Mymba réra ha aparte oike registro-pe." },
      { title: "Cerco", text: "Pastoreo jehasa oñemohenda mombyry, infraestructura oheja ramo." },
      { title: "Bomba", text: "Ñepyrũ mombyry opyta ygua rehe." },
      { title: "Monitor máquina pegua", text: "Ñemitỹ, moĩ térã ñembyaty máquina omoha'ãmava oike campaña-pe." },
    ],
    note: "Alcance oñemohenda proyecto rehe. Peteĩ mba'e ko catálogo-pe nde'iséi oñemoĩmaha opa kokue-pe.",
    cta: "Ejerure peteĩ jehechauka",
  },
};

export const SECTIONS: Record<Lang, SectionPack> = { es, en, pt, zh, gn };
