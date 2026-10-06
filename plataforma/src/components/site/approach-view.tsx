"use client";

import { Cow, Plant, ThermometerHot, UsersThree, WifiSlash, type Icon } from "@phosphor-icons/react";
import { useLang, usePageTitle } from "@/components/site/lang-switch";
import { PAGES } from "@/i18n/pages";

const STEP_ICONS: Icon[] = [ThermometerHot, WifiSlash, UsersThree];

export function ApproachView() {
  const copy = PAGES[useLang()].approach;
  usePageTitle(copy.meta);
  return (
    <div className="approach">
      <p className="eyebrow">{copy.eyebrow}</p>
      <h1>{copy.h1}</h1>
      <p className="lead">{copy.lead}</p>
      <ol className="day-path">
        {copy.steps.map((step, index) => {
          const Glyph = STEP_ICONS[index];
          return (
            <li key={step.title}>
              <span className="day-art">
                {Glyph ? (
                  <Glyph size={40} weight="duotone" aria-hidden="true" />
                ) : (
                  <>
                    <Plant size={34} weight="duotone" aria-hidden="true" />
                    <Cow size={34} weight="duotone" aria-hidden="true" />
                  </>
                )}
              </span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
