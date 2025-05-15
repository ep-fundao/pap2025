import { groq } from 'next-sanity';

export const getFeaturedAssociacaoQuery = groq`*[_type == "associacao" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
     coverImage {
    asset -> {
      _id,
      url
    }
  }
}`;

export const getAssociacaoQuery = groq`*[_type == "associacao"] {
    _id, 
    coverImage {
    asset -> {
      _id,
      url
    }
  },
    description,
    dimension,
    isSocio,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getAssociacao = groq`*[_type == "associacao" && slug.current == $slug][0] {
    _id,
     coverImage {
    asset -> {
      _id,
      url
    }
  },
    description,
    dimension,
    discount,
    images,
    isSocio,
    isFeatured,
    name,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

export const getUserSociosQuery = groq`*[_type == 'socios' && user._ref == $userId] {
    _id,
    associacao -> {
        _id,
        name,
        slug,
        price
    },
    adults,
    isAnual,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`;

export const getAssociacaoReviewsQuery = groq`*[_type == "review" && associacao._ref == $associacaoId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;