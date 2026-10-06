import { getLang } from "../i18n.js";

const LAYERS_ES = [
  {
    id: "ganaderia",
    node: 1,
    title: "Monitoreo 360° con IA",
    kicker: "Rodeo e historial productivo",
    lead: "El sistema registra pesajes, movimientos, destetes y atenciones de cada animal y del lote. Permite evaluar la evolución del rodeo a lo largo del tiempo, no un dato aislado de un día de manga.",
    bullets: [
      "Pesajes, movimientos y atenciones en un mismo registro",
      "Seguimiento de la campaña, no de un único día de trabajo",
      "Indicadores de carga del potrero asociados al historial del lote",
    ],
    extra: "Como apoyo se pueden consultar ganancia de peso (GMD), carga animal e índice de temperatura y humedad (ITH) para programar o diferir el trabajo.",
  },
  {
    id: "vision",
    node: 2,
    title: "Visión artificial",
    kicker: "Condición, anomalías y materia fecal",
    lead: "La cámara cubre varias lecturas en el establecimiento: condición corporal, reconocimiento del animal, detección de anomalías (heridas, lesiones y otras señales visibles) y escáner de materia fecal para análisis. Encargado, veterinario y productor trabajan con el mismo criterio. Complementa al personal; no sustituye el diagnóstico profesional ni el laboratorio.",
    bullets: [
      "Estimación de condición corporal en lote o manga",
      "Reconocimiento del individuo para mantener la trazabilidad",
      "Escáner de anomalías: heridas, lesiones y otras alteraciones visibles",
      "Escáner de materia fecal para análisis y seguimiento sanitario",
    ],
    extra: "Las lecturas se registran en el animal o en el lote y alimentan alertas y consultas. Orienta al personal y al servicio veterinario; no reemplaza el diagnóstico clínico ni el análisis de laboratorio.",
  },
  {
    id: "datos",
    node: 0,
    title: "Captura de datos en campo",
    kicker: "Registro en el lote",
    lead: "La información —hacienda o cultivo— se registra en el lote, incluso sin conectividad. Al restablecerse la red, se sincroniza con la oficina. No es necesario recargar lo ya capturado.",
    bullets: [
      "Captura en el lote, con o sin conectividad",
      "Hacienda y cultivo en el mismo dispositivo",
      "Sincronización incremental al restablecerse la red",
    ],
    extra: "El registro originado en el lote alimenta tableros, alertas y consultas posteriores.",
  },
  {
    id: "agro",
    node: 3,
    title: "Gestión de potreros",
    kicker: "Carga, forraje y descanso",
    lead: "Integra carga animal, forraje y descanso del lote. Permite decidir qué potrero puede recibir hacienda y cuál requiere reposo, en la misma lectura que el rodeo.",
    bullets: [
      "Asignación de potreros según carga y descanso",
      "Forraje y rodeo en una misma lectura operativa",
      "Reducción del sobrepastoreo por criterio subjetivo",
    ],
    extra: "Puede complementarse con cartografía del establecimiento (SIG) y lecturas de suelo o riego, según la configuración del predio.",
  },
  {
    id: "satelital",
    node: 5,
    title: "Monitoreo satelital y NDVI",
    kicker: "Vigor del cultivo y del forraje",
    lead: "El seguimiento del cultivo y del forraje se realiza con imágenes satelitales. El NDVI y otras mediciones muestran zonas de mayor o menor vigor, sin recorrer la totalidad del establecimiento.",
    bullets: [
      "Cobertura del establecimiento, no solo del perímetro recorrido",
      "Detección de zonas de menor vigor",
      "Aplicación en agricultura y en forraje del rodeo",
    ],
    extra: "El índice de referencia es el NDVI. Según el predio se pueden incorporar otras bandas satelitales o mediciones de suelo, para priorizar recorridos y el manejo del forraje.",
  },
  {
    id: "orquestacion",
    node: 4,
    title: "Sistema de monitoreo y alertas",
    kicker: "Sanidad, calor y manejo",
    lead: "Prioriza eventos de calor, sanidad y manejo para que la notificación llegue a quien debe actuar. La decisión operativa permanece en el establecimiento.",
    bullets: [
      "Notificación a quien debe actuar, sin demora operativa",
      "Priorización por animal, lote o evento de calor",
      "Consulta del estado del campo en lenguaje natural",
    ],
    extra: "Cubre ITH, sanidad y la siguiente acción de manejo. Los recorridos se alinean con la operación vigente del establecimiento.",
  },
  {
    id: "automat",
    node: null,
    title: "Automatización de procesos",
    kicker: "Flujos operativos",
    lead: "Se configuran recorridos que se disparan ante un evento: notificación, mensaje o actualización de una planilla. Reduce la dependencia de avisar en forma manual cada vez que cambia una condición de manejo.",
    bullets: [
      "Disparo de recorridos ante un evento definido",
      "Configuración según la operación del establecimiento",
      "El sistema notifica; la decisión de manejo permanece en el predio",
    ],
    extra: "Alertas, planillas y mensajería se conectan a los flujos que el establecimiento ya utiliza.",
  },
  {
    id: "dataeng",
    node: null,
    title: "Ingeniería de datos",
    kicker: "Integración de información",
    lead: "La información del establecimiento suele estar en el dispositivo, en planillas y en registros de oficina. Se unifica para consulta y decisión, sin descartar lo ya acumulado.",
    bullets: [
      "Integración de registros existentes, sin reiniciar la operación",
      "Consistencia numérica entre oficina y potrero",
      "Modelado para ritmos productivos del establecimiento",
    ],
    extra: "Limpieza, integración y preparación de datos agropecuarios para tableros y alertas.",
  },
  {
    id: "offline",
    node: null,
    title: "Arquitectura offline-first",
    kicker: "Operación sin conectividad",
    lead: "En el potrero frecuentemente no hay red. La aplicación continúa operando: se registra el trabajo y, al recuperar señal, se sincroniza con la oficina.",
    bullets: [
      "Operación continua sin cobertura de red",
      "Persistencia local de lo cargado en la jornada",
      "Sincronización automática al recuperar señal",
    ],
    extra: "Arquitectura offline-first: el dispositivo concentra la verdad operativa del día hasta sincronizar con la oficina.",
  },
];

