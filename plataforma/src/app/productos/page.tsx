import { ProductDeck } from "@/components/site/product-deck";
import { SiteFrame } from "@/components/site/site-frame";

export const metadata = { title: "Productos · Agronys" };

export default function ProductosPage() {
  return (
    <SiteFrame current="/productos" theme="products">
      <div className="prod-root">
        <ProductDeck />
      </div>
    </SiteFrame>
  );
}
