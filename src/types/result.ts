export interface Result {
    position: string;
    payAmount: number;
}

export interface SplitResult {
    results: Result[];
    shortfall: number;
}
