"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

type Card = {
  id: string;
  name: string;
  supertype: string;
  set_name: string;
  rarity: string;
  images: {
    small: string;
    large: string;
  };
  price: number
};

export default function AllCardView() {

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/cards')
            setCards(await response.data.message)
            console.log(cards)
            console.log("Fetch successful")
        } catch (err) {
            console.log(err)
        }
    }
    fetchData()
  }, []);

  console.log(cards)

  const router = useRouter();

  const handleRedirect = (id: String) => {
    router.push(`/card/${id}`);
    console.log(id)
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Cards</h1>
      {cards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No cards found. Add your first card!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cards.map((card) => (
            <div 
              key={card.id} 
              // className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
              onClick={() => handleRedirect(card.id)}
            >
              <img src={card.images.small} />
              {/* <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{card.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className="text-sm font-semibold text-blue-600">{card.supertype}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Rarity:</span>
                    <span className={`text-sm font-semibold ${
                      card.rarity === 'Common' ? 'text-gray-600' :
                      card.rarity === 'Uncommon' ? 'text-green-600' :
                      card.rarity === 'Rare' ? 'text-blue-600' :
                      card.rarity === 'Epic' ? 'text-purple-600' :
                      'text-yellow-600'
                    }`}>
                      {card.rarity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1"></div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}