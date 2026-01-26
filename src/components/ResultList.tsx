"use client";

import { Result } from "@/types/result";
import ResultItem from "./ResultItem";

interface Props {
    results: Result[];
    difference: number;
}

export default function ResultList({ results, difference }: Props) {
    return (
        <div>
            {results.map((result, index) => {
                return <ResultItem key={index} result={result} />;
            })}
            {difference !== 0 && (
                <div className="mt-4 p-3 bg-yellow-100 rounded">
                    <strong>誤差:</strong> {difference > 0 ? `+${difference}円（不足分）` : `${Math.abs(difference)}円（余剰）`}
                </div>
            )}
        </div>
    );
}
