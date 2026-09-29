(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`agronys-lang`,t={es:{skip:`Saltar al contenido`,lang:`Idioma`,profile:`Cuenta`,close:`Cerrar`,cookies:`Usamos solo una preferencia técnica para recordar este aviso. <a href="/cookies/">Más información</a>.`,cookiesOk:`Aceptar`,askDemo:`Pedir demo`,askDemoMsg:`Hola, quiero pedir una demo de {topic}.`,titles:{index:`Agronys`,about:`Quiénes somos · Agronys`,approach:`Enfoque · Agronys`,services:`Servicios · Agronys`,products:`Productos · Agronys`,contact:`Contacto · Agronys`,legal:`Aviso legal · Agronys`,privacy:`Privacidad · Agronys`,cookies:`Cookies · Agronys`,terms:`Términos · Agronys`,a11y:`Accesibilidad · Agronys`},descs:{index:`Agronys: herramientas de campo para ganadería de precisión en Argentina y Paraguay. Nutrogan, SIGAG y ganadería de precisión.`,about:`Equipo AgTech argentino. Herramientas de ganadería de precisión para el establecimiento.`,approach:`El dato tiene que servir en el potrero. Captura offline, un mismo criterio operativo.`,services:`Capacidades a medida: monitoreo, visión, alertas, potreros, satélite y arquitectura offline-first.`,products:`Tres líneas: Nutrogan, SIGAG y Dashboard Estado de Situación. Cada despliegue se arma con el establecimiento.`,contact:`Canal del equipo Agronys. Correo y WhatsApp para pedir una demo.`,legal:`Aviso legal de Agronys. Contenido informativo, sin asesoramiento veterinario.`,privacy:`Privacidad: los datos de consulta se usan solo para responder.`,cookies:`Solo una preferencia técnica en el navegador. Sin cookies de marketing.`,terms:`Términos de uso del sitio Agronys.`,a11y:`Accesibilidad del sitio Agronys. Contacto si un recorrido no es usable.`},legal:`Legal`,legalNotice:`Aviso legal`,privacy:`Privacidad`,cookiesLink:`Cookies`,terms:`Términos`,a11y:`Accesibilidad`,contact:`Contacto`,navAbout:`Quiénes somos`,navApproach:`Enfoque`,navServices:`Servicios`,navProducts:`Productos`,navContact:`Contacto`,navDock:`Secciones del sitio`,navPortal:`Portal`,legalOpen:`Cerrar legal`,hub:`Vaca y maíz sobre la tierra`,cards:{ganaderia:{title:`Monitoreo 360° con IA`,kicker:`Rodeo e historial productivo`,note:`Registro de pesajes, movimientos y atenciones. Permite evaluar la evolución de cada animal y del lote a lo largo del tiempo.`},vision:{title:`Visión artificial`,kicker:`Condición, anomalías y materia fecal`,note:`Condición corporal, reconocimiento, escáner de anomalías (heridas y lesiones) y escáner de materia fecal para análisis. Un mismo criterio para el personal, el veterinario y el productor.`},orquestacion:{title:`Sistema de monitoreo y alertas`,kicker:`Sanidad, calor y manejo`,note:`Notificaciones priorizadas cuando un animal o un lote requiere intervención. La decisión operativa permanece en el establecimiento.`},agro:{title:`Gestión de potreros`,kicker:`Carga, forraje y descanso`,note:`Integra el estado del lote con el rodeo: qué potrero puede recibir hacienda y cuál requiere reposo.`},satelital:{title:`Monitoreo satelital y NDVI`,kicker:`Vigor del cultivo y del forraje`,note:`Seguimiento del establecimiento con imágenes satelitales. Identifica zonas de mayor o menor verdor sin recorrer la totalidad del campo.`},datos:{title:`Captura de datos en campo`,kicker:`Registro en el lote`,note:`La información se carga donde ocurre el trabajo. Al restablecerse la conectividad, se sincroniza con la oficina.`},automat:{title:`Automatización de procesos`,kicker:`Flujos operativos`,note:``},dataeng:{title:`Ingeniería de datos`,kicker:`Integración de información`,note:``},offline:{title:`Arquitectura offline-first`,kicker:`Operación sin conectividad`,note:``}}},en:{skip:`Skip to content`,lang:`Language`,profile:`Account`,close:`Close`,cookies:`We only store a technical preference to remember this notice. <a href="/cookies/">More information</a>.`,cookiesOk:`Accept`,askDemo:`Request demo`,askDemoMsg:`Hello, I would like to request a demo of {topic}.`,titles:{index:`Agronys`,about:`About us · Agronys`,approach:`Approach · Agronys`,services:`Services · Agronys`,products:`Products · Agronys`,contact:`Contact · Agronys`,legal:`Legal notice · Agronys`,privacy:`Privacy · Agronys`,cookies:`Cookies · Agronys`,terms:`Terms · Agronys`,a11y:`Accessibility · Agronys`},descs:{index:`Agronys: field tools for precision livestock in Argentina and Paraguay. Nutrogan, SIGAG and precision livestock.`,about:`Argentine AgTech team. Precision-livestock tools for the farm.`,approach:`Data has to work in the paddock. Offline capture, one operational criterion.`,services:`Tailored capabilities: monitoring, vision, alerts, paddocks, satellite and offline-first architecture.`,products:`Three lines: Nutrogan, SIGAG and Situation Status Dashboard. Each deployment is built with the farm.`,contact:`Agronys team channel. Email and WhatsApp to request a demo.`,legal:`Agronys legal notice. Informational content, not veterinary advice.`,privacy:`Privacy: inquiry data is used only to reply.`,cookies:`Only a technical browser preference. No marketing cookies.`,terms:`Terms of use of the Agronys site.`,a11y:`Accessibility of the Agronys site. Contact us if a path is unusable.`},legal:`Legal`,legalNotice:`Legal notice`,privacy:`Privacy`,cookiesLink:`Cookies`,terms:`Terms`,a11y:`Accessibility`,contact:`Contact`,navAbout:`About us`,navApproach:`Approach`,navServices:`Services`,navProducts:`Products`,navContact:`Contact`,navDock:`Site sections`,navPortal:`Portal`,legalOpen:`Close legal`,hub:`Cow and maize on the soil`,cards:{ganaderia:{title:`360° monitoring with AI`,kicker:`Herd and production history`,note:`Weighings, movements and treatments in one record. Lets you assess how each animal and the lot evolve over time.`},vision:{title:`Computer vision`,kicker:`Condition, anomalies and feces`,note:`Body condition, recognition, anomaly scanning (wounds and lesions) and fecal-matter scanning for analysis. One criterion for staff, veterinarian and producer.`},orquestacion:{title:`Monitoring and alert system`,kicker:`Health, heat and handling`,note:`Prioritized notices when an animal or lot needs action. Operational decisions remain with the farm.`},agro:{title:`Paddock management`,kicker:`Stocking, forage and rest`,note:`Links lot status to the herd: which paddock can take cattle and which needs rest.`},satelital:{title:`Satellite monitoring and NDVI`,kicker:`Crop and forage vigor`,note:`Farm follow-up with satellite imagery. Identifies higher or lower greenness without walking the whole property.`},datos:{title:`Field data capture`,kicker:`Recording in the lot`,note:`Information is logged where the work happens. When connectivity returns, it syncs with the office.`},automat:{title:`Process automation`,kicker:`Operational flows`,note:``},dataeng:{title:`Data engineering`,kicker:`Information integration`,note:``},offline:{title:`Offline-first architecture`,kicker:`Operation without connectivity`,note:``}}},pt:{skip:`Saltar para o conteúdo`,lang:`Idioma`,profile:`Conta`,close:`Fechar`,cookies:`Guardamos só uma preferência técnica para lembrar este aviso. <a href="/cookies/">Mais informação</a>.`,cookiesOk:`Aceitar`,askDemo:`Pedir demo`,askDemoMsg:`Olá, quero pedir uma demo de {topic}.`,titles:{index:`Agronys`,about:`Quem somos · Agronys`,approach:`Abordagem · Agronys`,services:`Serviços · Agronys`,products:`Produtos · Agronys`,contact:`Contato · Agronys`,legal:`Aviso legal · Agronys`,privacy:`Privacidade · Agronys`,cookies:`Cookies · Agronys`,terms:`Termos · Agronys`,a11y:`Acessibilidade · Agronys`},descs:{index:`Agronys: ferramentas de campo para pecuária de precisão na Argentina e no Paraguai. Nutrogan, SIGAG e pecuária de precisão.`,about:`Equipe AgTech argentina. Ferramentas de pecuária de precisão para o estabelecimento.`,approach:`O dado tem de servir no piquete. Captura offline, um mesmo critério operacional.`,services:`Capacidades sob medida: monitoramento, visão, alertas, piquetes, satélite e arquitetura offline-first.`,products:`Três linhas: Nutrogan, SIGAG e Dashboard Estado de Situação. Cada implantação se arma com o estabelecimento.`,contact:`Canal da equipe Agronys. E-mail e WhatsApp para pedir uma demo.`,legal:`Aviso legal da Agronys. Conteúdo informativo, sem assessoria veterinária.`,privacy:`Privacidade: os dados da consulta são usados só para responder.`,cookies:`Só uma preferência técnica no navegador. Sem cookies de marketing.`,terms:`Termos de uso do site Agronys.`,a11y:`Acessibilidade do site Agronys. Contato se um percurso não for usável.`},legal:`Legal`,legalNotice:`Aviso legal`,privacy:`Privacidade`,cookiesLink:`Cookies`,terms:`Termos`,a11y:`Acessibilidade`,contact:`Contato`,navAbout:`Quem somos`,navApproach:`Abordagem`,navServices:`Serviços`,navProducts:`Produtos`,navContact:`Contato`,navDock:`Seções do site`,navPortal:`Portal`,legalOpen:`Fechar legal`,hub:`Vaca e milho sobre a terra`,cards:{ganaderia:{title:`Monitoramento 360° com IA`,kicker:`Rebanho e histórico produtivo`,note:`Registro de pesagens, movimentações e atendimentos. Permite avaliar a evolução de cada animal e do lote ao longo do tempo.`},vision:{title:`Visão artificial`,kicker:`Condição, anomalias e matéria fecal`,note:`Condição corporal, reconhecimento, scanner de anomalias (feridas e lesões) e scanner de matéria fecal para análise. O mesmo critério para a equipe, o veterinário e o produtor.`},orquestacion:{title:`Sistema de monitoramento e alertas`,kicker:`Sanidade, calor e manejo`,note:`Notificações priorizadas quando um animal ou um lote precisa de intervenção. A decisão operacional permanece no estabelecimento.`},agro:{title:`Gestão de piquetes`,kicker:`Carga, forragem e descanso`,note:`Integra o estado do lote com o rebanho: qual piquete pode receber gado e qual precisa de descanso.`},satelital:{title:`Monitoramento satelital e NDVI`,kicker:`Vigor da cultura e da forragem`,note:`Acompanhamento do estabelecimento com imagens de satélite. Identifica zonas de maior ou menor verdor sem percorrer todo o campo.`},datos:{title:`Captura de dados no campo`,kicker:`Registro no lote`,note:`A informação é registrada onde o trabalho acontece. Ao restabelecer a conectividade, sincroniza com o escritório.`},automat:{title:`Automação de processos`,kicker:`Fluxos operacionais`,note:``},dataeng:{title:`Engenharia de dados`,kicker:`Integração da informação`,note:``},offline:{title:`Arquitetura offline-first`,kicker:`Operação sem conectividade`,note:``}}},zh:{skip:`跳到正文`,lang:`语言`,profile:`账户`,close:`关闭`,cookies:`仅保存一项技术偏好以记住本提示。<a href="/cookies/">了解更多</a>。`,cookiesOk:`接受`,askDemo:`申请演示`,askDemoMsg:`你好，我想申请 {topic} 的演示。`,titles:{index:`Agronys`,about:`关于我们 · Agronys`,approach:`方法 · Agronys`,services:`服务 · Agronys`,products:`产品 · Agronys`,contact:`联系 · Agronys`,legal:`法律声明 · Agronys`,privacy:`隐私 · Agronys`,cookies:`Cookie · Agronys`,terms:`条款 · Agronys`,a11y:`无障碍 · Agronys`},descs:{index:`Agronys：阿根廷与巴拉圭精准畜牧的田间工具。Nutrogan、SIGAG 与精准畜牧。`,about:`阿根廷 AgTech 团队。为牧场提供精准畜牧工具。`,approach:`数据须在围栏可用。离线采集，统一作业标准。`,services:`定制能力：监测、视觉、预警、围栏、卫星与离线优先架构。`,products:`三条产品线：Nutrogan、SIGAG 与态势仪表盘。每次部署与牧场一起搭建。`,contact:`Agronys 团队渠道。邮件与 WhatsApp 申请演示。`,legal:`Agronys 法律声明。信息性内容，非兽医建议。`,privacy:`隐私：咨询数据仅用于回复。`,cookies:`仅一项浏览器技术偏好。无营销 Cookie。`,terms:`Agronys 站点使用条款。`,a11y:`Agronys 站点无障碍。若路径不可用请联系。`},legal:`法律`,legalNotice:`法律声明`,privacy:`隐私`,cookiesLink:`Cookie`,terms:`条款`,a11y:`无障碍`,contact:`联系`,navAbout:`关于我们`,navApproach:`方法`,navServices:`服务`,navProducts:`产品`,navContact:`联系`,navDock:`站点栏目`,navPortal:`门户`,legalOpen:`关闭法律菜单`,hub:`土地上的牛与玉米`,cards:{ganaderia:{title:`AI 360° 监测`,kicker:`牛群与生产档案`,note:`称重、转群与处置记录于同一档案。可以评估每头牛及整批随时间的变化。`},vision:{title:`计算机视觉`,kicker:`体况、异常与粪便`,note:`体况、识别、异常扫描（伤口与病灶）以及粪便扫描供分析。员工、兽医与生产者使用同一标准。`},orquestacion:{title:`监测与预警`,kicker:`卫生、热应激与管理`,note:`当单头或整批需要干预时优先通知。作业决策仍由牧场作出。`},agro:{title:`围栏管理`,kicker:`载畜、饲草与休息`,note:`将围栏状态与牛群联动：哪块可进牛，哪块需要休息。`},satelital:{title:`卫星监测与 NDVI`,kicker:`作物与饲草势`,note:`用卫星影像跟踪牧场。无需遍走全场即可识别绿度高低区域。`},datos:{title:`田间数据采集`,kicker:`在围栏记录`,note:`信息在作业现场录入。网络恢复后与办事处同步。`},automat:{title:`流程自动化`,kicker:`作业流程`,note:``},dataeng:{title:`数据工程`,kicker:`信息整合`,note:``},offline:{title:`离线优先架构`,kicker:`无网络亦可作业`,note:``}}}},n=[{id:`es`,label:`ES`,title:`Español`,html:`es`},{id:`en`,label:`EN`,title:`English`,html:`en`},{id:`pt`,label:`PT`,title:`Português`,html:`pt`},{id:`zh`,label:`中`,title:`中文`,html:`zh-CN`}],r=new Set(n.map(e=>e.id));function i(){return n.map(e=>`<button type="button" data-lang="${e.id}" title="${e.title}" aria-label="${e.title}">${e.label}</button>`).join(``)}function a(){try{let t=localStorage.getItem(e);if(r.has(t))return t}catch{}return`es`}function o(t){let i=r.has(t)?t:`es`;try{localStorage.setItem(e,i)}catch{}let a=n.find(e=>e.id===i);return document.documentElement.lang=a?a.html:`es`,i}function s(){return t[a()]??t.es}function c(){let e=s(),t=n.find(e=>e.id===a());document.documentElement.lang=t?t.html:`es`,document.querySelectorAll(`.lang-switch`).forEach(e=>{e.querySelectorAll(`[data-lang]`).length!==n.length&&(e.innerHTML=i())}),document.querySelectorAll(`[data-i18n]`).forEach(t=>{let n=t.dataset.i18n,r=e[n];typeof r==`string`&&(t.dataset.i18nHtml===`1`?t.innerHTML=r:t.textContent=r)}),document.querySelectorAll(`[data-i18n-aria]`).forEach(t=>{let n=t.dataset.i18nAria;e[n]&&t.setAttribute(`aria-label`,e[n])});let r=e.cards;r&&Object.entries(r).forEach(([e,t])=>{let n=document.querySelector(`.panel[data-layer="${e}"]`);if(n){let e=n.querySelector(`h2`),r=n.querySelector(`.panel-kicker`),i=n.querySelector(`.note`);e&&(e.textContent=t.title),r&&(r.textContent=t.kicker),i&&t.note&&(i.textContent=t.note)}let r=document.querySelector(`.svc-btn[data-layer="${e}"]`);r&&(r.setAttribute(`aria-label`,t.title),r.setAttribute(`data-tip`,t.title))}),document.querySelectorAll(`.lang-switch [data-lang]`).forEach(e=>{e.setAttribute(`aria-pressed`,e.dataset.lang===a()?`true`:`false`)});let o=document.body.dataset.page||`index`;e.titles?.[o]&&(document.title=e.titles[o]);let c=document.querySelector(`meta[name="description"]`);c&&e.descs?.[o]&&c.setAttribute(`content`,e.descs[o])}function l(){document.querySelectorAll(`.lang-switch`).forEach(e=>{e.innerHTML=i()}),c(),document.documentElement.dataset.langBound!==`1`&&(document.documentElement.dataset.langBound=`1`,document.addEventListener(`click`,e=>{let t=e.target.closest(`.lang-switch [data-lang]`);t&&(o(t.dataset.lang),c(),window.dispatchEvent(new CustomEvent(`agronys:lang`)))}))}var u=`https://wa.me/543704022201`,d=`mailto:agronys@gmail.com`;function f(e){let t=(s().askDemoMsg||`Hola, quiero pedir una demo de {topic}.`).replace(`{topic}`,e);return`${u}?text=${encodeURIComponent(t)}`}var p={about:`
    <p class="eyebrow">Quiénes somos</p>
    <h1>Equipo AgTech para el establecimiento.</h1>
    <p>Agronys es una startup AgTech argentina (desde 2022). El equipo desarrolla herramientas de <strong>ganadería de precisión</strong>: el registro se origina en el potrero, donde está la hacienda y con frecuencia no hay cobertura de red.</p>
    <div class="fact-row">
      <p class="fact"><b>Origen</b><span>Argentina · 2022</span></p>
      <p class="fact"><b>Base operativa</b><span>NEA y Paraguay</span></p>
      <p class="fact"><b>Alcance</b><span>Soluciones a medida</span></p>
    </div>
    <p>El trabajo se sostiene sobre una línea técnica de campo (captura offline, indicadores, visión y lectura territorial), con desarrollo en el NEA.</p>
    <p>Agronys no sustituye al veterinario ni al encargado. El equipo ordena la información para que el establecimiento decida.</p>
  `,approach:`
    <p class="eyebrow">Enfoque · desde 2022</p>
    <h1>El dato tiene que servir en el potrero, no recién en la oficina.</h1>
    <p>El equipo trabaja para que el establecimiento decida con lo que ocurre en el lote. Calor, carga, condición del animal y forraje no pueden vivir en registros separados.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>El animal no espera.</strong><p>Un pico de calor o un lote pasado de carga se detectan tarde si el registro queda para cuando haya conectividad.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>En el campo no siempre hay red.</strong><p>Un sistema que solo opera conectado empuja a perder el dato. La captura debe continuar sin cobertura.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>Un mismo criterio operativo.</strong><p>El personal, el servicio veterinario y la dirección necesitan la misma lectura de la hacienda.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Pasto y rodeo son el mismo negocio.</strong><p>Separarlos en sistemas distintos termina en decisiones incompletas.</p></div></li>
    </ul>
  `,services:`
    <p class="eyebrow">Servicios</p>
    <h1>Capacidades para el establecimiento</h1>
    <p>Líneas de trabajo que el equipo configura a medida. La decisión operativa permanece en el predio.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="/icons/ganaderia.svg" alt="" /><h2>Monitoreo 360° con IA</h2></div><p>Pesajes, movimientos y atenciones en un mismo registro. Evolución del animal y del lote a lo largo de la campaña.</p></article>
      <article><div class="svc-head"><img src="/icons/vision.svg" alt="" /><h2>Visión artificial</h2></div><p>Condición corporal, reconocimiento, escáner de anomalías (heridas, lesiones y otras señales visibles) y escáner de materia fecal para análisis. No sustituye el diagnóstico veterinario ni el laboratorio.</p></article>
      <article><div class="svc-head"><img src="/icons/orquestacion.svg" alt="" /><h2>Monitoreo y alertas</h2></div><p>Notificaciones priorizadas de calor, sanidad y manejo.</p></article>
      <article><div class="svc-head"><img src="/icons/agro.svg" alt="" /><h2>Gestión de potreros</h2></div><p>Carga, forraje y descanso en la misma lectura que el rodeo.</p></article>
      <article><div class="svc-head"><img src="/icons/satelital.svg" alt="" /><h2>Monitoreo satelital y NDVI</h2></div><p>Seguimiento de vigor de cultivo y forraje.</p></article>
      <article><div class="svc-head"><img src="/icons/datos.svg" alt="" /><h2>Captura en campo</h2></div><p>Registro en el lote, con o sin red. Sincronización al restablecerse la conectividad.</p></article>
      <article><div class="svc-head"><img src="/icons/automat.svg" alt="" /><h2>Automatización</h2></div><p>Flujos disparados por un evento: notificación, planilla o mensaje.</p></article>
      <article><div class="svc-head"><img src="/icons/dataeng.svg" alt="" /><h2>Ingeniería de datos</h2></div><p>Integración de dispositivo, planillas y oficina.</p></article>
      <article><div class="svc-head"><img src="/icons/offline.svg" alt="" /><h2>Arquitectura offline-first</h2></div><p>Operación continua sin cobertura. Sincronización al recuperar señal.</p></article>
    </div>
  `,products:`
    <div class="prod-root"></div>
  `,contact:`
    <p class="eyebrow">Contacto</p>
    <h1>Canal del equipo</h1>
    <p>Las consultas las atiende el equipo. Indique el tipo de establecimiento y el problema operativo con el que desea empezar.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${d}">
          <span class="reach-ico" aria-hidden="true">${_()}</span>
          <span>Correo del equipo</span>
        </a>
        <a class="reach-btn" href="${u}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${v()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="/art/nea.png" alt="Presencia operativa: Chaco, Corrientes, Misiones, Formosa y Paraguay" />
        <figcaption>Presencia en el NEA argentino y Paraguay</figcaption>
      </figure>
    </div>
  `,legal:`
    <p class="eyebrow">Marco legal</p>
    <h1>Aviso legal</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Titular del sitio</strong><p>Este sitio informa sobre Agronys y las soluciones de campo que ofrece el equipo. Operación: equipo Agronys, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Carácter informativo</strong><p>El contenido no constituye asesoramiento veterinario ni agronómico, ni garantiza resultados productivos.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Alcance</strong><p>Las descripciones de capacidades y tecnologías son orientativas. Cada despliegue se define con el establecimiento.</p></div></article>
    </div>
  `,privacy:`
    <p class="eyebrow">Marco legal</p>
    <h1>Privacidad</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Datos de consulta</strong><p>Los datos enviados por correo o WhatsApp se usan \u00fanicamente para responder. No se comercializan bases.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Responsable</strong><p>Contacto: <a href="${d}">agronys@gmail.com</a>. Responsable: el equipo Agronys.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Conservaci\u00f3n y derechos</strong><p>Plazo: relaci\u00f3n comercial o Ley 25.326. Puede solicitar acceso, rectificaci\u00f3n o supresi\u00f3n por ese correo.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Anal\u00edtica</strong><p>Esta versi\u00f3n del sitio no incorpora publicidad de terceros ni anal\u00edtica de marketing.</p></div></article>
    </div>
  `,cookies:`
    <p class="eyebrow">Marco legal</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Preferencia técnica</strong><p>Se guarda en el navegador (almacenamiento local) si aceptó este aviso.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Sin seguimiento publicitario</strong><p>No se usan cookies de marketing en esta versión.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Control</strong><p>Puede borrar los datos del sitio desde la configuración del navegador.</p></div></article>
    </div>
  `,terms:`
    <p class="eyebrow">Marco legal</p>
    <h1>Términos de uso</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Uso del contenido</strong><p>El contenido de este sitio no puede copiarse con fines comerciales sin autorización.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Producto y contrato</strong><p>El software y las cuentas se rigen por el contrato al contratar, no únicamente por esta página.</p></div></article>
    </div>
  `,a11y:`
    <p class="eyebrow">Marco legal</p>
    <h1>Accesibilidad</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Recorrido</strong><p>Idioma espa\u00f1ol, salto al contenido, contraste sobre fondo oscuro, foco visible y encabezados.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>El dibujo del portal es ilustrativo; la misma informaci\u00f3n est\u00e1 en Enfoque, Servicios y Productos. Se respeta reducir movimiento.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Aviso</strong><p>Si un recorrido no es usable: <a href="${d}">agronys@gmail.com</a>.</p></div></article>
    </div>
  `},m={about:`
    <p class="eyebrow">About us</p>
    <h1>An AgTech team for the farm.</h1>
    <p>Agronys is an Argentine AgTech startup (since 2022). The team builds <strong>precision livestock</strong> tools: records start in the paddock, where cattle are and coverage is often missing.</p>
    <div class="fact-row">
      <p class="fact"><b>Origin</b><span>Argentina · 2022</span></p>
      <p class="fact"><b>Operating base</b><span>NEA and Paraguay</span></p>
      <p class="fact"><b>Scope</b><span>Tailored solutions</span></p>
    </div>
    <p>The work rests on a field-technical line (offline capture, indicators, vision and territorial reading), with development in the NEA.</p>
    <p>Agronys does not replace the veterinarian or the foreman. The team organizes information so the farm can decide.</p>
  `,approach:`
    <p class="eyebrow">Approach · since 2022</p>
    <h1>Data has to work in the paddock, not only back at the office.</h1>
    <p>The team works so the farm can decide from what is happening in the lot. Heat, stocking, animal condition and forage cannot live in separate records.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>The animal does not wait.</strong><p>A heat spike or an overloaded lot is seen too late if logging waits for connectivity.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>The field does not always have a network.</strong><p>A system that only runs online pushes data loss. Capture must continue without coverage.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>One operational criterion.</strong><p>Staff, veterinary service and management need the same reading of the herd.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Grass and herd are the same business.</strong><p>Splitting them into different systems ends in incomplete decisions.</p></div></li>
    </ul>
  `,services:`
    <p class="eyebrow">Services</p>
    <h1>Capabilities for the farm</h1>
    <p>Work lines the team configures to each property. Operational decisions stay on the farm.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="/icons/ganaderia.svg" alt="" /><h2>360° monitoring with AI</h2></div><p>Weighings, movements and treatments in one record.</p></article>
      <article><div class="svc-head"><img src="/icons/vision.svg" alt="" /><h2>Computer vision</h2></div><p>Body condition, recognition, anomaly scanning (wounds, lesions and other visible signs) and fecal-matter scanning for analysis. It does not replace veterinary diagnosis or the lab.</p></article>
      <article><div class="svc-head"><img src="/icons/orquestacion.svg" alt="" /><h2>Monitoring and alerts</h2></div><p>Prioritized notices for heat, health and handling.</p></article>
      <article><div class="svc-head"><img src="/icons/agro.svg" alt="" /><h2>Paddock management</h2></div><p>Stocking, forage and rest in the same reading as the herd.</p></article>
      <article><div class="svc-head"><img src="/icons/satelital.svg" alt="" /><h2>Satellite monitoring and NDVI</h2></div><p>Crop and forage vigor follow-up.</p></article>
      <article><div class="svc-head"><img src="/icons/datos.svg" alt="" /><h2>Field capture</h2></div><p>Logging in the lot, with or without a network.</p></article>
      <article><div class="svc-head"><img src="/icons/automat.svg" alt="" /><h2>Automation</h2></div><p>Flows triggered by an event: notice, sheet or message.</p></article>
      <article><div class="svc-head"><img src="/icons/dataeng.svg" alt="" /><h2>Data engineering</h2></div><p>Integration of device, sheets and office.</p></article>
      <article><div class="svc-head"><img src="/icons/offline.svg" alt="" /><h2>Offline-first architecture</h2></div><p>Continuous operation without coverage.</p></article>
    </div>
  `,products:`
    <div class="prod-root"></div>
  `,contact:`
    <p class="eyebrow">Contact</p>
    <h1>Team channel</h1>
    <p>The team handles inquiries. State the type of farm and the operational problem you want to start with.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${d}">
          <span class="reach-ico" aria-hidden="true">${_()}</span>
          <span>Team email</span>
        </a>
        <a class="reach-btn" href="${u}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${v()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="/art/nea.png" alt="Operating presence: Chaco, Corrientes, Misiones, Formosa and Paraguay" />
        <figcaption>Presence in Argentina\u2019s NEA and Paraguay</figcaption>
      </figure>
    </div>
  `,legal:`
    <p class="eyebrow">Legal framework</p>
    <h1>Legal notice</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Site operator</strong><p>This site informs about Agronys and the field solutions the team offers. Operation: Agronys team, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Informational only</strong><p>Content is not veterinary or agronomic advice and does not guarantee production results.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Scope</strong><p>Capability and technology descriptions are indicative. Each deployment is defined with the farm.</p></div></article>
    </div>
  `,privacy:`
    <p class="eyebrow">Legal framework</p>
    <h1>Privacy</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Inquiry data</strong><p>Data sent by email or WhatsApp is used only to answer. Databases are not sold.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Controller</strong><p>Contact: <a href="${d}">agronys@gmail.com</a>. Controller: the Agronys team.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Retention and rights</strong><p>Term: the commercial relationship or Law 25.326. Access, rectification or deletion via that address.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Analytics</strong><p>This version has no third-party ads or marketing analytics.</p></div></article>
    </div>
  `,cookies:`
    <p class="eyebrow">Legal framework</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Technical preference</strong><p>The browser stores (local storage) whether you accepted this notice.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>No ad tracking</strong><p>No marketing cookies in this version.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Control</strong><p>You can clear site data in the browser settings.</p></div></article>
    </div>
  `,terms:`
    <p class="eyebrow">Legal framework</p>
    <h1>Terms of use</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Content</strong><p>Site content may not be copied for commercial purposes without authorization.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Product contract</strong><p>Software and accounts are governed by the engagement contract, not only this page.</p></div></article>
    </div>
  `,a11y:`
    <p class="eyebrow">Legal framework</p>
    <h1>Accessibility</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Path</strong><p>Spanish language, skip to content, dark-background contrast, visible focus and headings.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>The portal drawing is illustrative; the same information is in Approach, Services and Products. Reduced motion is respected.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Report</strong><p>If a path is unusable: <a href="${d}">agronys@gmail.com</a>.</p></div></article>
    </div>
  `},h={about:`
    <p class="eyebrow">Quem somos</p>
    <h1>Equipe AgTech para o estabelecimento.</h1>
    <p>Agronys é uma startup AgTech argentina (desde 2022). A equipe desenvolve ferramentas de <strong>pecuária de precisão</strong>: o registro nasce no piquete, onde está o gado e muitas vezes não há cobertura de rede.</p>
    <div class="fact-row">
      <p class="fact"><b>Origem</b><span>Argentina · 2022</span></p>
      <p class="fact"><b>Base operacional</b><span>NEA e Paraguai</span></p>
      <p class="fact"><b>Alcance</b><span>Soluções sob medida</span></p>
    </div>
    <p>O trabalho se apoia em uma linha técnica de campo (captura offline, indicadores, visão e leitura territorial), com desenvolvimento no NEA.</p>
    <p>Agronys não substitui o veterinário nem o encarregado. A equipe organiza a informação para o estabelecimento decidir.</p>
  `,approach:`
    <p class="eyebrow">Abordagem · desde 2022</p>
    <h1>O dado tem de servir no piquete, não só no escritório.</h1>
    <p>A equipe trabalha para que o estabelecimento decida com o que ocorre no lote. Calor, carga, condição do animal e forragem não podem viver em registros separados.</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>O animal não espera.</strong><p>Um pico de calor ou um lote sobrecarregado é visto tarde se o registro espera conectividade.</p></div></li>
      <li><span class="hud-n">02</span><div><strong>No campo nem sempre há rede.</strong><p>Um sistema que só opera conectado empurra a perda do dado. A captura deve continuar sem cobertura.</p></div></li>
      <li><span class="hud-n">03</span><div><strong>Um mesmo critério operacional.</strong><p>A equipe, o serviço veterinário e a direção precisam da mesma leitura do rebanho.</p></div></li>
      <li><span class="hud-n">04</span><div><strong>Pasto e rebanho são o mesmo negócio.</strong><p>Separá-los em sistemas distintos termina em decisões incompletas.</p></div></li>
    </ul>
  `,services:`
    <p class="eyebrow">Serviços</p>
    <h1>Capacidades para o estabelecimento</h1>
    <p>Linhas de trabalho que a equipe configura sob medida. A decisão operacional permanece no predio.</p>
    <div class="cards">
      <article><div class="svc-head"><img src="/icons/ganaderia.svg" alt="" /><h2>Monitoramento 360° com IA</h2></div><p>Pesagens, movimentações e atendimentos no mesmo registro. Evolução do animal e do lote ao longo da campanha.</p></article>
      <article><div class="svc-head"><img src="/icons/vision.svg" alt="" /><h2>Visão artificial</h2></div><p>Condição corporal, reconhecimento, scanner de anomalias (feridas, lesões e outros sinais visíveis) e scanner de matéria fecal para análise. Não substitui o diagnóstico veterinário nem o laboratório.</p></article>
      <article><div class="svc-head"><img src="/icons/orquestacion.svg" alt="" /><h2>Monitoramento e alertas</h2></div><p>Notificações priorizadas de calor, sanidade e manejo.</p></article>
      <article><div class="svc-head"><img src="/icons/agro.svg" alt="" /><h2>Gestão de piquetes</h2></div><p>Carga, forragem e descanso na mesma leitura que o rebanho.</p></article>
      <article><div class="svc-head"><img src="/icons/satelital.svg" alt="" /><h2>Monitoramento satelital e NDVI</h2></div><p>Acompanhamento do vigor da cultura e da forragem.</p></article>
      <article><div class="svc-head"><img src="/icons/datos.svg" alt="" /><h2>Captura em campo</h2></div><p>Registro no lote, com ou sem rede. Sincronização ao restabelecer a conectividade.</p></article>
      <article><div class="svc-head"><img src="/icons/automat.svg" alt="" /><h2>Automação</h2></div><p>Fluxos disparados por um evento: notificação, planilha ou mensagem.</p></article>
      <article><div class="svc-head"><img src="/icons/dataeng.svg" alt="" /><h2>Engenharia de dados</h2></div><p>Integração de dispositivo, planilhas e escritório.</p></article>
      <article><div class="svc-head"><img src="/icons/offline.svg" alt="" /><h2>Arquitetura offline-first</h2></div><p>Operação contínua sem cobertura. Sincronização ao recuperar o sinal.</p></article>
    </div>
  `,products:`
    <div class="prod-root"></div>
  `,contact:`
    <p class="eyebrow">Contato</p>
    <h1>Canal da equipe</h1>
    <p>As consultas s\u00e3o atendidas pela equipe. Indique o tipo de estabelecimento e o problema operacional com o qual deseja come\u00e7ar.</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${d}">
          <span class="reach-ico" aria-hidden="true">${_()}</span>
          <span>E-mail da equipe</span>
        </a>
        <a class="reach-btn" href="${u}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${v()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="/art/nea.png" alt="Presen\u00e7a operacional: Chaco, Corrientes, Misiones, Formosa e Paraguai" />
        <figcaption>Presen\u00e7a no NEA argentino e no Paraguai</figcaption>
      </figure>
    </div>
  `,legal:`
    <p class="eyebrow">Marco legal</p>
    <h1>Aviso legal</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Titular do site</strong><p>Este site informa sobre a Agronys e as soluções de campo que a equipe oferece. Operação: equipe Agronys, Argentina.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Caráter informativo</strong><p>O conteúdo não constitui assessoria veterinária nem agronômica, nem garante resultados produtivos.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Alcance</strong><p>As descrições de capacidades e tecnologias são orientativas. Cada implantação se define com o estabelecimento.</p></div></article>
    </div>
  `,privacy:`
    <p class="eyebrow">Marco legal</p>
    <h1>Privacidade</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Dados de consulta</strong><p>Os dados enviados por e-mail ou WhatsApp s\u00e3o usados apenas para responder. N\u00e3o se comercializam bases.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Respons\u00e1vel</strong><p>Contato: <a href="${d}">agronys@gmail.com</a>. Respons\u00e1vel: a equipe Agronys.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Conserva\u00e7\u00e3o e direitos</strong><p>Prazo: rela\u00e7\u00e3o comercial ou Lei 25.326. Pode solicitar acesso, retifica\u00e7\u00e3o ou exclus\u00e3o por esse e-mail.</p></div></article>
      <article><span class="hud-n">04</span><div><strong>Anal\u00edtica</strong><p>Esta vers\u00e3o do site n\u00e3o incorpora publicidade de terceiros nem anal\u00edtica de marketing.</p></div></article>
    </div>
  `,cookies:`
    <p class="eyebrow">Marco legal</p>
    <h1>Cookies</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Preferência técnica</strong><p>Guarda-se no navegador (armazenamento local) se você aceitou este aviso.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Sem rastreamento publicitário</strong><p>Não se usam cookies de marketing nesta versão.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Controle</strong><p>Você pode apagar os dados do site nas configurações do navegador.</p></div></article>
    </div>
  `,terms:`
    <p class="eyebrow">Marco legal</p>
    <h1>Termos de uso</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Uso do conteúdo</strong><p>O conteúdo deste site não pode ser copiado com fins comerciais sem autorização.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Produto e contrato</strong><p>O software e as contas se regem pelo contrato ao contratar, não apenas por esta página.</p></div></article>
    </div>
  `,a11y:`
    <p class="eyebrow">Marco legal</p>
    <h1>Acessibilidade</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>Percurso</strong><p>Idioma selecion\u00e1vel, salto ao conte\u00fado, contraste sobre fundo escuro, foco vis\u00edvel e t\u00edtulos.</p></div></article>
      <article><span class="hud-n">02</span><div><strong>Portal</strong><p>O desenho do portal \u00e9 ilustrativo; a mesma informa\u00e7\u00e3o est\u00e1 em Abordagem, Servi\u00e7os e Produtos. Respeita-se reduzir movimento.</p></div></article>
      <article><span class="hud-n">03</span><div><strong>Aviso</strong><p>Se um percurso n\u00e3o for us\u00e1vel: <a href="${d}">agronys@gmail.com</a>.</p></div></article>
    </div>
  `},g={about:`
    <p class="eyebrow">关于我们</p>
    <h1>面向牧场的农业科技团队。</h1>
    <p>Agronys 是一家阿根廷 AgTech 创业公司（自 2022 年）。团队打造<strong>精准畜牧</strong>工具：记录起源于围栏——牛群所在且常常没有网络覆盖的地方。</p>
    <div class="fact-row">
      <p class="fact"><b>起源</b><span>阿根廷 · 2022</span></p>
      <p class="fact"><b>运营基地</b><span>NEA 与巴拉圭</span></p>
      <p class="fact"><b>范围</b><span>定制解决方案</span></p>
    </div>
    <p>工作基于田间技术主线（离线采集、指标、视觉与土地解读），研发位于 NEA。</p>
    <p>Agronys 不取代兽医或场长。团队整理信息，供牧场决策。</p>
  `,approach:`
    <p class="eyebrow">方法 · 自 2022 年</p>
    <h1>数据必须在围栏里能用，而不是只在办事处才能用。</h1>
    <p>团队让牧场能依据围栏实况决策。热应激、载畜、体况与饲草不能散落在不同记录里。</p>
    <ul class="hud-list">
      <li><span class="hud-n">01</span><div><strong>牛群等不起。</strong><p>若记录等网络，高温或超载就会发现得太晚。</p></div></li>
      <li><span class="hud-n">02</span><div><strong>田间并非始终有网。</strong><p>只能在线运行的系统容易丢数据。无覆盖时也必须能采集。</p></div></li>
      <li><span class="hud-n">03</span><div><strong>统一作业标准。</strong><p>员工、兽医服务与管理需要对牛群的同一读数。</p></div></li>
      <li><span class="hud-n">04</span><div><strong>草与牛是同一笔生意。</strong><p>拆到不同系统会导致决策不完整。</p></div></li>
    </ul>
  `,services:`
    <p class="eyebrow">服务</p>
    <h1>面向牧场的能力</h1>
    <p>团队按需配置的工作线。作业决策留在牧场。</p>
    <div class="cards">
      <article><div class="svc-head"><img src="/icons/ganaderia.svg" alt="" /><h2>AI 360° 监测</h2></div><p>称重、转群与处置同档。动物与整批随季节演化。</p></article>
      <article><div class="svc-head"><img src="/icons/vision.svg" alt="" /><h2>计算机视觉</h2></div><p>体况、识别、异常扫描（伤口、病灶及其他可见迹象）以及粪便扫描供分析。不取代兽医诊断或实验室。</p></article>
      <article><div class="svc-head"><img src="/icons/orquestacion.svg" alt="" /><h2>监测与预警</h2></div><p>热应激、卫生与管理的优先通知。</p></article>
      <article><div class="svc-head"><img src="/icons/agro.svg" alt="" /><h2>围栏管理</h2></div><p>载畜、饲草与休息与牛群同一读数。</p></article>
      <article><div class="svc-head"><img src="/icons/satelital.svg" alt="" /><h2>卫星监测与 NDVI</h2></div><p>跟踪作物与饲草势。</p></article>
      <article><div class="svc-head"><img src="/icons/datos.svg" alt="" /><h2>田间采集</h2></div><p>在围栏记录，无论有无网络。连接恢复后同步。</p></article>
      <article><div class="svc-head"><img src="/icons/automat.svg" alt="" /><h2>自动化</h2></div><p>由事件触发的流程：通知、表格或消息。</p></article>
      <article><div class="svc-head"><img src="/icons/dataeng.svg" alt="" /><h2>数据工程</h2></div><p>设备、表格与办事处整合。</p></article>
      <article><div class="svc-head"><img src="/icons/offline.svg" alt="" /><h2>离线优先架构</h2></div><p>无覆盖也可连续作业。</p></article>
    </div>
  `,products:`
    <div class="prod-root"></div>
  `,contact:`
    <p class="eyebrow">\u8054\u7cfb</p>
    <h1>\u56e2\u961f\u6e20\u9053</h1>
    <p>\u54a8\u8be2\u7531\u56e2\u961f\u53d7\u7406\u3002\u8bf7\u8bf4\u660e\u7267\u573a\u7c7b\u578b\u4ee5\u53ca\u5e0c\u671b\u4f18\u5148\u89e3\u51b3\u7684\u4f5c\u4e1a\u95ee\u9898\u3002</p>
    <div class="contact-grid">
      <div class="reach">
        <a class="reach-btn" href="${d}">
          <span class="reach-ico" aria-hidden="true">${_()}</span>
          <span>\u56e2\u961f\u90ae\u7bb1</span>
        </a>
        <a class="reach-btn" href="${u}" rel="noopener noreferrer" target="_blank">
          <span class="reach-ico" aria-hidden="true">${v()}</span>
          <span>WhatsApp</span>
        </a>
      </div>
      <figure class="nea-map">
        <img src="/art/nea.png" alt="\u8fd0\u8425\u8303\u56f4\uff1a\u67e5\u79d1\u3001\u79d1\u91cc\u5c14\u7279\u65af\u3001\u7c73\u897f\u5965\u5185\u65af\u3001\u798f\u83ab\u8428\u4e0e\u5df4\u62c9\u572d" />
        <figcaption>\u8986\u76d6\u963f\u6839\u5ef7 NEA \u4e0e\u5df4\u62c9\u572d</figcaption>
      </figure>
    </div>
  `,legal:`
    <p class="eyebrow">法律框架</p>
    <h1>法律声明</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>站点运营方</strong><p>本站介绍 Agronys 及团队提供的田间解决方案。运营：Agronys 团队，阿根廷。</p></div></article>
      <article><span class="hud-n">02</span><div><strong>仅供资讯</strong><p>内容不构成兽医或农艺建议，亦不保证生产结果。</p></div></article>
      <article><span class="hud-n">03</span><div><strong>范围</strong><p>能力与技术描述仅供参考。每次部署与牧场共同确定。</p></div></article>
    </div>
  `,privacy:`
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u9690\u79c1</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u54a8\u8be2\u6570\u636e</strong><p>\u901a\u8fc7\u90ae\u4ef6\u6216 WhatsApp \u53d1\u9001\u7684\u6570\u636e\u4ec5\u7528\u4e8e\u56de\u590d\u3002\u4e0d\u51fa\u552e\u6570\u636e\u5e93\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u8d23\u4efb\u65b9</strong><p>\u8054\u7cfb\uff1a<a href="${d}">agronys@gmail.com</a>\u3002\u8d23\u4efb\u65b9\uff1aAgronys \u56e2\u961f\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u4fdd\u5b58\u4e0e\u6743\u5229</strong><p>\u671f\u9650\uff1a\u5546\u52a1\u5173\u7cfb\u6216\u6cd5\u5f8b 25.326\u3002\u53ef\u901a\u8fc7\u8be5\u90ae\u7bb1\u7533\u8bf7\u67e5\u9605\u3001\u66f4\u6b63\u6216\u5220\u9664\u3002</p></div></article>
      <article><span class="hud-n">04</span><div><strong>\u5206\u6790</strong><p>\u672c\u7248\u672c\u4e0d\u542b\u7b2c\u4e09\u65b9\u5e7f\u544a\u6216\u8425\u9500\u5206\u6790\u3002</p></div></article>
    </div>
  `,cookies:`
    <p class="eyebrow">法律框架</p>
    <h1>Cookie</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>技术偏好</strong><p>若您接受本提示，浏览器会在本地存储中记录。</p></div></article>
      <article><span class="hud-n">02</span><div><strong>无广告追踪</strong><p>本版本不使用营销 Cookie。</p></div></article>
      <article><span class="hud-n">03</span><div><strong>控制</strong><p>可在浏览器设置中清除本站数据。</p></div></article>
    </div>
  `,terms:`
    <p class="eyebrow">法律框架</p>
    <h1>使用条款</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>内容使用</strong><p>未经授权，不得为商业目的复制本站内容。</p></div></article>
      <article><span class="hud-n">02</span><div><strong>产品与合同</strong><p>软件与账户以签约合同为准，而非仅以本页为准。</p></div></article>
    </div>
  `,a11y:`
    <p class="eyebrow">\u6cd5\u5f8b\u6846\u67b6</p>
    <h1>\u65e0\u969c\u788d</h1>
    <div class="legal-grid">
      <article><span class="hud-n">01</span><div><strong>\u6d4f\u89c8\u8def\u5f84</strong><p>\u53ef\u9009\u8bed\u8a00\u3001\u8df3\u8f6c\u6b63\u6587\u3001\u6697\u5e95\u5bf9\u6bd4\u3001\u53ef\u89c1\u7126\u70b9\u4e0e\u6807\u9898\u3002</p></div></article>
      <article><span class="hud-n">02</span><div><strong>\u95e8\u6237</strong><p>\u95e8\u6237\u63d2\u56fe\u4ec5\u4f9b\u8bf4\u660e\uff1b\u76f8\u540c\u4fe1\u606f\u89c1\u65b9\u6cd5\u3001\u670d\u52a1\u4e0e\u4ea7\u54c1\u3002\u9075\u5b88\u51cf\u5c11\u52a8\u6548\u3002</p></div></article>
      <article><span class="hud-n">03</span><div><strong>\u53cd\u9988</strong><p>\u82e5\u8def\u5f84\u4e0d\u53ef\u7528\uff1a<a href="${d}">agronys@gmail.com</a>\u3002</p></div></article>
    </div>
  `};function _(){return`<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>`}function v(){return`<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.38-1.41a9.9 9.9 0 004.66 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2zm5.76 14.16c-.24.68-1.4 1.26-1.94 1.34-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.66-.61-2.92-1.26-4.82-4.2-4.97-4.4-.14-.2-1.18-1.57-1.18-3 0-1.41.74-2.11 1-2.4.24-.27.64-.4 1.02-.4.12 0 .23 0 .33.01.29.01.44.03.63.49.2.5.67 1.73.73 1.86.06.13.1.28.02.45-.08.16-.12.27-.24.41-.12.14-.25.31-.36.42-.12.12-.24.25-.1.48.14.24.62 1.02 1.33 1.65 1.08.96 1.94 1.27 2.24 1.4.24.1.46.09.64-.07.22-.2.5-.58.8-.94.21-.26.48-.3.76-.2.28.09 1.79.84 2.1.99.3.16.5.23.57.36.08.13.08.75-.16 1.43z"/></svg>`}function y(e,t){let n=a(),r=({es:p,en:m,pt:h,zh:g}[n]||p)[t];if(r){if(r=r.replaceAll(`__DEMO_WA__`,f(`Agronys`)).replaceAll(`__ASK_DEMO__`,s().askDemo),new Set([`legal`,`privacy`,`cookies`,`terms`,`a11y`]).has(t)){e.innerHTML=b(r,t,n);return}e.innerHTML=r}}function b(e,t,n){let r={es:[[`legal`,`/aviso-legal/`,`Aviso legal`],[`privacy`,`/privacidad/`,`Privacidad`],[`cookies`,`/cookies/`,`Cookies`],[`terms`,`/terminos/`,`Términos`],[`a11y`,`/accesibilidad/`,`Accesibilidad`]],en:[[`legal`,`/aviso-legal/`,`Notice`],[`privacy`,`/privacidad/`,`Privacy`],[`cookies`,`/cookies/`,`Cookies`],[`terms`,`/terminos/`,`Terms`],[`a11y`,`/accesibilidad/`,`Accessibility`]],pt:[[`legal`,`/aviso-legal/`,`Aviso legal`],[`privacy`,`/privacidad/`,`Privacidade`],[`cookies`,`/cookies/`,`Cookies`],[`terms`,`/terminos/`,`Termos`],[`a11y`,`/accesibilidad/`,`Acessibilidade`]],zh:[[`legal`,`/aviso-legal/`,`法律声明`],[`privacy`,`/privacidad/`,`隐私`],[`cookies`,`/cookies/`,`Cookie`],[`terms`,`/terminos/`,`条款`],[`a11y`,`/accesibilidad/`,`无障碍`]]},i=(r[n]||r.es).map(([e,n,r])=>`<a class="legal-rail-link" href="${n}"${e===t?` aria-current="page"`:``}>${r}</a>`).join(``);return`<div class="legal-shell">
    <nav class="legal-rail" aria-label="${{es:`Legal`,en:`Legal`,pt:`Legal`,zh:`法律`}[n]||`Legal`}">${i}</nav>
    <div class="legal-main">${e}</div>
  </div>`}function x(){let e=document.querySelector(`.topbar .top-actions`)||document.querySelector(`.doc-head`),t=document.querySelector(`.lang-switch`);if(!t){if(!e)return;t=document.createElement(`div`),t.className=`lang-switch`,t.setAttribute(`role`,`group`),e.prepend(t)}t.innerHTML=i()}function S(){document.querySelectorAll(`.legal-toggle`).forEach(e=>{let t=e.closest(`.legal-mini`),n=t?.querySelector(`.legal-panel`)||document.getElementById(e.getAttribute(`aria-controls`)||`legal-panel`);if(!t||!n)return;let r=t=>{e.setAttribute(`aria-expanded`,t?`true`:`false`),n.hidden=!t};e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation(),r(e.getAttribute(`aria-expanded`)!==`true`)})}),document.documentElement.dataset.legalBound!==`1`&&(document.documentElement.dataset.legalBound=`1`,document.addEventListener(`click`,e=>{e.target.closest(`.legal-mini`)||(document.querySelectorAll(`.legal-toggle`).forEach(e=>{e.setAttribute(`aria-expanded`,`false`)}),document.querySelectorAll(`.legal-panel`).forEach(e=>{e.hidden=!0}))}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(document.querySelectorAll(`.legal-toggle`).forEach(e=>e.setAttribute(`aria-expanded`,`false`)),document.querySelectorAll(`.legal-panel`).forEach(e=>{e.hidden=!0}))}))}function C(){let e=location.pathname.replace(/\/+$/,``).split(`/`).filter(Boolean),t=e[e.length-1]||``;return t.endsWith(`.html`)?t.replace(/\.html$/i,``)||``:e[0]||``}function w(e,t,n){let r=e.replace(/^\/|\/$/g,``);return`<a class="dock-link" href="${e}" data-i18n="${n}"${C()===r?` aria-current="page"`:``}>${t}</a>`}function T(){if(!document.body.classList.contains(`doc`)||document.querySelector(`.doc-portal`))return;let e=document.querySelector(`main`);if(!e)return;document.querySelector(`.doc-head`)?.remove(),document.querySelector(`.site-foot`)?.remove();let t=document.createElement(`div`);t.className=`portal doc-portal theme-`+(document.body.dataset.page||`legal`),t.innerHTML=`
      <div class="doc-bg" aria-hidden="true"></div>
      <div class="doc-ui">
        <header class="topbar">
          <nav class="dock doc-dock" data-i18n-aria="navDock">
            ${w(`/`,`Portal`,`navPortal`)}
            ${w(`/quienes-somos/`,`Quienes somos`,`navAbout`)}
            ${w(`/enfoque/`,`Enfoque`,`navApproach`)}
            ${w(`/servicios/`,`Servicios`,`navServices`)}
            ${w(`/productos/`,`Productos`,`navProducts`)}
            ${w(`/contacto/`,`Contacto`,`navContact`)}
          </nav>
          <p class="brand">
            <a href="/">
              <img class="brand-logo" src="/logos/logo-texto-blanco.svg" alt="Agronys" />
            </a>
          </p>
          <div class="top-actions">
            <div class="lang-switch" role="group" data-i18n-aria="lang"></div>
            <a class="profile" href="/contacto/" data-i18n-aria="profile">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="1.5" />
                <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" fill="none" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </a>
          </div>
        </header>
        <div class="doc-stage"></div>
      </div>
      <footer class="legal-mini">
        <button type="button" class="legal-toggle" aria-expanded="false" aria-controls="legal-panel">
          <span data-i18n="legal">Legal</span>
          <span class="legal-copy">\u00a9 <span id="y"></span></span>
        </button>
        <nav id="legal-panel" class="legal-panel" hidden data-i18n-aria="legal">
          <a href="/aviso-legal/" data-i18n="legalNotice">Aviso legal</a>
          <a href="/privacidad/" data-i18n="privacy">Privacidad</a>
          <a href="/cookies/" data-i18n="cookiesLink">Cookies</a>
          <a href="/terminos/" data-i18n="terms">Terminos</a>
          <a href="/accesibilidad/" data-i18n="a11y">Accesibilidad</a>
          <a href="/contacto/" data-i18n="contact">Contacto</a>
        </nav>
      </footer>
    `;let n=t.querySelector(`.doc-stage`);e.classList.add(`doc-panel`),new Set([`legal`,`privacy`,`cookies`,`terms`,`a11y`]).has(document.body.dataset.page)&&e.classList.add(`is-legal`),n.appendChild(e);let r=document.querySelector(`.skip-link`);r?r.after(t):document.body.prepend(t)}function E(){T(),x(),S();let e=document.querySelector(`#y`);e&&(e.textContent=String(new Date().getFullYear()));let t=document.querySelector(`#cookies-bar`),n=document.querySelector(`#cookies-ok`);try{t&&!localStorage.getItem(`agronys-cookies`)&&(t.hidden=!1)}catch{t&&(t.hidden=!1)}n?.addEventListener(`click`,()=>{try{localStorage.setItem(`agronys-cookies`,`1`)}catch{}t&&(t.hidden=!0)})}var D={about:`galaxy-g.mp4`,approach:`xiaomi-3.mp4`,products:`galaxy-f.mp4`,services:`galaxy-a.mp4`,contact:`xiaomi-1.mp4`,legal:`xiaomi-vid.mp4`,privacy:`xiaomi-6.mp4`,cookies:`galaxy-d.mp4`,terms:`brangus.mp4`,a11y:`xiaomi-3.mp4`};function O(){if((document.body.dataset.page||`index`)===`index`)return;let e=document.querySelector(`.doc-bg`);if(!e||(e.querySelectorAll(`.bg-video`).forEach(e=>e.remove()),window.matchMedia(`(prefers-reduced-motion: reduce)`).matches))return;let t=D[document.body.dataset.page];if(!t)return;let n=document.createElement(`video`);n.className=`bg-video`,n.setAttribute(`muted`,``),n.muted=!0,n.defaultMuted=!0,n.autoplay=!0,n.loop=!0,n.playsInline=!0,n.setAttribute(`playsinline`,``),n.setAttribute(`aria-hidden`,`true`),n.src=`/media/video/${t}`,e.prepend(n);let r=()=>n.play().catch(()=>{});n.addEventListener(`canplay`,r,{once:!0}),r()}export{c as a,s as c,f as i,E as n,l as o,y as r,a as s,O as t};