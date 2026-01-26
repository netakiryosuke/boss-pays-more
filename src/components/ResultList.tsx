"use client";

import { Result } from "@/types/result";
import ResultItem from "./ResultItem";

interface Props {
    results: Result[];
}

export default function ResultList({ results }: Props) {
    return (
        <div>
            {results.map((result, index) => {
                return <ResultItem key={index} result={result} />;
            })}
        </div>
    );
}
