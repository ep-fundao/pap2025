'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FC } from 'react';

type Props = {
  associacaoTypeFilter: string;
  searchQuery: string;
  setAssociacaoTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  associacaoTypeFilter,
  searchQuery,
  setAssociacaoTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAssociacaoTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(`/associacoes?associacaoType=${associacaoTypeFilter}&searchQuery=${searchQuery}`);
  };

  return (
    <section className='bg-tertiary-light px-4 py-6 rounded-lg'>
      <div className='container mx-auto flex gap-4 flex-wrap justify-between items-center'>
        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Tipo de Associação
          </label>
          <div className='relative'>
            <select
              value={associacaoTypeFilter}
              onChange={handleRoomTypeChange}
              className='w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none'
            >
              <option value='All'>Todas</option>
              <option value='culturais'>Culturais</option>
              <option value='desportivas'>Desportivas</option>
              <option value='outras'>Outras</option>
            </select>
          </div>
        </div>

        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Pesquise
          </label>
          <input
            type='search'
            id='search'
            placeholder='Search...'
            className='w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white'
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>

        <button
          className='btn-primary'
          type='button'
          onClick={handleFilterClick}
        >
          Pesquise
        </button>
      </div>
    </section>
  );
};

export default Search;
