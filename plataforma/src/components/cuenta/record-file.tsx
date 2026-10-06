"use client";

import { Paperclip } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

type Stored = { id: string; file_name: string };

async function tokenOf(db: SupabaseClient) {
  const { data } = await db.auth.getSession();
  return data.session?.access_token || "";
}

export function RecordFile({
  db,
  kind,
  ownerId,
  label,
  canUpload,
}: {
  db: SupabaseClient;
  kind: "invoice" | "payment" | "fiscal" | "infra" | "payout";
  ownerId: string;
  label: string;
  canUpload: boolean;
}) {
  const [file, setFile] = useState<Stored | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    let stop = false;
    (async () => {
      const token = await tokenOf(db);
      const response = await fetch(`/api/files?kind=${kind}&owner=${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const payload = await response.json();
      if (!stop) setFile(payload.files?.[0] || null);
    })();
    return () => {
      stop = true;
    };
  }, [db, kind, ownerId]);

  async function upload(list: FileList | null) {
    const picked = list?.[0];
    if (!picked) return;
    setNote("");
    const body = new FormData();
    body.set("kind", kind);
    body.set("owner_id", ownerId);
    body.set("file", picked);
    const token = await tokenOf(db);
    const response = await fetch("/api/files", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
    const payload = await response.json();
    if (!response.ok) {
      setNote(payload.error || "No se pudo guardar.");
      return;
    }
    setFile({ id: payload.id, file_name: payload.file_name });
  }

  async function download() {
    if (!file) return;
    const token = await tokenOf(db);
    const response = await fetch(`/api/files?id=${file.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      setNote("No se pudo abrir el archivo.");
      return;
    }
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = file.file_name;
    link.click();
    URL.revokeObjectURL(href);
  }

  return (
    <div className="record-file" data-kind={kind} data-owner={ownerId}>
      <Paperclip size={16} weight="regular" aria-hidden="true" />
      {file ? <button type="button" onClick={() => void download()}>{file.file_name}</button> : <span>{label}</span>}
      {canUpload ? (
        <label>
          {file ? "Reemplazar" : "Subir"}
          <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={(event) => void upload(event.target.files)} />
        </label>
      ) : null}
      {note ? <em>{note}</em> : null}
    </div>
  );
}
