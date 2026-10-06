import {
  billingFor,
  MARKET_LABEL,
  PARTY_LABEL,
  type Market,
  type Party,
} from "@/lib/fiscal/billing";

const PARTIES: Party[] = ["juridica", "humana", "otro"];

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="guide-steps">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function CountryCard({ country }: { country: Market }) {
  const rule = billingFor(country);
  return (
    <article className="ops-card">
      <p className="ops-kicker">{MARKET_LABEL[country]}</p>
      <h3>{rule.document}</h3>
      <p>{rule.notice}</p>
      {country === "AR" ? (
        <p className="ops-note">En Cobros cargás el número de comprobante y los pesos por dólar. El sistema calcula el importe en pesos y no deja guardar otro tipo de factura.</p>
      ) : (
        <table className="guide-table">
          <caption>CUIT país que va en la factura E, según el tipo de sujeto</caption>
          <thead>
            <tr>
              <th>Sujeto</th>
              <th>CUIT país</th>
            </tr>
          </thead>
          <tbody>
            {PARTIES.map((party) => {
              const row = billingFor(country, party);
              return (
                <tr key={party}>
                  <td>{PARTY_LABEL[party]}</td>
                  <td>{row.cuitPais}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </article>
  );
}

export function Guia() {
  return (
    <div className="guide">
      <header className="ops-head">
        <div>
          <p className="ops-kicker">Operación</p>
          <h2>Manual de venta y cobro</h2>
        </div>
      </header>
      <p className="guide-lead">
        Agronys emite desde Argentina, en monotributo. El cliente paga solo al superadmin. El vendedor no cobra y no ve el medio de pago.
      </p>

      <section className="ops-card">
        <h3>1. Dejar al cliente listo</h3>
        <Steps items={[
          "En Personas, el establecimiento lleva país, tipo de sujeto e identificación: CUIT en Argentina, RUC en Paraguay o RUT en Uruguay.",
          "Sin esa identificación, Cobros no deja emitir.",
          "El precio de lista del producto está en dólares. La infraestructura no entra en ese precio.",
        ]} />
      </section>

      <section className="ops-card">
        <h3>2. Cerrar la venta</h3>
        <Steps items={[
          "En Ventas se asigna producto, establecimiento y vendedor. El vendedor la ve solo si la venta es suya y ya no es borrador.",
          "Se acepta el precio vendido. Si queda debajo del sugerido, primero se autoriza el descuento.",
          "Si el superadmin retoma la venta, pasa a ser suya y el vendedor deja de verla. Una venta del superadmin no genera comisión.",
        ]} />
      </section>

      <section className="ops-card">
        <h3>3. Elegir el comprobante</h3>
        <p>El país del cliente decide el comprobante. No se elige a mano.</p>
        <div className="guide-countries">
          <CountryCard country="AR" />
          <CountryCard country="PY" />
          <CountryCard country="UY" />
        </div>
      </section>

      <section className="ops-card">
        <h3>4. Emitir y cobrar</h3>
        <Steps items={[
          "La factura se emite en ARCA, con un punto de venta de factura C para Argentina y otro de comprobantes de exportación para Paraguay o Uruguay.",
          "En una factura E, el tipo de exportación es servicios, código 2. El tipo de cambio es el comprador del Banco Nación del día hábil anterior. Se carga ese número: el sistema no lo busca.",
          "Los pesos tienen que coincidir con el precio en dólares por ese tipo de cambio. La exportación también suma al tope del monotributo.",
          "Si hay certificado MiPyME vigente, el derecho de exportación de servicios está exento. El sistema no consulta ese certificado.",
          "Cuando el cliente cubrió la factura, se registra el cobro. Recién ahí se arma la liquidación. El vendedor no ve si el cliente se atrasó.",
        ]} />
      </section>

      <section className="ops-card">
        <h3>5. Liquidar</h3>
        <Steps items={[
          "Catálogo, sin acumular: si el precio vendido supera al sugerido, la comisión es la diferencia. Si no lo supera, es el 10 % del vendido.",
          "Co-desarrollo: el precio se reparte según el porcentaje de cada colaborador, superadmin incluido. Los porcentajes tienen que sumar 100. No se suma comisión.",
          "La infraestructura queda afuera del reparto y solo la ve el superadmin.",
          "Una nota de crédito sigue al comprobante: NC C en Argentina y NC E en el exterior.",
        ]} />
      </section>
    </div>
  );
}
