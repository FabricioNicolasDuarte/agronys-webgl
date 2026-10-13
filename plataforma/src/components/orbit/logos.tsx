"use client";

import { useId } from "react";

const LABEL = {
  nutrogan: "Nutrogan",
  sigag: "SIGAG",
  datagronys: "Datagronys",
} as const;

const ORBIT_PATH =
  "M778.32 254.36 A203.65 85.61 0 0 1 574.67 168.75 A203.65 85.61 0 0 1 778.32 83.14 A203.65 85.61 0 0 1 981.97 168.75 A203.65 85.61 0 0 1 778.32 254.36";

export function ProductLogo({ id }: { id: string }) {
  if (id !== "nutrogan" && id !== "sigag" && id !== "datagronys") return null;
  return <span className={`logo-word is-${id}`} role="img" aria-label={LABEL[id]} />;
}

function Traveler({ behind }: { behind: boolean }) {
  return (
    <g transform="translate(108.64 599.78) rotate(-45)">
      <circle className="ag-sat" r="24" fill={behind ? "#00bb83" : "#00fe00"}>
        <animateMotion dur="3.6s" repeatCount="indefinite" path={ORBIT_PATH} />
        <animate
          attributeName="opacity"
          dur="3.6s"
          repeatCount="indefinite"
          keyTimes="0;0.28;0.4;0.6;0.72;1"
          values={behind ? "0;0;1;1;0;0" : "1;1;0;0;1;1"}
        />
        <animate
          attributeName="r"
          dur="3.6s"
          repeatCount="indefinite"
          keyTimes="0;0.28;0.4;0.6;0.72;1"
          values="26;20;10;10;20;26"
        />
      </circle>
    </g>
  );
}

export function AgronysLogo() {
  const gid = `ag-green-${useId().replace(/:/g, "")}`;
  return (
    <span className="agronys-logo" role="img" aria-label="Agronys">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1575.81 337.49">
        <defs>
          <linearGradient
            id={gid}
            x1="560.43"
            y1="167.03"
            x2="999.64"
            y2="167.03"
            gradientTransform="translate(463.08 -500.93) rotate(53.97) scale(.87 .83) skewX(17.12)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00fe00" />
            <stop offset="1" stopColor="#00bb83" />
          </linearGradient>
        </defs>
        <g fill="currentColor">
          <path d="M976.37,174.57l-73.1-73.1v187.85h-41.39V60.08h58.69l56.07,56.07v58.69l-.26-.26ZM1049.73,60.34h41.39v229.24h-58.69l-56.07-56.07v-58.69l73.1,73.1V60.08l.26.26Z" />
          <path d="M1303.86,60.34h29.34v41.39h-12.05l-81.74,81.74v106.11h-41.39v-106.11l-81.74-81.74h-12.05v-41.39h29.34l85.41,85.41,85.41-85.41h-.52Z" />
          <path d="M1492.76,195.79h-146.19v-73.88l61.31-61.31h167.94v41.39h-150.65l-36.94,36.94v15.2h146.19c-16.24,16.24-25.41,25.41-41.66,41.66ZM1575.81,154.13v73.88l-61.31,61.31h-167.94v-41.4h150.65l36.94-36.94v-56.85h41.66Z" />
        </g>
        <ellipse
          cx="778.32"
          cy="168.75"
          rx="203.65"
          ry="85.61"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="25"
          strokeMiterlimit="10"
          transform="translate(108.64 599.78) rotate(-45)"
        />
        <Traveler behind />
        <g fill="currentColor">
          <path d="M229.51,60.6v229.24H100.34c-16.24-16.24-25.41-25.41-41.66-41.66h129.16V119.03L17.29,289.58H0v-41.4L187.85,60.34h41.4l.26.26Z" />
          <path d="M471.85,102h-187.85v109.25l36.94,36.94h109.25v41.4h-126.28l-61.31-61.31V60.34h229.24v41.66ZM325.66,196.05c-16.24-16.24-25.41-25.41-41.66-41.66h187.85v93.79h-41.39v-52.4h-104.8v.26Z" />
          <path d="M713.94,60.34c-16.24,16.24-25.41,25.41-41.66,41.66v64.45l41.4,41.4v81.74h-41.4v-64.45l-41.39-41.39v-40.35c16.24-16.24,25.41-25.41,41.66-41.66h-146.19v187.85h-41.39V60.34h229.24-.26Z" />
        </g>
        <Traveler behind={false} />
      </svg>
    </span>
  );
}

export function MarkLogo() {
  return <img className="agronys-mark" src="/orbit/logos/mark.svg" alt="" />;
}
