export type DealStatus = "paid" | "assigned" | "invoiced" | "accepted" | "draft" | "void";

export type SituationDeal = {
  id: string;
  product: string;
  organization: string;
  status: DealStatus;
  soldUsd: number | null;
  reading: string;
};

export type SituationInvoice = {
  label: string;
  ars: number;
  usd: number;
};

export type SituationPart = {
  payee: string;
  kind: "sales_commission" | "dev_split";
  usd: number;
};

export type Situation = {
  asOf: string;
  source: string;
  fiscal: { invoicedArs: number; capArs: number; category: string };
  deals: SituationDeal[];
  parts: SituationPart[];
  infraUsd: number;
  invoices: SituationInvoice[];
};

export type SituationAlert = {
  tone: "attention" | "quiet";
  title: string;
  text: string;
};

const money = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const percent = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

export function formatUsd(value: number | null) {
  if (value === null) return "—";
  return `USD ${money.format(value)}`;
}

export function formatArs(value: number) {
  return `ARS ${money.format(value)}`;
}

export function formatPercent(value: number) {
  return `${percent.format(value * 100)} %`;
}

export function fiscalUse(situation: Situation) {
  if (situation.fiscal.capArs <= 0) return 0;
  return situation.fiscal.invoicedArs / situation.fiscal.capArs;
}

export function payoutDue(situation: Situation) {
  return situation.parts.reduce((sum, part) => sum + part.usd, 0);
}

export function dealsByStatus(situation: Situation) {
  const order: DealStatus[] = ["assigned", "accepted", "invoiced", "paid"];
  return order
    .map((status) => ({
      status,
      count: situation.deals.filter((deal) => deal.status === status).length,
    }))
    .filter((item) => item.count > 0);
}

export function situationAlerts(situation: Situation): SituationAlert[] {
  const open = situation.deals.filter((deal) => deal.status === "assigned");
  const alerts: SituationAlert[] = [];
  if (open.length) {
    alerts.push({
      tone: "attention",
      title: open.length === 1 ? "Una venta sigue asignada" : `${open.length} ventas siguen asignadas`,
      text: "Todavía no hay factura. El vendedor la ve; el cobro no empezó.",
    });
  }
  const due = payoutDue(situation);
  if (situation.parts.length > 0) {
    alerts.push({
      tone: "attention",
      title: "Liquidaciones a pagar",
      text: `${situation.parts.length} partes, ${formatUsd(due)}. El cliente no le paga al colaborador.`,
    });
  }
  alerts.push({
    tone: "quiet",
    title: "Tope de categoría",
    text: `El facturado usa ${formatPercent(fiscalUse(situation))} del tope ${situation.fiscal.category} de referencia. No es la categoría real del monotributo.`,
  });
  return alerts;
}

export const STATUS_LABEL: Record<DealStatus, string> = {
  draft: "Borrador",
  assigned: "Asignada",
  accepted: "Aceptada",
  invoiced: "Facturada",
  paid: "Cobrada",
  void: "Anulada",
};
