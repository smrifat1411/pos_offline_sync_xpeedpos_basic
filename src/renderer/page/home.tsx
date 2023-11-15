
import ProductSec from "renderer/features/products/components/Product";
import { useUser } from "../context/UserContextProvider";

const Home: React.FC = () => {
  const { user } = useUser();


  async function getAllTODOS() {
    const data = await window.electron;

 console.log(window.electron);

  }
  getAllTODOS()

  // return (
  //   <>

  //     <div className="w-full h-full grid grid-cols-12 gap-4 p-1">
  //       <div className="col-span-12 md:col-span-7 order-2 md:order-1">
  //         <ProductSec />
  //       </div>
  //       <div className="col-span-12 md:col-span-5 order-1 md:order-2">
  //         {user?.role === "manager" || user?.role === "admin" ? (
  //           <>
  //             <h2 className="text-center text-xl">Cart</h2>
  //             {/* <Cart /> */}
  //           </>
  //         ) : (
  //           <h2 className="text-center text-xl text-orange-500 capitalize">
  //             Please Contact to your admin
  //           </h2>
  //         )}
  //       </div>
  //     </div>


  //   </>
  // );

  return (
    <>
    <h1>Route</h1>
    </>
  )
};

export default Home;
