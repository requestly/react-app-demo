import { useState } from "react";
import "./App.css";
import productsJSON from "./products.json";
import { LoadingCard } from "./components/LoadingCard";
import { ProductCard } from "./components/ProductCard";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const handleProductFetch = async () => {
    setIsLoading(true);
    //make a fetch request to an non-existent API
    //to simulate a slow loading time
    setTimeout(async () => {
      await fetch("https://fakerqstoreapi.com/products")
        .then((response) =>
          response.json().then((data) => {
            setProducts(data);
            setIsLoading(false);
          })
        )
        .catch((error) => {
          console.log(error);
          // setProducts(productsJSON);
          setIsLoading(false);
        });
    }, 500);
  };

  return (
    <div className="App">
      <h1 className="mt-4 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-600 from-sky-800">
          Requestly Store
        </span>
      </h1>
      <button
        onClick={handleProductFetch}
        type="button"
        className="mt-5 text-white bg-gradient-to-r from-sky-600 to-sky-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-600 dark:focus:ring-sky-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2"
      >
        Get Products
      </button>
      <div className="mt-10">
        {isLoading ? (
          <div className=" w-full flex justify-evenly">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        ) : products.length ? (
          <div className=" w-full flex justify-evenly">
            {products.map((prod, index) => {
              return <ProductCard product={prod} key={index} />;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
