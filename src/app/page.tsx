"use client";

import InputForm from "@/components/InputForm";
import ResultList from "@/components/ResultList";
import { Result } from "@/types/result";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);
  const [difference, setDifference] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gray-50 py-4 sm:py-8 flex justify-center">
      <div className="w-full max-w-2xl px-4">
        <InputForm
          setResults={setResults}
          setDifference={setDifference}
        />
        <ResultList results={results} difference={difference} />
      </div>
    </main>
  );
}
