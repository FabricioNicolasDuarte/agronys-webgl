type Card = { title: string; text: string };

type Brief = {
  meta: string;
  eyebrow: string;
  h1: string;
  items: Card[];
};

export type InfoPack = {
  menu: string;
  chip: string;
  rights: string;
  version: string;
  links: {
    about: string;
    notice: string;
    privacy: string;
    cookies: string;
    terms: string;
    a11y: string;
    faq: string;
  };
  pages: {
    notice: Brief;
    privacy: Brief;
    terms: Brief;
    a11y: Brief;
    faq: Brief;
  };
};

const es: InfoPack = {
  menu: "Información del sitio",
  chip: "Información",
  rights: "Todos los derechos reservados.",
  version: "Versión",
  links: {
    about: "Empresa",
    notice: "Aviso legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    terms: "Términos y condiciones",
    a11y: "Accesibilidad",
    faq: "Preguntas frecuentes",
  },
  pages: {
    notice: {
      meta: "Aviso legal · Agronys",
      eyebrow: "Marco legal",
      h1: "Aviso legal",
      items: [
        { title: "Titular del sitio", text: "Este sitio informa sobre Agronys y las soluciones de campo del equipo. Operación: equipo Agronys, Argentina." },
        { title: "Carácter informativo", text: "El contenido orienta sobre lo que el equipo ofrece. Cada despliegue se define con el establecimiento." },
        { title: "Alcance", text: "Las descripciones de capacidades son orientativas. El uso de las cuentas y del software se rige por el acuerdo al contratar." },
      ],
    },
    privacy: {
      meta: "Privacidad · Agronys",
      eyebrow: "Marco legal",
      h1: "Privacidad",
      items: [
        { title: "Datos de consulta", text: "Los datos enviados por correo o WhatsApp se usan para responder la consulta. No se venden ni se ceden para bases de terceros." },
        { title: "Responsable", text: "El responsable es el equipo Agronys. Contacto: contacto@agronys.com." },
        { title: "Conservación y derechos", text: "Se conservan mientras dure la consulta o la relación comercial, conforme a la Ley 25.326. Puede solicitar acceso, rectificación o supresión por ese correo." },
        { title: "Analítica", text: "Esta versión del sitio no incorpora publicidad de terceros ni analítica de marketing." },
      ],
    },
    terms: {
      meta: "Términos y condiciones · Agronys",
      eyebrow: "Marco legal",
      h1: "Términos y condiciones",
      items: [
        { title: "Uso del sitio", text: "El sitio puede recorrerse para informarse. El contenido no puede copiarse con fines comerciales sin autorización del equipo." },
        { title: "Producto y contrato", text: "El software y las cuentas se rigen por el contrato al contratar, no solo por esta página." },
        { title: "Consultas", text: "Para una duda sobre estos términos: contacto@agronys.com." },
      ],
    },
    a11y: {
      meta: "Accesibilidad · Agronys",
      eyebrow: "Marco legal",
      h1: "Accesibilidad",
      items: [
        { title: "Recorrido", text: "El sitio tiene salto al contenido, contraste sobre fondo oscuro, foco visible y encabezados en orden." },
        { title: "Portal", text: "El dibujo del portal es ilustrativo. La misma información está en Plataforma, Método y Soluciones. Se respeta la reducción de movimiento." },
        { title: "Aviso", text: "Si un recorrido no se puede usar, escriba a contacto@agronys.com." },
      ],
    },
    faq: {
      meta: "Preguntas frecuentes · Agronys",
      eyebrow: "Ayuda",
      h1: "Preguntas frecuentes",
      items: [
        { title: "¿Qué es Agronys?", text: "Es una empresa argentina de soluciones tecnológicas para el agro, desde 2022. Desarrolla y comercializa software, datos e integración. Nutrogan, SIGAG y Datagronys son tres de sus productos. El catálogo de servicios es más amplio." },
        { title: "¿Cuáles son los productos?", text: "Nutrogan, SIGAG y Datagronys. Además, Agronys ofrece servicios de software para el establecimiento e integra drones, sensores, maquinaria y otro equipo que el cliente ya dispone." },
        { title: "¿Quién adquiere el equipo de campo?", text: "El establecimiento. Agronys no sustituye ese equipo: lo conecta a la solución cuando el proyecto lo requiere." },
        { title: "¿Hace falta señal?", text: "La jornada puede registrarse sin señal. Cuando la señal vuelve, el registro se sincroniza. No hace falta transcribirlo en la oficina." },
        { title: "¿Dónde opera el equipo?", text: "Formosa, Chaco, Corrientes, Entre Ríos, Misiones, Santa Fe, Paraguay y Uruguay. Próximamente en Brasil y Bolivia." },
        { title: "¿Cómo se solicita una presentación?", text: "Por correo o WhatsApp, en Contacto. Indique el tipo de establecimiento y la decisión que desea ordenar primero. El alta de una cuenta la realiza la casa: no hay registro público." },
      ],
    },
  },
};

