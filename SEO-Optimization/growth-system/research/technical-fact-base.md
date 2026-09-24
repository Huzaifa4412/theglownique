# The Glownique — Technical Fact Base (Cited)

Prepared: 2026-09-24 · Audience: content team · Status: research reference. This is not legal, code-compliance, or engineering sign-off.

---

## How to use this file

- **Citations.** `[S#]` keys point to the **Source Register** at the end of the file. Each entry gives the title, publisher or author, URL, and date. **All sources were accessed 2026-09-24.**
- **Confidence levels.**
  - **High:** a standards body, government, or regulator, or the manufacturer's own datasheet for the exact product quoted.
  - **Medium:** trade press, an industry association, a distributor, or a manufacturer speaking generally. Also used where the primary source was paywalled or blocked and only a reliable secondary source was available.
  - **Low:** anecdote, an interested party with no data, sign-shop or retailer content, or a single weak source.
- **Derived** means the arithmetic is ours, built from the cited inputs. It is not a claim made by the source.
- **Quotes** are under 15 words. Everything else is paraphrased.
- **Code editions.** The NEC (NFPA 70) is adopted state by state or city by city, sometimes with amendments. A jurisdiction may still enforce 2017, 2020, 2023 or 2026 [S27][S43]. The Article 600 section numbers below come from 2011–2023 text reproduced by secondary sources. Section numbers changed in the 2026 NEC [S38]. Always confirm against the locally adopted edition.
- **Blocked or paywalled primary sources.** The IEC 60529 full text, UL 48 full text, NEC full text, IES TM-21-21 and LM-80-21 full text, and the Agfa ink pages (behind a CAPTCHA) could not be read. Where they matter, the text says so.

---

## Top-line takeaways for editors

1. **Glass neon wattage varies widely.** Published figures run from about 3.5 to about 11 W per foot, depending on transformer type, color and tube [S19][S20][S41][S42]. Published LED-neon figures run from about 1.6 to 3.7 W/ft [S49][S50][S51][S53]. A flat "80% less" is only true for the most favourable pairing. Watts per foot also ignores brightness.
2. **"50,000/100,000 hours" usually describes LED-package lumen maintenance (L70), not the life of the sign.** DOE says unsupported 100,000-hour claims were once the default [S10]. An industry reliability consortium working with DOE put power/driver components at the top of its most-observed-failure list, and driver-circuit failures dominated its accelerated tests [S11].
3. **IP67 is a component test result, not an outdoor approval.** It does not include water-jet protection unless dual-coded [S7][S8]. In the US, IP ratings are not a substitute for NEMA/UL enclosure types [S9]. Outdoor US signs are marked "Suitable for Wet Locations" under UL 48 [S32][S33].
4. **Sign listing is required "regardless of voltage."** A listed adapter does not make the sign listed [S28][S33].
5. **Acrylic is not shatterproof.** It is 10–20 times tougher than plate glass and breaks into large pieces [S61]. LED neon has no glass tubes to shatter.
6. **ADA §703 does not apply to company names and logos.** §307's 4-inch protrusion limit still applies to anything wall-mounted in a circulation path between 27 and 80 inches above the floor [S1][S2].

---

## 1. LED neon flex vs traditional glass neon

### 1A. LED neon flex: safe to publish

| Aspect | Fact | Source | Confidence |
|---|---|---|---|
| Definition | A continuous line of LEDs inside a flexible polymer (silicone or PVC) jacket that diffuses the light to imitate a glass-neon line. There is no neon gas. The sign industry markets these as neon-replacement or "faux neon" systems. | [S49][S50][S51][S44] | High |
| How it works | LEDs on a flexible circuit run on low-voltage DC from a separate power supply (driver). The driver converts mains AC. Example: Current's GEPS24 supplies take roughly 90/100/108–305 VAC in and give 24 VDC out. | [S49][S50] | High |
| Typical voltage | Sign-industry lines are commonly 24 VDC (Current Tetra Contour, SloanLED Street Wrap). 12 VDC lines also exist (e.g., GLLS Contour 12V). | [S49][S51][S53][S54] | High |
| Not all LED neon is low voltage | Line-voltage LED neon exists. Example: GLLS Vivid S160, 120 VAC, PVC, UL 2388, with a cutting unit of about 19.7 in (500 mm). | [S55] | High |
| LED type | Datasheets describe SMD LED chips. One 120 V product lists 25 LEDs/ft. | [S54][S55] | Medium–High |
| Jacket and diffusion | SloanLED uses a "dual-color silicone extrusion," described as UV-resistant. An older SloanLED product described its silicone as UV-stable, hydrocarbon-insensitive and non-fading. Current's Contour pairs a light engine with a separate light guide. GLLS sells both PVC and silicone versions. | [S51][S52][S49][S53] | High |
| How colours are made | Some colours use coloured LEDs. Others use white LEDs behind a colour-matched silicone overmold (SloanLED custom colours). This affects efficiency and colour consistency. | [S51] | High |
| Cutting | Cut only at the manufacturer's marked cut points. Intervals vary by product: 3 in (4 in for red) for Current Contour Gen 2; 4 in for Contour Flex; 100 mm (83 mm for some colours and RGB) for SloanLED; 83–125 mm for GLLS 24 V; about 500 mm for GLLS 120 V. | [S49][S50][S51][S53][S55] | High |
| Bending | Each product has a minimum bend radius or diameter. SloanLED Street Wrap: 60 mm radius. GLLS: 90 mm diameter (12 V Contour, side bend) and 120 mm diameter (S160). Products come as side-bend or back/top-bend. Current Contour Flex can be reshaped repeatedly without heating. | [S51][S54][S53][S50] | High |
| Power per length (manufacturer data) | Current Tetra Contour Gen 2: 1.4–1.9 W/ft strip, 1.6–2.2 W/ft system. Contour Flex: 1.4 W/ft strip, 1.6 W/ft system. GLLS 24 V: 2.19–3.66 W/ft (7.2–12 W/m). GLLS 120 V: 1.83 W/ft. SloanLED Street Wrap Flex: 12 W/m, about 3.66 W/ft (derived conversion). | [S49][S50][S53][S55][S51] | High (these products) |
| Run length limits | Maximum runs are set by power-supply loading and voltage drop. SloanLED: up to 7.3 m per 96 W supply. GLLS: 7–40 m depending on product and single or double feed. Current publishes maximum supply-wire lengths by wire gauge. A distributor notes that 24 V lets a run cover more footage in large signs. | [S51][S53][S49][S56] | High / Medium |
| Operating temperature | Current: −40 to +60 °C. SloanLED: −40 to +65 °C. GLLS 12 V silicone: −40 to 50 °C. | [S49][S51][S54] | High |
| Component water/wet ratings | Current Contour: IP66, UL Recognized for dry, damp and wet locations. SloanLED Street Wrap: IP67. GLLS 12 V: IP68 "with appropriately rated accessories." GLLS 120 V: rated dry/damp/wet. | [S49][S51][S54][S55] | High |
| Certifications (as printed) | Current: UL Recognized E219167 and UL Classified E229508. SloanLED: UL file E341517. GLLS: tested to UL 2108 (12 V) and UL 2388/1598 (120 V). These are **component or low-voltage-system** certifications, not a finished-sign listing. | [S49][S51][S54][S55] | Medium |
| Mounting | Clips, aluminium tracks or channels, or chains for curves. SloanLED does not warranty its transparent polycarbonate clips outdoors. Cut ends are sealed with silicone end caps and silicone adhesive. | [S51][S50] | High |
| Maintenance | LED systems often have serviceable parts (power supply, connectors). Serviceability should be judged product by product. Common failure points are power/driver components, connections and moisture ingress. | [S10][S11] | High |
| Lifespan expressions used by suppliers | Warranties of 5 years (Current Contour; SloanLED 5-year product and 5-year labor), 10 years (GLLS 12 V silicone) and 5 years (GLLS 120 V PVC). Current describes Contour Flex as good for up to five years of continuous 24/7 use (about 43,800 h, derived). GLLS rates 70,000 h L70 at 25 °C but 50,000 h L70 at 50 °C. | [S49][S50][S51][S54][S55] | High |
| Pros | No glass tubes to break. Current markets an impact-resistant design that reduces breakage costs. Class 2 (UL) / Class III SELV (IEC) low-voltage options. Can be cut and formed in the field. Sign shops report it is easier to install and service. | [S50][S44] | Medium–High |
| Cons | Strict cut points and bend limits. Some products emit less light per foot than glass neon (see 1C). PVC jackets discolour under UV (see §3). Cut ends and connections are the weak points for water. Some neon fabricators consider entry-level LED products better suited to interiors (opinion). | [S49][S51][S82][S8][S44] | Medium |

### 1B. Traditional glass neon: safe to publish

