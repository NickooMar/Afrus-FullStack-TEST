import React, { useState, Fragment } from "react";

import A_Logo from "../assets/A_Logo.png";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { AiFillCaretDown } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [collapseToggle, setCollapseToggle] = useState(false);

  return (
    <div className="w-full h-[60px] md:h-full bg-slate-900 pt-2.5 sticky pb-2.5">
      <div
        className="flex justify-around text-white"
        style={{ fontFamily: "montserrat" }}
      >
        <div>
          <a href="/" className="flex items-center">
            <img
              src={A_Logo}
              alt="Logo"
              className="w-16 h-16 rounded-lg hidden lg:flex"
            />
            <h1 className="text-2xl font-mono ml-2.5">Afrus</h1>
          </a>
        </div>
        <div className="hidden lg:flex space-x-8 items-center justify-center">
          {/* Products Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 text-white hover:text-gray-700 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Products <AiFillCaretDown className="mt-1 ml-1" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/products"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Filtrar
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/products/new"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Agregar
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Costumers Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 text-white hover:text-gray-700 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Costumers <AiFillCaretDown className="mt-1 ml-1" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/costumers"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Filtrar
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/costumers/new"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Agregar
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/costumers/list"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Lista
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/*  Transactions Dropdown */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 text-white hover:text-gray-700 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Transactions <AiFillCaretDown className="mt-1 ml-1" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/transactions"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Filtrar
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/transactions/new"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Realizar Compra
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          <a
            href="/events"
            className="inline-flex w-full justify-center rounded-md border border-gray-300 text-white hover:text-gray-700 px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Events
          </a>
        </div>
        <div className="items-center space-x-8 mx-2 hidden lg:flex">
          <a
            href="mailto:nicoo.marsili@gmail.com?Subject=Afrus%20|%20Examen%20Técnico"
            className="text-lg hover:opacity-50"
          >
            Contact
          </a>
          <Link
            to="https://github.com/NickooMar"
            target='_blank'
            className="text-lg px-6 py-2 bg-blue-900 bg-opacity-50 rounded-3xl text-blue-500 hover:opacity-70 hover:text-white"
          >
            About
          </Link>
        </div>
      </div>
      {collapseToggle ? (
        <>
          <div className="flex lg:hidden absolute top-3 ml-2 text-white">
            <button
              className="p-2"
              onClick={() => setCollapseToggle(!collapseToggle)}
            >
              <div className="space-y-2">
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
                <div className="w-8 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
          <div
            className="lg:hidden flex space-x-10 p-8 items-center justify-center text-white bg-slate-900 h-12 mt-4"
            onClick={() => setCollapseToggle(!collapseToggle)}
          >
            <a href="/products">Products</a>
            <a href="/costumers">Costumers</a>
            <a href="/transactions">Transactions</a>
            <a href="/events">Events</a>
          </div>
        </>
      ) : (
        <div className="flex lg:hidden absolute top-3 ml-2 text-white">
          <button
            className="p-2"
            onClick={() => setCollapseToggle(!collapseToggle)}
          >
            <div className="space-y-2">
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
              <div className="w-8 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
