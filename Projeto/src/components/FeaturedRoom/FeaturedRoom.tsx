'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Associacao } from '@/models/associacao';
import Link from 'next/link';

type Props = {
  featuredAssociacao: Associacao;
};

 const FeaturedAssociacao: FC<Props> = props => {
  const { featuredAssociacao } = props;

  return (
    <section className='flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto'>
      <div className='md:grid gap-8 grid-cols-1'>
        <div className='rounded-2xl overflow-hidden h-48 mb-4 md:mb-0'>
          <Image
            src={featuredAssociacao.coverImage.url}
            alt={featuredAssociacao.name ?? 'Associacao em Destaque'}
            width={300}
            height={300}
            className='img scale-animation'
          />
        </div>

        <div className='grid grid-cols-2 gap-8 h-48'>
          {featuredAssociacao.images?.slice(1, 3).map((image) => (
            <div key={image._key} className='rounded-2xl overflow-hidden'>
              {image?.url && (
                <Image
                  src={image.url}
                  alt={featuredAssociacao.name ?? 'Logo da Associação'}
                  width={300}
                  height={300}
                  className='img scale-animation'
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='md:py-10 md:w-1/2 text-left'>
        <h3 className='font-heading mb-12'>Associação Destacada</h3>
        <p className='font-normal max-w-md'>{featuredAssociacao.description}</p>

        <div className='flex flex-col md:flex-row md:items-end justify-between mt-5'>
          <div className='flex mb-3 md:mb-0'>
            <div className='flex gap-3 flex-col items-center justify-center mr-4'>
              <p className='text-xs lg:text-xl text-center'>Preço para ser Sócio</p>
              <p className='md:font-bold flex font-medium text-lg xl:text-5xl'>
                $ {featuredAssociacao.price ?? '--'}
              </p>
            </div>
            <div className='flex gap-3 flex-col items-center justify-center mr-4'>
              <p className='text-xs lg:text-xl text-center'>Desconto</p>
              <p className='md:font-bold flex font-medium text-lg xl:text-5xl'>
                $ {featuredAssociacao.discount ?? '--'}
              </p>
            </div>
          </div>

          {featuredAssociacao.slug?.current && (
            <Link
              href={`/associacoes/${featuredAssociacao.slug.current}`}
              className='border h-fit text-center border-tertiary-dark text-tertiary-dark px-3 py-2 lg:py-5 lg:px-7 rounded-2xl font-bold lg:text-xl'
            >
              Mais Detalhes
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAssociacao;