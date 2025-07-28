import React from "react";

export function AlpineAuthHeader() {
  return (
    <div className="w-full flex flex-col items-center py-8 px-4 bg-gradient-to-b from-[#2F5233] to-[#1a2f1c] text-white rounded-t">
      <img
        src="/alpine logo.png"
        alt="Alpine Delivery Co. Logo"
        className="h-48 w-48 object-contain mx-auto mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold mt-2 text-center">Welcome</h1>
      <p className="text-green-100 mt-2 max-w-xl text-center text-base md:text-lg">
        Effortlessly manage your restaurant, track orders, and connect with your customers. Join Alpine Delivery Co. and elevate your dining experience!
      </p>
    </div>
  );
}