const LAYERS_EN = [
  {
    id: "ganaderia",
    node: 1,
    title: "360° monitoring with AI",
    kicker: "Herd and production history",
    lead: "The system records weighings, movements, weanings and treatments for each animal and lot. It lets you assess how the herd evolves over time, not a one-off figure from chute day.",
    bullets: [
      "Weighings, movements and treatments in a single record",
      "Campaign-level follow-up, not a single working day",
      "Paddock stocking indicators linked to lot history",
    ],
    extra: "Average daily gain (ADG), stocking rate and temperature-humidity index (THI) can support whether to schedule or defer work.",
  },
  {
    id: "vision",
    node: 2,
    title: "Computer vision",
    kicker: "Condition, anomalies and feces",
    lead: "The camera covers several on-farm readings: body condition, animal recognition, anomaly scanning (wounds, lesions and other visible signs) and a fecal-matter scanner for analysis. Foreman, veterinarian and producer work with the same criterion. It supports staff; it does not replace professional diagnosis or the lab.",
    bullets: [
      "Body-condition estimate in the lot or at the chute",
      "Individual recognition to keep traceability",
      "Anomaly scanner: wounds, lesions and other visible changes",
      "Fecal-matter scanner for analysis and health follow-up",
    ],
    extra: "Readings are logged on the animal or lot and feed alerts and queries. They guide staff and veterinary service; they do not replace clinical diagnosis or laboratory analysis.",
  },
  {
    id: "datos",
    node: 0,
    title: "Field data capture",
    kicker: "Recording in the lot",
    lead: "Cattle or crop information is recorded in the lot, even without connectivity. When the network returns, it syncs with the office. Already captured data does not have to be entered again.",
    bullets: [
      "Capture in the lot, with or without connectivity",
      "Cattle and crops on the same device",
      "Incremental sync when the network returns",
    ],
    extra: "Records originated in the lot feed dashboards, alerts and later queries.",
  },
  {
    id: "agro",
    node: 3,
    title: "Paddock management",
    kicker: "Stocking, forage and rest",
    lead: "It combines stocking rate, forage and paddock rest. You can decide which lot can take cattle and which needs rest, in the same reading as the herd.",
    bullets: [
      "Paddock assignment by stocking and rest",
      "Forage and herd in one operational reading",
      "Less overgrazing driven by subjective judgment",
    ],
    extra: "It can be complemented with farm mapping (GIS) and soil or irrigation readings, according to the property setup.",
  },
  {
    id: "satelital",
    node: 5,
    title: "Satellite monitoring and NDVI",
    kicker: "Crop and forage vigor",
    lead: "Crop and forage are followed with satellite imagery. NDVI and other measurements show higher or lower vigor without walking the entire property.",
    bullets: [
      "Coverage of the property, not only the fence line walked",
      "Detection of lower-vigor zones",
      "Applicable to cropping and to herd forage",
    ],
    extra: "The reference index is NDVI. Other satellite bands or soil readings can be added, to prioritize walks and forage management.",
  },
  {
    id: "orquestacion",
    node: 4,
    title: "Monitoring and alert system",
    kicker: "Health, heat and handling",
    lead: "It prioritizes heat, health and handling events so the notice reaches whoever must act. Operational decisions remain with the farm.",
    bullets: [
      "Notice to whoever must act, without operational delay",
      "Prioritization by animal, lot or heat event",
      "Natural-language query of farm status",
    ],
    extra: "Covers THI, health and the next handling action. Flows align with the farm’s current operation.",
  },
  {
    id: "automat",
    node: null,
    title: "Process automation",
    kicker: "Operational flows",
    lead: "Flows can fire on an event: a notice, a message or a sheet update. It reduces the need to notify every handling change by hand.",
    bullets: [
      "Flows triggered by a defined event",
      "Configured around the farm’s current operation",
      "The system notifies; handling decisions remain on the property",
    ],
    extra: "Alerts, spreadsheets and messaging connect to the flows the farm already uses.",
  },
  {
    id: "dataeng",
    node: null,
    title: "Data engineering",
    kicker: "Information integration",
    lead: "Farm information often lives on the device, in spreadsheets and in office records. It is unified for query and decision, without discarding what has already been accumulated.",
    bullets: [
      "Integration of existing records, without restarting operations",
      "Numeric consistency between office and paddock",
      "Modeled for on-farm production pace",
    ],
    extra: "Cleaning, integration and preparation of agricultural data for dashboards and alerts.",
  },
  {
    id: "offline",
    node: null,
    title: "Offline-first architecture",
    kicker: "Operation without connectivity",
    lead: "Paddocks often have no network. The application keeps running: work is recorded and, when signal returns, it syncs with the office.",
    bullets: [
      "Continuous operation without network coverage",
      "Local persistence of the day’s entries",
      "Automatic sync when signal returns",
    ],
    extra: "Offline-first architecture: the device holds the day’s operational truth until it syncs with the office.",
  },
];

