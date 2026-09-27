"use client";

import { useState } from "react";
import { Calculator, ChevronDown, ExternalLink, Info, RotateCcw } from "lucide-react";
import { calculateSalaryTax, getTaxSchedule, MAX_MONTHLY_SALARY, TAX_YEARS, taxYearLabel } from "../lib/pakistan-salary-tax";

const money = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 2 });
const pkr = (value: number) => `Rs. ${money.format(value)}`;
const percent = (value: number) => `${Number(value.toFixed(2))}%`;
const inputClass = "min-h-14 w-full min-w-0 rounded-xl border border-[#dfe4ea] bg-[#f8f9fb] px-4 text-lg font-bold text-navy outline-none transition focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20";

function parseAmount(value: string): number {
  const normalized = value.replace(/[,\s]/g, "");
  if (!normalized) return 0;
  return /^\d+(\.\d{0,2})?$/.test(normalized) ? Number(normalized) : NaN;
}

export default function TaxCalculator() {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState(2026);
  const [womanExemption, setWomanExemption] = useState(false);
  const [coveredSalary, setCoveredSalary] = useState("");
  const monthly = parseAmount(salary);
  const schedule = getTaxSchedule(year);
  let error = "";
  let result: ReturnType<typeof calculateSalaryTax> | null = null;
  try {
    result = calculateSalaryTax(monthly, year, {
      womanExemption2010: womanExemption,
      surchargeSalary2011: coveredSalary.trim() === "" ? undefined : parseAmount(coveredSalary),
    });
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Enter a valid salary amount.";
  }
  const sliderValue = Number.isFinite(monthly) && monthly >= 0 ? Math.min(monthly, MAX_MONTHLY_SALARY) : 0;
  const sliderMax = Math.max(1_000_000, Math.ceil(sliderValue / 1_000_000) * 1_000_000);

  function reset() {
    setSalary("");
    setYear(2026);
    setWomanExemption(false);
    setCoveredSalary("");
  }

  return (
    <section id="tax-calculator" aria-labelledby="calculator-heading" className="scroll-mt-8 px-5 pb-16 sm:px-[clamp(32px,3.7vw,52px)] sm:pb-20">
      <div className="mx-auto max-w-[1440px] rounded-[28px] border border-[#CCE8F8] bg-[linear-gradient(115deg,#F6F9FC_0%,#EDF7FC_55%,#DCEFFC_100%)] px-5 py-8 sm:p-8 lg:p-10 2xl:p-12">
        <div className="grid items-start gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-10">
          <div className="lg:pt-3">
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-brand-orange-dark uppercase"><Calculator size={16} aria-hidden="true" /> asconsultations tax calculator</p>
            <h2 id="calculator-heading" className="text-[36px] leading-[1.08] font-extrabold tracking-[-1.4px] text-navy sm:text-[44px] 2xl:text-[50px]">Calculate<br className="hidden lg:block" /> your taxes.</h2>
            <p className="mt-5 max-w-[350px] text-base leading-7 text-[#667085]">See your estimated salary tax and take-home pay using Pakistan&apos;s tax rules for 2010–2026.</p>
            <p className="mt-4 max-w-[340px] text-xs leading-5 text-[#667085]">For salary income only. Enter your monthly taxable salary after exempt allowances, before income tax.</p>
          </div>

          <div className="min-w-0 rounded-[24px] bg-white p-5 shadow-[0_16px_45px_-24px_rgb(122_62_23/22%)] sm:p-7">
            <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_200px]">
              <div className="min-w-0">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="monthly-salary" className="mb-2 flex items-center gap-2 text-sm font-bold text-[#667085]">Monthly salary (PKR) <Info size={15} aria-hidden="true" /></label>
                    <input id="monthly-salary" type="text" inputMode="decimal" autoComplete="off" maxLength={24} placeholder="Enter salary" value={salary} onChange={(event) => setSalary(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={`salary-help${error ? " salary-error" : ""}`} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="tax-year" className="mb-2 block text-sm font-bold text-[#667085]">Tax year</label>
                    <div className="relative">
                      <select id="tax-year" value={year} onChange={(event) => { setYear(Number(event.target.value)); setCoveredSalary(""); }} className={`${inputClass} cursor-pointer appearance-none pr-9 text-base`} aria-describedby="tax-year-help">
                        {TAX_YEARS.map((item) => <option value={item} key={item} aria-label={taxYearLabel(item)}>{item - 1}–{item}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-5 right-3 text-[#667085]" size={16} aria-hidden="true" />
                    </div>
                  </div>
                </div>
                <p id="tax-year-help" className="mt-3 text-xs leading-5 text-[#667085]">Tax year {year}: 1 July {year - 1} to 30 June {year}.</p>

                <div className="mt-6">
                  <label htmlFor="salary-slider" className="sr-only">Adjust monthly taxable salary</label>
                  <input id="salary-slider" type="range" min={0} max={sliderMax} step={1000} value={sliderValue} onChange={(event) => { setSalary(event.target.value); setCoveredSalary(""); }} aria-valuetext={`${pkr(sliderValue)} per month`} className="h-6 w-full cursor-pointer accent-brand-orange focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange" />
                  <div className="mt-1 flex justify-between text-xs font-medium text-[#667085]" aria-hidden="true"><span>Rs. 0</span><span>{pkr(sliderMax)}</span></div>
                  <p id="salary-help" className="mt-2 text-xs leading-5 text-[#667085]">Type an exact amount, or use the slider. Maximum: Rs. 10,000,000/month.</p>
                </div>

                {year === 2010 && (
                  <label className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#667085]">
                    <input type="checkbox" checked={womanExemption} onChange={(event) => setWomanExemption(event.target.checked)} className="mt-1 accent-brand-orange" />
                    Apply the TY 2010 women&apos;s exemption (annual taxable salary up to Rs. 260,000).
                  </label>
                )}
                {year === 2011 && (
                  <div className="mt-5">
                    <label htmlFor="surcharge-salary" className="mb-2 block text-xs font-bold text-[#667085]">Salary earned from 15 March–30 June 2011 (PKR)</label>
                    <input id="surcharge-salary" type="text" inputMode="decimal" maxLength={24} value={coveredSalary} onChange={(event) => setCoveredSalary(event.target.value)} placeholder={Number.isFinite(monthly) ? money.format(monthly * 3.5) : "0"} aria-describedby="surcharge-help" className={`${inputClass} text-base`} />
                    <p id="surcharge-help" className="mt-2 text-xs leading-5 text-[#667085]">Defaults to 3.5 months of salary. Enter the actual period amount if different; the 15% surcharge applies to its share of annual tax.</p>
                  </div>
                )}
                {error && <p id="salary-error" role="alert" className="mt-4 text-sm text-red-700">{error}</p>}

                <dl className="mt-6 space-y-3 border-t border-[#edf0f3] pt-5 text-sm">
                  <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#667085]">Annual taxable salary</dt><dd className="font-bold text-navy">{result ? pkr(result.annualSalary) : "—"}</dd></div>
                  <div className="flex flex-wrap justify-between gap-2"><dt className="text-[#667085]">Annual tax</dt><dd className="font-bold text-navy">{result ? pkr(result.annualTax) : "—"}</dd></div>
                </dl>
              </div>

              <div className="border-t border-[#edf0f3] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-6" role="status" aria-live="polite" aria-atomic="true">
                <p className="text-sm font-bold text-[#667085]">Monthly tax</p>
                <p className="mt-2 break-words text-[26px] leading-tight font-extrabold tracking-[-0.5px] text-navy">{result ? pkr(result.monthlyTax) : "—"}</p>
                <p className="mt-6 text-sm font-bold text-[#667085]">Salary after tax</p>
                <p className="mt-2 break-words text-[26px] leading-tight font-extrabold tracking-[-0.5px] text-emerald-700">{result ? pkr(result.monthlyAfterTax) : "—"}</p>
                <p className="mt-4 text-xs text-[#667085]">Effective tax rate: <strong className="text-navy">{result ? percent(result.effectiveRate) : "—"}</strong></p>
                <p className="mt-5 text-xs leading-5 text-[#667085]">Estimate for 12 equal salary months. Actual payroll deductions and final liability may differ.</p>
                <button type="button" onClick={reset} className="mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded text-xs font-bold text-brand-orange-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"><RotateCcw size={13} aria-hidden="true" /> Reset</button>
              </div>
            </div>
          </div>
        </div>

        <details className="mt-6 rounded-2xl border border-[#D8E7F2] bg-white/65 px-5 py-4 text-sm text-[#667085]">
          <summary className="cursor-pointer font-bold text-navy focus-visible:outline-2 focus-visible:outline-brand-orange">How this is calculated &amp; tax-year rates</summary>
          <div className="mt-5 space-y-4 leading-6">
            <p>Monthly taxable salary × 12 gives annual taxable salary. {schedule.method === "whole-income" ? "This year applies the selected rate to the whole annual income, then applies marginal relief where available." : "Tax is the fixed amount for your band plus the band rate on income above its lower limit."} Annual tax, including any applicable surcharge, is divided by 12 for the monthly estimate.</p>
            {year <= 2013 && <p>Historical marginal relief is included. It limits tax near a band boundary using the tax at the previous band&apos;s ceiling and the statutory relief percentage.</p>}
            {year === 2019 && <p>TY 2019 includes fixed taxes of Rs. 1,000 and Rs. 2,000 in the lower bands, and a minimum tax of Rs. 2,000 when annual income exceeds Rs. 800,000.</p>}
            {(year === 2025 || year === 2026) && <p>For annual taxable salary above Rs. 10,000,000, a {year === 2025 ? "10%" : "9%"} surcharge is added to income tax, not to salary.</p>}
            {result && (
              <dl className="grid gap-3 rounded-xl bg-white p-4 sm:grid-cols-3">
                <div><dt>Income tax after relief</dt><dd className="font-bold text-navy">{pkr(result.incomeTax)}</dd></div>
                <div><dt>Marginal relief</dt><dd className="font-bold text-navy">{pkr(result.marginalRelief)}</dd></div>
                <div><dt>{result.surchargeLabel}</dt><dd className="font-bold text-navy">{pkr(result.surcharge)}</dd></div>
              </dl>
            )}
            <div className="overflow-x-auto rounded-xl border border-[#D8E7F2]">
              <table className="w-full min-w-[500px] bg-white text-left text-xs">
                <caption className="sr-only">Annual salary tax bands for tax year {year}</caption>
                <thead className="bg-[#F0F7FC] text-navy"><tr><th className="px-4 py-3">Annual taxable income (PKR)</th><th className="px-4 py-3">{schedule.method === "whole-income" ? "Rate on whole income" : "Rate on excess"}</th>{schedule.method === "excess" && <th className="px-4 py-3">Fixed tax (PKR)</th>}</tr></thead>
                <tbody>{schedule.bands.map((band, index) => <tr key={band.lower} className={`border-t border-[#edf0f3] ${result?.band === band ? "bg-[#E8F3FB] font-bold text-navy" : ""}`}><td className="px-4 py-2">{index === 0 ? `Up to ${money.format(band.upper)}` : Number.isFinite(band.upper) ? `Over ${money.format(band.lower)} to ${money.format(band.upper)}` : `Over ${money.format(band.lower)}`}</td><td className="px-4 py-2">{percent(band.rate * 100)}</td>{schedule.method === "excess" && <td className="px-4 py-2">{money.format(band.base)}</td>}</tr>)}</tbody>
              </table>
            </div>
            <p className="text-xs leading-5">Salary-only estimate before personal tax credits, deductible allowances, age/disability or occupation-specific rebates, and other payroll deductions. Excludes business, pension, rental and investment income, bonuses and refunds. The input limit keeps annual salary below the super-tax threshold. Confirm your final return with a qualified tax adviser.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-brand-orange-dark">
              <a href={schedule.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">{schedule.sourceLabel}<ExternalLink size={12} aria-hidden="true" /></a>
              {year <= 2013 && <a href="https://www.msctax.com.pk/wp-content/uploads/2019/07/ordinance-upto-2015.pdf#page=341" target="_blank" rel="noopener noreferrer" className="hover:underline">Historical relief provisions (FBR ordinance mirror)</a>}
              {year === 2011 && <a href="https://www.e.fbr.gov.pk/sop/ITAX%20surcharge%20Payment%20Procedure.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">FBR 2011 surcharge guidance</a>}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
