"use client";

import { Result } from "@/types/result";
import ResultItem from "./ResultItem";

interface Props {
    results: Result[];
    shortfall: number;
}

export default function ResultList({ results, shortfall }: Props) {
    return (
        <div>
            {results.map((result, index) => {
                return <ResultItem key={index} result={result} />;
            })}
            {shortfall !== 0 && (
                <div className="mt-4 p-3 bg-yellow-100 rounded">
                    <strong>誤差:</strong> +{shortfall}円（不足分）
                </div>
            )}
        </div>
    );
}
