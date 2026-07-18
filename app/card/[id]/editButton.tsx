"use client"
import { useRouter } from 'next/navigation';

export default function EditButton( {cardID} ) {

    const router = useRouter();

    const handleClick = async () => {
        router.push(`/edit-card/${cardID}`);
        console.log("redirected to edit page")
    }

    return(
        <button 
            onClick={handleClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
            Edit Card
        </button>
    )

}