const LAYERS_PT = [
  {
    id: "ganaderia",
    node: 1,
    title: "Monitoramento 360° com IA",
    kicker: "Rebanho e histórico produtivo",
    lead: "O sistema registra pesagens, movimentações, desmames e atendimentos de cada animal e do lote. Permite avaliar a evolução do rebanho ao longo do tempo, não um dado isolado de um dia de curral.",
    bullets: [
      "Pesagens, movimentações e atendimentos no mesmo registro",
      "Acompanhamento da campanha, não de um único dia de trabalho",
      "Indicadores de carga do piquete associados ao histórico do lote",
    ],
    extra: "Como apoio podem-se consultar ganho de peso (GMD), carga animal e índice de temperatura e umidade (ITH) para programar ou adiar o trabalho.",
  },
  {
    id: "vision",
    node: 2,
    title: "Visão artificial",
    kicker: "Condição, anomalias e matéria fecal",
    lead: "A câmera cobre várias leituras no estabelecimento: condição corporal, reconhecimento do animal, detecção de anomalias (feridas, lesões e outros sinais visíveis) e scanner de matéria fecal para análise. Encarregado, veterinário e produtor trabalham com o mesmo critério. Complementa a equipe; não substitui o diagnóstico profissional nem o laboratório.",
    bullets: [
      "Estimativa de condição corporal no lote ou no curral",
      "Reconhecimento do indivíduo para manter a rastreabilidade",
      "Scanner de anomalias: feridas, lesões e outras alterações visíveis",
      "Scanner de matéria fecal para análise e acompanhamento sanitário",
    ],
    extra: "As leituras registram-se no animal ou no lote e alimentam alertas e consultas. Orientam a equipe e o serviço veterinário; não substituem o diagnóstico clínico nem a análise de laboratório.",
  },
  {
    id: "datos",
    node: 0,
    title: "Captura de dados no campo",
    kicker: "Registro no lote",
    lead: "A informação — gado ou cultivo — é registrada no lote, mesmo sem conectividade. Ao restabelecer a rede, sincroniza com o escritório. Não é necessário recarregar o já capturado.",
    bullets: [
      "Captura no lote, com ou sem conectividade",
      "Gado e cultivo no mesmo dispositivo",
      "Sincronização incremental ao restabelecer a rede",
    ],
    extra: "O registro originado no lote alimenta painéis, alertas e consultas posteriores.",
  },
  {
    id: "agro",
    node: 3,
    title: "Gestão de piquetes",
    kicker: "Carga, forragem e descanso",
    lead: "Integra carga animal, forragem e descanso do lote. Permite decidir qual piquete pode receber gado e qual requer repouso, na mesma leitura que o rebanho.",
    bullets: [
      "Atribuição de piquetes segundo carga e descanso",
      "Forragem e rebanho numa mesma leitura operacional",
      "Redução do superpastejo por critério subjetivo",
    ],
    extra: "Pode complementar-se com cartografia do estabelecimento (SIG) e leituras de solo ou irrigação, segundo a configuração do predio.",
  },
  {
    id: "satelital",
    node: 5,
    title: "Monitoramento satelital e NDVI",
    kicker: "Vigor da cultura e da forragem",
    lead: "O acompanhamento da cultura e da forragem faz-se com imagens de satélite. O NDVI e outras medições mostram zonas de maior ou menor vigor, sem percorrer todo o estabelecimento.",
    bullets: [
      "Cobertura do estabelecimento, não só do perímetro percorrido",
      "Deteção de zonas de menor vigor",
      "Aplicação na agricultura e na forragem do rebanho",
    ],
    extra: "O índice de referência é o NDVI. Conforme o predio podem incorporar-se outras bandas satelitais ou medições de solo, para priorizar percursos e o manejo da forragem.",
  },
  {
    id: "orquestacion",
    node: 4,
    title: "Sistema de monitoramento e alertas",
    kicker: "Sanidade, calor e manejo",
    lead: "Prioriza eventos de calor, sanidade e manejo para que a notificação chegue a quem deve atuar. A decisão operacional permanece no estabelecimento.",
    bullets: [
      "Notificação a quem deve atuar, sem demora operacional",
      "Priorização por animal, lote ou evento de calor",
      "Consulta do estado do campo em linguagem natural",
    ],
    extra: "Cobre ITH, sanidade e a seguinte ação de manejo. Os fluxos alinham-se com a operação vigente do estabelecimento.",
  },
  {
    id: "automat",
    node: null,
    title: "Automação de processos",
    kicker: "Fluxos operacionais",
    lead: "Configuram-se percursos disparados por um evento: notificação, mensagem ou atualização de uma planilha. Reduz a dependência de avisar manualmente cada mudança de manejo.",
    bullets: [
      "Disparo de percursos perante um evento definido",
      "Configuração segundo a operação do estabelecimento",
      "O sistema notifica; a decisão de manejo permanece no predio",
    ],
    extra: "Alertas, planilhas e mensageria ligam-se aos fluxos que o estabelecimento já utiliza.",
  },
  {
    id: "dataeng",
    node: null,
    title: "Engenharia de dados",
    kicker: "Integração da informação",
    lead: "A informação do estabelecimento costuma estar no dispositivo, em planilhas e em registros de escritório. Unifica-se para consulta e decisão, sem descartar o já acumulado.",
    bullets: [
      "Integração de registros existentes, sem reiniciar a operação",
      "Consistência numérica entre escritório e piquete",
      "Modelagem para ritmos produtivos do estabelecimento",
    ],
    extra: "Limpeza, integração e preparação de dados agropecuários para painéis e alertas.",
  },
  {
    id: "offline",
    node: null,
    title: "Arquitetura offline-first",
    kicker: "Operação sem conectividade",
    lead: "No piquete frequentemente não há rede. A aplicação continua a operar: registra-se o trabalho e, ao recuperar sinal, sincroniza com o escritório.",
    bullets: [
      "Operação contínua sem cobertura de rede",
      "Persistência local do carregado na jornada",
      "Sincronização automática ao recuperar sinal",
    ],
    extra: "Arquitetura offline-first: o dispositivo concentra a verdade operacional do dia até sincronizar com o escritório.",
  },
];

