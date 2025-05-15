export type Associar = {
    _id: string;
    associacao: {
      _id: string;
      name: string;
      slug: { current: string };
      price: number;
    };
    anual: boolean;
    adults: number;
    totalPrice: number;
    discount: number;
  };