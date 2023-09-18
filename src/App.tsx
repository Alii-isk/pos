import ProductsManagments from "./components/manage-products";
import Products from "./components/products";
import { useUIStore } from "./store/ui";
import { Button } from "@nextui-org/react";

const App: React.FC = () => {
  const isProductModalOpen = useUIStore((x) => x.isProductModalOpen);
  const toggleProductModal = useUIStore((x) => x.toggleProductModal);

  return (
    <>
        <div className="w-screen h-screen max-w-4xl mx-auto p-5">
        {/* <Products/> */}
        {isProductModalOpen ? (
          <ProductsManagments />
        ) : (
          <div className=" w-full h-full flex gap-4 justify-center items-center">
            <Button color="default" variant="faded">
              انشاء فاتورة
            </Button>
            <Button
              variant="faded"
              onClick={toggleProductModal}
              color="default"
            >
              المنتجات
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