const LAYERS_ZH = [
  {
    id: "ganaderia",
    node: 1,
    title: "AI 360° 监测",
    kicker: "牛群与生产档案",
    lead: "系统记录每头牛及整批的称重、转群、断奶与处置。用于评估牛群随时间的演变，而非通道作业日的孤立数据。",
    bullets: [
      "称重、转群与处置同一档案",
      "跟进整季，而非单日作业",
      "围栏载畜指标关联批次历史",
    ],
    extra: "可参考日增重（GMD）、载畜量与温湿指数（ITH）来安排或推迟作业。",
  },
  {
    id: "vision",
    node: 2,
    title: "计算机视觉",
    kicker: "体况、异常与粪便",
    lead: "摄像头覆盖牧场多项读取：体况、个体识别、异常扫描（伤口、病灶及其他可见迹象）以及粪便扫描以供分析。场长、兽医与生产者使用同一标准。辅助人员；不替代专业诊断或实验室。",
    bullets: [
      "围栏或通道体况估计",
      "个体识别以保持追溯",
      "异常扫描：伤口、病灶及其他可见改变",
      "粪便扫描，用于分析与卫生随访",
    ],
    extra: "读数记入个体或批次，并供给预警与查询。用于辅助人员与兽医服务；不替代临床诊断或实验室分析。",
  },
  {
    id: "datos",
    node: 0,
    title: "田间数据采集",
    kicker: "在围栏记录",
    lead: "牲畜或作物信息在围栏记录，即使无网络。网络恢复后与办公室同步。无需重录已采集数据。",
    bullets: [
      "围栏采集，有网或无网",
      "牲畜与作物同一设备",
      "网络恢复后增量同步",
    ],
    extra: "源自围栏的记录供给仪表盘、预警与后续查询。",
  },
  {
    id: "agro",
    node: 3,
    title: "围栏管理",
    kicker: "载畜、饲草与休牧",
    lead: "整合载畜、饲草与围栏休牧。在与牛群同一读数中决定哪块可进牛、哪块需休牧。",
    bullets: [
      "按载畜与休牧分配围栏",
      "饲草与牛群同一作业读数",
      "减少凭主观判断的过度放牧",
    ],
    extra: "可按牧场配置补充 GIS 制图及土壤或灌溉读数。",
  },
  {
    id: "satelital",
    node: 5,
    title: "卫星监测与 NDVI",
    kicker: "作物与饲草长势",
    lead: "用卫星影像跟踪作物与饲草。NDVI 及其他测量显示长势高低，无需走遍全场。",
    bullets: [
      "覆盖全场，而非仅走过的边界",
      "发现长势较低区域",
      "适用于种植与牛群饲草",
    ],
    extra: "参考指数为 NDVI。可视牧场情况加入其他卫星波段或土壤测量，用于优先巡查与饲草管理。",
  },
  {
    id: "orquestacion",
    node: 4,
    title: "监测与预警系统",
    kicker: "卫生、热应激与管理",
    lead: "优先处理热应激、卫生与管理事件，通知必须行动的人。作业决策仍由牧场作出。",
    bullets: [
      "通知责任人，不耽误作业",
      "按个体、批次或热事件排序",
      "以自然语言查询牧场状态",
    ],
    extra: "覆盖 ITH、卫生与下一步管理动作。流程与牧场现行作业对齐。",
  },
  {
    id: "automat",
    node: null,
    title: "流程自动化",
    kicker: "作业流程",
    lead: "可配置由事件触发的流程：通知、消息或表格更新。减少每次管理条件变化都需人工告知。",
    bullets: [
      "由既定事件触发流程",
      "按牧场现行作业配置",
      "系统通知；管理决策留在牧场",
    ],
    extra: "预警、表格与消息接入牧场已在使用的流程。",
  },
  {
    id: "dataeng",
    node: null,
    title: "数据工程",
    kicker: "信息整合",
    lead: "牧场信息常分散在设备、表格与办公室记录中。予以统一以便查询与决策，不丢弃已有积累。",
    bullets: [
      "整合现有记录，无需推倒重来",
      "办公室与围栏数字一致",
      "按牧场生产节奏建模",
    ],
    extra: "农牧数据清洗、整合与准备，用于仪表盘与预警。",
  },
  {
    id: "offline",
    node: null,
    title: "离线优先架构",
    kicker: "无网络亦可作业",
    lead: "围栏常无网络。应用继续运行：记录作业，信号恢复后与办公室同步。",
    bullets: [
      "无网络覆盖仍可持续作业",
      "当日录入本地持久化",
      "信号恢复后自动同步",
    ],
    extra: "离线优先：设备保存当日作业真相，直至与办公室同步。",
  },
];

