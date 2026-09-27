import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculateAnnualSalaryTax as annual,
  calculateSalaryTax as monthly,
  MAX_ANNUAL_SALARY,
  TAX_SCHEDULES,
  TAX_YEARS,
  taxYearLabel,
} from "../lib/pakistan-salary-tax.ts";

test("all 17 tax years have explicit coverage and correct year labels", () => {
  assert.deepEqual(TAX_YEARS, Array.from({ length: 17 }, (_, i) => 2026 - i));
  assert.equal(taxYearLabel(2026), "2025–2026 (TY 2026)");
});

// Independently calculated from the statutory tables, not derived from the implementation.
const fixtures = [
  [2010, 120_000, 384_000], [2011, 125_250, 400_800], [2012, 120_000, 384_000],
  [2013, 62_500, 245_000], [2014, 62_500, 245_000], [2015, 62_500, 245_000],
  [2016, 59_500, 242_000], [2017, 59_500, 242_000], [2018, 59_500, 242_000],
  [2019, 2_000, 60_000], [2020, 30_000, 180_000], [2021, 30_000, 180_000],
  [2022, 30_000, 180_000], [2023, 15_000, 165_000], [2024, 15_000, 165_000],
  [2025, 30_000, 230_000], [2026, 6_000, 162_000],
];
for (const [year, at100k, at200k] of fixtures) {
  test(`TY ${year}: independent salary examples and zero salary`, () => {
    assert.equal(monthly(100_000, year).annualTax, at100k);
    assert.equal(monthly(200_000, year).annualTax, at200k);
    assert.equal(monthly(0, year).annualTax, 0);
  });
}

test("2026 progressive tax and after-tax salary", () => {
  const result = monthly(200_000, 2026);
  assert.equal(result.annualSalary, 2_400_000);
  assert.equal(result.monthlyTax, 13_500);
  assert.equal(result.monthlyAfterTax, 186_500);
  assert.equal(result.annualAfterTax, 2_238_000);
  assert.equal(result.effectiveRate, 6.75);
});

test("historical whole-income rates and marginal relief", () => {
  assert.equal(annual(200_000, 2010).annualTax, 0);
  assert.equal(annual(200_001, 2010).annualTax, 0.2);
  assert.equal(annual(250_000, 2010).annualTax, 1_250);
  assert.equal(annual(350_001, 2012).annualTax, 0.2);
  assert.equal(annual(560_000, 2012).incomeTax, 22_250);
  assert.equal(annual(560_000, 2012).marginalRelief, 2_950);
  assert.equal(annual(1_740_000, 2012).incomeTax, 228_500);
  assert.equal(annual(1_740_000, 2012).marginalRelief, 15_100);
  assert.equal(annual(6_000_000, 2010).annualTax, 1_140_000);
  assert.equal(annual(6_000_000, 2012).annualTax, 1_200_000);
});

test("2013 statutory discontinuities receive marginal relief", () => {
  assert.equal(annual(1_500_001, 2013).annualTax, 92_500.4);
  assert.equal(annual(2_000_001, 2013).annualTax, 170_000.4);
  const result = annual(2_600_000, 2013);
  assert.equal(result.rawTax, 440_000);
  assert.equal(result.incomeTax, 312_500);
  assert.equal(result.marginalRelief, 127_500);
  assert.equal(annual(3_500_000, 2013).annualTax, 620_000);
});

test("2010 women exemption is optional and restricted to its statutory year", () => {
  assert.equal(annual(260_000, 2010).annualTax, 1_950);
  assert.equal(annual(260_000, 2010, { womanExemption2010: true }).annualTax, 0);
  assert.ok(annual(260_001, 2010, { womanExemption2010: true }).annualTax > 0);
  assert.equal(annual(400_000, 2012, { womanExemption2010: true }).annualTax, 6_000);
});

test("2011 surcharge uses tax attributable to the covered salary period", () => {
  assert.equal(annual(1_200_000, 2011).surcharge, 5_250);
  assert.equal(annual(1_200_000, 2011, { surchargeSalary2011: 400_000 }).surcharge, 6_000);
  assert.equal(annual(1_200_000, 2011, { surchargeSalary2011: 0 }).annualTax, 120_000);
  assert.throws(() => annual(1_200_000, 2011, { surchargeSalary2011: 1_200_001 }), RangeError);
  assert.throws(() => annual(1_200_000, 2011, { surchargeSalary2011: NaN }), RangeError);
});

test("2019 fixed bands and minimum tax do not drop at PKR 1.2m", () => {
  for (const [income, expected] of [[400_000, 0], [400_001, 1_000], [800_000, 1_000], [800_001, 2_000], [1_200_001, 2_000], [1_240_000, 2_000], [1_300_000, 5_000]]) {
    assert.equal(annual(income, 2019).annualTax, expected);
  }
});

test("2025 and 2026 surcharges apply strictly above PKR 10m, to tax", () => {
  for (const year of [2025, 2026]) {
    assert.equal(annual(10_000_000, year).surcharge, 0);
    assert.ok(annual(10_000_001, year).surcharge > 0);
  }
  assert.equal(annual(12_000_000, 2025).surcharge, 346_500);
  assert.equal(annual(12_000_000, 2025).annualTax, 3_811_500);
  assert.equal(annual(12_000_000, 2026).surcharge, 304_290);
  assert.equal(annual(12_000_000, 2026).annualTax, 3_685_290);
  assert.equal(annual(12_000_000, 2024).surcharge, 0);
});

test("input validation rejects invalid years and amounts instead of returning plausible tax", () => {
  for (const amount of [-1, NaN, Infinity, -Infinity, 10_000_001]) assert.throws(() => monthly(amount, 2026), RangeError);
  for (const year of [2009, 2027, NaN, 2025.5]) assert.throws(() => monthly(100_000, year), RangeError);
  assert.throws(() => annual(MAX_ANNUAL_SALARY + 1, 2026), RangeError);
  assert.ok(monthly(10_000_000, 2026).annualTax > 0);
});

test("every band boundary is ordered, continuous in coverage, and tax never falls", () => {
  for (const schedule of TAX_SCHEDULES) {
    for (const [index, band] of schedule.bands.entries()) {
      assert.equal(band.lower, index === 0 ? 0 : schedule.bands[index - 1].upper);
      assert.ok(band.upper > band.lower);
      if (!Number.isFinite(band.upper)) continue;
      const below = annual(band.upper - 1, schedule.year);
      const at = annual(band.upper, schedule.year);
      const above = annual(band.upper + 1, schedule.year);
      assert.ok(below.annualTax <= at.annualTax, `${schedule.year} at ${band.upper}`);
      assert.ok(at.annualTax <= above.annualTax, `${schedule.year} above ${band.upper}`);
      assert.ok(above.annualTax <= above.annualSalary);
      assert.ok(Number.isFinite(above.monthlyAfterTax));
    }
  }
});

test("decimal salary remains precise and calculations do not mutate shared tables", () => {
  const before = JSON.stringify(TAX_SCHEDULES);
  assert.equal(monthly(50_000.01, 2026).annualSalary, 600_000.12);
  assert.equal(monthly(100_000.5, 2026).annualTax, 6_000.66);
  for (const year of TAX_YEARS) monthly(123_456.78, year);
  assert.equal(JSON.stringify(TAX_SCHEDULES), before);
});
