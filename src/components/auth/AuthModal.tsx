"use client";

import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { AuthUserType } from "../layout/Topbar";

export default function AuthModal({
  isOpen,
  onClose,
  setAuthUser,
}: {
  isOpen: boolean;
  onClose: () => void;
  setAuthUser: (param: AuthUserType) => void;
}) {

  const [isLogin, setIsLogin] = useState(true);

  const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          static
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50"
          />

          {/* Modal container */}
          <div className="fixed inset-0 flex items-center justify-center p-4" onClick={handleClickBackdrop}>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <motion.div
                layout
                transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
                className="bg-white rounded-xl shadow-xl p-6 relative overflow-hidden"
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                  {isLogin ? "Login to your account" : "Create an account"}
                </h2>

                <div className="relative min-h-[100px]">
                  {/* Login Form */}
                  <LoginForm isLogin={isLogin} setAuthUser={setAuthUser} onClose={onClose} />

                  {/* Signup Form */}
                  <SignUpForm isLogin={isLogin} setAuthUser={setAuthUser} onClose={onClose} />
                </div>

                <div className="text-sm text-center text-gray-600 mt-4">
                  {isLogin ? (
                    <>
                      Don’t have an account?{" "}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-sky-600 hover:underline font-medium"
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-sky-600 hover:underline font-medium"
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
