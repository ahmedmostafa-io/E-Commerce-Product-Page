import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addToCart } from "../store/cartSlice";

const PRICE: number = 125;

export default function Product() {
  const images = [
    "/images/image-product-1.jpg",
    "/images/image-product-2.jpg",
    "/images/image-product-3.jpg",
    "/images/image-product-4.jpg",
  ] as const;

  const [count, setCount] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const image = images[currentIndex];

  const total: number = count * PRICE;
  const originalPrice: number = PRICE * 2;
  const handleAdd = () => {
    dispatch(
      addToCart({
        id: "sneaker-1",
        title: "Fall Limited Edition Sneakers",
        price: PRICE,
        quantity: count,
        image,
      }),
    );
  };

  const nextImage: () => void = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage: () => void = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 md:m-8 h-full">
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex flex-col justify-center items-center"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="relative flex justify-center items-center md:w-1/2 ">
            <img
              src={image}
              alt="preview"
              className="max-w-[90%] md:max-w-[70%] max-h-[90%] md:max-h-[70%] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute hover:cursor-pointer left-4 md:left-44 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow "
            >
              ❮
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute hover:cursor-pointer right-4 md:right-44 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow"
            >
              ❯
            </button>
          </div>

          <div
            className="hidden md:flex gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt="thumb"
                className={`w-20 h-20 rounded-lg cursor-pointer ${
                  currentIndex === index
                    ? "border-2 border-orange-500 opacity-50"
                    : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <img
          src={image}
          alt="product"
          className="w-full md:w-96 rounded-2xl cursor-pointer"
          onClick={() => setIsPreviewOpen(true)}
        />

        <button
          onClick={prevImage}
          className="absolute hover:cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow md:hidden"
        >
          ❮
        </button>

        <button
          onClick={nextImage}
          className="absolute hover:cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow md:hidden"
        >
          ❯
        </button>

        <div className="hidden md:flex mt-4 gap-4">
          {images.map((img, index) => (
            <img
              key={img}
              src={img}
              alt="thumb"
              className={`w-20 h-20 rounded-lg cursor-pointer ${
                currentIndex === index
                  ? "border-2 border-orange-500 opacity-50"
                  : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex mt-12 md:mt-0 flex-col gap-4 ml-8 w-96">
        <h2 className="text-sm tracking-widest text-orange-500 uppercase">
          Sneaker Company
        </h2>

        <h1 className="text-4xl font-bold">Fall Limited Edition Sneakers</h1>

        <p className="text-gray-500">
          These low-profile sneakers are your perfect casual wear companion.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">${total.toFixed(2)}</span>
          <span className="px-2 py-1 text-sm font-bold text-orange-500 bg-orange-100 rounded">
            50%
          </span>
        </div>

        <span className="line-through text-gray-500">
          ${(count * originalPrice).toFixed(2)}
        </span>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex justify-between items-center bg-gray-100 rounded px-4 py-2 md:w-1/2">
            <button
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              className="text-orange-500 font-bold text-xl cursor-pointer"
            >
              -
            </button>

            <span className="font-bold">{count}</span>

            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="text-orange-500 font-bold text-xl cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            className="w-full mb-10 md:mb-0 md:w-1/2 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded cursor-pointer"
            onClick={handleAdd}
          >
            <img
              src="/images/icon-cart.svg"
              alt="cart"
              className="h-5 w-5 mr-2"
            />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
