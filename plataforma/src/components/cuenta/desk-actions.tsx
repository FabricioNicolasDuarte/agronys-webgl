"use client";

import {
  ArrowUUpLeft,
  Check,
  Coins,
  Key,
  LinkSimple,
  Minus,
  PencilSimple,
  Plus,
  Prohibit,
  Receipt,
  Trash,
  UserPlus,
  X,
} from "@phosphor-icons/react";

const GLYPH = {
  plus: Plus,
  close: X,
  edit: PencilSimple,
  remove: Trash,
  save: Check,
  key: Key,
  link: LinkSimple,
  join: UserPlus,
  unlink: Minus,
  invoice: Receipt,
  collect: Coins,
  take: ArrowUUpLeft,
  void: Prohibit,
} as const;

export function Act({
  name,
  title,
  tone,
  type = "button",
  onClick,
}: {
  name: keyof typeof GLYPH;
  title: string;
  tone?: "primary" | "danger";
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  const Glyph = GLYPH[name];
  return (
    <button type={type} className={tone ? `act is-${tone}` : "act"} aria-label={title} title={title} onClick={onClick}>
      <Glyph size={15} weight="regular" aria-hidden="true" />
    </button>
  );
}
