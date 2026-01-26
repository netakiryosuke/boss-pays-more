"use client";

import InputForm from "@/components/InputForm";
import ResultList from "@/components/ResultList";
import { Result } from "@/types/result";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Result[]>([]);

  return (
    <main>
      <InputForm 
        results={results}
        setResults={setResults}
      />
      <ResultList results={results} />
    </main>
  );
}
