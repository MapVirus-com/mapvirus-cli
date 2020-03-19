import React from "react";


export function manipulateSizes(size, amount) {
    const sizes = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"];
    let index = sizes.findIndex((s) => s === size);
    index += amount;
    amount = Math.max(amount, 0);
    amount = Math.min(amount, sizes.length - 1);
    return sizes[amount];
}