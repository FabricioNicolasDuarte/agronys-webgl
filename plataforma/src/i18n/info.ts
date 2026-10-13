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
        { title: "Alcance", text: "Este aviso cubre el sitio público de Agronys. Las cuentas y el software contratado se rigen por el contrato con el establecimiento." },
        { title: "Responsable", text: "El responsable es el equipo Agronys, en Argentina. Consultas sobre datos: contacto@agronys.com. La razón social y el domicilio se informan por ese medio y en el contrato." },
        { title: "Datos del sitio", text: "Si escribe por correo o WhatsApp, usamos el nombre, el establecimiento, el canal y el mensaje para responder. En el navegador pueden quedar el idioma, el sonido y la constancia de este aviso. El detalle está en {c}. No armamos perfiles de marketing. Esta versión no usa publicidad de terceros ni analítica de marketing." },
        { title: "Clima en Servicios", text: "En Servicios, el clima y la búsqueda de un lugar consultan Open-Meteo. Si usted autoriza la ubicación, el navegador envía coordenadas solo para ese pedido. No las usamos para publicidad." },
        { title: "Base y registros técnicos", text: "Respondemos la consulta y, si sigue, los pasos previos a un contrato. Las preferencias sirven para mostrar el sitio como lo dejó. El servidor puede guardar datos de conexión el tiempo necesario para prestar y proteger el sitio." },
        { title: "Destinatarios", text: "No vendemos datos ni los cedemos para bases de terceros. El correo, WhatsApp y Open-Meteo son servicios de terceros: si se usan, también rige su aviso. Quien aloja el sitio trata los datos de conexión para entregarlo." },
        { title: "Otros países", text: "La operación está en Argentina. Una consulta desde otro país se atiende desde aquí. WhatsApp y Open-Meteo pueden tratar el pedido fuera de su país, según su propio aviso." },
        { title: "Conservación", text: "La consulta se conserva mientras dure y, si hay relación comercial, durante esa relación y el plazo que exija la ley. Las preferencias del navegador quedan hasta que usted las borre." },
        { title: "Derechos", text: "Puede pedir acceso, rectificación, actualización o supresión, y oponerse a un uso que no sea necesario para responderle. En Argentina rige la Ley 25.326 y puede reclamar ante la Agencia de Acceso a la Información Pública. Si su país reconoce otros derechos, los ejercemos sobre ese pedido. Escriba a contacto@agronys.com." },
        { title: "Seguridad, menores y vigencia", text: "Aplicamos medidas razonables de resguardo. El sitio no está dirigido a niños y no pedimos datos de menores. El sitio público no toma decisiones automatizadas sobre personas. La versión vigente es la publicada en esta página." },
      ],
    },
    terms: {
      meta: "Términos y condiciones · Agronys",
      eyebrow: "Marco legal",
      h1: "Términos y condiciones",
      items: [
        { title: "Aceptación", text: "Al recorrer el sitio, estas condiciones se aplican a ese uso. Si no las comparte, no use el sitio." },
        { title: "Carácter de la información", text: "El contenido describe el trabajo del equipo. No es asesoramiento agronómico, veterinario, jurídico ni impositivo, y no publica resultados de un establecimiento. La decisión en el campo es de quien lo opera." },
        { title: "Propiedad intelectual", text: "Los textos, las marcas, las imágenes, los videos y los audios son de Agronys o se usan con autorización. Puede compartir el enlace. No puede copiar el contenido con fines comerciales sin permiso del equipo." },
        { title: "Cuentas", text: "No hay registro público. Las credenciales las entrega el representante Agronys. El software y las cuentas se rigen por el contrato. No comparta esas credenciales." },
        { title: "Uso aceptable", text: "Use el sitio de forma lícita. No intente entrar a una cuenta sin autorización ni degradar el servicio." },
        { title: "Terceros y disponibilidad", text: "Los enlaces a correo y WhatsApp salen del sitio. El sitio puede cambiar o interrumpirse sin que eso altere un contrato ya firmado." },
        { title: "Responsabilidad", text: "Agronys no responde por una decisión tomada solo con lo que dice esta página. Esta limitación no quita los derechos que una norma imperativa le reconozca, en Argentina o en su país." },
        { title: "Ley aplicable", text: "Estos términos se rigen por la ley de la República Argentina. Los tribunales argentinos entienden en las controversias del sitio, sin privarle de un fuero que su norma imperativa le reserve." },
        { title: "Vigencia y contacto", text: "La versión vigente es esta página. Para una duda: contacto@agronys.com." },
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
        { title: "Scope", text: "This notice covers the public Agronys site. Accounts and contracted software follow the agreement with the farm." },
        { title: "Controller", text: "The controller is the Agronys team, in Argentina. Data questions: contacto@agronys.com. The legal name and address are given by that channel and in the contract." },
        { title: "Data on this site", text: "If you write by email or WhatsApp, we use your name, the farm, the channel, and the message to reply. The browser may keep the language, the sound setting, and the record of this notice. Detail is on {c}. We do not build marketing profiles. This version has no third-party ads and no marketing analytics." },
        { title: "Weather on Services", text: "On Services, weather and place search call Open-Meteo. If you allow location, the browser sends coordinates only for that request. We do not use them for advertising." },
        { title: "Basis and technical logs", text: "We reply to the inquiry and, if it continues, to the steps before a contract. Preferences show the site as you left it. The server may keep connection data for as long as needed to deliver and protect the site." },
        { title: "Recipients", text: "We do not sell data or pass it on to build third-party lists. Email, WhatsApp, and Open-Meteo are third-party services: if they are used, their notice also applies. The host processes connection data to deliver the site." },
        { title: "Other countries", text: "The operation is in Argentina. An inquiry from another country is handled from here. WhatsApp and Open-Meteo may process the request outside your country, under their own notice." },
        { title: "Retention", text: "An inquiry is kept while it lasts and, if there is a commercial relationship, for that relationship and the period the law requires. Browser preferences stay until you delete them." },
        { title: "Rights", text: "You may ask for access, correction, update, or deletion, and object to a use that is not needed to reply. In Argentina, Law 25.326 applies and you may complain to the Agency for Access to Public Information. If your country grants other rights, we apply them to that request. Write to contacto@agronys.com." },
        { title: "Security, children, and version", text: "We apply reasonable safeguards. The site is not directed at children and we do not ask for children's data. The public site makes no automated decisions about people. The current version is the one published on this page." },
      ],
    },
    terms: {
      meta: "Terms and conditions · Agronys",
      eyebrow: "Legal",
      h1: "Terms and conditions",
      items: [
        { title: "Acceptance", text: "By browsing the site, these terms apply to that use. If you do not accept them, do not use the site." },
        { title: "Nature of the information", text: "The content describes the team's work. It is not agronomic, veterinary, legal, or tax advice, and it does not publish a farm's results. The decision in the field belongs to the person who runs it." },
        { title: "Intellectual property", text: "The texts, marks, images, videos, and audio belong to Agronys or are used with permission. You may share the link. You may not copy the content for commercial use without the team's permission." },
        { title: "Accounts", text: "There is no public registration. Credentials are issued by the Agronys representative. Software and accounts follow the contract. Do not share those credentials." },
        { title: "Acceptable use", text: "Use the site lawfully. Do not try to enter an account without authorization or to degrade the service." },
        { title: "Third parties and availability", text: "Links to email and WhatsApp leave the site. The site may change or be interrupted without changing a contract already signed." },
        { title: "Liability", text: "Agronys is not liable for a decision made only from what this page says. This limit does not remove rights that a mandatory rule gives you, in Argentina or in your country." },
        { title: "Governing law", text: "These terms are governed by the law of the Argentine Republic. Argentine courts hear disputes about the site, without taking away a venue that a mandatory rule reserves for you." },
        { title: "Version and contact", text: "The current version is this page. For a question: contacto@agronys.com." },
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
        { title: "Alcance", text: "Este aviso cobre o site público da Agronys. As contas e o software contratado seguem o contrato com o estabelecimento." },
        { title: "Responsável", text: "O responsável é a equipe Agronys, na Argentina. Consultas sobre dados: contacto@agronys.com. A razão social e o domicílio são informados por esse meio e no contrato." },
        { title: "Dados do site", text: "Se você escreve por e-mail ou WhatsApp, usamos o nome, o estabelecimento, o canal e a mensagem para responder. No navegador podem ficar o idioma, o som e o registro deste aviso. O detalhe está em {c}. Não montamos perfis de marketing. Esta versão não usa publicidade de terceiros nem analítica de marketing." },
        { title: "Clima em Serviços", text: "Em Serviços, o clima e a busca de um lugar consultam o Open-Meteo. Se você autoriza a localização, o navegador envia coordenadas só para esse pedido. Não as usamos para publicidade." },
        { title: "Base e registros técnicos", text: "Respondemos à consulta e, se ela segue, aos passos anteriores a um contrato. As preferências servem para mostrar o site como você o deixou. O servidor pode guardar dados de conexão pelo tempo necessário para prestar e proteger o site." },
        { title: "Destinatários", text: "Não vendemos dados nem os cedemos para bases de terceiros. O e-mail, o WhatsApp e o Open-Meteo são serviços de terceiros: se forem usados, o aviso deles também vale. Quem hospeda o site trata os dados de conexão para entregá-lo." },
        { title: "Outros países", text: "A operação está na Argentina. Uma consulta de outro país é atendida daqui. WhatsApp e Open-Meteo podem tratar o pedido fora do seu país, segundo o aviso deles." },
        { title: "Conservação", text: "A consulta fica enquanto durar e, se houver relação comercial, durante essa relação e o prazo que a lei exigir. As preferências do navegador ficam até você apagá-las." },
        { title: "Direitos", text: "Você pode pedir acesso, retificação, atualização ou exclusão, e se opor a um uso que não seja necessário para responder. Na Argentina vale a Lei 25.326 e você pode reclamar perante a Agência de Acesso à Informação Pública. Se o seu país reconhecer outros direitos, nós os exercemos sobre esse pedido. Escreva para contacto@agronys.com." },
        { title: "Segurança, menores e vigência", text: "Aplicamos medidas razoáveis de resguardo. O site não é dirigido a crianças e não pedimos dados de menores. O site público não toma decisões automatizadas sobre pessoas. A versão vigente é a publicada nesta página." },
      ],
    },
    terms: {
      meta: "Termos e condições · Agronys",
      eyebrow: "Marco legal",
      h1: "Termos e condições",
      items: [
        { title: "Aceitação", text: "Ao percorrer o site, estas condições se aplicam a esse uso. Se você não as aceita, não use o site." },
        { title: "Natureza da informação", text: "O conteúdo descreve o trabalho da equipe. Não é assessoria agronômica, veterinária, jurídica nem tributária, e não publica resultados de um estabelecimento. A decisão no campo é de quem o opera." },
        { title: "Propriedade intelectual", text: "Os textos, as marcas, as imagens, os vídeos e os áudios são da Agronys ou são usados com autorização. Você pode compartilhar o link. Não pode copiar o conteúdo com fins comerciais sem permissão da equipe." },
        { title: "Contas", text: "Não há registro público. As credenciais são entregues pelo representante Agronys. O software e as contas seguem o contrato. Não compartilhe essas credenciais." },
        { title: "Uso aceitável", text: "Use o site de forma lícita. Não tente entrar numa conta sem autorização nem degradar o serviço." },
        { title: "Terceiros e disponibilidade", text: "Os links de e-mail e WhatsApp saem do site. O site pode mudar ou ser interrompido sem alterar um contrato já assinado." },
        { title: "Responsabilidade", text: "A Agronys não responde por uma decisão tomada só com o que esta página diz. Esta limitação não tira os direitos que uma norma imperativa lhe reconheça, na Argentina ou no seu país." },
        { title: "Lei aplicável", text: "Estes termos se regem pela lei da República Argentina. Os tribunais argentinos entendem das controvérsias do site, sem privá-lo de um foro que a sua norma imperativa reserve." },
        { title: "Vigência e contato", text: "A versão vigente é esta página. Para uma dúvida: contacto@agronys.com." },
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
        { title: "范围", text: "本说明适用于 Agronys 的公开网站。账户和已签约的软件以与牧场签订的合同为准。" },
        { title: "责任方", text: "责任方是位于阿根廷的 Agronys 团队。数据咨询：contacto@agronys.com。法定名称和地址通过该渠道和合同告知。" },
        { title: "本站数据", text: "如果你通过邮件或 WhatsApp 来信，我们使用姓名、牧场、渠道和内容来回复。浏览器里可能留下语言、声音和本提示的记录。详情见 {c}。我们不建立营销档案。此版本没有第三方广告，也没有营销分析。" },
        { title: "服务页的天气", text: "在服务页，天气和地点搜索会请求 Open-Meteo。如果你授权位置，浏览器只为该次请求发送坐标。我们不将其用于广告。" },
        { title: "依据与技术记录", text: "我们回复咨询；如果继续，也处理签约前的步骤。偏好用于按你离开时的方式显示网站。服务器可在提供和保护网站所需的时间内保存连接数据。" },
        { title: "接收方", text: "我们不出售数据，也不把数据交给第三方建库。邮件、WhatsApp 和 Open-Meteo 是第三方服务：一旦使用，也适用它们的说明。托管方为了交付网站而处理连接数据。" },
        { title: "其他国家", text: "运营在阿根廷。来自其他国家的咨询从这里处理。WhatsApp 和 Open-Meteo 可能按其自身说明在你的国家以外处理该请求。" },
        { title: "保存", text: "咨询在其存续期间保存；如有商业关系，则在该关系期间以及法律要求的期限内保存。浏览器偏好保留到你删除为止。" },
        { title: "权利", text: "你可以要求查阅、更正、更新或删除，并反对并非回复所必需的使用。在阿根廷适用第 25.326 号法律，你可以向 Agencia de Acceso a la Información Pública 提出申诉。如果你的国家承认其他权利，我们按该请求行使。请写信至 contacto@agronys.com。" },
        { title: "安全、未成年人与版本", text: "我们采取合理的保护措施。本网站不面向儿童，也不索取未成年人的数据。公开网站不对个人作出自动化决定。现行版本即本页所公布的版本。" },
      ],
    },
    terms: {
      meta: "条款和条件 · Agronys",
      eyebrow: "法律",
      h1: "条款和条件",
      items: [
        { title: "接受", text: "浏览本网站，即表示这些条件适用于该使用。如果你不接受，请不要使用本网站。" },
        { title: "信息的性质", text: "内容说明团队的工作。它不是农学、兽医、法律或税务建议，也不公布某个牧场的结果。田间的决定属于经营者。" },
        { title: "知识产权", text: "文本、标识、图像、视频和音频属于 Agronys，或经授权使用。你可以分享链接。未经团队许可，不得将内容用于商业复制。" },
        { title: "账户", text: "没有公开注册。凭证由 Agronys 代表发放。软件和账户以合同为准。请勿分享这些凭证。" },
        { title: "正当使用", text: "请合法使用本网站。不要试图未经授权进入账户，也不要降低服务。" },
        { title: "第三方与可用性", text: "邮件和 WhatsApp 的链接会离开本网站。网站可以变更或中断，这不改变已经签订的合同。" },
        { title: "责任", text: "仅依据本页内容作出的决定，Agronys 不承担责任。这项限制不取消阿根廷或你的国家的强制性规范所给予的权利。" },
        { title: "适用法律", text: "这些条款适用阿根廷共和国法律。与网站有关的争议由阿根廷法院审理，但不剥夺强制性规范为你保留的管辖。" },
        { title: "版本与联系", text: "现行版本即本页。如有疑问：contacto@agronys.com。" },
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
        { title: "Alcance", text: "Ko aviso oñe'ẽ pe sitio público Agronys rehe. Cuenta ha software ojecontrata va'ekue oho pe contrato rehe, pe estancia ndive." },
        { title: "Responsable", text: "Pe responsable ha'e equipo Agronys, Argentina. Porandu mba'ekuaarã rehe: contacto@agronys.com. Razón social ha domicilio oje'e upe correo rupive ha pe contrato-pe." },
        { title: "Sitio mba'ekuaarã", text: "Rehai rire correo térã WhatsApp rupive, roiporu téra, estancia, canal ha marandu, rohovái haguã. Navegador-pe ikatu opyta ñe'ẽ, mbopu ha ko aviso. Pe detalle oĩ {c}-pe. Ndorojapói perfil marketing rehegua. Ko versión ndorekói publicidad ambue mba'e pegua ni analítica marketing rehegua." },
        { title: "Ára Servicios-pe", text: "Servicios-pe, ára ha tenda jeheka oporandu Open-Meteo-pe. Reautorizáramo ubicación, navegador omondo coordenada upe pedído año rehe. Ndorojeporúi publicidad-pe." },
        { title: "Base ha registro técnico", text: "Rohovái pe porandu ha, osẽramo, umi paso contrato mboyvegua. Preferencia ohechauka pe sitio rejapohaguéicha. Servidor ikatu oñongatu dato conexión, pe tiempo oikotevẽva ome'ẽ ha oñangareko haguã sitio rehe." },
        { title: "Mávape", text: "Ndorovendéi dato ni rome'ẽ lista ambue mba'épe. Correo, WhatsApp ha Open-Meteo ha'e servicio ambue: ojeiporúramo, ojuega avei iñaviso. Pe omohendáva sitio otrata dato conexión ome'ẽ haguã." },
        { title: "Ambue tetã", text: "Jeporu oĩ Argentina-pe. Porandu ambue tetã guive oñeatende ko'águi. WhatsApp ha Open-Meteo ikatu otrata pe pedido nde tetã guive okápe, iñaviso rehe." },
        { title: "Ñeñongatu", text: "Pe porandu oñeñongatu oikóvape, ha oĩramo relación comercial, upe aja ha pe plazo léi ojeruréva. Preferencia navegador opyta reipe'a peve." },
        { title: "Derecho", text: "Rejerurekuaa jeike, ñemohenda, actualización térã ñembogue, ha reñe'ẽkuaa peteĩ jeporu ndoikotevẽivare rohovái haguã. Argentina-pe ojuega Ley 25.326 ha rejerurekuaa Agencia de Acceso a la Información Pública renondépe. Nde tetã ohechakuaáramo ambue derecho, rojapo upe pedido rehe. Ehai contacto@agronys.com-pe." },
        { title: "Tekorosã, mitã ha vigencia", text: "Roiporu medida razonable de resguardo. Pe sitio ndaha'éi mitãme g̃uarã ha ndorojeruréi dato mitã rehegua. Pe sitio público ndojapói decisión automatizada persona rehe. Pe versión oikóva ha'e pe oñembosako'íva ko página-pe." },
      ],
    },
    terms: {
      meta: "Término ha condición · Agronys",
      eyebrow: "Léi",
      h1: "Término ha condición",
      items: [
        { title: "Ñeacepta", text: "Reikévo sitio, ko'ã condición ojuega upe jeporu rehe. Nde'aceptáiramo, ani reiporu pe sitio." },
        { title: "Marandu mba'épa", text: "Pe jehaipy omombe'u equipo rembiapo. Ndaha'éi consejo agronómico, veterinario, jurídico ni impositivo, ha nomoherakúi peteĩ estancia resultado. Decisión kokuepe ha'e pe omyakãva mba'e." },
        { title: "Propiedad intelectual", text: "Jehaipy, marca, ta'anga, video ha mbopu ha'e Agronys mba'e térã ojeiporu autorización ndive. Rembohasakuaa pe enlace. Ndaikatúi rembohasa pe jehaipy viru rehegua equipo permiso'ỹre." },
        { title: "Cuenta", text: "Ndaipóri registro público. Credencial ome'ẽ representante Agronys. Software ha cuenta oho pe contrato rehe. Ani embohasa umi credencial." },
        { title: "Jeporu porã", text: "Eiporu pe sitio léi rehe. Ani reike cuenta-pe autorización'ỹre ni remboguejy pe servicio." },
        { title: "Ambue ha disponibilidad", text: "Enlace correo ha WhatsApp oho sitio guive okápe. Pe sitio ikatu oñemoambue térã opytu'u, ha upéva nomoambuemo'ãi peteĩ contrato oñefirmámava." },
        { title: "Responsabilidad", text: "Agronys nombohováiri peteĩ decisión ojejapo va'ekue ko página año rehe. Ko limitación ndoipe'ái derecho peteĩ norma imperativa ome'ẽva, Argentina-pe térã nde tetãme." },
        { title: "Léi ojuegáva", text: "Ko'ã término ojuega República Argentina léi rehe. Tribunal argentino oikuaa sitio controversia, oipe'a'ỹre peteĩ fuero nde norma imperativa oñongatúva ndéve." },
        { title: "Vigencia ha ñe'ẽjoaju", text: "Pe versión oikóva ha'e ko página. Peteĩ porandu: contacto@agronys.com." },
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
