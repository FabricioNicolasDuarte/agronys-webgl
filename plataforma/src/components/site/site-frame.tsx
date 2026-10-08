"use client";

import Link from "next/link";
import { DockLinks, LangSwitch, useLang } from "@/components/site/lang-switch";
import { InfoMenu } from "@/components/site/site-notch";
import { APP_VERSION } from "@/content/site";
import { INFO } from "@/i18n/info";
import { COPY } from "@/i18n/lang";

export function SiteFrame({
  children,
  theme = "about",
}: {
  children: React.ReactNode;
  theme?: string;
  current?: string;
}) {
  const lang = useLang();
  const copy = COPY[lang];
  const info = INFO[lang];
  const year = new Date().getFullYear();
  return (
    <div className={`portal doc-portal theme-${theme}`}>
      <div className="doc-bg" aria-hidden="true" />
      <div className="doc-ui">
        <header className="topbar">
          <nav className="dock doc-dock" aria-label={copy.navLabel}>
            <DockLinks portal />
          </nav>
          <p className="brand">
            <Link href="/">
              <img className="brand-logo" src="/logos/logo-texto-blanco.svg" alt="Agronys" />
            </Link>
          </p>
          <div className="top-actions">
            <LangSwitch />
            <Link className="profile" href="/entrar" aria-label={copy.account}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 19c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </header>
        <div className="doc-stage">
          <main className="doc-panel">{children}</main>
        </div>
        <footer className="site-foot">
          <Link href="/" aria-label="Agronys">
            <img src="/logos/logo-texto-blanco.svg" alt="" />
          </Link>
          <p>
            © {year} Agronys. {info.rights}
          </p>
          <p>
            {info.version} {APP_VERSION}
          </p>
          <InfoMenu place="foot" />
        </footer>
      </div>
    </div>
  );
}
