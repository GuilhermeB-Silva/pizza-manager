import { License, LicensePricingCardForm } from "@/types/licenses";

export const sortPackagesByPrice = (packages: License[]): License[] => {
  const packs = packages || [];

  return [...packs].sort((a, b) => b.price - a.price);
};

type PriceLevels = {
  single_license: {
    price: number;
    rule: number;
  };
  medium_license: {
    price: number;
    rule: number;
  };
  large_license: {
    price: number;
    rule: number;
  };
};

export const getPriceLevels = (
  ranges: LicensePricingCardForm[]
): PriceLevels => {
  const sorted = [...ranges].sort((a, b) => a.min_quantity - b.min_quantity);

  return {
    single_license: {
      price: sorted[0]?.price ?? 0,
      rule: sorted[0]?.min_quantity ?? 0,
    },
    medium_license: {
      price: sorted[1]?.price ?? 0,
      rule: sorted[1]?.min_quantity ?? 0,
    },
    large_license: {
      price: sorted[2]?.price ?? 0,
      rule: sorted[2]?.min_quantity ?? 0,
    },
  };
};
