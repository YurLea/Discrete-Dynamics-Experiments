export function normalizeFormula(s) {
    if (!s) return "";
    return s
        .replaceAll("μ", "mu")
        .replace(/мю/gi, "mu")
        .trim();
}

export function isFiniteNumber(x) {
    return typeof x === "number" && Number.isFinite(x);
}

export function linspace(a, b, n) {
    const arr = new Array(n);
    if (n === 1) { arr[0] = a; return arr; }
    const step = (b - a) / (n - 1);
    for (let i = 0; i < n; i++) arr[i] = a + step * i;
    return arr;
}

export function autoRangeFromData(xs, padFrac = 0.15) {
    let min = Infinity, max = -Infinity;
    for (const v of xs) { min = Math.min(min, v); max = Math.max(max, v); }

    if (!Number.isFinite(min) || !Number.isFinite(max)) return [-1, 1];
    if (min === max) { min -= 1; max += 1; }

    const pad = (max - min) * padFrac;
    return [min - pad, max + pad];
}