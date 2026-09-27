// Tax year is the year ending 30 June, not the year in which the Finance Act passed.
// Source references and scope: docs/salary-tax-research.md.
export type TaxBand = { lower: number; upper: number; rate: number; base: number };
export type TaxSchedule = {
  year: number;
  method: "whole-income" | "excess";
  bands: TaxBand[];
  source: string;
  sourceLabel: string;
};

type Row = [upper: number, percentage: number, base?: number];
const bands = (rows: Row[]): TaxBand[] => rows.map(([upper, rate, base = 0], index) => ({
  lower: index === 0 ? 0 : rows[index - 1][0], upper, rate: rate / 100, base,
}));
const unlimited = Number.POSITIVE_INFINITY;
const historicTail: Row[] = [
  [400_000, 1.5], [450_000, 2.5], [550_000, 3.5], [650_000, 4.5],
  [750_000, 6], [900_000, 7.5], [1_050_000, 9], [1_200_000, 10],
  [1_450_000, 11], [1_700_000, 12.5], [1_950_000, 14], [2_250_000, 15],
  [2_850_000, 16], [3_550_000, 17.5], [4_550_000, 18.5],
];
const rates2010 = bands([[200_000, 0], [250_000, 0.5], [350_000, 0.75], ...historicTail, [8_650_000, 19], [unlimited, 20]]);
const rates2011 = bands([[300_000, 0], [350_000, 0.75], ...historicTail, [unlimited, 20]]);
const rates2012 = bands([[350_000, 0], ...historicTail, [unlimited, 20]]);
// Statutory base amounts in 2013 are deliberately discontinuous. Do not integrate rates.
const rates2013 = bands([
  [400_000, 0], [750_000, 5], [1_500_000, 10, 17_500],
  [2_000_000, 15, 95_000], [2_500_000, 17.5, 175_000], [unlimited, 20, 420_000],
]);
const rates2014 = bands([
  [400_000, 0], [750_000, 5], [1_400_000, 10, 17_500], [1_500_000, 12.5, 82_500],
  [1_800_000, 15, 95_000], [2_500_000, 17.5, 140_000], [3_000_000, 20, 262_500],
  [3_500_000, 22.5, 362_500], [4_000_000, 25, 475_000], [7_000_000, 27.5, 600_000], [unlimited, 30, 1_425_000],
]);
const rates2016 = bands([
  [400_000, 0], [500_000, 2], [750_000, 5, 2_000], [1_400_000, 10, 14_500],
  [1_500_000, 12.5, 79_500], [1_800_000, 15, 92_000], [2_500_000, 17.5, 137_000],
  [3_000_000, 20, 259_500], [3_500_000, 22.5, 359_500], [4_000_000, 25, 472_000],
  [7_000_000, 27.5, 597_000], [unlimited, 30, 1_422_000],
]);
const rates2019 = bands([
  [400_000, 0], [800_000, 0, 1_000], [1_200_000, 0, 2_000],
  [2_500_000, 5], [4_000_000, 15, 65_000], [8_000_000, 20, 290_000], [unlimited, 25, 1_090_000],
]);
const rates2020 = bands([
  [600_000, 0], [1_200_000, 5], [1_800_000, 10, 30_000], [2_500_000, 15, 90_000],
  [3_500_000, 17.5, 195_000], [5_000_000, 20, 370_000], [8_000_000, 22.5, 670_000],
  [12_000_000, 25, 1_345_000], [30_000_000, 27.5, 2_345_000],
  [50_000_000, 30, 7_295_000], [75_000_000, 32.5, 13_295_000], [unlimited, 35, 21_420_000],
]);
const rates2023 = bands([
  [600_000, 0], [1_200_000, 2.5], [2_400_000, 12.5, 15_000],
  [3_600_000, 20, 165_000], [6_000_000, 25, 405_000],
  [12_000_000, 32.5, 1_005_000], [unlimited, 35, 2_955_000],
]);
const rates2024 = bands([
  [600_000, 0], [1_200_000, 2.5], [2_400_000, 12.5, 15_000],
  [3_600_000, 22.5, 165_000], [6_000_000, 27.5, 435_000], [unlimited, 35, 1_095_000],
]);
const rates2025 = bands([
  [600_000, 0], [1_200_000, 5], [2_200_000, 15, 30_000],
  [3_200_000, 25, 180_000], [4_100_000, 30, 430_000], [unlimited, 35, 700_000],
]);
const rates2026 = bands([
  [600_000, 0], [1_200_000, 1], [2_200_000, 11, 6_000],
  [3_200_000, 23, 116_000], [4_100_000, 30, 346_000], [unlimited, 35, 616_000],
]);

const sources = {
  early: "https://e.fbr.gov.pk/SOP/TAX%20Rates%202008-2012.pdf",
  reform: "https://download1.fbr.gov.pk/Docs/20127272371025331cir22012.pdf",
  historical: "https://www.msctax.com.pk/wp-content/uploads/2019/07/ordinance-upto-2015.pdf",
  ordinance2022: "https://download1.fbr.gov.pk/Docs/202412215123222278IncomeTaxOrdinanceAmendedupto30.06.2022.pdf",
  ordinance2024: "https://download1.fbr.gov.pk/Docs/2024751675120641IncomeTaxOrdinance,2001-amended-upto30.06.2024.pdf",
  current: "https://download1.fbr.gov.pk/Docs/20258181281745641WHT-RateCard.pdf",
};