| Aspect | Fact | Source | Confidence |
|---|---|---|---|
| Definition / how it works | A sealed, hand-bent glass tube with an electrode at each end, filled with neon or argon gas. The gas glows when high voltage drives current through it. In commercial signs, essentially only neon and argon are used. | [S21][S39] | High |
| Colours | Neon gas glows red. Mercury-argon glows blue. Other colours come from coloured glass and phosphor coatings inside the tube; green, for example, can be mercury-argon in yellow glass. Red neon contains no mercury; most other "neon" colours use argon with mercury and phosphor. | [S21][S31] | High |
| Fabrication | A skilled glass bender shapes the hot tube. It is then purified by heating the glass and electrodes to burn off impurities, evacuated, and filled with gas. | [S21] | High |
| Voltage | US neon transformers typically deliver 1,000–15,000 V at 20–60 mA on the secondary side. One manufacturer's ratings run 3,000–15,000 V open-circuit at 30/60 mA. Under proper load the tube voltage is about half the open-circuit voltage. Magnetic shunts limit the current. | [S39][S40] | High |
| Input power example | A 15,000 V / 30 mA magnetic transformer draws about 450 VA but only about 202 W of real power, a power factor of 40–50%. High-power-factor versions draw roughly the same watts at about half the current. Power factor correction does not lower the energy bill. | [S40] | High |
| Energy-code angle | California's alternate compliance path requires neon or cold-cathode power supplies at ≥75% efficiency below 50 mA, or ≥68% at 50 mA and above. A 2007 CASE analysis estimated efficient supplies cut energy by about 22–25%. | [S18][S19] | High |
| Code structure | NEC Article 600 Part II covers field-installed neon secondary wiring in two bands, 1,000 V or less and over 1,000 V. Neon transformers and power supplies fall under UL 2161. Transformers with secondary ground-fault protection must be marked. | [S28][S26][S32] | High |
| Lifespan | The NPS says neon signs can last 50 years, with 20–25 years more typical. Failures come from broken tubes, electrodes or transformers; the gas does not wear out. | [S21] | Medium (1991 brief) |
| Maintenance | Flicker can mean a failing transformer or wrong gas pressure (needs re-pumping). Over- or under-loading a transformer shortens its life. Repairs are not for amateurs. | [S21][S39][S40] | High |
| Installation note | Neon tubing that pedestrians can readily reach must be protected from physical damage (NEC 600.9, per ISA commentary). | [S28] | High |
| Cons | The glass is fragile. Broken tubes on live high-voltage circuits are a shock hazard, a liability concern cited for high-traffic venues. Mercury-containing tubes are regulated as universal waste. The work needs specialist labour. | [S44][S20][S31][S21] | High / Medium |
| Pros (claimed) | A neon supplier argued in 2005–06 that rare-earth phosphor neon on electronic transformers is highly efficient. Note: this is an interested party and the data is dated. | [S41] | Low–Medium |

### 1C. Power: what the published numbers actually say

**Published glass-neon figures**

| Source | Figure | Notes |
|---|---|---|
| PG&E CASE report for the California Energy Commission (2007) [S19] | 8.5 W per lineal foot | An assumed load for neon and cold-cathode signs in code analysis |
| Ecos Consulting proposal to the CPUC (2003) [S20] | About 11 W/ft typical; 10 W/ft used for program savings | Channel-letter neon. Relies on manufacturer data. |
| Signs of the Times bench test (2006) [S42] | About 49.5 W for about 5 ft of 12 mm red neon on a magnetic transformer, roughly 10 W/ft (derived) | One letter; anecdotal test by the author's own description |
| EGL Company, neon supplier (2005–06) [S41] | About 3.5 W/ft (rare-earth phosphor on an electronic transformer); 3.5–4 W/ft (clear red, electronic) | Interested party; old data |

**Published LED-neon figures**

| Source | Figure |
|---|---|
| Current Tetra Contour Gen 2 [S49] | 1.6–2.2 W/ft (system) |
| Current Contour Flex [S50] | 1.6 W/ft (system) |
| GLLS Vivid, 24 V [S53] | 2.19–3.66 W/ft |
| GLLS Vivid S160, 120 V [S55] | 1.83 W/ft |
| SloanLED Street Wrap Flex [S51] | 12 W/m, about 3.66 W/ft |

**Derived reduction ranges (our arithmetic)**

- **Against the older magnetic-transformer assumptions (8.5–11 W/ft):** LED neon at 1.6–3.66 W/ft is about **57–85% lower**.
- **Against electronic-transformer neon (3.5–4 W/ft, EGL):** the range runs from about **5% *higher*** (3.66 W/ft LED vs 3.5 W/ft neon) to **60% lower**.

**Watts per foot ignores brightness.**
- A neon supplier points out that W/ft says nothing about how bright a sign is [S41].
- In the 2006 test, the LED letter was about one-third as bright as the neon letter [S42].
- Recent white LED neon (Current Contour Gen 2) lists 123 lm/ft [S49]. EGL gave about 150 lm/ft for standard 15 mm white neon [S41]. Test conditions differ, so the comparison is indicative only (Medium).

**Where "80% less energy" style claims appear to come from.** Early utility-program documents estimated **60–90%** savings for channel-letter retrofits [S20]. Those estimates rest on the high neon baseline of about 10 W/ft and manufacturer LED data. We found **no standards-body or government test** showing a general 80% reduction at equal light output. **Not found.**

### Needs manufacturer/owner verification (topic 1)

- The exact strip supplier and model.
- The jacket material: true silicone, PVC, or silicone-coated PVC.
- The LED package.
- Measured W/ft and lm/ft.
- The cut unit and minimum bend radius.
- The IP rating, with the test report.
- The operating temperature range.
- Warranty terms.
- The power supply: model, NRTL listing, Class 2 marking, indoor or outdoor rating, and efficiency.
- For each colour: coloured LEDs, or white LEDs behind a tinted jacket?
- Whether any finished sign is listed to UL 48 (or equivalent), as distinct from listed components.

### Common misconceptions / claims to avoid (topic 1)

- **"LED neon contains neon gas."** False. It is LEDs in a polymer diffuser [S51][S49].
- **"LED neon is always 12 V."** False. 24 V is common in sign products, and 120 V AC LED neon exists [S49][S55].
- **"Cut it anywhere."** False. Only at marked cut points [S49][S51].
- **"Bend it to any shape."** False. Each product has a minimum bend radius or diameter [S51][S54].
- **"Neon gas wears out."** The NPS says failures are broken tubes, electrodes or transformers [S21].
- **"Glass neon is obsolete or non-code."** False. NEC Article 600 and UL 2161 still cover it [S28][S26]. Some landlords do prohibit exposed neon [S83].

### Conflicts flagged (topic 1)

- **Neon wattage:** the neon supplier's 3.5–4 W/ft [S41] conflicts with the program and code assumptions of 8.5–11 W/ft [S19][S20]. Both are plausible for different eras, transformers and colours.
- **Efficiency at equal brightness:** the 2006 trade-press test found neon *more* efficient than the LED of that time [S42]. LED technology has improved a great deal since, so treat the test as historical.

---

## 2. What "50,000 / 100,000-hour" LED ratings actually mean

### Safe to publish

- **Lumen maintenance, not burnout.** LED packages rarely fail catastrophically. They dim gradually. "L70" is the time until output falls to 70% of initial. Ratings are usually stated as L70-B50, the time at which half of a sample population reaches L70 [S10]. **High**
- **Definitions.** TM-21 defines Lp as the operating time over which a light source keeps p% of its initial output. For example, L70 = 70% and L50 = 50% [S12]. **High**
- **Test vs projection.** IES LM-80 measures lumen and colour maintenance of LED packages, arrays and modules. IES TM-21 projects that measured data forward in time. The projection covers one failure mode only: lumen depreciation [S10][S12]. **High**
- **The "6×" limit (TM-21-11).**
  - With 20 or more samples, projections may not exceed 6× the test duration.
  - With 10–19 samples, the limit is 5.5×.
  - With fewer than 10 samples, the method may not be used.
  - A capped result is written with ">", e.g. L70(6k) > 36,000 h.
  - No extrapolation is allowed above the tested temperatures [S12]. **High** for TM-21-11.
- **Newer editions.** ANSI/IES LM-80-20 and LM-80-21, and ANSI/IES TM-21-21 (Aug 2021), are the listed current editions. We could not read their text to confirm the multiplier rules carry over [S13]. **Medium; verify.**
- **Derived.** A 100,000-hour L70 claim under the 6× rule needs about 16,700 hours (roughly two years) of LM-80 data on the specific LED package, and that is still only the package's lumen maintenance.
- **System life vs component life.** DOE states that a complete system's rated lifetime cannot exceed the in-situ lifetime of any of its components. It also names the driver as the weak link for some LED products [S10]. **High**
- **Industry consortium (LSRC, with DOE, 2014).**
  - Lumen depreciation is not a proxy for luminaire lifetime.
  - LM-80 plus TM-21 predicts depreciation, not lifetime.
  - Power/driver components head the consortium's member-survey chart of most-observed failures. The chart's bar values could not be extracted, so the exact ranking is Medium confidence.
  - In accelerated "hammer" tests, failures typically occurred in the driver circuit. Fewer than 1% of the 611 LEDs failed.
  - Electrolytic or film capacitors are a leading cause of driver failure.
  - Rule of thumb: roughly doubling electronic life for each 10 °C cooler [S11]. **High**
