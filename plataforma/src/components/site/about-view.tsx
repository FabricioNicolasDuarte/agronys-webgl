"use client";

import { Clock, Eye, UsersThree, WifiSlash, type Icon } from "@phosphor-icons/react";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { WA } from "@/content/site";
import { PAGES } from "@/i18n/pages";

const CAN_ICONS: Icon[] = [Eye, WifiSlash, UsersThree, Clock];

const ON = [
  [true, false, false, false, false, false],
  [false, true, false, false, false, false],
  [true, true, true, true, true, true],
];

export function AboutView() {
  const copy = PAGES[useLang()].about;
  usePageTitle(copy.meta);
  return (
    <div className="about">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.h1}</h1>
      <p className="lead">{copy.lead}</p>
      <ul className="about-facts">
        {copy.factLabels.map((label, index) => (
          <li key={label}>
            <span>{label}</span>
            <b>{copy.facts[index]}</b>
          </li>
        ))}
      </ul>
      <p className="about-body">{copy.body}</p>

      <h2>{copy.caption}</h2>
      <div className="about-matrix" role="table" aria-label={copy.caption}>
        <div className="about-matrix-head" role="row">
          <div role="columnheader">{copy.colNeed}</div>
          {copy.rows.map((row, index) => (
            <div className={index === 2 ? "is-us" : undefined} role="columnheader" key={row.name}>
              {row.name}
              <span>{row.note}</span>
            </div>
          ))}
        </div>
        {copy.needs.map((need, index) => (
          <div className="about-matrix-row" role="row" key={need}>
            <div role="rowheader">{need}</div>
            <div className="about-marks" role="presentation">
              {ON.map((row, rowIndex) => {
                const on = row[index];
                return (
                  <div
                    className={rowIndex === 2 ? "about-mark is-us" : "about-mark"}
                    role="cell"
                    key={copy.rows[rowIndex].name}
                    data-on={on ? "1" : "0"}
                  >
                    <span className="sr-only">{on ? copy.yes : copy.no}</span>
                    <span aria-hidden="true">{on ? "✓" : "–"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="about-note">{copy.note}</p>

      <h2>{copy.can}</h2>
      <ul className="can-points">
        {copy.canItems.map((item, index) => {
          const Glyph = CAN_ICONS[index];
          return (
            <li key={item.title}>
              <Glyph className="can-ico" size={40} weight="duotone" aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="reach">
        <a href={`${WA}?text=${encodeURIComponent(copy.ctaMsg)}`}>{copy.cta}</a>
      </p>
    </div>
  );
}
