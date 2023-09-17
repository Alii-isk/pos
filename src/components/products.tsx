import { useUIStore } from "../store/ui";

export default function Products() {
  const toggleProductModal = useUIStore((x) => x.toggleProductModal);
  return (
    <div className="w-full h-full p-8 relative">
      <div className="sticky top-0">
        <button
          onClick={toggleProductModal}
          className="button is-info is-light "
        >
          رجوع
        </button>

        <div className="control  has-icons-right">
          <input
            className="input is-medium is-rounded"
            type="email"
            placeholder="بحث"
          />

          <span className="icon is-medium is-right">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      {/* list of products */}
      <div className="flex flex-wrap justify-center gap-7 mt-7">
        {Array(100)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <button className="bg-pink-400 hover:opacity-70 rounded-full overflow-hidden w-28 h-28 flex-shrink-0 relative">
                <img
                  className="is-rounded object-cover "
                  src="https://bulma.io/images/placeholders/128x128.png"
                />
              </button>
              <span> item {i}</span>
            </div>
          ))}
      </div>
      {/* floating button */}
        <button className=" bg-red-400 p-5 rounded-full is-large sticky bottom-5 right-5">
            <span className="icon">
                <i className="fas fa-plus"></i>
            </span>
        </button>

    </div>
  );
}
