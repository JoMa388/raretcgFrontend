"use client"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function DeleteButton( {cardID} ) {

    const router = useRouter();

    const handleClick = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/cards/${cardID}`);
            toast('Card Deleted!')
            console.log('Form submitted successfully');
            console.log("Response:", response.data);
            router.push('/all-cards')
        } catch(error) {
            console.error("Error submitting form:", error);
        } 
        console.log(`card ${cardID} deleted`)
    }

    return(
        <button 
            onClick={handleClick}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
            Delete Card
        </button>
    )

}