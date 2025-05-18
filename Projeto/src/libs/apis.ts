import { CreateReviewDto, Review } from './../models/review';
import axios from 'axios';
import { CreateSocioDto, Associacao } from '@/models/associacao';
import sanityClient from './sanity';
import * as queries from './sanityQueries';
import { Associar } from '@/models/associar';
import { UpdateReviewDto } from '@/models/review';

export async function getFeaturedAssociacao() {
  const result = await sanityClient.fetch<Associacao>(
    queries.getFeaturedAssociacaoQuery,
    {},
    { cache: 'no-cache' }
  );

  return result;
}

export async function getAssociacoes() {
  const result = await sanityClient.fetch<Associacao[]>(
    queries.getAssociacoesQuery,
    {},
    { cache: 'no-cache' }
  );
  return result;
}

export async function getAssociacao(slug: string) {
  const result = await sanityClient.fetch<Associacao>(
    queries.getAssociacao,
    { slug },
    { cache: 'no-cache' }
  );

  return result;
}

export const createBooking = async ({
  adults,
  discount,
  Associacoes,
  totalPrice,
  user,
}: CreateSocioDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'booking',
          user: { _type: 'reference', _ref: user },
          associacoes: { _type: 'reference', _ref: Associacoes },
          adults,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const updateHotelRoom = async (associacoesId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: associacoesId,
          set: {
            isSocio: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Associar[]>(
    queries.getUserBookingsQuery,
    {
      userId,
    },
    { cache: 'no-cache' }
  );

  return result;
}

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch(
    queries.getUserDataQuery,
    { userId },
    { cache: 'no-cache' }
  );

  return result;
}

export async function checkReviewExists(
  userId: string,
  associacoesId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && associacoes._ref == $associacoesId][0] {
    _id
  }`;

  const params = {
    userId,
    associacoesId,
  };

  const result = await sanityClient.fetch(query, params);

  return result ? result : null;
}

export const updateReview = async ({
  reviewId,
  reviewText,
  userRating,
}: UpdateReviewDto) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  associacoesId,
  reviewText,
  userId,
  userRating,
}: CreateReviewDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          associacoes: {
            _type: 'reference',
            _ref: associacoesId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getRoomReviews(associacaoId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getRoomReviewsQuery,
    {
      associacaoId,
    },
    { cache: 'no-cache' }
  );

  return result;
}
