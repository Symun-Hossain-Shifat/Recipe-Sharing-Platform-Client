"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 px-4">
      <Spinner size="lg" color="success" />
      <p className="text-zinc-400 text-xs font-medium tracking-widest uppercase animate-pulse">
        Loading RecipeHub...
      </p>
    </div>
  );
}