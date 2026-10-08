import type { Lang } from "@/i18n/lang";
import { RiveMark } from "@/components/site/rive-mark";

type Mark = "yes" | "mid" | "no";

const HERD = ["IPECUS", "Huella", "GEN.ar", "Biotraza"];
const CROP = ["Auravant", "SIMA", "GeoAgro", "OneSoil", "FieldView"];

const MARKS: [Mark, Mark][] = [
  ["yes", "no"],
  ["no", "yes"],
  ["no", "mid"],
  ["mid", "no"],
  ["no", "no"],
  ["no", "no"],
];

const COPY = {
  es: {
    h2: "Uno, no varios",
    lead: "El mercado vende una parte. Agronys reúne el rodeo, el potrero, la campaña y el equipo que el establecimiento ya tiene.",
    market: "Otras apps",
    herd: "Rodeo",
    crop: "Cultivo",
    ours: "Apps de Agronys",
    suite: "Nutrogan, SIGAG y Datagronys, en el mismo registro.",
    rows: ["Historia del animal", "Pasto y potrero", "Resultado de la campaña", "Registro sin señal", "Equipo que el cliente ya tiene", "Una sola lectura"],
    yes: "Cubre",
    mid: "Parcial",
    no: "No cubre",
    close: "Es mejor porque no obliga a elegir una parte. Las apps de Agronys quedan en el mismo registro.",
    motion: "Lectura de las apps de Agronys",
  },
  en: {
    h2: "One, not several",
    lead: "The market sells a part. Agronys brings together the herd, the paddock, the campaign and the equipment the property already owns.",
    market: "Other apps",
    herd: "Herd",
    crop: "Crop",
    ours: "Agronys apps",
    suite: "Nutrogan, SIGAG and Datagronys, in the same record.",
    rows: ["Animal history", "Pasture and paddock", "Campaign result", "Record without signal", "Equipment the client already owns", "One reading"],
    yes: "Covers",
    mid: "Partial",
    no: "Does not cover",
    close: "It is better because it does not force a choice of one part. The Agronys apps stay in the same record.",
    motion: "Reading from the Agronys apps",
  },
  pt: {
    h2: "Um, não vários",
    lead: "O mercado vende uma parte. A Agronys reúne o rebanho, o potreiro, a campanha e o equipamento que o estabelecimento já possui.",
    market: "Outros apps",
    herd: "Rebanho",
    crop: "Cultivo",
    ours: "Apps da Agronys",
    suite: "Nutrogan, SIGAG e Datagronys, no mesmo registro.",
    rows: ["História do animal", "Pasto e potreiro", "Resultado da campanha", "Registro sem sinal", "Equipamento que o cliente já possui", "Uma só leitura"],
    yes: "Cobre",
    mid: "Parcial",
    no: "Não cobre",
    close: "É melhor porque não obriga a escolher uma parte. Os apps da Agronys ficam no mesmo registro.",
    motion: "Leitura dos apps da Agronys",
  },
  zh: {
    h2: "一个，而不是几个",
    lead: "市场上的产品各管一块。Agronys 把牛群、草地、产季和客户已有的设备放在一起。",
    market: "其他应用",
    herd: "牛群",
    crop: "种植",
    ours: "Agronys 应用",
    suite: "Nutrogan、SIGAG 和 Datagronys，在同一份记录里。",
    rows: ["牲畜历史", "牧草与草地", "产季结果", "无信号记录", "客户已有设备", "一次读取"],
    yes: "覆盖",
    mid: "部分",
    no: "不覆盖",
    close: "更好，是因为它不必只选一块。Agronys 的应用留在同一份记录里。",
    motion: "Agronys 应用的读取",
  },
  gn: {
    h2: "Peteĩ, ndaha'éi heta",
    lead: "Mercado ovende peteĩ vore. Agronys ombyaty vaka aty, potrero, campaña ha equipo cliente oguerekóva.",
    market: "Ambue app",
    herd: "Vaka",
    crop: "Ñemitỹ",
    ours: "Agronys app",
    suite: "Nutrogan, SIGAG ha Datagronys, peteĩ registro-pe.",
    rows: ["Mymba rembiasakue", "Kapi'i ha potrero", "Campaña rembiapo", "Marandu señal'ỹre", "Equipo cliente oguerekóva", "Peteĩ ñemoñe'ẽ"],
    yes: "Oheja",
    mid: "Sa'i",
    no: "Ndohejái",
    close: "Iporãve ndojeiporavo'ỹgui peteĩ vore año. Agronys app opyta peteĩ registro-pe.",
    motion: "Agronys app ñemoñe'ẽ",
  },
} as const;

function Mark({ kind, label }: { kind: Mark; label: string }) {
  return <span className={`cmp-mark is-${kind}`} role="img" aria-label={label} />;
}

export function Compare({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const word = { yes: copy.yes, mid: copy.mid, no: copy.no };
  const columns = [
    ...HERD.map((name) => ({ name, kind: 0 as const })),
    ...CROP.map((name) => ({ name, kind: 1 as const })),
  ];
  return (
    <section className="pane" id="comparacion" aria-labelledby="sol-compare">
      <header className="pane-head">
        <h2 id="sol-compare">{copy.h2}</h2>
        <p>{copy.lead}</p>
      </header>
      <div className="compare-stage">
        <div className="compare-market">
          <p className="eyebrow">{copy.market}</p>
          <p className="compare-family">{copy.herd}</p>
          <div className="compare-names">
            {HERD.map((name) => (
              <p className="compare-chip" key={name}>
                {name}
              </p>
            ))}
          </div>
          <p className="compare-family">{copy.crop}</p>
          <div className="compare-names">
            {CROP.map((name) => (
              <p className="compare-chip" key={name}>
                {name}
              </p>
            ))}
          </div>
        </div>
        <div className="compare-bridge" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="compare-one">
          <p className="eyebrow">{copy.ours}</p>
          <RiveMark label={copy.motion} />
          <p className="compare-suite">{copy.suite}</p>
        </div>
      </div>
      <div className="compare-scroll">
        <div className="compare-board" role="table" aria-label={copy.h2} style={{ ["--cmp-n" as string]: columns.length }}>
          <div className="compare-row is-head" role="row">
            <span role="columnheader" />
            {columns.map((col) => (
              <span role="columnheader" key={col.name}>
                {col.name}
              </span>
            ))}
            <span role="columnheader">{copy.ours}</span>
          </div>
          {copy.rows.map((title, index) => (
            <div className="compare-row" role="row" key={title}>
              <span role="rowheader">{title}</span>
              {columns.map((col) => {
                const kind = MARKS[index][col.kind];
                return (
                  <span role="cell" data-name={col.name} key={`${title}-${col.name}`}>
                    <Mark kind={kind} label={word[kind]} />
                  </span>
                );
              })}
              <span className="is-ours" role="cell" data-name={copy.ours}>
                <Mark kind="yes" label={copy.yes} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="compare-close">{copy.close}</p>
    </section>
  );
}
