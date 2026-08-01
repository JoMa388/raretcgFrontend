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
  images_small: string;
  images_large: string;
  price: number
};

export default function AllCardView() {

  const [cards, setCards] = useState<Card[]>([]);

  // pagination implementation
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // currentCards is the subset of cards to display on the current page
  const currentCards = cards.slice(startIndex, endIndex);

  function goToPreviousPage() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToNextPage() {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }


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

  // Scroll to the top of the page when the current page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {currentCards.map((card) => (
              <div 
                key={card.id} 
                onClick={() => handleRedirect(card.id)}
                className="flex items-center gap-4 rounded-md bg-white p-4 shadow-lg shadow-slate-200 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <img
                  src={card.images_small}
                  alt={card.name}
                  className="w-36 h-auto rounded-lg object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 truncate">
                    {card.name}
                  </h3>
                  <p className="mt-3 text-xl font-bold text-slate-900">
                    ${card.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                const isActive = currentPage === pageNumber;

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 text-sm font-medium rounded-md cursor-pointer transition ${isActive ? 'bg-blue-600 text-white border border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-100 border border-transparent'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </>
      )}
        
      
    </div>
  );
}