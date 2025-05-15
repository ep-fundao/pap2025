'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  setAdults: Dispatch<SetStateAction<number>>;
  price: number;
  discount: number;
  adults: number;
  specialNote: string;
  isSocio: boolean;
  handleBookNowClick: () => void;
};

const BookAssociacaoCta: FC<Props> = props => {
  const {
    price,
    discount,
    specialNote,
    setAdults,
    adults,
    isSocio,
    handleBookNowClick,
  } = props;

  const discountPrice = price - (price / 100) * discount;


  return (
    <div className='px-7 py-6'>
      <h3>
        <span
          className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}
        >
          € {price}
        </span>
        {discount ? (
          <span className='font-bold text-xl'>
            {' '}
            | discount {discount}%. Now{' '}
            <span className='text-tertiary-dark'>$ {discountPrice}</span>
          </span>
        ) : (
          ''
        )}
      </h3>

      <div className='w-full border-b-2 border-b-secondary my-2' />

      <h4 className='my-8'>{specialNote}</h4>

      <div className='flex mt-4'>
        <div className='w-1/2 pr-2'>
          <label
            htmlFor='adults'
            className='block text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Sócios
          </label>
          <input
            type='number'
            id='adults'
            value={adults}
            onChange={e => setAdults(+e.target.value)}
            min={1}
            max={5}
            className='w-full border border-gray-300 rounded-lg p-2.5'
          />
        </div>
      </div>


      <button
        disabled={isSocio}
        onClick={handleBookNowClick}
        className='btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed'
      >
        {isSocio ? 'Sócio' : 'Associe-se!'}
      </button>
    </div>
  );
};

export default BookAssociacaoCta;