const en: InfoPack = {
  menu: "Site information",
  chip: "Information",
  rights: "All rights reserved.",
  version: "Version",
  links: {
    about: "Company",
    notice: "Legal notice",
    privacy: "Privacy",
    cookies: "Cookies",
    terms: "Terms and conditions",
    a11y: "Accessibility",
    faq: "FAQ",
  },
  pages: {
    notice: {
      meta: "Legal notice · Agronys",
      eyebrow: "Legal",
      h1: "Legal notice",
      items: [
        { title: "Site owner", text: "This site describes Agronys and the field tools the team offers. Operation: Agronys team, Argentina." },
        { title: "Informational", text: "The content explains what the team offers. Each deployment is defined with the farm." },
        { title: "Scope", text: "Capability descriptions are a guide. Accounts and software follow the agreement signed when you hire." },
      ],
    },
    privacy: {
      meta: "Privacy · Agronys",
      eyebrow: "Legal",
      h1: "Privacy",
      items: [
        { title: "Inquiry data", text: "Data you send by email or WhatsApp is used to reply. It is not sold or built into lists for third parties." },
        { title: "Controller", text: "The controller is the Agronys team. Contact: contacto@agronys.com." },
        { title: "Retention and rights", text: "Data is kept for the inquiry or the commercial relationship, and under Argentine Law 25.326. You can ask for access, correction, or deletion at that address." },
        { title: "Analytics", text: "This version of the site has no third-party ads and no marketing analytics." },
      ],
    },
    terms: {
      meta: "Terms and conditions · Agronys",
      eyebrow: "Legal",
      h1: "Terms and conditions",
      items: [
        { title: "Use of the site", text: "You can browse the site to learn about the work. The content may not be copied for commercial use without the team's permission." },
        { title: "Product and contract", text: "Software and accounts follow the contract signed when you hire, not this page alone." },
        { title: "Questions", text: "For a question about these terms: contacto@agronys.com." },
      ],
    },
    a11y: {
      meta: "Accessibility · Agronys",
      eyebrow: "Legal",
      h1: "Accessibility",
      items: [
        { title: "Path", text: "The site has a skip link, contrast on a dark background, a visible focus, and headings in order." },
        { title: "Home", text: "The home drawing is illustrative. The same information is in Approach, Services, and Products. Reduced motion is respected." },
        { title: "Tell us", text: "If a path cannot be used, write to contacto@agronys.com." },
      ],
    },
    faq: {
      meta: "FAQ · Agronys",
      eyebrow: "Help",
      h1: "FAQ",
      items: [
        { title: "What is Agronys?", text: "An Argentine AgTech team, since 2022. It builds tools to see the herd, the paddock, and the campaign numbers in one place." },
        { title: "What can be used today?", text: "Nutrogan, SIGAG, and Campaign numbers. If the farm needs something else, it is built to fit." },
        { title: "Who buys the drone and the sensors?", text: "The farm buys the drone, the sensor, and the field equipment. Agronys connects them and handles the reading and the processing." },
        { title: "Is a signal required?", text: "The day can be logged without a signal. When it returns, the record uploads on its own." },
        { title: "Where is the team?", text: "Formosa, Chaco, Corrientes, Entre Ríos, Misiones, Santa Fe, Paraguay, and Uruguay. Coming soon in Brazil and Bolivia." },
        { title: "How do I ask?", text: "Through the team channel, on Contact. Say the type of farm and the problem you want to start with." },
      ],
    },
  },
};

const pt: InfoPack = {
  menu: "Informação do site",
  chip: "Informação",
  rights: "Todos os direitos reservados.",
  version: "Versão",
  links: {
    about: "Empresa",
    notice: "Aviso legal",
    privacy: "Privacidade",
    cookies: "Cookies",
    terms: "Termos e condições",
    a11y: "Acessibilidade",
    faq: "Perguntas frequentes",
  },
  pages: {
    notice: {
      meta: "Aviso legal · Agronys",
      eyebrow: "Marco legal",
      h1: "Aviso legal",
      items: [
        { title: "Titular do site", text: "Este site informa sobre a Agronys e as soluções de campo da equipe. Operação: equipe Agronys, Argentina." },
        { title: "Caráter informativo", text: "O conteúdo orienta sobre o que a equipe oferece. Cada implantação se define com o estabelecimento." },
        { title: "Alcance", text: "As descrições de capacidades são orientativas. O uso das contas e do software segue o acordo ao contratar." },
      ],
    },
    privacy: {
      meta: "Privacidade · Agronys",
      eyebrow: "Marco legal",
      h1: "Privacidade",
      items: [
        { title: "Dados da consulta", text: "Os dados enviados por e-mail ou WhatsApp servem para responder. Não são vendidos nem viram bases para terceiros." },
        { title: "Responsável", text: "O responsável é a equipe Agronys. Contato: contacto@agronys.com." },
        { title: "Conservação e direitos", text: "Ficam enquanto durar a consulta ou a relação comercial, e conforme a Lei 25.326 da Argentina. Você pode pedir acesso, retificação ou exclusão por esse e-mail." },
        { title: "Analítica", text: "Esta versão do site não tem publicidade de terceiros nem analítica de marketing." },
      ],
    },
    terms: {
      meta: "Termos e condições · Agronys",
      eyebrow: "Marco legal",
      h1: "Termos e condições",
      items: [
        { title: "Uso do site", text: "Você pode percorrer o site para se informar. O conteúdo não pode ser copiado com fins comerciais sem autorização da equipe." },
        { title: "Produto e contrato", text: "O software e as contas seguem o contrato ao contratar, não só esta página." },
        { title: "Consultas", text: "Para uma dúvida sobre estes termos: contacto@agronys.com." },
      ],
    },
    a11y: {
      meta: "Acessibilidade · Agronys",
      eyebrow: "Marco legal",
      h1: "Acessibilidade",
      items: [
        { title: "Percurso", text: "O site tem salto ao conteúdo, contraste sobre fundo escuro, foco visível e títulos em ordem." },
        { title: "Portal", text: "O desenho do portal é ilustrativo. A mesma informação está em Enfoque, Serviços e Produtos. A redução de movimento é respeitada." },
        { title: "Aviso", text: "Se um percurso não puder ser usado, escreva para contacto@agronys.com." },
      ],
    },
    faq: {
      meta: "Perguntas frequentes · Agronys",
      eyebrow: "Ajuda",
      h1: "Perguntas frequentes",
      items: [
        { title: "O que é a Agronys?", text: "É uma equipe AgTech argentina, desde 2022. Monta ferramentas para ver o rebanho, o potreiro e os números da campanha no mesmo lugar." },
        { title: "O que se pode usar hoje?", text: "Nutrogan, SIGAG e Os números da sua campanha. Se o campo pede outra coisa, montamos sob medida." },
        { title: "Quem compra o drone e os sensores?", text: "O estabelecimento compra o drone, o sensor e o equipamento de campo. A Agronys conecta e cuida da leitura e do processamento." },
        { title: "Precisa de sinal?", text: "O dia pode ser carregado sem sinal. Quando volta, sobe sozinho." },
        { title: "Onde está a equipe?", text: "Formosa, Chaco, Corrientes, Entre Ríos, Misiones, Santa Fe, Paraguai e Uruguai. Em breve no Brasil e na Bolívia." },
        { title: "Como se faz uma consulta?", text: "Pelo canal da equipe, em Contato. Indique o tipo de estabelecimento e o problema com o qual quer começar." },
      ],
    },
  },
};

