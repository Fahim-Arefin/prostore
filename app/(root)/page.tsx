import ProductList from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/productActions";
import { Metadata } from "next";
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const metadata: Metadata = {
  title: "Home",
};

async function page() {
  // await delay(2000);
  const latestProduct = await getLatestProducts();
  return (
    <>
      <ProductList
        data={latestProduct}
        title="Newest Arrival"
        // limit={4}
      />
    </>
  );
}

export default page;
