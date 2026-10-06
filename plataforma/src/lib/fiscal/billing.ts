/**
 * Agronys emite desde Argentina, en monotributo.
 * Fuentes: ARCA, exportación de servicios del monotributo, y la tabla CUIT país.
 * Un cliente de Paraguay o Uruguay no cambia el régimen del emisor.
 */

export type Market = "AR" | "PY" | "UY";
export type Party = "juridica" | "humana" | "otro";
export type InvoiceKind = "C" | "E" | "NC_C" | "NC_E";

export type BillingRule = {
  country: Market;
  party: Party;
  kind: "C" | "E";
  creditNote: "NC_C" | "NC_E";
  document: string;
  taxIdLabel: "CUIT" | "RUC" | "RUT";
  cuitPais: string | null;
  notice: string;
};

const CUIT_WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/** CUIT país de ARCA para el receptor extranjero. Persona jurídica es el caso del establecimiento. */
const CUIT_PAIS: Record<Exclude<Market, "AR">, Record<Party, string>> = {
  PY: {
    humana: "50000000024",
    otro: "51600000024",
    juridica: "55000000026",
  },
  UY: {
    humana: "50000000016",
    otro: "51600000016",
    juridica: "55000000018",
  },
};

export const MARKET_LABEL: Record<Market, string> = {
  AR: "Argentina",
  PY: "Paraguay",
  UY: "Uruguay",
};

export const PARTY_LABEL: Record<Party, string> = {
  juridica: "Persona jurídica",
  humana: "Persona humana",
  otro: "Otro tipo de entidad",
};

export function isMarket(value: string): value is Market {
  return value === "AR" || value === "PY" || value === "UY";
}

export function isParty(value: string): value is Party {
  return value === "juridica" || value === "humana" || value === "otro";
}

export function billingFor(country: Market, party: Party = "juridica"): BillingRule {
  if (country === "AR") {
    return {
      country,
      party,
      kind: "C",
      creditNote: "NC_C",
      document: "Factura C",
      taxIdLabel: "CUIT",
      cuitPais: null,
      notice:
        "Operación interna. El monotributo emite factura C y no discrimina IVA. El importe en pesos entra al tope de la categoría.",
    };
  }

  const cuitPais = CUIT_PAIS[country][party];
  const local =
    country === "PY"
      ? "Si el servicio se aprovecha en Paraguay, el cliente puede estar alcanzado por el INR ante la DNIT. Agronys no lo retiene ni lo suma a la factura."
      : "Si el servicio se utiliza en Uruguay, el cliente contribuyente de IRAE analiza el IVA de los servicios del exterior ante la DGI. Agronys no lo incluye en la factura.";

  return {
    country,
    party,
    kind: "E",
    creditNote: "NC_E",
    document: "Factura E",
    taxIdLabel: country === "PY" ? "RUC" : "RUT",
    cuitPais,
    notice: `Exportación de servicios, código 2. En el comprobante va el CUIT país ${cuitPais}. El ${country === "PY" ? "RUC" : "RUT"} queda en la ficha del cliente. El tipo de cambio es el comprador del Banco Nación del día hábil anterior. La exportación también cuenta para el tope del monotributo. ${local}`,
  };
}

export function markets(): BillingRule[] {
  return (["AR", "PY", "UY"] as const).map((country) => billingFor(country, "juridica"));
}

export function digits(value: string) {
  return value.replace(/\D/g, "");
}

export function validCuit(value: string) {
  const id = digits(value);
  if (!/^\d{11}$/.test(id)) return false;
  const sum = CUIT_WEIGHTS.reduce((total, weight, index) => total + weight * Number(id[index]), 0);
  const rest = sum % 11;
  const check = rest === 0 ? 0 : rest === 1 ? 9 : 11 - rest;
  return check === Number(id[10]);
}

export function validTaxId(country: Market, value: string) {
  const id = digits(value);
  if (country === "AR") return validCuit(value);
  if (country === "PY") return /^\d{6,9}$/.test(id);
  return /^\d{12}$/.test(id);
}

export function taxIdError(country: Market, value: string) {
  if (validTaxId(country, value)) return null;
  if (country === "AR") return "El CUIT no cierra: son 11 dígitos con el verificador.";
  if (country === "PY") return "El RUC necesita entre 6 y 9 dígitos.";
  return "El RUT necesita 12 dígitos.";
}

export function pesosFrom(usd: number, fxRate: number) {
  return Math.round(usd * fxRate * 100) / 100;
}

export function amountsMatch(usd: number, fxRate: number, pesos: number) {
  return Math.abs(pesosFrom(usd, fxRate) - pesos) <= 1;
}