const zh: InfoPack = {
  menu: "网站信息",
  chip: "信息",
  rights: "版权所有。",
  version: "版本",
  links: {
    about: "公司",
    notice: "法律声明",
    privacy: "隐私",
    cookies: "Cookie",
    terms: "条款和条件",
    a11y: "无障碍",
    faq: "常见问题",
  },
  pages: {
    notice: {
      meta: "法律声明 · Agronys",
      eyebrow: "法律",
      h1: "法律声明",
      items: [
        { title: "网站主体", text: "本网站介绍 Agronys 及团队提供的田间工具。运营：Agronys 团队，阿根廷。" },
        { title: "说明性质", text: "内容用于说明团队提供的内容。每次部署与牧场一起确定。" },
        { title: "范围", text: "能力描述仅供参考。账户和软件以签约时的协议为准。" },
      ],
    },
    privacy: {
      meta: "隐私 · Agronys",
      eyebrow: "法律",
      h1: "隐私",
      items: [
        { title: "咨询数据", text: "你通过邮件或 WhatsApp 发送的数据只用于回复。不会出售，也不会做成给第三方的名单。" },
        { title: "责任方", text: "责任方是 Agronys 团队。联系：contacto@agronys.com。" },
        { title: "保存与权利", text: "数据在咨询或商业关系存续期间保存，并遵循阿根廷第 25.326 号法律。你可以通过该邮箱要求查阅、更正或删除。" },
        { title: "分析", text: "此版本网站没有第三方广告，也没有营销分析。" },
      ],
    },
    terms: {
      meta: "条款和条件 · Agronys",
      eyebrow: "法律",
      h1: "条款和条件",
      items: [
        { title: "网站使用", text: "你可以浏览本网站了解工作内容。未经团队许可，不得将内容用于商业复制。" },
        { title: "产品与合同", text: "软件和账户以签约时的合同为准，不只以本页为准。" },
        { title: "咨询", text: "关于这些条款的问题：contacto@agronys.com。" },
      ],
    },
    a11y: {
      meta: "无障碍 · Agronys",
      eyebrow: "法律",
      h1: "无障碍",
      items: [
        { title: "路径", text: "网站有跳到内容、深色背景上的对比、可见焦点和按顺序的标题。" },
        { title: "首页", text: "首页图画是示意。同样的信息在方法、服务和产品里。尊重减少动效。" },
        { title: "反馈", text: "如果某条路径无法使用，请写信至 contacto@agronys.com。" },
      ],
    },
    faq: {
      meta: "常见问题 · Agronys",
      eyebrow: "帮助",
      h1: "常见问题",
      items: [
        { title: "Agronys 是什么？", text: "自 2022 年起的阿根廷农业科技团队。工具把牛群、草场和战役数字放在同一处。" },
        { title: "现在能用什么？", text: "Nutrogan、SIGAG 和战役数字。牧场如果需要别的，就按需要来做。" },
        { title: "谁购买无人机和传感器？", text: "牧场购买无人机、传感器和田间设备。Agronys 负责连接、读取和处理。" },
        { title: "需要信号吗？", text: "没有信号也可以记下当天。信号回来后会自己上传。" },
        { title: "团队在哪里？", text: "福莫萨、查科、科连特斯、恩特雷里奥斯、米西奥内斯、圣菲、巴拉圭和乌拉圭。即将进入巴西和玻利维亚。" },
        { title: "如何咨询？", text: "通过团队渠道，在联系页。请说明牧场类型和你想先解决的问题。" },
      ],
    },
  },
};

