  type CoverImage = {
    asset: {
      url: string;
    };
  };

  
  export type Image = {
    _key: string;
    url: string;
  };
  
  type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
  };
  
  type Slug = {
    _type: string;
    current: string;
  };
  
  export type Associacao = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    dimension: string;
    discount: number;
    images: Image[];
    isSocio: boolean;
    isFeatured: boolean;
    name: string;
    offeredAmenities: Amenity[];
    price: number;
    slug: Slug;
    specialNote: string;
    type: string;
  };
  
  export type CreateAssociarDto = {
    user: string;
    associacao: string;
    isAnual: boolean;
    adults: number;
    totalPrice: number;
    discount: number;
  };