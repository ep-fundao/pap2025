'use client';

import { useState } from 'react';

import Search from '../Search/Search';

const PageSearch = () => {
  const [associacaoTypeFilter, setAssociacaoTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Search
      associacaoTypeFilter={associacaoTypeFilter}
      searchQuery={searchQuery}
      setAssociacaoTypeFilter={setAssociacaoTypeFilter}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default PageSearch;
