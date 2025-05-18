import { groq } from 'next-sanity';

export const getFeaturedAssociacaoQuery = groq`*[_type == "associacoes" && isFeatured == true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getAssociacoesQuery = groq`*[_type == "associacoes"] {
    _id, 
    coverImage,
    description,
    dimension,
    isSocio,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getAssociacao = groq`*[_type == "associacoes" && slug.current == $slug][0] {
    _id,
    coverImage,
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

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    associacoes -> {
        _id,
        name,
        slug,
        price
    },
    adults,
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

export const getAssociacaoReviewsQuery = groq`*[_type == "review" && associacoes._ref == $associacaoId] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;
