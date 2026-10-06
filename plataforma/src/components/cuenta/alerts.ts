import type { SupabaseClient } from "@supabase/supabase-js";

export type DeskAlert = {
  id: string;
  kind: "Demo" | "Venta" | "Reparto";
  title: string;
  text: string;
};

const WINDOW_DAYS = 30;

type Role = "superadmin" | "vendor" | "client";

export async function loadAlerts(db: SupabaseClient, role: Role): Promise<DeskAlert[]> {
  const [demos, products, orgs, deals, invoices, shares, contracts] = await Promise.all([
    db.from("demos").select("id, product_id, organization_id, expires_at"),
    db.from("products").select("id, name, kind"),
    db.from("organizations").select("id, legal_name"),
    role === "client"
      ? Promise.resolve({ data: [] as { id: string; product_id: string; organization_id: string }[] })
      : db.from("deals").select("id, product_id, organization_id").eq("status", "accepted"),
    role === "superadmin"
      ? db.from("invoices").select("deal_id")
      : Promise.resolve({ data: [] as { deal_id: string }[] }),
    role === "client"
      ? Promise.resolve({ data: [] as { product_id: string; share_percent: number | string }[] })
      : db.from("product_collaborators").select("product_id, share_percent"),
    role === "client"
      ? db.from("client_contracts").select("product_id, product_name")
      : Promise.resolve({ data: [] as { product_id: string; product_name: string }[] }),
  ]);

  const productName = new Map((products.data || []).map((row) => [row.id, row.name as string]));
  for (const row of contracts.data || []) productName.set(row.product_id, row.product_name);
  const productKind = new Map((products.data || []).map((row) => [row.id, row.kind as string]));
  const orgName = new Map((orgs.data || []).map((row) => [row.id, row.legal_name as string]));
  const invoiced = new Set((invoices.data || []).map((row) => row.deal_id));
  const alerts: DeskAlert[] = [];
  const now = Date.now();

  for (const demo of demos.data || []) {
    const expires = new Date(demo.expires_at).getTime();
    const days = (expires - now) / 86400000;
    if (days > WINDOW_DAYS) continue;
    const when = new Date(demo.expires_at).toLocaleDateString("es-AR");
    const product = productName.get(demo.product_id) || "Un producto";
    const org = orgName.get(demo.organization_id) || "un establecimiento";
    alerts.push({
      id: `demo-${demo.id}`,
      kind: "Demo",
      title: days < 0 ? "Demo vencida" : "Demo por vencer",
      text: days < 0
        ? `${product} para ${org} venció el ${when}.`
        : `${product} para ${org} vence el ${when}.`,
    });
  }

  for (const deal of deals.data || []) {
    if (invoiced.has(deal.id)) continue;
    const product = productName.get(deal.product_id) || "Un producto";
    const org = orgName.get(deal.organization_id) || "un establecimiento";
    alerts.push({
      id: `deal-${deal.id}`,
      kind: "Venta",
      title: "Venta aceptada sin factura",
      text: `${product} para ${org} está aceptada y todavía no tiene factura.`,
    });
  }

  const sums = new Map<string, number>();
  for (const share of shares.data || []) {
    if (productKind.get(share.product_id) !== "codeveloped") continue;
    sums.set(share.product_id, (sums.get(share.product_id) || 0) + Number(share.share_percent));
  }
  for (const [productId, sum] of sums) {
    const rounded = Math.round(sum * 100) / 100;
    if (Math.abs(rounded - 100) < 0.001) continue;
    alerts.push({
      id: `share-${productId}`,
      kind: "Reparto",
      title: "Reparto incompleto",
      text: `${productName.get(productId) || "Un proyecto"} suma ${rounded.toLocaleString("es-AR")} %. Tiene que sumar 100.`,
    });
  }

  return alerts;
}