const CASCADE = {
  es: {
    ganaderia: {
      brief: "Registra pesajes, movimientos, destetes y atenciones de cada animal y del lote, para ver cómo evoluciona el rodeo en el tiempo.",
      facts: [
        "Sirve para seguir la campaña completa, no un único día de manga.",
        "La carga del potrero queda ligada al historial del lote.",
      ],
    },
    vision: {
      brief: "En el predio, la cámara estima la condición corporal, reconoce al animal, detecta heridas u otras señales visibles y escanea materia fecal para análisis.",
      facts: [
        "Encargado, veterinario y productor trabajan con el mismo registro visual.",
        "Complementa al personal: no reemplaza el diagnóstico veterinario ni el laboratorio.",
      ],
    },
    datos: {
      brief: "Hacienda o cultivo se registran en el lote, incluso sin red. Cuando vuelve la señal, se sincroniza con la oficina.",
      facts: [
        "No hay que volver a cargar lo que ya se capturó.",
        "El mismo dispositivo sirve para hacienda y cultivo.",
      ],
    },
    agro: {
      brief: "Une carga animal, forraje y descanso del lote para decidir qué potrero puede recibir hacienda y cuál debe reposar.",
      facts: [
        "La lectura del potrero se ve junto con la del rodeo.",
        "Reduce el sobrepastoreo cuando se decide solo a ojo.",
      ],
    },
    satelital: {
      brief: "Imágenes satelitales y el índice NDVI muestran el vigor del cultivo y del forraje, sin recorrer todo el establecimiento.",
      facts: [
        "Se marcan zonas de menor vigor que a campo pueden pasar desapercibidas.",
        "Aplica tanto a agricultura como al forraje del rodeo.",
      ],
    },
    orquestacion: {
      brief: "Ordena avisos de calor, sanidad y manejo para que la notificación llegue a quien debe actuar en ese momento.",
      facts: [
        "La decisión operativa sigue en el establecimiento.",
        "Se puede consultar el estado del campo en lenguaje natural.",
      ],
    },
  },
  en: {
    ganaderia: {
      brief: "It records weighings, movements, weanings and treatments for each animal and lot, so you can see how the herd changes over time.",
      facts: [
        "It follows the full campaign, not a single chute day.",
        "Paddock stocking stays linked to the lot history.",
      ],
    },
    vision: {
      brief: "On the farm, the camera estimates body condition, recognizes the animal, flags wounds or other visible signs, and scans feces for analysis.",
      facts: [
        "Foreman, veterinarian and producer work from the same visual record.",
        "It supports staff; it does not replace veterinary diagnosis or the lab.",
      ],
    },
    datos: {
      brief: "Cattle or crop data is entered in the lot, even without a network. When signal returns, it syncs with the office.",
      facts: [
        "Already captured records do not have to be typed again.",
        "The same device handles cattle and crops.",
      ],
    },
    agro: {
      brief: "It combines stocking rate, forage and rest so you can decide which paddock can take cattle and which must recover.",
      facts: [
        "Paddock reading sits next to the herd reading.",
        "It reduces overgrazing when the call is made by eye alone.",
      ],
    },
    satelital: {
      brief: "Satellite images and the NDVI index show crop and forage vigor without walking the entire property.",
      facts: [
        "Lower-vigor zones that are easy to miss on foot become visible.",
        "It applies to cropping and to forage for the herd.",
      ],
    },
    orquestacion: {
      brief: "It orders heat, health and handling notices so the alert reaches whoever must act at that moment.",
      facts: [
        "Operational decisions remain with the farm.",
        "Farm status can be queried in natural language.",
      ],
    },
  },
  pt: {
    ganaderia: {
      brief: "Regista pesagens, movimentações, desmames e atendimentos de cada animal e do lote, para ver como o rebanho evolui no tempo.",
      facts: [
        "Serve para acompanhar a campanha completa, não um único dia de curral.",
        "A carga do piquete fica ligada ao histórico do lote.",
      ],
    },
    vision: {
      brief: "No predio, a câmera estima a condição corporal, reconhece o animal, detecta feridas ou outros sinais visíveis e faz o scanner de matéria fecal para análise.",
      facts: [
        "Encarregado, veterinário e produtor trabalham com o mesmo registro visual.",
        "Complementa a equipe: não substitui o diagnóstico veterinário nem o laboratório.",
      ],
    },
    datos: {
      brief: "Gado ou cultivo registam-se no lote, mesmo sem rede. Quando o sinal volta, sincroniza com o escritório.",
      facts: [
        "Não é preciso recarregar o que já foi capturado.",
        "O mesmo dispositivo serve para gado e cultivo.",
      ],
    },
    agro: {
      brief: "Une carga animal, forragem e descanso do lote para decidir qual piquete pode receber gado e qual deve repousar.",
      facts: [
        "A leitura do piquete aparece junto com a do rebanho.",
        "Reduz o superpastejo quando a decisão é só a olho.",
      ],
    },
    satelital: {
      brief: "Imagens de satélite e o índice NDVI mostram o vigor da cultura e da forragem, sem percorrer todo o estabelecimento.",
      facts: [
        "Marcam-se zonas de menor vigor que no campo podem passar despercebidas.",
        "Aplica-se à agricultura e à forragem do rebanho.",
      ],
    },
    orquestacion: {
      brief: "Ordena avisos de calor, sanidade e manejo para que a notificação chegue a quem deve atuar naquele momento.",
      facts: [
        "A decisão operacional permanece no estabelecimento.",
        "Pode consultar-se o estado do campo em linguagem natural.",
      ],
    },
  },
  zh: {
    ganaderia: {
      brief: "记录每头牛及整批的称重、转群、断奶与处置，用来看牛群随时间如何变化。",
      facts: ["跟进整季，而不是通道作业的某一天。", "围栏载畜与批次历史保持关联。"],
    },
    vision: {
      brief: "在牧场，摄像头估计体况、识别个体、发现伤口或其他可见迹象，并扫描粪便以供分析。",
      facts: ["场长、兽医与生产者共用同一份视觉记录。", "辅助人员；不替代兽医诊断或实验室。"],
    },
    datos: {
      brief: "牲畜或作物在围栏录入，即使无网。信号恢复后与办公室同步。",
      facts: ["已采集内容不必重录。", "同一设备可用于牲畜与作物。"],
    },
    agro: {
      brief: "整合载畜、饲草与休牧，决定哪块可进牛、哪块须休息。",
      facts: ["围栏读数与牛群读数一起看。", "减少仅凭肉眼造成的超牧。"],
    },
    satelital: {
      brief: "卫星影像与 NDVI 显示作物与饲草长势，不必走遍全场。",
      facts: ["标出田间容易漏看的弱区。", "适用于种植，也适用于牛群饲草。"],
    },
    orquestacion: {
      brief: "整理热应激、卫生与管理通知，让该行动的人及时收到。",
      facts: ["作业决策仍留在牧场。", "可用自然语言查询场况。"],
    },
  },
};

export function LAYERS() {
  const pack = { es: LAYERS_ES, en: LAYERS_EN, pt: LAYERS_PT, zh: LAYERS_ZH };
  const lang = getLang();
  const base = pack[lang] || LAYERS_ES;
  const cards = CASCADE[lang] || CASCADE.es;
  return base.map((layer) => (cards[layer.id] ? { ...layer, ...cards[layer.id] } : layer));
}

export function layerByNode(index) {
  return LAYERS().find((l) => l.node === index) ?? null;
}
