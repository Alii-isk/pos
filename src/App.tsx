import Products from "./components/products";
import { useUIStore } from "./store/ui";

const App: React.FC = () => {
  const isProductModalOpen = useUIStore((x) => x.isProductModalOpen);
  const toggleProductModal = useUIStore((x) => x.toggleProductModal);

  return (
    <div className="w-screen h-screen">
      {/* <Products/> */}
      {isProductModalOpen ? (
        <Products />
      ) : (
        <div className=" w-full h-full flex gap-4 justify-center items-center">
          <button className="w-32 h-32 rounded-lg text-white bg-red-700  flex justify-center items-center ">
            انشاء فاتورة
          </button>
          <button
            onClick={toggleProductModal}
            className="w-32 h-32 rounded-lg text-white bg-green-700  flex justify-center items-center "
          >
            المنتجات
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
