"use client";
import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#AAFF00] rounded-full animate-spin" />
    </div>
  );
}
