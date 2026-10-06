import type { SupabaseClient } from "@supabase/supabase-js";
import {
  formatUsd,
  type DealStatus,
  type Situation,
  type SituationDeal,
  type SituationPart,
} from "@/components/cuenta/dashboard/situation";

type DealRow = {
  id: string;
  status: DealStatus;
  sold_price_usd: number | null;
  products: { name: string } | { name: string }[] | null;
  organizations: { legal_name: string } | { legal_name: string }[] | null;
  seller: { role: string } | { role: string }[] | null;
};

type PayoutRow = {
  deal_id: string;
  kind: SituationPart["kind"];
  amount_usd: number;
  status: string;
  payee: { full_name: string } | { full_name: string }[] | null;
};

type InvoiceRow = {
  amount_ars: number;
  amount_usd: number;
  deals: { products: { name: string } | { name: string }[] | null } | { products: { name: string } | { name: string }[] | null }[] | null;
};

function one<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function reading(deal: DealRow, parts: PayoutRow[]) {
  if (deal.status === "assigned" || deal.status === "draft") {
    return "Asignada. Sin precio de venta ni factura.";
  }
  const mine = parts.filter((part) => part.deal_id === deal.id && part.status !== "void");
  const splits = mine.filter((part) => part.kind === "dev_split");
  const commission = mine.find((part) => part.kind === "sales_commission");
  if (splits.length) return `Co-desarrollo en ${splits.length} partes, según el porcentaje de cada uno`;
  if (commission) return `Comisión del vendedor, ${formatUsd(Number(commission.amount_usd))}`;
  if (one(deal.seller)?.role === "superadmin") return "Venta del superadmin. El vendedor no la ve.";
  return "Todavía no hay liquidación.";
}

export async function loadSituation(db: SupabaseClient): Promise<Situation> {
  const [fiscal, deals, payouts, invoices, infra] = await Promise.all([
    db.rpc("fiscal_snapshot"),
    db.from("deals").select("id, status, sold_price_usd, products(name), organizations(legal_name), seller:profiles!deals_seller_id_fkey(role)").order("created_at"),
    db.from("payouts").select("deal_id, kind, amount_usd, status, payee:profiles!payouts_payee_id_fkey(full_name)").neq("status", "void"),
    db.from("invoices").select("amount_ars, amount_usd, deals(products(name))"),
    db.from("infrastructure_costs").select("amount_usd"),
  ]);
  const failed = [fiscal.error, deals.error, payouts.error, invoices.error, infra.error].find(Boolean);
  if (failed) throw new Error(failed.message);
  const snap = (fiscal.data?.[0] ?? null) as { invoiced_ars: number; cap_ars: number } | null;
  if (!snap) throw new Error("La base no tiene el tope fiscal de referencia.");

  const payoutRows = (payouts.data || []) as PayoutRow[];
  const dealRows = (deals.data || []) as DealRow[];
  const books: SituationDeal[] = dealRows.map((deal) => ({
    id: deal.id,
    product: one(deal.products)?.name || "Producto",
    organization: one(deal.organizations)?.legal_name || "Establecimiento",
    status: deal.status,
    soldUsd: deal.sold_price_usd === null ? null : Number(deal.sold_price_usd),
    reading: reading(deal, payoutRows),
  }));

  const byProduct = new Map<string, { ars: number; usd: number }>();
  for (const row of (invoices.data || []) as InvoiceRow[]) {
    const deal = one(row.deals);
    const label = one(deal?.products)?.name || "Factura";
    const current = byProduct.get(label) || { ars: 0, usd: 0 };
    current.ars += Number(row.amount_ars);
    current.usd += Number(row.amount_usd);
    byProduct.set(label, current);
  }

  const asOf = new Date().toLocaleDateString("es-AR", { month: "long", year: "numeric" });
  return {
    asOf: asOf.charAt(0).toUpperCase() + asOf.slice(1),
    source: "Estas cifras salen de las facturas, las ventas y las liquidaciones guardadas. El tope K es una referencia, no la categoría real.",
    fiscal: { invoicedArs: Number(snap.invoiced_ars), capArs: Number(snap.cap_ars) },
    infraUsd: (infra.data || []).reduce((sum, row) => sum + Number(row.amount_usd), 0),
    invoices: [...byProduct.entries()].map(([label, amounts]) => ({ label, ...amounts })),
    parts: payoutRows.map((part) => ({
      payee: one(part.payee)?.full_name || "Colaborador",
      kind: part.kind,
      usd: Number(part.amount_usd),
    })),
    deals: books,
  };
}
