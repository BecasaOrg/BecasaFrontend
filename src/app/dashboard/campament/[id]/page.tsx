"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import BecasaBanner from '@/components/dashboard/BecasaBanner';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <BecasaBanner />

      <div className="flex-1 bg-white rounded-t-[48px] p-8 pb-0 flex flex-col border-t border-x border-gray-100 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm font-bold text-gray-500 hover:text-[#AAFF00] transition-colors"
        >
          ← Volver
        </button>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-800 mb-2">Campamento #{params.id}</h2>
            <p className="text-gray-400 text-sm">Página en construcción...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
