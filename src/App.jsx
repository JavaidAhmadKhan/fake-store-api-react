import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((items) => setItems(items))
      .then(
        (items) => {
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="m-6 md:m-10 xl:m-12 grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-8 p-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative shadow-xl rounded items-center justify-center flex flex-col p-6 border-gray-200 border-[1px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 "
            >
              <img
                src={item.image}
                alt={`${item.image}`}
                className="w-[200px] h-[200px] object-contain object-center"
              />
              <div className="">
                <h2 className="absolute top-2 right-6 text-gray-400">
                  {item.category}
                </h2>
                <h1 className="text-gray-700 font-bold text-base mt-4">
                  {item.title}
                </h1>
                <p className="text-gray-700 font-regular text-sm mt-4 ">
                  {item.description.slice(0, 170)}...
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t-2">
                  <p className="text-gray-700 font-semibold text-lg ">
                    $ {item.price}
                  </p>
                  <div className="bg-blue-500 py-2 px-2 rounded-lg hover:bg-blue-600 ">
                    <button className="text-white text-sm font-medium">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App
