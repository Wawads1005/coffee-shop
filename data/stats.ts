interface Stat {
  id: string;
  label: string;
  value: number;
  unitOfMeasure: "count" | "percentage";
}

const coffeeVariety: Stat = {
  id: crypto.randomUUID(),
  label: "Coffee Variety",
  value: 313,
  unitOfMeasure: "count",
};

const happyCustomers: Stat = {
  id: crypto.randomUUID(),
  label: "Happy Customers",
  value: 1845,
  unitOfMeasure: "count",
};

const yearsOfExcellence: Stat = {
  id: crypto.randomUUID(),
  label: "Years of Excellence",
  value: 11,
  unitOfMeasure: "count",
};

const yearlyGrowth: Stat = {
  id: crypto.randomUUID(),
  label: "Yearly Growth",
  value: 33.9,
  unitOfMeasure: "percentage",
};

const stats: Stat[] = [
  coffeeVariety,
  happyCustomers,
  yearsOfExcellence,
  yearlyGrowth,
];

export type { Stat };
export { stats };
