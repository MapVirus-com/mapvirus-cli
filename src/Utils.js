import React from "react";

const sizes = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge"];

function manipulateSizes(size, amount) {
    let index = size.findIndex(size);
    index += amount;
    amount = Math.max(amount, 0);
    amount = Math.min(amount, sizes.length - 1);
    return size[amount];
}