- **Counterpoint from a driver maker.** Mean Well (2018) argues a well-designed driver should not have a shorter life than its LEDs. It says driver life depends on capacitor grade and temperature, and cites about 70,000 h at 60 °C ambient for one premium outdoor driver. Note: interested party [S80]. **Medium**
- **Temperature matters.** One LED-neon datasheet rates 70,000 h L70 at 25 °C but 50,000 h L70 at 50 °C, and 90,000 h vs 70,000 h at L50 [S54]. **High**
- **What sign-industry suppliers actually claim.** Current rates its channel-letter modules at "exceeding 50,000 hours," with 5- or 10-year warranties, and describes Contour Flex as good for up to five years of 24/7 use [S50]. SloanLED gives a 5-year warranty [S51]. **High**
- **MTBF is not lifetime.** DOE's example: a driver with a 100,000-hour MTBF implies about 87.6% of units fail over 10 years of continuous use [S10]. **High**
- **History.** DOE notes that a 100,000-hour default claim was once common, often with little or no evidence [S10]. **High**
- **Derived conversions.** 50,000 h ≈ 5.7 years of 24/7 operation. 100,000 h ≈ 11.4 years of 24/7 operation.
- **Enforcement precedent.** The FTC obtained a court order of more than $21 million against an LED lamp maker, in part for overstated lifetime claims. The company claimed 30,000 hours; its own data showed the tested bulbs lasted only a few thousand hours [S16]. **High**
- **Sign-level lifetimes of other technologies.** Neon signs typically last 20–25 years [S21]. "LED outlasts neon" therefore needs product-specific evidence. **Medium**

### Needs manufacturer/owner verification

- The LM-80 report for the LED package used: lab, hours tested, sample size, case temperatures, drive current.
- The TM-21 calculation.
- The measured in-situ LED temperature inside the sign.
- The driver datasheet lifetime at the actual case or ambient temperature.
- Warranty years and what they cover.
- Field return rates, if available.

### Misconceptions / claims to avoid

- "The sign lasts 100,000 hours."
- "L70 means it burns out."
- "MTBF = lifespan."
- "LEDs never fail."
- "Maintenance-free for 11 years." This is marketing arithmetic that assumes 12–24 h/day of use [S78].

---

## 3. IP ratings (IEC 60529): IP65 vs IP67 vs IP68

### Safe to publish

- **What the IP code is.** IEC 60529 grades how well an *enclosure* keeps out solids (first digit, 0–6) and water (second digit, 0–9). It applies to electrical equipment rated up to 72.5 kV. The first edition dates from 1976. The IEC says the standard itself should be consulted for the test conditions [S5]. **High**
- **First digit 6 = dust-tight** (no dust ingress). **First digit 5 = dust-protected** (limited ingress) [S6]. **Medium** (secondary summary of the standard)
- **IPX5 (water jets):** 6.3 mm nozzle, 12.5 L/min, about 2.5–3 m away, from all practicable directions [S6][S7]. **Medium–High**
- **IPX6 (powerful jets):** 12.5 mm nozzle, 100 L/min [S6][S7]. **Medium–High**
- **IPX7 (temporary immersion):**
  - Test depth: lowest point 1 m below the surface for enclosures under 850 mm tall; highest point 150 mm below the surface for taller ones.
  - Duration: about 30 minutes [S6][S8]. **Medium–High**
- **IPX8 (continuous immersion):** conditions are agreed between manufacturer and user and must be more severe than IPX7 [S6][S8]. **Medium–High**
- **Not cumulative above 6.** An IPX7 or IPX8 enclosure is not automatically suitable for water jets unless it is dual-coded, e.g. IP66/IP67. IP67 does **not** imply IP65 or IP66 performance [S6][S7][S8]. **High** (confirmed by a test lab)
- **Cable wicking.** Water can travel inside cable jackets into an enclosure. Labs test with the actual cabling [S8]. **Medium**
- **System vs component (NEMA).**
  - IP ratings consider only solids and water. NEMA Types add icing, corrosion and construction criteria.
  - IP ratings may apply to partially completed installations.
  - A field assembly's rating is limited by its least-rated component ("weakest link").
  - NEMA cites NEC 110.28: IP ratings are not a substitute for Enclosure Type ratings [S9]. **High**
- **Supplier examples of component rating:**
  - GLLS rates its strip IP68 only "with appropriately rated accessories" [S54].
  - Some Current modules carry IP66 yet are UL-recognized only for dry or damp locations [S50].
  - SloanLED's IP67 strip ships with silicone end caps and adhesive for sealing [S51].
  - **High**
- **US outdoor practice.** Listed signs are marked "Dry Locations Only," "Suitable for Damp Locations" or "Suitable for Wet Locations" after the applicable testing. LED signs in wet locations need wet-rated Class 2 cable (NEC 600.33(A)(1)) [S32][S33]. **High**
- **Drain holes.** Signs need drain holes at low points and in isolated sections (UL 48 details; NEC 600.9 commentary) [S28]. **High**
- **Portable signs outdoors.** Portable or mobile signs in damp or wet locations need **factory-installed GFCI** protection (NEC 600.10) [S28]. **High**
- **UV exposure.** Under light, PVC loses hydrogen chloride (dehydrochlorination), forming conjugated polyenes that discolour it [S82]. Sign-industry silicone jackets are marketed as UV-stable or UV-resistant [S51][S52]. **High** (PVC chemistry) / **Medium** (silicone performance claims)
- **Power supplies.** Wet-location-rated LED supplies exist, e.g. SloanLED's Quantum line [S52]. Whether The Glownique's adapter is rated is a separate question (see below). **Medium**
- **Field anecdote.** A New York neon shop reports water entering wire connections of rope-style LEDs during winter thaws [S44]. **Low** (anecdote)

### Needs manufacturer/owner verification

- An IP test report for the **assembled** sign: lab, standard, both digits, sample.
- Any wet-location listing.
- The power supply's IP or wet rating, and where it will be mounted.
- Connector and cable ratings.
- Whether the jacket is silicone or PVC, and any UV test data.
- Sealing instructions for cut ends.
- Whether an outdoor plug-in version includes factory GFCI.

### Misconceptions / claims to avoid

- "IP67 = waterproof in any weather."
- "IP68 beats IP66 for rain or hosing."
- "The strip is IP67, so the sign is IP67."
- "An IP rating equals UL wet-location approval."

---

## 4. Channel letters

### Safe to publish

- **Definition.** A dimensional letter built from individual plastic or metal components, optionally illuminated [S57]. **High**
- **Typical construction.**
  - Returns: pre-painted aluminium coil, often .040", sold in widths such as 3.5" and 5.3".
  - Faces: cast acrylic, commonly .118" or .177", e.g. white 7328 or red 2793. Polycarbonate is used where higher impact strength is needed.
  - Trim cap: a flexible plastic molding over a metal core, sold in 3/4", 1" and 2" widths.
  - Backs: aluminium or aluminium composite panel (3 mm ACP sold as UL-listed sheet for letter backs).
  - Other parts: LED modules, a low-profile power supply, and wall pass-throughs for wiring [S56][S57]. **High** (supplier catalogue)
- **Trimless / fabricated metal letters.** Welded or soldered metal faces and returns. One maker uses .063" returns and an epoxy-bonded face [S57][S58]. **High**
- **Lighting styles.**
  - "Standard" = face-lit / front-lit.
  - "Reverse" = halo-lit / back-lit.
  - "Combination" = face and halo.
  - Open-face letters leave the light source exposed [S57][S83]. **High**
- **Halo-lit specifics.**
  - LEDs mount on a clear or translucent back.
  - Standoffs are typically about 1.5" (one maker's recommended default).
  - Typical halo letters are about 3.5" deep.
  - Too far from the wall blurs the halo; too close gives the light no room to spread.
  - Dark or rough walls, and steep viewing angles, reduce legibility. A face+halo combination is suggested in those cases [S45][S58]. **Medium–High**
- **Module spacing.** Current's guidelines tie maximum module spacing to can depth and letter stroke. Shallower cans need denser modules. Halo spacing is based on twice the can depth, because light travels to the wall and back. Modules exist for letters as shallow as about 1" [S50]. **High**
- **Mounting methods.**
  - Flush/direct mount: studs on each letter; a wire penetration per letter.
  - Raceway: one structure holds the letters and wiring, with fewer wall penetrations and easier servicing.
  - Backer/wireway panel: a combined backing and wire enclosure.
  - Standoffs: used for halo letters.
  - Detachable studs: let the face come off for service while the back stays on the wall [S46][S59]. **Medium–High**
  - Some landlord criteria **require** raceway mounting in a colour that matches the fascia [S83]. **High** (example)
- **Why listing matters.**
  - NEC 600.3 requires signs to be listed **regardless of voltage**. The only exception is skeleton tubing not attached to a sign body [S28].
  - UL 48 covers product safety; NEC Article 600 covers installation [S26].
  - UL marks may be applied **only at the manufacturer's facility**. Field labelling needs a UL Field Evaluation [S33].
  - Required markings: manufacturer, input volts and amps, and location suitability [S32][S33].
  - Other NRTLs also list to UL 48, including Intertek (ETL), CSA and TÜV [S29].
  - Inspectors look for the listing mark to confirm 600.3 [S33].
  - **High**
