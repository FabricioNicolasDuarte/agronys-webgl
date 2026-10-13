import { WA } from "@/content/site";
import type { Lang } from "@/i18n/lang";

export type OrbitCopy = {
  solution: string;
  products: string;
  about: string;
  contact: string;
  designed: string;
  operated: string;
  localTime: string;
  origin: string;
  heroAlt: string;
  lines: [string, string, string];
  constellation: string;
  deliver: string;
  tabs: [string, string, string, string];
  tabText: [string, string, string, string];
  services: string;
  enter: string;
  meet: string;
  marquee: string;
  future: string;
  privacy: string;
  terms: string;
  credit: string;
  technology: string;
  connect: string;
};

export const ORBIT: Record<Lang, OrbitCopy> = {
  es: {
    solution: "Solución",
    products: "Productos",
    about: "Empresa",
    contact: "Contacto",
    designed: "Diseñado por nosotros",
    operated: "Operado por vos",
    localTime: "Hora local",
    origin: "Diseño chaqueño & formoseño",
    heroAlt: "Teléfono filmando un rodeo de noche, con caravanas verdes",
    lines: ["Tu {o}peración.", "Nuestro sistema.", "Vos lo operás."],
    constellation: "Un registro para todo el establecimiento. El equipo que ya está se conecta. Ganadería y agricultura de precisión.",
    deliver: "Entregamos el sistema. Vos lo operás.",
    tabs: ["Campo", "Datos", "Jornada", "Equipos"],
    tabText: [
      "El potrero, la carga y el estado del pasto se consultan en el lote.",
      "Planillas, software y equipos pasan a un mismo registro.",
      "La jornada queda registrada en el campo, con o sin señal.",
      "Drones, sensores, balanzas y mangas que el establecimiento ya tiene se conectan.",
    ],
    services: "Servicios",
    enter: "Entrar",
    meet: "La empresa",
    marquee: "Diseñado por Agronys. Operado por vos.",
    future: "El mismo registro, en el campo y en la oficina.",
    privacy: "Privacidad",
    terms: "Términos",
    credit: "Dirección creativa por",
    technology: "Tecnología",
    connect: "Conectar",
  },
  en: {
    solution: "Solution",
    products: "Products",
    about: "Company",
    contact: "Contact",
    designed: "Designed by us",
    operated: "Operated by you",
    localTime: "Local time",
    origin: "Chaco & Formosa design",
    heroAlt: "A phone filming a herd at night, with green ear tags",
    lines: ["Your {o}peration.", "Our system.", "You run it."],
    constellation: "One record for the whole establishment. Equipment already in place is connected. Precision livestock and agriculture.",
    deliver: "We deliver the system. You operate it.",
    tabs: ["Field", "Data", "The day", "Equipment"],
    tabText: [
      "Paddock, stocking and the state of the grass are read in the lot.",
      "Spreadsheets, software and equipment go into one record.",
      "The day is recorded in the field, with or without signal.",
      "Drones, sensors, scales and yards the property already owns get connected.",
    ],
    services: "Services",
    enter: "Sign in",
    meet: "The company",
    marquee: "Designed by Agronys. Operated by you.",
    future: "The same record, in the field and in the office.",
    privacy: "Privacy",
    terms: "Terms",
    credit: "Creative direction by",
    technology: "Technology",
    connect: "Connect",
  },
  pt: {
    solution: "Solução",
    products: "Produtos",
    about: "Empresa",
    contact: "Contato",
    designed: "Desenhado por nós",
    operated: "Operado por você",
    localTime: "Hora local",
    origin: "Design do Chaco e de Formosa",
    heroAlt: "Telefone filmando um rebanho à noite, com brincos verdes",
    lines: ["Sua {o}peração.", "Nosso sistema.", "Você opera."],
    constellation: "Um registro para todo o estabelecimento. O equipamento que já existe se conecta. Pecuária e agricultura de precisão.",
    deliver: "Entregamos o sistema. Você opera.",
    tabs: ["Campo", "Dados", "Jornada", "Equipamentos"],
    tabText: [
      "O potreiro, a carga e o estado do pasto se consultam no lote.",
      "Planilhas, software e equipamentos passam a um mesmo registro.",
      "A jornada fica registrada no campo, com ou sem sinal.",
      "Drones, sensores, balanças e mangas que o estabelecimento já tem se conectam.",
    ],
    services: "Serviços",
    enter: "Entrar",
    meet: "A empresa",
    marquee: "Desenhado pela Agronys. Operado por você.",
    future: "O mesmo registro, no campo e no escritório.",
    privacy: "Privacidade",
    terms: "Termos",
    credit: "Direção criativa por",
    technology: "Tecnologia",
    connect: "Conectar",
  },
  zh: {
    solution: "方案",
    products: "产品",
    about: "公司",
    contact: "联系",
    designed: "由我们设计",
    operated: "由你操作",
    localTime: "当地时间",
    origin: "查科与福莫萨设计",
    heroAlt: "夜间用手机拍摄牛群，牛耳标为绿色",
    lines: ["你的{o}作业。", "我们的系统。", "你来操作。"],
    constellation: "整个牧场一份记录。已经在场的设备接入。精准畜牧与精准农业。",
    deliver: "我们交付系统。你来操作。",
    tabs: ["田间", "数据", "一天", "设备"],
    tabText: [
      "草地、载畜和草的状态在地块里查看。",
      "表格、软件和设备进入同一份记录。",
      "一天的工作记在田间，有没有信号都可以。",
      "牧场已有的无人机、传感器、秤和围栏接入系统。",
    ],
    services: "服务",
    enter: "进入",
    meet: "公司",
    marquee: "Agronys 设计。由你操作。",
    future: "同一份记录，在田间，也在办公室。",
    privacy: "隐私",
    terms: "条款",
    credit: "创意指导",
    technology: "技术",
    connect: "联系",
  },
  gn: {
    solution: "Solución",
    products: "Apopyre",
    about: "Empresa",
    contact: "Contacto",
    designed: "Ore ojapo",
    operated: "Nde reoperá",
    localTime: "Ara local",
    origin: "Diseño chaqueño ha formoseño",
    heroAlt: "Teléfono ofilmando peteĩ rodeo pyharépe, caravana hovy",
    lines: ["Nde {o}peración.", "Ore sistema.", "Nde reoperá."],
    constellation: "Peteĩ registro opáichagua establecimiento-pe. Equipo oĩmava oñembojoaju. Ganadería ha agricultura de precisión.",
    deliver: "Rojapo pe sistema. Nde reoperá.",
    tabs: ["Kokue", "Dato", "Ára", "Equipo"],
    tabText: [
      "Potrero, carga ha kapi'i reñe'ẽ lote-pe.",
      "Planilla, software ha equipo oho peteĩ registro-pe.",
      "Ára oñemandu'a kokuépe, señal térã señal'ỹre.",
      "Drone, sensor, balanza ha manga establecimiento oguerekóva oñembojoaju.",
    ],
    services: "Servicios",
    enter: "Eike",
    meet: "Empresa",
    marquee: "Agronys ojapo. Nde reoperá.",
    future: "Peteĩ registro, kokuépe ha oficina-pe.",
    privacy: "Privacidad",
    terms: "Términos",
    credit: "Dirección creativa",
    technology: "Tecnología",
    connect: "Conectar",
  },
};

const ASK: Record<Lang, string> = {
  es: "Buenos días. Solicito una presentación de Agronys para mi establecimiento.",
  en: "Good morning. I request a presentation of Agronys for my establishment.",
  pt: "Bom dia. Solicito uma apresentação da Agronys para o meu estabelecimento.",
  zh: "您好。我希望为牧场申请一次 Agronys 介绍。",
  gn: "Mba'éichapa. Ajerure peteĩ jehechauka Agronys rehe che establecimiento-pe.",
};

export function presentationHref(lang: Lang) {
  return `${WA}?text=${encodeURIComponent(ASK[lang])}`;
}
