'use client';

import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { MdOutlineCleaningServices } from 'react-icons/md';
import { LiaFireExtinguisherSolid } from 'react-icons/lia';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { GiSmokeBomb } from 'react-icons/gi';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { getAssociacaoBySlug } from '@/libs/apis';
import LoadingSpinner from '@/app/(web)/loading';
import HotelPhotoGallery from '@/components/HotelPhotoGallery/HotelPhotoGallery';
import BookAssociacaoCta from '@/components/BookAssociacaoCta/BookAssociacaoCta';
import { getStripe } from '@/libs/stripe';
import AssociacaoReview from '@/components/AssociacaoReview/AssociacaoReview';
import { Associacao } from '@/models/associacao';


const AssociacaoDetails = () => {
  const { slug } = useParams();
  const [adults, setAdults] = useState(1);

  const fetchAssociacao = async () => await getAssociacaoBySlug(slug as string);
  const { data: associacao, error, isLoading } = useSWR('associacao-details', fetchAssociacao);

  const handleBookNowClick = async () => {
    if (!associacao) return;

    const stripe = await getStripe();
    try {
      const { data: stripeSession } = await axios.post('/api/stripe', {
        adults,
        slug: associacao.slug.current,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error('Payment Failed');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  if (error) return <div>Erro ao carregar a associação.</div>;
  if (isLoading || !associacao) return <LoadingSpinner />;

  return (
    <div>
      <HotelPhotoGallery photos={associacao.images} />

      <div className='container mx-auto mt-20'>
        <div className='md:grid md:grid-cols-12 gap-10 px-3'>
          <div className='md:col-span-8 md:w-full'>
            <h2 className='font-bold text-left text-lg md:text-2xl'>
              {associacao.name} ({associacao.dimension})
            </h2>

            <div className='flex my-11 flex-wrap'>
              {associacao.offeredAmenities.map(amenity => (
                <div
                  key={amenity._key}
                  className='md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center'
                >
                  <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                  <p className='text-xs md:text-base pt-3'>{amenity.amenity}</p>
                </div>
              ))}
            </div>

            <div className='mb-11'>
              <h2 className='font-bold text-3xl mb-2'>Descrição</h2>
              <p>{associacao.description}</p>
            </div>

            <div className='mb-11'>
              <h2 className='font-bold text-3xl mb-2'>Comodidades</h2>
              <div className='grid grid-cols-2'>
                {associacao.offeredAmenities.map(amenity => (
                  <div key={amenity._key} className='flex items-center md:my-0 my-1'>
                    <i className={`fa-solid ${amenity.icon}`}></i>
                    <p className='text-xs md:text-base ml-2'>{amenity.amenity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='mb-11'>
              <h2 className='font-bold text-3xl mb-2'>Segurança e Higiene</h2>
              <div className='grid grid-cols-2'>
                <div className='flex items-center my-1 md:my-0'>
                  <MdOutlineCleaningServices />
                  <p className='ml-2 md:text-base text-xs'>Limpeza Diária</p>
                </div>
                <div className='flex items-center my-1 md:my-0'>
                  <LiaFireExtinguisherSolid />
                  <p className='ml-2 md:text-base text-xs'>Extintores</p>
                </div>
                <div className='flex items-center my-1 md:my-0'>
                  <AiOutlineMedicineBox />
                  <p className='ml-2 md:text-base text-xs'>Desinfecção</p>
                </div>
                <div className='flex items-center my-1 md:my-0'>
                  <GiSmokeBomb />
                  <p className='ml-2 md:text-base text-xs'>Detetores de Fumo</p>
                </div>
              </div>
            </div>

            <div className='shadow dark:shadow-white rounded-lg p-6'>
              <p className='md:text-lg font-semibold mb-4'>Avaliações</p>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <AssociacaoReview associacaoId={associacao._id} />
              </div>
            </div>
          </div>

          <div className='md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky top-10 h-fit overflow-auto'>
            <BookAssociacaoCta
              discount={associacao.discount}
              price={associacao.price}
              specialNote={associacao.specialNote}
              adults={adults}
              setAdults={setAdults}
              isSocio={associacao.isSocio}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociacaoDetails;