import axios from 'axios';
import { CreateReviewDto, Review, UpdateReviewDto } from '@/models/review';
import { CreateAssociarDto, Associacao } from '@/models/associacao';
import { Associar } from '@/models/associar';
import sanityClient from './sanity';
import * as queries from './sanityQueries';

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
    queries.getAssociacaoQuery,
    {},
    { cache: 'no-cache' }
  );
  return result;
}

export async function getAssociacaoBySlug(slug: string) {
  const result = await sanityClient.fetch<Associacao>(
    queries.getAssociacao,
    { slug },
    { cache: 'no-cache' }
  );
  return result;
}

export const createSocio = async ({
  adults,
  discount,
  associacao,
  totalPrice,
  user,
}: CreateAssociarDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'socios',
          user: { _type: 'reference', _ref: user },
          associacao: { _type: 'reference', _ref: associacao },
          adults,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const updateAssociacao = async (associacaoId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: associacaoId,
          set: {
            isSocio: true,
          },
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getUserSocios(userId: string) {
  const result = await sanityClient.fetch<Associar[]>(
    queries.getUserSociosQuery,
    { userId },
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
  associacaoId: string
): Promise<null | { _id: string }> {
  const query = `*[_type == 'review' && user._ref == $userId && associacao._ref == $associacaoId][0] {
    _id
  }`;

  const params = { userId, associacaoId };
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
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({
  associacao,
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
          associacao: {
            _type: 'reference',
            _ref: associacao,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-02-19/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getAssociacaoReviews(associacaoId: string) {
  const result = await sanityClient.fetch<Review[]>(
    queries.getAssociacaoReviewsQuery,
    { associacaoId },
    { cache: 'no-cache' }
  );
  return result;
}