- **Durability note.** For sites within about 50 miles of the ocean, one fabricator recommends 316 stainless or anodized aluminium [S58]. **Medium** (single manufacturer)
- **Viewing distance / letter height (USSC).**
  - **Legibility Index (LI)** = feet of distance per inch of capital-letter height.
  - The average LI is **30**: 1" letters are readable at 30 ft; 10" letters at 300 ft.
  - All-caps text needs about 15% taller letters.
  - Example LI: black Clarendon on white = 31.
  - Formula: letter height (in) = viewer reaction distance (ft) ÷ LI.
  - Viewer reaction distance = mph × reaction time (s) × 1.47.
  - Reaction time rule of thumb: about 8 s (under 35 mph, simple roads), 10 s (complex roads), 11–12 s (high-speed multi-lane).
  - Congestion adjustments: moderate × 0.83 (30 → 25); high × 0.67 (30 → 20).
  - Keep negative space at 60% or more of a panel sign's area [S47][S48]. **High**
- **Wall signs parallel to the road.**
  - USSC uses an LI of about **10** (three times larger letters).
  - Equation: letter height (in) = (lanes × 10 + curb offset ft) ÷ 5. Example: 2 lanes, 20 ft offset → 8".
  - A parallel sign read at 500 ft needs about 50" capitals; a perpendicular sign at the same distance needs about 17".
  - In USSC's field study, drivers missed 30% of parallel signs, even though those signs were 2–3× larger [S47][S48]. **High**

### Needs manufacturer/owner verification

- Who fabricates The Glownique's channel letters.
- The UL 48 (or equivalent) listing: which NRTL, file number, wet-location marking.
- Can depth and stroke limits.
- Face and back materials.
- LED module brand and spacing.
- The power supply.
- Drain holes.
- Mounting options offered.
- Who installs.

### Misconceptions / claims to avoid

- **"UL-listed LEDs or power supply = UL-listed sign."** [S33][S28]
- **"Halo works on any wall."** [S45]
- **"The USSC rule is 1 inch per 10 feet."** USSC's average is LI 30 for perpendicular signs. LI 10 applies to parallel wall signs. Retail "best-impact" charts that use 10 ft per inch could not be traced to primary research. **Low**
- **"Bigger standoff = better halo."** Too far blurs it [S45].

### Conflicts / caveats

- Gemini's statement that trim-cap letters are less durable comes from a maker of trimless letters, i.e. an interested party [S57].
- A sign shop's claim that halo letters cost about 2× face-lit is one shop's view [S45]. **Low**

---

## 5. "Backlit" vs "halo-lit": how the industry uses the terms

### Safe to publish

- **Terminology is inconsistent in the trade.**
  - A major letter manufacturer equates "reverse" with "halo-lit or back-lit" [S57].
  - A trade magazine writes "halo-lit or backlit channel letters" [S45].
  - Current's catalogue lists "backlit halo letter" as an application [S50].
  - **High**
- **For lightboxes and posters,** "backlit" means light passing through a translucent graphic or face from behind or within: "backlit" or Duratrans lightboxes, "back-lit poster," "backlit SEG graphic" [S78][S60][S77]. **High**
- **USSC's neutral terms:** "internal" (source inside the cabinet or letter), "external" (source aimed at the face), and "exposed" (e.g., exposed neon) [S48]. **High**
- **Content recommendation (editorial, not a fact).** Define terms on each page. Use "halo-lit (reverse-lit)" for letters that glow onto the wall. Use "backlit lightbox" for translucent-face cabinets. Use "front-lit (face-lit)" for lit faces.

### Needs verification

- Which exact construction The Glownique means by each product name.

### Misconceptions

- Assuming "backlit" always means halo, or always means lightbox.

---

## 6. Lightboxes: edge-lit vs direct backlit; SEG vs snap-frame

### Safe to publish

- **Edge-lit (light guide) principle.**
  - LEDs feed light into the edge of an acrylic sheet.
  - Clear acrylic normally traps light by total internal reflection. Light-guide grades break that trap, using embedded diffuser particles (e.g., ACRYLITE LED) or an etched or laser-marked pattern on conventional panels, so light exits the face.
  - A white reflector behind gives single-sided output; reflective tape on the edge opposite the LEDs is recommended [S60][S78]. **High**
- **Build rules (ACRYLITE).**
  - Choose the grade by the illuminated area. Sheets run 4–10 mm thick.
  - Do not bond or laminate the graphic to the light guide; optical contact causes bright or dark patches.
  - Water droplets, fingerprints and scratches disrupt the light.
  - Curved panels should keep a radius of at least 6× the sheet thickness [S60]. **High**
- **Direct backlit cabinets** place LEDs behind the face in a deeper box. Example: one line lists backlit boxes at 3-3/4" and 5" deep, versus edge-lit boxes from about 1-3/4" [S78]. Current markets edge-mounted LED strips for shallow cabinet signs with 3–6" can depth [S50]. **Medium** (product examples)
- **Snap frames.** Hinged aluminium frame rails snap open so the poster or backlit film loads from the front [S78]. Example: Testrite SupraSlim is about 3/4" deep, perimeter-lit acrylic, 24 V, UL-listed, and takes Duratrans film up to 1/32" [S76]. **High** (for that product)
- **SEG (silicone edge graphic).**
  - A thin silicone strip (keder) is sewn around a printed fabric graphic and pressed into a groove in the frame. Tension gives a smooth, nearly frameless face. The fabric is lightweight and folds for shipping [S79]. **Medium**
  - Example: Testrite's slim SEG box is 3-1/8" deep, edge-lit, UL-certified, and a reflective backer is recommended [S77]. **High** (for that product)
- **Depth ranges seen in the market (product examples, not a standard):**
  - About 3/4" (edge-lit snap frame)
  - About 1-3/4" (edge-lit)
  - About 3" (edge-lit SEG)
  - 3-3/4" to 5"+ (direct backlit)
  - Sources: [S76][S77][S78]. **Medium**
- **Applications:** menu boards, retail and point-of-purchase, airports, banks, hospitals, trade shows [S60][S77][S79]. **Medium**

### Needs verification

- For The Glownique's lightboxes: depth, light-guide type, LED density and wattage, graphic type, UL or ETL listing, and indoor or outdoor rating.

### Misconceptions

- "Slim = ADA-compliant anywhere." See §10.
- "Any fabric works in SEG." It needs a keder edge and backlit-grade fabric; **Low** detail.
- "50,000 hours = 11 years maintenance-free." Marketing arithmetic [S78].

---

## 7. UV printing on acrylic

### Safe to publish

- **How UV inks cure.** UV-curable ink sets and bonds immediately under UV light, so prints come out dry. It works on non-absorbent materials such as plastic, glass and metal. LED-UV curing runs cool enough for heat-sensitive substrates such as acrylic [S71][S74]. **High**
- **White ink layer order (Roland).**
  - "W-4C": white printed as a base under the colour.
  - "4C-W": white printed over the colour, mainly for **reverse printing on transparent media**.
  - Primer can go under everything for adhesion [S73]. **High**
- **Second-surface (reverse) printing.** The artwork is mirrored, printed on the back of the clear sheet, and viewed through the front. A white backing adds opacity. A printer distributor says this protects the print from scratches and wear [S75]. **High** for the process / **Medium** for the protection claim.
- **Adhesion (ACRYLITE).** Standard acrylic may need a primer. Purpose-made digital-print acrylic has a co-extruded ink-receptive layer that passes the ASTM D3359 cross-hatch adhesion test. Flame-polishing after printing is not recommended, and thermoforming may crack the ink. Backlighting a printed panel is possible; results depend on ink density, number of layers and flood coats [S65]. **High**
- **Durability.**
  - Mimaki: "hard" UV inks have very little weather resistance. Rain can get under the ink and lift it. Laminating hard-ink prints is not recommended (the ink cracks). Flexible inks resist weather better. Unlaminated prints soil and discolour easily. Results vary by material and site [S72]. **High**
  - Roland: its ECO-UV ink lasts up to about **two years outdoors** when a gloss finish is applied [S74]. **High**
  - For comparison, a translucent sign vinyl is sold with up to 9 years' outdoor durability [S56]. **Medium**
- **UV-filtering acrylic exists.** Example: ACRYLITE OP3 is marketed as blocking nearly all UV at 390 nm [S66]. A polycarbonate maker argues that glass and acrylic must be specially treated to block UV [S67] (interested party). **Medium**
- **Indoor lifetime numbers for UV-printed acrylic: not found.**

### Needs verification

- The printer and ink series (hard or flexible).
- Primer use.
- First- or second-surface printing.
- The number of white layers.
- Any clear coat or laminate.
- The acrylic grade (digital-print or UV-filtering).
- Any outdoor warranty.

### Misconceptions

- **"UV ink = UV-resistant."** "UV" refers to how the ink cures.
- **"Second-surface = fade-proof."** Only if the sheet filters UV, and even then there is no guarantee.
- **"UV-printed acrylic lasts years outdoors."** Manufacturer figures are about 2 years with a protective finish [S74].

