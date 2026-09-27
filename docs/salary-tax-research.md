# Pakistan salary calculator: research and scope

Researched 22 September 2026. Supports **tax years ending 30 June 2010–2026**, i.e. FY 2009–2010 through FY 2025–2026. It does not label FY 2026–2027 as tax year 2026. Tables are historical snapshots; never replace all years when updating rates.

## Sources and year mapping

The First Schedule, Part I, Division I of the Income Tax Ordinance is the statutory basis. Finance Acts normally apply to the tax year ending the following June. Sources are legal documents and FBR guidance; the 2015 ordinance is an FBR document hosted by a tax practice because the original FBR download was unavailable during research.

| Tax years | Source / location | Calculation |
| --- | --- | --- |
| 2010–2012 | [FBR historical tax rates](https://e.fbr.gov.pk/SOP/TAX%20Rates%202008-2012.pdf), PDF pp. 1–3 | Selected percentage of **whole** annual taxable salary; different exemption thresholds and a distinct 19% band in TY 2010. |
| 2010–2013 relief | [FBR ordinance, amended June 2011](https://download1.fbr.gov.pk/Docs/201191210938447ITOrdinanceUpdated2011.pdf), printed pp. 298–299; [2015 ordinance mirror](https://www.msctax.com.pk/wp-content/uploads/2019/07/ordinance-upto-2015.pdf), printed p. 340 | Lesser of normal tax and tax at previous band ceiling + 20/30/40/50/60% of excess, depending on total income. The 2015 footnote confirms removal by Finance Act 2013 (TY 2014). |
| 2010 women exemption | Same ordinance, printed p. 340 footnote | No salary tax up to PKR 260,000 for women under the historical proviso; removed by Finance Act 2010, hence not used for TY 2011 onward. Optional checkbox, no demographic data stored. |
| 2011 surcharge | [FBR payment procedure](https://www.e.fbr.gov.pk/sop/ITAX%20surcharge%20Payment%20Procedure.pdf) | 15% of the income tax attributable to salary pertaining to 15 March–30 June 2011. Default assumes 3.5 equal salary months; user can enter the actual covered-period taxable salary. This is an explicit prorating assumption, not a claim that FBR prescribes 3.5/12 for every payroll. |
| 2013 | [FBR Circular 2 of 2012](https://download1.fbr.gov.pk/Docs/20127272371025331cir22012.pdf), printed pp. 1–2 | Six bands with explicit fixed amounts. The base amounts 95,000, 175,000 and 420,000 are intentional; do not replace them with integrated lower-band tax. Marginal relief still applies. |
| 2014–2015 | [2015 ordinance mirror](https://www.msctax.com.pk/wp-content/uploads/2019/07/ordinance-upto-2015.pdf), printed pp. 338–340, superseded-table footnote | Finance Act 2013 table, unchanged for TY 2015. |
| 2016–2018 | Same ordinance, printed pp. 339–340; [FBR Circular 2 of 2015](https://download1.fbr.gov.pk/Docs/2015727872122869CircularNo.02of2015.pdf) | Finance Act 2015 adds the 2% band from PKR 400k–500k; remaining bases decrease by PKR 3,000. Same salary table for TY 2017/2018. |
| 2019 | [FBR ordinance amended June 2022](https://download1.fbr.gov.pk/Docs/202412215123222278IncomeTaxOrdinanceAmendedupto30.06.2022.pdf), PDF pp. 476–477 (printed 450–451), superseded-table footnote | Final amended salary table: PKR 1,000 for >400k–800k; PKR 2,000 for >800k–1.2m; then 5/15/20/25% excess rates. Minimum PKR 2,000 for income >800k, including just above 1.2m. |
| 2020–2022 | Same ordinance, PDF p. 479 (printed 453), superseded salary table; [Finance Act 2019](https://download1.fbr.gov.pk/Docs/2019731173630487FinanceAct,2019.pdf), printed pp. 191–192 | Twelve bands, exemption PKR 600k; 5–35% excess rates. Do not use the adjacent non-salaried table. |
| 2023 | Same June 2022 ordinance, PDF p. 480 (printed 454) | Seven salary bands; 2.5/12.5/20/25/32.5/35%. |
| 2024 | [FBR ordinance amended June 2023](https://download1.fbr.gov.pk/Docs/202412215122448762IncomeTaxOrdinance,2001Amendedupto30.06.2023.pdf), PDF p. 489; also preserved in the June 2024 ordinance | Six salary bands; 2.5/12.5/22.5/27.5/35%. |
| 2025 | [FBR ordinance amended June 2024](https://download1.fbr.gov.pk/Docs/2024751675120641IncomeTaxOrdinance,2001-amended-upto30.06.2024.pdf), PDF p. 505 (printed 479); section 4AB | 5/15/25/30/35%; surcharge of 10% of income tax if annual income strictly exceeds PKR 10m. |
| 2026 | [FBR salary rate card, Finance Act 2025](https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf), PDF pp. 1–2, section 149 | 1/11/23/30/35%; bases 0/6,000/116,000/346,000/616,000; surcharge reduced to 9% of income tax strictly above PKR 10m. |

## Supported calculation

- Resident, ordinary salary-only estimate for 12 equal salary months. Input is taxable salary **after exempt allowances and before income tax**. Salary-only income satisfies the salary-share test for the applicable table.
- Annualize, choose the correct band, apply historical relief or minimum tax if relevant, add applicable surcharge, and divide the annual result by 12. Display monetary results to two decimals; avoid rounding intermediate band calculations.
- TY 2011 permits an override for the salary attributable to the surcharge period; otherwise assume 3.5 months. The monthly result is an annual average, not the actual withholding for March or April.
- Maximum monthly input PKR 10m / annual PKR 120m. This intentionally stays below the section 4C super-tax threshold of PKR 150m and older section 4B thresholds. Reject higher input; do not silently clamp or display understated tax.
- TY 2010 women's exemption is opt-in. General personal credits, age/disability reductions, teacher/researcher rebates, deductible allowances, other payroll deductions, non-salary income and refunds are outside scope and disclosed in the UI. Bonuses are excluded, including the special TY 2010 bonus IDPT provision.
- No salary data leaves the browser. No account, payment or external API is needed to calculate.

## Verification

Run `npm run test:tax`, `npm run lint`, and `npm run build`.

Tests include independent examples for all 17 years, every band boundary, the historical marginal-relief examples, 2013 base-amount jumps, the 2019 minimum, surcharge thresholds and bases, zero/negative/non-finite values, high-income limits, decimals, and after-tax reconciliation. Example: TY 2026 monthly salary PKR 200,000 produces annual salary PKR 2.4m, annual tax PKR 162,000, monthly tax PKR 13,500, and monthly salary after income tax PKR 186,500.

This is an estimation tool, not an IRIS return or a complete tax assessment. Review the relevant statute and taxpayer-specific facts before filing.
