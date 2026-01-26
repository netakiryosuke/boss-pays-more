"use client";

import InputForm from "@/components/InputForm";
import ResultList from "@/components/ResultList";
import { Result } from "@/types/result";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);
  const [difference, setDifference] = useState<number>(0);

  return (
    <main className="min-h-screen bg-gray-50 py-8 flex justify-center">
      <InputForm
        setResults={setResults}
        setDifference={setDifference}
      />
      <ResultList results={results} difference={difference} />
    </main>
  );
}
