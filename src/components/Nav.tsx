import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import {
  clearCart,
  removeFromCart,
  addOne,
  removeOne,
} from "../store/cartSlice";

const links = ["Collections", "Men", "Women", "About", "Contact"] as const;

export default function Nav() {
  return (
    <>
      <MobileNav />
      <DesktopNav />
    </>
  );
}

/* ================= SHARED CART LOGIC ================= */

function useCart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const clear = () => dispatch(clearCart());
  const remove = (id: string) => dispatch(removeFromCart(id));
  const addOneMore = (id: string) => dispatch(addOne(id));
  const removeOneMore = (id: string) => dispatch(removeOne(id));

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return { items, totalQuantity, clear, remove, addOneMore, removeOneMore };
}

/* ================= MOBILE ================= */

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { items, totalQuantity, clear, remove, addOneMore, removeOneMore } =
    useCart();

  return (
    <>
      <nav className="flex md:hidden items-center justify-between py-6 px-4 fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              src={!isOpen ? "/images/icon-menu.svg" : "/images/icon-close.svg"}
            />
          </button>

          <img src="/images/logo.svg" className="h-5" />
        </div>

        {/* Right */}
        <div className="flex gap-4 items-center">
          {/* Cart */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="cursor-pointer"
            >
              <img src="/images/icon-cart.svg" className="h-5 w-5 " />
            </button>

            {/* Badge */}
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                {totalQuantity}
              </span>
            )}

            {/* Dropdown */}
            {isCartOpen && (
              <CartDropdown
                items={items}
                clear={clear}
                remove={remove}
                addOneMore={addOneMore}
                removeOneMore={removeOneMore}
              />
            )}
          </div>

          {/* Avatar */}
          <img
            src="/images/image-avatar.png"
            className="h-8 cursor-pointer hover:border-2 hover:border-orange-500 rounded-full transition"
          />
        </div>
      </nav>

      {/* Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        >
          <aside
            className="bg-white w-64 h-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="mt-10 space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <button className="font-bold text-lg hover:text-orange-500">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </>
  );
}

/* ================= DESKTOP ================= */

function DesktopNav() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, totalQuantity, clear, remove, addOneMore, removeOneMore } =
    useCart();

  return (
    <nav className="hidden md:flex items-center justify-between px-8 py-6 border-b">
      <div className="flex items-center gap-10">
        <img src="/images/logo.svg" className="h-5" />

        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-gray-500 hover:text-black hover:border-b-4 hover:border-orange-500 pb-8 transition"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right */}
      <div className="flex gap-6 items-center">
        {/* Cart */}
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="cursor-pointer"
          >
            <img src="/images/icon-cart.svg" className="h-5 w-5" />
          </button>

          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 rounded-full">
              {totalQuantity}
            </span>
          )}

          {isCartOpen && (
            <CartDropdown
              items={items}
              clear={clear}
              remove={remove}
              addOneMore={addOneMore}
              removeOneMore={removeOneMore}
            />
          )}
        </div>

        {/* Avatar */}
        <img
          src="/images/image-avatar.png"
          className="h-10 cursor-pointer hover:border-2 hover:border-orange-500 rounded-full transition"
        />
      </div>
    </nav>
  );
}

/* ================= CART DROPDOWN ================= */

function CartDropdown({
  items,
  clear,
  remove,
  addOneMore,
  removeOneMore,
}: {
  clear: () => void;
  remove: (id: string) => void;
  addOneMore: (id: string) => void;
  removeOneMore: (id: string) => void;

  items: Array<{
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
  }>;
}) {
  return (
    <div className="absolute right-0 mt-4 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-bold border-b pb-2 mb-4">Cart</h3>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-6">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <img src={item.image} className="w-12 h-12 rounded" />

              <div className="text-sm text-gray-600">
                <p>{item.title}</p>
                <div>
                  <div className="flex justify-between items-center">
                    {" "}
                    ${item.price}{" "}
                    <div className="flex justify-center items-center gap-3">
                      <img
                        src="/images/icon-minus.svg"
                        alt="minus"
                        className="cursor-pointer"
                        onClick={() => removeOneMore(item.id)}
                      />
                      {item.quantity}
                      <img
                        src="/images/icon-plus.svg"
                        alt="plus"
                        className="cursor-pointer"
                        onClick={() => addOneMore(item.id)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-black">
                      ${item.price * item.quantity}
                    </span>
                    <span
                      className="font-bold text-black"
                      onClick={() => remove(item.id)}
                    >
                      <img src="/images/icon-delete.svg" alt="delete" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="w-full bg-orange-500 text-white py-2 rounded cursor-pointer hover:bg-orange-600"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
