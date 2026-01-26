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
                <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#fff3cd", borderRadius: "4px" }}>
                    <strong>丸め誤差:</strong> +{shortfall}円（不足分）
                </div>
            )}
        </div>
    );
}
