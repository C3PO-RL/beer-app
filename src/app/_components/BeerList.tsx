"use client";

import { JSX, useState } from "react";
import BeerCard from "./BeerCard";
import type { Beer } from "@/types/beer";
import Image from "next/image";

interface BeerListProps {
  beers: Beer[];
}

export default function BeerList({ beers }: BeerListProps): JSX.Element {
  const [selectedBeer, setSelectedBeer] = useState<string | null>(null);

  const handleSelectBeer = (beerName: string) => {
    setSelectedBeer(beerName);
  };

  const handleCloseDetails = () => {
    setSelectedBeer(null);
  };

  const selectedBeerData = beers.find((beer) => beer.name === selectedBeer);

  return (
    <>
      {selectedBeerData ? (
        <div className="animate-fade-in">
          <button
            onClick={handleCloseDetails}
            className="mb-4 flex items-center text-gray-500 cursor-pointer"
          >
            ← Back to all beers
          </button>
          <BeerCard beer={selectedBeerData} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {beers.map((beer: Beer) => (
            <div
              key={beer.name}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow animate-fade-in"
              onClick={() => handleSelectBeer(beer.name)}
            >
              <div className="relative h-40 w-full">
                <Image
                  fill
                  src={beer.image || "/placeholder.svg?height=300&width=500"}
                  alt={beer.name}
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{beer.name}</h3>
                  <p className="font-bold">${beer.price.toFixed(2)}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {beer.quantity > 0
                    ? `${beer.quantity} available`
                    : "Out of stock"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
