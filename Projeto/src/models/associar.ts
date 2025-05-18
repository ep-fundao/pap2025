export type Associar = {
  _id: string;
  associacoes: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
  };
  adults: number;
  totalPrice: number;
  discount: number;
};
