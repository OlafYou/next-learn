'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams , usePathname, useRouter} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { Button } from './button';
import { fetchMerchantNFTs } from './user-data';
import { useUser } from './userContext';

export default function Search({ placeholder }: { placeholder: string }) {

  const [inputValue, setInputValue] = useState('');
  const [nfts, setNfts] = useState();
  const {user, setUser} = useUser();
  
 
  const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleClick = async ()=>{
    const nfts = await fetchMerchantNFTs(user?.provider, inputValue)
    setNfts(nfts)
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <Button>Search</Button>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
