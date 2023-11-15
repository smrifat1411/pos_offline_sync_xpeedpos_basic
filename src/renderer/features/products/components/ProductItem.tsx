import { useCart } from "../../../context/CartContext";
import { Product } from "../../../types/product";
import EditProduct from "./EditProduct";

interface Props {
  data: Product;
}

const ProductItem: React.FC<Props> = ({ data }) => {
  const { addToCart } = useCart();

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg border">
      <div className="my-4 mx-auto flex flex-col items-center justify-between">
        <div className="mb-2">
          {data?.discount ? (
            <>
              <p className="mr-3 text-base font-semibold">
                ৳{data.price - (data.price * data.discount) / 100}
              </p>
              <p className="mr-3 text-xs">
                <span className="line-through">৳{data.price}</span> -{" "}
                {data.discount}%
              </p>
            </>
          ) : (
            <p className="mr-3 text-base font-semibold">৳{data.price}</p>
          )}
        </div>
        <h3 className="mb-2 text-lg text-center text-gray-700">{data.name}</h3>
      </div>
      <button
        className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
        onClick={() => addToCart(data)}
      >
        <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
          Add
        </div>
      </button>
      <EditProduct product={data} />
    </section>
  );
};

export default ProductItem;
