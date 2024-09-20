export const taxPlan = [
  ['01-01', '03-31'],
  ['04-01', '06-30'],
  ['07-01', '09-30'],
  ['10-01', '12-31'],
];

export const taxYearPlan = [
  ['01-01', '06-30'],  // 6 month
  ['01-01', '09-30'],  // 9 month 
  ['01-01', '12-31'],  // year
];

export const taxPercent = 5;
export const warTaxPercent = 1;

export const getWarTaxPercent = (date) => {
  if (date >= '2024-10-01') {
    return warTaxPercent;
  }
  return 0;
}