
import AddForm from "./components/AddForm";
import ProductsTable from "./components/ProductsTable";

export default function Home() {
  return (
    <div className="mt-6 w-full flex ite justify-center flex-col pt-10 ">
      <AddForm />
      <ProductsTable/>
    </div>
  );
}