---

## 8. Acrylic (PMMA) vs polycarbonate vs aluminium or stainless

### Safe to publish

- **Cast vs extruded acrylic.**
  - Cast sheet is made one sheet at a time between glass plates. Extruded sheet is made continuously from lower-molecular-weight polymer [S62]. **High**
  - A sign distributor says cast machines and routes more cleanly and resists chemicals and solvents better. It prefers cast for push-through letters of 1/2" and thicker. Extruded is suited to thermoforming and general signs [S69]. **Medium**
  - Extruded is cheaper and cuts faster on a laser [S70]. **Medium**
- **Acrylic vs glass (ACRYLITE).**
  - 10–20× the impact strength of ordinary plate glass, similar to tempered glass.
  - If it breaks, it cracks into large pieces with edges much less sharp than broken glass.
  - Half the weight of glass.
  - Less stiff; expands about 8× more with temperature.
  - Scratches more easily; many glass cleaners are unsuitable [S61]. **High**
- **Acrylic outdoors.** ACRYLITE calls its acrylic naturally UV-stable and warrants several clear products against yellowing for 30 years [S63]. Impact-modified sign-grade acrylic is marketed at about 20× the impact strength of standard acrylic, with good weatherability [S64]. **High** (manufacturer claims)
- **Polycarbonate.**
  - Much higher impact strength than acrylic [S56]; marketed as "virtually unbreakable" [S68].
  - It absorbs UV, so it yellows and eventually degrades unless protected by a UV cap layer. Install the protected side facing the sun [S67].
  - Example: clear PALSUN polycarbonate carries a 10-year warranty against yellowing and breakage, meets UL 879 and is listed in UL's Sign Components Manual [S68].
  - **High** (manufacturer)
- **UL angle.** A plastic sign face that also serves as the enclosure must be listed as suitable for that purpose [S28]. **High**
- **Metals.**
  - Common aluminium sheet thicknesses are .040" and .063", and ACP is 3 mm [S56].
  - One fabricator uses 24-gauge or .063" returns [S58].
  - Near the coast, the same fabricator recommends 316 stainless or anodized aluminium [S58].
  - **Medium–High**
- **Thickness conventions (US signage).**
  - Sign faces: 1/8" (.118") and 3/16" (.177") [S56].
  - UV-filtering sheet sizes: 2.5, 3, 4.5 and 6 mm [S66].
  - Edge-lit light guides: 4–10 mm [S60].
  - **High**

### Needs verification

- The Glownique's backboard: brand, cast or extruded, thickness, whether a UV-filtering grade, whether impact-modified.
- If polycarbonate: which side carries UV protection.
- Outdoor warranties.

### Misconceptions

- "Acrylic is shatterproof or unbreakable."
- "Polycarbonate never yellows."
- "Cast is always better" (it depends on the job).

### Conflicts flagged

- **Laser edge quality:** one laser maker says cast gives smoother, flame-polished laser edges [S70]. Other trade content says the opposite. Verify with your own laser tests. **Low**
- **ACRYLITE's own wording:** it markets OP3 as "Shatterproof" [S66] while stating elsewhere that acrylic breaks into large pieces [S61].

---

## 9. Electrical and installation (US)

### Safe to publish

- **Two standards apply.** UL 48 covers sign product safety; NEC Article 600 covers installation [S26]. The NEC is not federal law. States and cities adopt it, sometimes with changes, and editions differ by jurisdiction [S27]. Contact the local authority having jurisdiction (AHJ) before applying for permits [S43]. **High**
- **Listing.** Signs, section signs and outline lighting (fixed, mobile or portable) must be listed **regardless of voltage** (600.3) [S28]. **High**
- **Markings.** The 2020 text requires a listed and labelled sign, the manufacturer's identity, and input voltage and current (600.4). The 2026 NEC trimmed 600.4 to avoid duplicating UL 48 and UL 879A. Commentary on the 2026 edition says the listing requirement now sits in 600.2 [S35][S38]. **High** (content) / **verify** (numbering)
- **Branch circuit.** Each commercial building and commercial occupancy accessible to pedestrians needs at least one sign outlet at each entrance to each tenant space. It must be on a 20 A or larger branch circuit that supplies nothing else (600.5(A), 2020 text) [S35]. **High**
- **Disconnect (600.6).**
  - An externally operable switch or breaker must open all ungrounded conductors and control no other load.
  - It must be within sight of the sign, or be lockable.
  - Since the 2014 NEC, a disconnect is also required where the circuit enters the sign enclosure or pole.
  - The 2020 NEC added marking rules for remote disconnects, for first responders [S28][S36][S37]. **High**
- **Plug-in exception.** Federal OSHA rules (29 CFR 1910.306) require the same disconnect but exempt **cord-connected signs with an attachment plug** and indoor exit directional signs [S17]. **High**
- **Portable signs.** They must be listed. A portable sign is one under about 50 lb with a removable mounting. Portable or mobile signs in damp or wet locations need factory-installed GFCI [S28]. **High**
- **Class 2 / low voltage.**
  - Class 2 power sources for signs must be listed for sign use, or be a component of a listed sign (600.24(A)). UL-recognized Class 2 sources appear in UL's Sign Component Manual [S28].
  - Class 2 maxima are 30 V rms, 42.4 V peak and 60 V DC [S34].
  - A 24 VDC Class 2 source is limited to 100 W. UL 1310 is the test standard for plug-in and cord-connected Class 2 units [S81].
  - Class 2 circuits limit fire risk and provide acceptable shock protection. The supply side is mains wiring and follows NEC Chapter 3 [S81][S28].
  - LED sign secondary wiring follows 600.33; in wet locations the cable must be wet-rated [S32].
  - **High**
- **Location rules.** Signs must be at least 14 ft above areas vehicles can reach unless protected. Pedestrian-reachable neon must be protected [S28]. **High**
- **Who installs: examples, which vary by jurisdiction.**
  - **Seattle:** a sign permit is needed for signs over 5 sq ft or with any electrical connection. Electrical signs must be installed by a licensed electrical contractor unless the owner installs them [S22].
  - **New York City:**
    - Signs smaller than 6 sq ft that are not illuminated (or are painted) need no permit.
    - Any electrical connection needs a separate electrical work permit, filed by a licensed electrician.
    - A licensed sign hanger must perform or supervise installation, with some exemptions.
    - Illuminated signs that project beyond the building line may need an annual permit [S23].
  - **California:** the C-45 Sign Contractor licence covers fabricating, installing and wiring electrical signs [S24].
  - **High**
- **Permits generally.** Most communities require a permit for a new sign. Review may be administrative (does it meet the code?) or design-based (aesthetics). Variances are sometimes possible [S30]. **High**
- **Landlord criteria (example from a shopping-centre operator).**
  - Shop drawings approved by the landlord, in writing, before the permit application.
  - Landlord-approved vendors, with insurance.
  - UL-labelled components, with the label hidden from customers.
  - Access to transformers and disconnects.
  - Raceway mounting.
  - Exposed neon and open-face neon letters prohibited [S83]. **High** (example)
  - Leases also commonly require removing signs and repairing the façade at lease end [S84]. **Medium**
- **California energy code (commercial).**
  - Indoor signs need automatic time-switch control.
  - Outdoor signs need time-switch plus photosensor (or astronomical) control, and ≥65% night dimming if they also run by day.
  - Internally lit signs are limited to 12 W/ft²; externally lit to 2.3 W/ft². Alternatively, LED power supplies must be at least 80% efficient.
  - These are the 2022-code rules. The 2025 code applies to permits filed from January 1, 2026 [S18][S25]. **High**

### Needs verification

- Which products are plug-in and which are hardwired.
- The power-supply listing (Class 2, UL 1310 or UL 8750).
- Whether finished signs are listed (NRTL file number).
- Whether outdoor plug-in versions have GFCI.
- Installation instructions supplied with permanently connected signs, which UL 48 requires [S32].
- For each project: the local NEC edition, installer licensing, and landlord criteria.

### Misconceptions

- "Low voltage means no listing or permit."
- "A UL adapter makes the sign UL-listed."
- "Any handyman can hardwire an exterior sign."
- "An indoor plug-in sign can go outdoors on an extension cord."

---

## 10. ADA: protruding objects and when sign rules apply

### Safe to publish

- **§307.2 (text verified on access-board.gov).**
  - Objects whose leading edges are more than 27" and no more than 80" above the finish floor or ground "shall protrude 4 inches (100 mm) maximum horizontally into the circulation path" [S1].
  - Exception: handrails may protrude 4½" [S1].
  - §307.3: post- or pylon-mounted objects may overhang up to 12" between 27" and 80" [S1].
  - §307.4: vertical clearance must be 80" minimum [S1].
  - §307.5: protruding objects may not reduce required clear width [S1].
  - **High**