export const TAX_SCHEDULES: TaxSchedule[] = Array.from({ length: 17 }, (_, index) => {
  const year = 2010 + index;
  const table = year === 2010 ? rates2010 : year === 2011 ? rates2011 : year === 2012 ? rates2012
    : year === 2013 ? rates2013 : year <= 2015 ? rates2014 : year <= 2018 ? rates2016
    : year === 2019 ? rates2019 : year <= 2022 ? rates2020 : year === 2023 ? rates2023
    : year === 2024 ? rates2024 : year === 2025 ? rates2025 : rates2026;
  const source = year <= 2012 ? sources.early : year === 2013 ? sources.reform : year <= 2018 ? sources.historical
    : year <= 2023 ? sources.ordinance2022 : year <= 2025 ? sources.ordinance2024 : sources.current;
  return {
    year, bands: table, method: year <= 2012 ? "whole-income" : "excess", source,
    sourceLabel: year <= 2012 ? "FBR historical rates" : year === 2013 ? "FBR Circular 2 of 2012"
      : year === 2026 ? "FBR salary rate card 2026" : "Income Tax Ordinance · First Schedule",
  };
});

// Keep this salary-only tool below the lowest section 4C super-tax threshold (PKR 150m).
export const MAX_MONTHLY_SALARY = 10_000_000;
export const MAX_ANNUAL_SALARY = MAX_MONTHLY_SALARY * 12;
export const TAX_YEARS = TAX_SCHEDULES.map(({ year }) => year).reverse();
export const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function getTaxSchedule(year: number): TaxSchedule {
  const schedule = TAX_SCHEDULES.find((item) => item.year === year);
  if (!schedule) throw new RangeError("Choose a tax year from 2010 to 2026.");
  return schedule;
}

export function taxYearLabel(year: number) {
  return `${year - 1}–${year} (TY ${year})`;
}

export type SalaryTaxOptions = {
  womanExemption2010?: boolean;
  // Actual taxable salary pertaining to 15 March–30 June 2011, if different from 3.5 months.
  surchargeSalary2011?: number;
};

export function calculateAnnualSalaryTax(annualSalary: number, year: number, options: SalaryTaxOptions = {}) {
  const schedule = getTaxSchedule(year);
  if (!Number.isFinite(annualSalary) || annualSalary < 0 || annualSalary > MAX_ANNUAL_SALARY) {
    throw new RangeError("Enter annual taxable salary between PKR 0 and 120,000,000.");
  }
  const annual = roundMoney(annualSalary);
  const bandIndex = schedule.bands.findIndex(({ upper }) => annual <= upper);
  const band = schedule.bands[bandIndex];
  const rawTax = schedule.method === "whole-income" ? annual * band.rate : band.base + (annual - band.lower) * band.rate;
  let incomeTax = rawTax;
  let marginalRelief = 0;
  if (year <= 2013 && bandIndex > 0) {
    const previous = schedule.bands[bandIndex - 1];
    const taxAtFloor = schedule.method === "whole-income"
      ? previous.upper * previous.rate
      : previous.base + (previous.upper - previous.lower) * previous.rate;
    const reliefRate = annual <= 550_000 ? 0.2 : annual <= 1_050_000 ? 0.3
      : annual <= 2_250_000 ? 0.4 : annual <= 4_550_000 ? 0.5 : 0.6;
    incomeTax = Math.min(rawTax, taxAtFloor + (annual - band.lower) * reliefRate);
    marginalRelief = rawTax - incomeTax;
  }
  if (year === 2010 && options.womanExemption2010 && annual <= 260_000) {
    incomeTax = 0;
    marginalRelief = 0;
  }
  // The 2019 proviso prevents a drop below PKR 2,000 immediately above PKR 1.2m.
  if (year === 2019 && annual > 800_000) incomeTax = Math.max(2_000, incomeTax);

  let surcharge = 0;
  let surchargeLabel = "Surcharge";
  if (year === 2011) {
    const coveredSalary = options.surchargeSalary2011 ?? annual * 3.5 / 12;
    if (!Number.isFinite(coveredSalary) || coveredSalary < 0 || coveredSalary > annual) {
      throw new RangeError("The 2011 surcharge-period salary must be between zero and annual salary.");
    }
    surcharge = annual === 0 ? 0 : incomeTax * (coveredSalary / annual) * 0.15;
    surchargeLabel = "2011 surcharge (15% on covered-period tax)";
  } else if (annual > 10_000_000 && (year === 2025 || year === 2026)) {
    const surchargeRate = year === 2025 ? 0.1 : 0.09;
    surcharge = incomeTax * surchargeRate;
    surchargeLabel = `${surchargeRate * 100}% income-tax surcharge`;
  }
  const annualTax = roundMoney(incomeTax + surcharge);
  return {
    year, annualSalary: annual, band, rawTax: roundMoney(rawTax), incomeTax: roundMoney(incomeTax),
    marginalRelief: roundMoney(marginalRelief), surcharge: roundMoney(surcharge), surchargeLabel,
    annualTax, monthlyTax: roundMoney(annualTax / 12),
    monthlyAfterTax: roundMoney((annual - annualTax) / 12),
    annualAfterTax: roundMoney(annual - annualTax), effectiveRate: annual === 0 ? 0 : annualTax / annual * 100,
  };
}

export function calculateSalaryTax(monthlySalary: number, year: number, options: SalaryTaxOptions = {}) {
  if (!Number.isFinite(monthlySalary) || monthlySalary < 0 || monthlySalary > MAX_MONTHLY_SALARY) {
    throw new RangeError("Enter monthly taxable salary between PKR 0 and 10,000,000.");
  }
  return calculateAnnualSalaryTax(roundMoney(monthlySalary * 12), year, options);
}
