"use client";

import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import AuthModal from "../auth/AuthModal";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Flights", href: "/flights" },
  { name: "About Us", href: "/about-us" },
];

export type AuthUserType = {
  name: string,
  email: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Topbar() {
  const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Disclosure as="nav" className="bg-sky-50 shadow-md sticky top-0 z-50">
        {({ open }) => (
          <>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
              <div className="flex h-16 justify-between items-center">
                {/* Left: Logo + Navigation */}
                <div className="flex items-center gap-4">
                  <Link href="/">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-4 border-sky-500 rotate-45"></div>
                      <span className="font-bold text-lg text-sky-600">
                        FlySmart
                      </span>
                    </div>
                  </Link>

                  <div className="hidden md:block">
                    <div className="ml-10 flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname === item.href
                              ? "text-sky-600"
                              : "text-gray-600 hover:text-sky-600",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Auth/User */}
                <div className="hidden md:flex items-center gap-4">
                  {!authUser ? (
                    <>
                      <button
                        onClick={() => setAuthOpen(true)}
                        className="px-4 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700 transition"
                      >
                        Login / Sign up
                      </button>
                    </>
                  ) : (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center space-x-1 font-medium text-gray-500 hover:text-sky-600 focus:outline-none cursor-pointer">
                        <UserCircleIcon className="h-8 w-8" />
                        <p>{authUser.name}</p>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => setAuthUser(null)}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "w-full text-left px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-sky-600 focus:outline-none">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </motion.div>

            {/* Mobile Nav Menu */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "text-sky-600"
                            : "text-gray-700 hover:text-sky-600",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {!authUser ? (
                      <div className="space-y-1 mt-3">
                        <button
                          className="w-full px-3 py-2 bg-sky-600 text-white text-sm rounded-md text-center"
                          onClick={() => setAuthOpen(true)}
                        >
                          Login / Sign up
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAuthUser(null)}
                        className="w-full px-4 py-2 bg-sky-600 text-white rounded-md text-sm hover:bg-sky-700 transition"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Disclosure>
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} setAuthUser={setAuthUser} />
    </>
  );
}
