export type PrincingDto = Readonly<{
  id?: number;
  name: string;
  desc: string;
  price: string;
  yearPrice?: string;
  saving?: string;
  headFeature?: string;
  featured: boolean;
  cta: string;
  uniqueSetup?: string;
  features: string[];
}>;
