"use client"
import React, { ChangeEvent, useState } from 'react';
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"


const GlobalSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full my-5 p-3 rounded bg-gray-400/20">
        <div>
          <input
            type="text"
            placeholder="Search some photo ~"
            value={searchValue}
            onChange={handleChange}
            className={`px-3 py-2 bg-transparent focus:outline-none focus:ring-0`}
          />
        </div>
        <div>
          <Button className="bg-blue-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-700">
            Search
          </Button>
        </div>
      </div>
    </>
  )
}
export default GlobalSearch