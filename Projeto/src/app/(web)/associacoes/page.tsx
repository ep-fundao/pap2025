'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getAssociacoes } from '@/libs/apis';
import { Associacao } from '@/models/associacao';
import Search from '@/components/Search/Search';
import RoomCard from '@/components/RoomCard/RoomCard';

const associacoes = () => {
  const [associacaoTypeFilter, setAssociacaoTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const associacaoType = searchParams.get('associacaoType');

    if (associacaoType) setAssociacaoTypeFilter(associacaoType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function fetchData() {
    return getAssociacoes();
  }

  const { data, error, isLoading } = useSWR('get/associacoes', fetchData);

  if (error) throw new Error('Cannot fetch data');
  if (typeof data === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  const filterRooms = (associacoes: Associacao[]) => {
    return associacoes.filter(associacao => {
      // Apply room type filter

      if (
        associacaoTypeFilter &&
        associacaoTypeFilter.toLowerCase() !== 'all' &&
        associacao.type.toLowerCase() !== associacaoTypeFilter.toLowerCase()
      ) {
        return false;
      }

      //   Apply search query filter
      if (
        searchQuery &&
        !associacao.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <div className='container mx-auto pt-10'>
      <Search
        associacaoTypeFilter={associacaoTypeFilter}
        searchQuery={searchQuery}
        setAssociacaoTypeFilter={setAssociacaoTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className='flex mt-20 justify-between flex-wrap'>
        {filteredRooms.map(Associacao => (
          <RoomCard key={Associacao._id} Associacao={Associacao} />
        ))}
      </div>
    </div>
  );
};

export default associacoes;
