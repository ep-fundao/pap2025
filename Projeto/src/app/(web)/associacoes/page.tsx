'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Search from '@/components/Search/Search';
import { getAssociacoes } from '@/libs/apis';
import { Associacao } from '@/models/associacao';
import AssociacaoCard from '@/components/AssociacaoCard/AssociacaoCard';

const Associacoes = () => {
  const [associacaoTypeFilter, setTypeAssociacaoFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const typeAssociacoes = searchParams.get('typeAssociacao');

    if (typeAssociacoes) setTypeAssociacaoFilter(typeAssociacoes);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  const { data, error, isLoading } = useSWR('get/associaoes', getAssociacoes);

  if (error) throw new Error('Cannot fetch data');
  if (typeof data === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');

  const filterAssociacao = (associacoes: Associacao[]) => {
    return associacoes.filter((assoc: Associacao) => {
      if (
        associacaoTypeFilter &&
        associacaoTypeFilter.toLowerCase() !== 'all' &&
        assoc.type.toLowerCase() !== associacaoTypeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !assoc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredAssociacao = filterAssociacao(data || []);

  return (
    <div className='container mx-auto pt-10'>
      <Search 
        associacaoTypeFilter={associacaoTypeFilter}
        searchQuery={searchQuery}        
        setAssociacaoTypeFilter={setTypeAssociacaoFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className='flex mt-20 justify-between flex-wrap'>
        {filteredAssociacao.map(assoc => (
            <AssociacaoCard key={assoc._id} associacao={assoc} />
        ))}
      </div>
    </div>
  );
};

export default Associacoes;