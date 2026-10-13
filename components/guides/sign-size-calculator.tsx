"use client";

import { useState } from "react";

/** Arithmetic from the USSC rules cited beside this tool, not a design approval. */
export function SignSizeCalculator() {
  const [distance, setDistance] = useState("100");
  const [unit, setUnit] = useState("feet");
  const [allCaps, setAllCaps] = useState(false);
  const [parallel, setParallel] = useState(false);
  const value = Number(distance);
  const valid = distance.trim() !== "" && Number.isFinite(value) && value > 0;
  const feet = unit === "metres" ? value / 0.3048 : value;
  const inches = feet / 30 * (allCaps ? 1.15 : 1) * (parallel ? 3 : 1);
  const field = "mt-2 w-full rounded-xl border border-[#d4c3cb] bg-white p-3 text-[#1e1a22] focus-visible:outline-2 focus-visible:outline-[#ce0754]";
  return (
    <div className="mt-6 rounded-2xl border border-[#eadfe4] bg-[#fdf7f9] p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="font-bold text-[#1e1a22]" htmlFor="sign-viewing-distance">
          Viewing distance
          <input id="sign-viewing-distance" type="number" min="0.01" step="any" inputMode="decimal" value={distance} onChange={(event) => setDistance(event.target.value)} className={field} aria-describedby="sign-calculator-note" aria-invalid={!valid} />
        </label>
        <label className="font-bold text-[#1e1a22]" htmlFor="sign-distance-unit">
          Distance unit
          <select id="sign-distance-unit" value={unit} onChange={(event) => setUnit(event.target.value)} className={field}>
            <option value="feet">Feet</option><option value="metres">Metres</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-[#1e1a22]">
        <label className="flex items-start gap-3"><input type="checkbox" checked={allCaps} onChange={(event) => setAllCaps(event.target.checked)} className="mt-1 accent-[#ce0754]" />All-capitals wording (add about 15%)</label>
        <label className="flex items-start gap-3"><input type="checkbox" checked={parallel} onChange={(event) => setParallel(event.target.checked)} className="mt-1 accent-[#ce0754]" />Sign runs parallel to the road (about three times taller)</label>
      </div>
      <output aria-live="polite" className="mt-6 block rounded-xl bg-white p-4 font-bold text-[#1e1a22]">
        {valid ? `Estimated capital-letter height: ${inches.toFixed(1)} in (${(inches * 2.54).toFixed(1)} cm)` : "Enter a viewing distance greater than zero."}
      </output>
      <p id="sign-calculator-note" className="mt-4 text-sm leading-relaxed text-[#5e5862]">Starting estimate: distance in feet ÷ 30 = capital-letter height in inches. This measures letters, not total sign width. Contrast, font, congestion and local sign rules affect the final design. Use the chart and wall-measuring steps below before requesting a mockup.</p>
    </div>
  );
}