- **Scope.** §204.1 applies §307 to protruding objects on circulation paths [S2]. This covers **all** circulation paths, not just accessible routes. Objects within cane-sweep height (27" or less) or above 80" can protrude any amount [S4]. **High**
- **§216.1 exceptions.** Building directories, menus, seat and row designations, occupant names, building addresses, and **company names and logos** are exempt from §216's sign requirements. So are temporary signs posted for 7 days or less [S2]. **High**
- **When §703 does apply.**
  - Signs identifying permanent rooms and spaces (§216.2) must meet §703.1, 703.2 and 703.5: tactile characters, braille and visual characters.
  - Directional and informational signs about interior spaces (§216.3) must meet §703.5 [S2].
  - §703.5 requires a non-glare finish with contrast, and conventional characters: no italic, script or highly decorative styles [S3].
  - **High**
- **Implication (derived).**
  - A decorative neon sign or logo is generally outside §216/§703. It is still subject to §307 if wall-mounted in a circulation path between 27" and 80".
  - A neon-script "Restrooms" sign cannot serve as the required room-ID or directional sign. It fails the §703.5 character rules, and room IDs also need tactile characters and braille.
  - A backlit lightbox 3-3/4"–5" deep [S78] mounted at 27–80" in a corridor would exceed 4".

### Needs verification

- For each installation: mounting height and projection, and whether the sign serves as a room-ID or directional sign.
- Stricter state or local accessibility codes may apply. Not researched.

### Misconceptions

- "ADA requires braille on every sign."
- "ADA never applies to decorative signs." §307 still does.
- "The 4-inch rule applies at any height." It applies only between 27" and 80".

---

## 11. Implications for The Glownique's current claims

Applies to all six claims. The FTC requires a reasonable basis (objective evidence) *before* a claim is published. Safety claims generally need competent and reliable scientific evidence. Customer testimonials and money-back guarantees are not substitutes [S15]. The FTC's court win against an LED maker over lifetime claims shows these claims are enforced [S16].

### 11.1 "12V safety"

- **Verdict: supportable only with qualification.**
- **What the evidence supports:**
  - 12 V DC is well under Class 2 maxima (60 V DC) [S34].
  - Class 2 sources limit fire risk and give acceptable shock protection [S81].
  - Glass neon runs on transformers of up to about 15,000 V [S39]. An early utility-program document made the same comparison [S20].
- **What it does not support:**
  - A "12 V" label is not the same as a listed Class 2 source [S81][S28].
  - The adapter still plugs into mains voltage [S28][S49].
  - Outdoor portable signs need factory GFCI [S28].
  - The sign itself must be listed regardless of voltage [S28].
- **How to qualify:** "Runs on low-voltage 12 V DC from a [listed Class 2] power supply; far lower voltage than glass neon's high-voltage transformers." Include indoor/outdoor use limits.
- **Evidence the owner must supply:**
  - The adapter model and NRTL certificate (UL 1310 or UL 8750, marked Class 2), plus its rated location.
  - Any listing of the finished sign (NRTL and file number).
  - Outdoor versions: wet or GFCI provisions.
- **Avoid:** "completely safe," "no shock risk," "safe for kids to handle," "UL-certified" (unless the sign itself is listed).

### 11.2 "Cool to touch"

- **Verdict: not supportable as an absolute. Supportable only with the owner's own measurements.**
- **Why:**
  - LEDs emit little infrared, but most of their input power becomes heat that must be conducted away. DOE (2007) put it at 75–85% [S14]. Heat reduces output, shifts colour and shortens life [S14][S11].
  - LED-neon datasheets set temperature limits. One lists a "Max. Surface" of 85 °C (185 °F) without defining it [S54].
  - Low watts per foot (see 1C) suggests modest temperatures, but that is an inference, not a measurement.
  - Authoritative numbers for glass-neon tube temperatures: **not found**. Neon transformers do run warm, and UL sets their temperature limits [S40].
- **How to qualify:** "Low-heat LED; surface measured at __ °C after __ h at __ °C room temperature." Or a comparative "runs far cooler than glass neon's electrodes and transformers," but only with test data.
- **Evidence the owner must supply:** thermocouple or IR surface readings on the strip, backboard and adapter at steady state and at the highest rated ambient, with the method documented.
- **Avoid:** "no heat," "never gets warm," "cool to the touch" without conditions.

### 11.3 "Up to 100,000 hours"

- **Verdict: not supportable as currently phrased.**
- **Why:**
  - DOE flags 100,000-hour defaults as historically unsupported, and says system life cannot exceed the shortest-lived component [S10].
  - The TM-21 6× rule means about 16,700 h of LM-80 data would be needed, and even then only for package lumen maintenance [S12].
  - Drivers and power supplies are the leading observed failure point [S11].
  - Ratings fall at higher temperatures [S54].
  - Major sign-LED suppliers claim ">50,000 hours" and back it with 5–10-year warranties [S50][S51].
- **How to qualify:** "LEDs rated L70 ≥ __ h at __ °C per the supplier's LM-80/TM-21 data; power supply rated __ h at __ °C; __-year warranty." Or lead with the warranty in years.
- **Evidence the owner must supply:** the LM-80 report and TM-21 calculation for the LED package used; the in-sign LED temperature; the driver lifetime at operating temperature; warranty terms.
- **Avoid:** "lasts 100,000 hours," "lifetime," "maintenance-free for 11 years."

### 11.4 "Up to 80% less power than glass neon"

- **Verdict: only supportable against a specific, documented baseline.**
- **Why:**
  - Published figures give 57–85% savings against older magnetic-transformer neon (8.5–11 W/ft).
  - Against electronic-transformer neon (3.5–4 W/ft) the range is from about 5% *more* to 60% less (derived, 1C).
  - Watts per foot ignores brightness [S41][S42].
  - The "60–90%" figures trace to an early program estimate [S20].
- **How to qualify:**
  - "Our __-in sign draws __ W (measured at the plug)."
  - "Typical LED neon: about 1.6–3.7 W per foot vs about 3.5–11 W/ft for glass neon, depending on transformer and colour" [S19][S20][S41][S49][S51].
  - Or use "a fraction of the power" backed by a like-for-like test.
- **Evidence the owner must supply:** power-meter readings (real watts, not VA) for its signs, and a documented glass-neon comparison of the same design, length and colour, ideally at matched brightness.
- **Avoid:** an unqualified "80% less."

### 11.5 "IP67 outdoor"

- **Verdict: misleading unless the whole assembly is tested and the other outdoor factors are addressed.**
- **Why:**
  - IP67 is temporary immersion only. It does not cover water jets unless dual-coded [S7][S8].
  - It is usually a rating of the strip alone. Suppliers condition it on rated accessories [S54].
  - Field assemblies are limited by their weakest part, and IP is not a US enclosure type [S9].
  - US outdoor signs use UL wet-location markings [S32][S33].
  - Outdoor portable signs need GFCI [S28].
  - PVC jackets discolour under UV [S82].
  - Adapters are often indoor-only.
- **How to qualify:** "LED neon strip rated IP67 (component). Outdoor use requires our outdoor package: sealed ends, outdoor-rated power supply, wet-rated wiring, [GFCI]." Separately state whether the finished sign is listed "Suitable for Wet Locations."
- **Evidence the owner must supply:**
  - An IP67 (or IP66/IP67) test report on the assembled sign from an accredited lab.
  - Power-supply and connector ratings.
  - UV data for the jacket material.
  - Any wet-location listing.
  - An outdoor warranty.
- **Avoid:** "waterproof," "IP67 sign" when only the strip is tested, "safe in any weather."

### 11.6 "Shatterproof"

- **Verdict: not accurate for the whole sign. "Shatter-resistant" or "no glass tubes" is supportable.**
- **Why:**
  - LED neon has no glass tubes, and sign suppliers market it as impact-resistant [S50][S44].
  - Acrylic backboards are 10–20× tougher than plate glass but **can break**, into large pieces [S61].
  - Polycarbonate is far tougher but still marketed with warranty terms, not as unbreakable [S68].
- **How to qualify:** "No glass tubes. Flexible LED neon on a __-mm acrylic backboard, which is far more impact-resistant than glass."
- **Evidence the owner must supply:** backboard material spec (type, thickness, grade); any drop or impact test; shipping-damage records.
- **Avoid:** "shatterproof," "unbreakable," "indestructible."

---

## 12. Not found / open items

- Authoritative steady-state surface temperatures for glass-neon tubes or electrodes.
- A recent standards-body or government test of LED neon vs glass neon at equal brightness.
- Indoor lightfastness figures for UV-printed acrylic.
- The text of TM-21-21 and LM-80-21 (paywalled); rule details verified only for TM-21-11.
- The full text of NEC 2026 Article 600 and of UL 48 (login or paywall); secondary sources used.
- The IEC 60529 full text (paywalled; live IEC page blocked automated access, so an archived snapshot was used).
- ISA's state-by-state NEC adoption table (an image; not captured).
- Agfa's UV-ink outdoor durability page (behind a CAPTCHA; not used).
- A primary source for the retail "1 inch per 10 feet, best impact" charts.
- Glass-neon W/ft figures from a utility technical reference manual (searched; not located).

---

## Source register

All accessed 2026-09-24. Type: Std = standard or standards body · Gov = government · Ind = industry association or code-education body · Trade = trade press · Mfr = manufacturer · Dist = distributor · Acad = academic · Sec = secondary summary.

| Key | Title | Publisher / author (date) | URL | Type |
|---|---|---|---|---|
| S1 | ADA Standards, Ch. 3 Building Blocks (§307) | U.S. Access Board | https://www.access-board.gov/ada/chapter/ch03/ | Gov |
| S2 | ADA Standards, Ch. 2 Scoping (§204, §216) | U.S. Access Board | https://www.access-board.gov/ada/chapter/ch02/ | Gov |
| S3 | ADA Standards, Ch. 7 Communication Elements (§703) | U.S. Access Board | https://www.access-board.gov/ada/chapter/ch07/ | Gov |
| S4 | Guide to the ADA Standards: Protruding Objects | U.S. Access Board | https://www.access-board.gov/files/ada/guides/protruding-objects.pdf | Gov |
| S5 | Ingress Protection (IP) ratings | IEC (archived snapshot 2026-08-14) | https://www.iec.ch/ip-ratings (archived: http://web.archive.org/web/20260814150234/https://iec.ch/ip-ratings) | Std |
| S6 | IP code | Wikipedia | https://en.wikipedia.org/wiki/IP_code | Sec |
| S7 | IPX5 & IPX6 Water Jet Testing | Castle Compliance (test lab) | https://castle-compliance.com/ipx5-ipx6-water-jet-testing/ | Ind/Lab |
| S8 | IPX7 & IPX8 Immersion Testing | Castle Compliance (test lab) | https://castle-compliance.com/ipx7-ipx8-immersion-testing/ | Ind/Lab |
| S9 | NEMA FAQs: Enclosures | NEMA (2021) | https://www.nema.org/docs/default-source/standards-document-library/faq-enclosures.pdf?sfvrsn=56e20547_6 | Std |
| S10 | Lifetime and Reliability (SSL fact sheet, PNNL-SA-97534) | U.S. DOE / PNNL (Aug 2013) | https://www1.eere.energy.gov/buildings/publications/pdfs/ssl/life-reliability_fact-sheet.pdf | Gov |
| S11 | LED Luminaire Lifetime: Recommendations for Testing and Reporting, 3rd ed. | NGLIA LED Systems Reliability Consortium / U.S. DOE (Sept 2014) | https://www.energy.gov/sites/prod/files/2015/01/f19/led_luminaire_lifetime_guide_sept2014.pdf | Gov/Ind |
| S12 | IES TM-21-11 Overview, History and Q&A | C. Miller, NIST, for EPA ENERGY STAR (Oct 24, 2011) | https://www.energystar.gov/sites/default/files/specs/TM-21%20Discussion_0.pdf | Gov |
| S13 | ANSI/IES TM-21-21; ANSI/IES LM-80-20 and LM-80-21 (catalogue listings, seen in search results; site blocked automated access) | ANSI Webstore | https://webstore.ansi.org/standards/iesna/ansiiestm21 · https://webstore.ansi.org/standards/iesna/ansiieslm8020 · https://webstore.ansi.org/standards/iesna/ansiieslm8021 | Std (listing) |
| S14 | Thermal Management of White LEDs (fact sheet) | U.S. DOE (2007) | https://www1.eere.energy.gov/buildings/publications/pdfs/ssl/thermal_led_feb07_2.pdf | Gov |
| S15 | Advertising FAQ's: A Guide for Small Business | U.S. FTC | https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business | Gov |
| S16 | FTC Action Leads to Court Order Barring Misleading Light Bulb Claims | U.S. FTC (Feb 2014) | https://www.ftc.gov/news-events/news/press-releases/2014/02/ftc-action-leads-court-order-barring-misleading-light-bulb-claims | Gov |
| S17 | 29 CFR 1910.306(a), Electric signs and outline lighting | OSHA via eCFR | https://www.ecfr.gov/current/title-29/section-1910.306 | Gov |
| S18 | 2022 Energy Code: Nonresidential Sign Lighting Requirements | California Energy Commission (Mar 2024) | https://www.energy.ca.gov/sites/default/files/2025-07/2022%20Nonresidential%20Sign%20Lighting%202023-04-24_ada.pdf | Gov |
| S19 | 2008 Title 24 Rulemaking, Draft Report: Requirements for Signs (CASE) | PG&E for CEC (Feb 2007) | https://efiling.energy.ca.gov/GetDocument.aspx?tn=46126 | Gov-filed |
| S20 | Proposal to CPUC: Solid-State Signs Program | Ecos Consulting (Sept 23, 2003) | https://files.cpuc.ca.gov/eep/EcosConsulting/ecos_solid_state_signs_proposal_final0.pdf | Gov-filed |
| S21 | Preservation Brief 25: The Preservation of Historic Signs | National Park Service, M. J. Auer | https://www.nps.gov/orgs/1739/upload/preservation-brief-25-signs.pdf | Gov |
| S22 | Sign, Awning, & Billboard Permit | Seattle Dept. of Construction & Inspections | https://www.seattle.gov/sdci/permits/permits-we-issue-(a-z)/sign-awning-and-billboard-permit | Gov |
| S23 | Sign Permit Requirements | NYC Dept. of Buildings | https://www.nyc.gov/site/buildings/safety/sign-permit-reqs.page | Gov |
| S24 | C-45 Sign Contractor classification | California CSLB | https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C45 | Gov |
| S25 | 2025 Building Energy Efficiency Standards | California Energy Commission | https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-standards/2025-building-energy-efficiency | Gov |
| S26 | UL 48 Standard for Electric Signs | International Sign Association | https://signs.org/codes-regulations/technical-codes-and-standards/ul-48-standard-for-electric-signs/ | Ind |
| S27 | National Electric Code | International Sign Association | https://signs.org/codes-regulations/technical-codes-and-standards/national-electric-code/ | Ind |
| S28 | Guidelines for Application of 2011 NEC Changes in Electric Sign Requirements | International Sign Association (2012) | http://nxt-live-books.s3.amazonaws.com/pub/nxtbooks/csg/isa_2011nec_guidelines/offline/csg_isa_2011nec_guidelines.pdf | Ind |
| S29 | Nationally Recognized Testing Laboratories | International Sign Association | https://signs.org/codes-regulations/technical-codes-and-standards/nationally-recognized-testing-laboratories/ | Ind |
| S30 | Permitting Resources | International Sign Association | https://signs.org/codes-regulations/expert-assistance/permit/ | Ind |
| S31 | Mercury Lamp Handling & Disposal | International Sign Association | https://signs.org/codes-regulations/federal-regulations/mercury-issues/mercury-lamp-handling-disposal/ | Ind |
| S32 | Listed Signs: Markings and Installation Instructions (The Code Authority) | UL (July 2012) | https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/Electrical-Connections-Issue-3-2012.pdf | Std |
| S33 | Listed Signs: Identifying UL Certification and Proper Use | UL (Fall 2014) | https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/UL-TCAEC-2014-Fall-v3.pdf | Std |
| S34 | Protection from Electrical Hazards (FAQ) | UL Solutions | https://www.ul.com/resources/protection-electrical-hazards | Std |
| S35 | 2020 NEC Significant Code Changes, Part 4 (reproduces NEC text) | Ezekiel Enterprises / EZ-pdh (Dec 2019) | https://cdn.ez-pdh.com/course-material/2020-NEC-Significant-Code-Changes-Part-4.pdf | Ind (CE) |
| S36 | 600.6(A) Sign Disconnecting Means Location (2014 change); 600.6(A) Location (2017 change) | ElectricalLicenseRenewal.com | https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=89.0 · …sectionID=361 | Ind (CE) |
| S37 | 600.6(A)(4) Disconnect: Remote Location (2020 change) | ElectricalLicenseRenewal.com | https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=950 | Ind (CE) |
| S38 | 600.4 Sign Markings (2026 NEC change; updated 01/19/26) | ElectricalLicenseRenewal.com | https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1966 | Ind (CE) |
| S39 | Determining Proper Loading for Neon Sign Transformers | IAEI Magazine (Jan 2000) | https://iaeimagazine.org/2000/2000january/determining-proper-loading-for-neon-sign-transformers/ | Ind |
| S40 | FAQ: Neon Transformers (FRANCE-brand transformer literature, hosted by neon-lighting.com) | FRANCE/neon-lighting.com | https://www.neon-lighting.com/wp-content/uploads/2020/09/FAQ-Neon-Transformers.pdf | Mfr |
| S41 | Dispelling the "Inefficient Neon" Myth | B. Diffin, EGL Company (2005–06; hosted by neon-lighting.com) | https://www.neon-lighting.com/wp-content/uploads/2020/09/LED-Vs-NEON-neonefficiency1.pdf | Mfr (interested party) |
| S42 | A Channel-Letter Comparison | Signs of the Times, K. Greenberg (Feb 13, 2006) | https://signsofthetimes.com/a-channel-letter-comparison/ | Trade |
| S43 | Code 600 | Signs of the Times, M. Thielen (Feb 14, 2006) | https://signsofthetimes.com/code-600/ | Trade |
| S44 | Neon vs. LED: Which Is Better Where? | Signs of the Times, R. Roenker (Feb 20, 2023) | https://signsofthetimes.com/neon-vs-led-which-is-better-where/ | Trade |
| S45 | Hello Halo: A Deeper Look at Halo-Lit Channel Letters | GRAPHICS PRO (May 24, 2019) | https://graphics-pro.com/feature/hello-halo-a-deeper-look-at-halo-lit-channel-letters/ | Trade |
| S46 | Behind the Letter: Raceways' Roles in Channel Letter Projects | GRAPHICS PRO (Jan 27, 2020) | https://graphics-pro.com/feature/behind-the-letter-raceways-roles-in-channel-letter-projects/ | Trade |
| S47 | Sign Legibility Rules of Thumb | United States Sign Council, A. Bertucci (2006) | https://files.secure.website/wscfus/7691102/uploads/USSC_Sign_Legibility_Rules_of_Thumb.pdf | Ind |
| S48 | Best Practice Standards for On-Premise Signs | USSC Foundation, Bertucci & Crawford (2018 PDF) | https://usscfoundation.org/wp-content/uploads/2018/03/USSC-Guideline-Standards-for-On-Premise-Signs-2018.pdf | Ind |
| S49 | Tetra Contour Gen 2 Spec Sheet (SIGN309, Rev 11/07/24) | Current Lighting Solutions (GE licensee) | https://cdn.currentlighting.com/site/specsheet/SIGN309-Tetra-Contour-Gen2-Spec-Sheet.pdf | Mfr |
| S50 | Tetra LED Signage Lighting Systems Catalog 2024 (SIGN120) | Current Lighting Solutions | https://cdn.currentlighting.com/site/brochure/SIGN120-Signage-Catalog.pdf | Mfr |
| S51 | Street Wrap Flex Side-Bend Spec Sheet (Rev B, 2025-10-01) | SloanLED | https://sloanled.com/downloads/street-wrap-flex-side-bend-spec-sheet-global.pdf | Mfr |
| S52 | FlexiBRITE (discontinued) product page and product list | SloanLED | https://sloanled.com/collection/signage/border-tubing-accent-signage/flexibrite-signage/ | Mfr |
| S53 | Product Comparison Charts: Silicone and PVC (2019) | GLLS / LED Neon Flex | https://ledneonflex.com/wp-content/uploads/2019/07/Product-Comparison-Chart-Silicone.pdf · https://ledneonflex.com/wp-content/uploads/2019/07/Product-Comparison-Chart-PVC.pdf | Mfr |
| S54 | Vivid Contour Silicone 12V Static spec (v6.0, 04/15/2022) | GLLS | https://assets-global.website-files.com/6526c8266f9d6acac8ef145f/654d279ad1a1e45a2d6af395_Vivid-Contour-Silicone-12V-Static.pdf | Mfr |
| S55 | Vivid S160 PVC 120V UL2388 Static spec | GLLS | https://assets-global.website-files.com/6526c8266f9d6acac8ef145f/654d2768e4d1c7acb17137bf_Vivid-S160-PVC-120V-UL2388-Static.pdf | Mfr |
| S56 | Channel Letter Resource Guide | N. Glantz & Son | https://online.nglantz.com/view/97657225 | Dist |
| S57 | What are Channel Letters? And What's the Difference Between Gemini's Fabricated Metal Letters? | Gemini Product Guide (page dated Sept 9, 2026) | https://hub.geminimade.com/knowledge/channel-letters-vs-fabricated-metal-letters | Mfr |
| S58 | Lit Fabricated Metal Halo Lit: Specifications, Mounting, and Installation | Gemini Product Guide | https://hub.geminimade.com/knowledge/fabricated-metal-halo-lit-product-specifications | Mfr |
| S59 | Mounting Hardware: The Foundation Behind Every Sign | Gemini Product Guide | https://hub.geminimade.com/knowledge/mounting-hardware-the-foundation-behind-every-sign | Mfr |
| S60 | ACRYLITE LED light guiding edge lit, Technical Information 3735D (09/24) | ACRYLITE (Röhm/POLYVANTIS) | https://www.acrylite.co/files/content/acrylite.co/documents/product-information/ACRYLITE-LED-light-guiding-edge-lit-Technical-Information.pdf | Mfr |
| S61 | Acrylic vs Glass | ACRYLITE knowledge base | https://www.acrylite.co/resources/knowledge-base/article/properties?category=acrylic-vs-glass | Mfr |
| S62 | What is the difference between cast and extruded acrylic sheet? | ACRYLITE knowledge base | https://www.acrylite.co/resources/knowledge-base/article/what-is-the-difference-between-cast-and-extruded-acrylic-sheet?category=product-properties | Mfr |
| S63 | Why doesn't ACRYLITE acrylic sheet yellow? | ACRYLITE knowledge base | https://www.acrylite.co/resources/knowledge-base/article/why-doesn-t-acrylite-acrylic-sheet-yellow?category=product-properties | Mfr |
| S64 | ACRYLITE LED sign grade sheet | ACRYLITE | https://www.acrylite.co/products/brands/acrylite-led/sign-grade | Mfr |
| S65 | ACRYLITE digital print (FAQ) | ACRYLITE | https://www.acrylite.co/resources/faq/acrylite-digital-print | Mfr |
| S66 | ACRYLITE Gallery UV filtering (OP3) Technical Information 1682E (07/24) | ACRYLITE | https://www.acrylite.co/files/content/acrylite.co/documents/product-information/ACRYLITE-Gallery-UV-filtering-OP3-technical-information.pdf | Mfr |
| S67 | Polycarbonate and Protection from UV Radiation | Palram (Aug 5, 2021) | https://www.palram.com/blog/construction-architecture/polycarbonate-and-protection-from-uv-radiation/ | Mfr |
| S68 | PALSUN CS polycarbonate | Palram | https://www.palram.com/us/product/palsun-cs/ | Mfr |
| S69 | Understanding the Differences between Cast and Extruded Acrylic | Grimco | https://connect.grimco.com/blog/differences-between-cast-and-extruded | Dist |
| S70 | Cast vs. Extruded Acrylic (laser cutting) | OMTech | https://omtech.com/blogs/knowledge/cast-vs-extruded-acrylic | Mfr (equipment) |
| S71 | UV-curable ink | Mimaki | https://mimaki.com/supply/ink/uv-curable.html | Mfr |
| S72 | How about the weather resistance for UV ink? (FAQ) | Mimaki | https://mimaki.com/support/faq/ink/entry-58452.html | Mfr |
| S73 | IU-1000F Special Color Ink Guide (Basic Edition) | Roland DG (2020) | https://downloadcenter.rolanddg.com/contents/manuals/IU-1000F_USE4_EN_R1.pdf | Mfr |
| S74 | ECO-UV Ink Features | Roland DG (Europe) | https://www.rolanddg.eu/en/products/inks/eco-uv-inks/features | Mfr |
| S75 | Second Surface Printing with a Flatbed UV Printer | ColDesi (Jan 3, 2025) | https://coldesi.com/uv-printers/second-surface-printing-with-a-flatbed-uv-printer/ | Dist |
| S76 | SupraSlim LED SnapFrame Light Boxes | Testrite Visual | https://www.testrite.com/products/aluminum-snap-frames/wall-mount-hanging/supraslim-light-boxes/supraslim-led-snapframe-light-boxes/ | Mfr |
| S77 | Charisma SEG/LED Slim Profile Light Boxes | Testrite Visual | https://www.testrite.com/products/hanging-graphic-hardware/frames/charisma-segled-slim-profile-light-boxes/charisma-segled-slim-profile-light-boxes/ | Mfr |
| S78 | Snap Frame Lightboxes: LED Edgelit and Backlit | Swingframe | https://www.swingframe.com/swingsnap_lightboxes.htm | Mfr |
| S79 | What is an SEG Lightbox? | FramePlus Display | https://www.frame-plus.com/blogs/guide/what-is-an-seg-lightbox | Mfr |
| S80 | Does using aluminum electrolytic capacitors in LED drivers shorten the lifetime of LED luminaire? | Mean Well USA (July 19, 2018) | https://www.meanwellusa.com/newsInfo.aspx?c=5&i=3552 | Mfr (interested party) |
| S81 | The PULS Advantage, Issue 11: NEC Class 2 Power Supplies | PULS North America (Aug 2025) | https://www.pulspower.com/wp-content/uploads/2023/10/The-PULS-Advantage-Issue-11-NEC-Class-2-Power-Supplies-Aug-2025.pdf | Mfr |
| S82 | Polyphosphates as Inhibitors for Poly(vinyl Chloride) Photodegradation | *Molecules* (2017), via PubMed Central | https://pmc.ncbi.nlm.nih.gov/articles/PMC6150225/ | Acad |
| S83 | Exhibit B: General Sign Criteria for Shopping Center | Vestar (document 2012; posted 2021) | https://vestartenantservices.com/wp-content/uploads/2021/01/Sign-Approval-Criteria.pdf | Landlord (example) |
| S84 | Signage Provisions in Commercial Leases | Hollander Real Estate Law (Aug 2024) | https://hollanderpllc.com/2024/08/signage-provisions-in-commercial-leases/ | Legal commentary |

*Working copies of every fetched source (raw HTML/PDF plus extracted text) are saved next to this file in `raw_tech/` for audit.*