const gn: InfoPack = {
  menu: "Marandu sitio rehegua",
  chip: "Marandu",
  rights: "Opa derecho oñeñongatu.",
  version: "Versión",
  links: {
    about: "Empresa",
    notice: "Marandu léi rehegua",
    privacy: "Ñemigua",
    cookies: "Cookies",
    terms: "Término ha condición",
    a11y: "Jeike porã",
    faq: "Porandu py'ỹi",
  },
  pages: {
    notice: {
      meta: "Marandu léi rehegua · Agronys",
      eyebrow: "Léi",
      h1: "Marandu léi rehegua",
      items: [
        { title: "Sitio jára", text: "Ko sitio omombe'u Agronys rehe ha equipo solución kokuépe. Jeporu: equipo Agronys, Argentina." },
        { title: "Marandu año", text: "Pe jehaipy ohechauka mba'e ome'ẽ equipo. Peteĩteĩva jeporu oñemohenda estancia ndive." },
        { title: "Alcance", text: "Umi capacidad jehai ha'e guía. Cuenta ha software oho pe contrato rehe, pe ára recontrata vove." },
      ],
    },
    privacy: {
      meta: "Ñemigua · Agronys",
      eyebrow: "Léi",
      h1: "Ñemigua",
      items: [
        { title: "Porandu mba'ekuaarã", text: "Umi mba'ekuaarã remondóva correo térã WhatsApp rupive ojeiporu rohovái haguã. Ndoñevendéi ha ndojapói lista ambue mba'épe g̃uarã." },
        { title: "Responsable", text: "Pe responsable ha'e equipo Agronys. Ñe'ẽjoaju: contacto@agronys.com." },
        { title: "Ñeñongatu ha derecho", text: "Oñeñongatu porandu térã relación comercial aja, ha Ley 25.326 rehe. Rejerurekuaa jeike, ñemohenda térã ñembogue upe correo rupive." },
        { title: "Analítica", text: "Ko versión sitio ndorekói publicidad ambue mba'e pegua ni analítica marketing rehegua." },
      ],
    },
    terms: {
      meta: "Término ha condición · Agronys",
      eyebrow: "Léi",
      h1: "Término ha condición",
      items: [
        { title: "Sitio jeporu", text: "Reikekuaa sitio reikuaa haguã. Pe jehaipy ndaikatúi oñembohasa viru rehegua equipo autoriza'ỹre." },
        { title: "Apopyre ha contrato", text: "Software ha cuenta oho pe contrato rehe, ndaha'éi ko página año." },
        { title: "Porandu", text: "Peteĩ porandu ko'ã término rehe: contacto@agronys.com." },
      ],
    },
    a11y: {
      meta: "Jeike porã · Agronys",
      eyebrow: "Léi",
      h1: "Jeike porã",
      items: [
        { title: "Rape", text: "Pe sitio oguereko salto contenido-pe, contraste fondo pytũre, foco ojehecháva ha título orden-pe." },
        { title: "Portal", text: "Portal ta'anga ha'e jehechauka. Pe marandu peteĩcha oĩ Enfoque, Servicios ha Productos-pe. Oñerespeta oñemomichĩramo jehasa." },
        { title: "Marandu", text: "Peteĩ rape ndaikatúiramo ojeiporu, ehai contacto@agronys.com-pe." },
      ],
    },
    faq: {
      meta: "Porandu py'ỹi · Agronys",
      eyebrow: "Pytyvõ",
      h1: "Porandu py'ỹi",
      items: [
        { title: "Mba'e Agronys?", text: "Ha'e peteĩ equipo AgTech Argentina pegua, 2022 guive. Ojapo herramienta rehecha haguã vaka, potrero ha campaña papapy peteĩ tendápe." },
        { title: "Mba'e ikatúpa ojeiporu ko'ágã?", text: "Nutrogan, SIGAG ha Nde campaña papapy. Nde kokue ojeruréramo ambue mba'e, rojapo ndéve g̃uarã." },
        { title: "Máva ojoga dron ha sensor?", text: "Pe estancia ojoga dron, sensor ha equipo kokue pegua. Agronys ombojoaju ha oñangareko ñemoñe'ẽ ha procesamiento rehe." },
        { title: "Oñeikotevẽpa señal?", text: "Pe ára ikatu oñemoĩ señal'ỹre. Ou jey vove, ohupi ijehegui." },
        { title: "Moõpa oime equipo?", text: "Formosa, Chaco, Corrientes, Entre Ríos, Misiones, Santa Fe, Paraguái ha Uruguái. Ag̃uahẽta Brasil ha Bolivia-pe." },
        { title: "Mba'éichapa ojejapo peteĩ porandu?", text: "Equipo rape rupive, Contacto-pe. Ere mba'e estancia rehepa ha mba'e apañuái rehepa reñepyrũse." },
      ],
    },
  },
};

export const INFO: Record<"es" | "en" | "pt" | "zh" | "gn", InfoPack> = { es, en, pt, zh, gn };
