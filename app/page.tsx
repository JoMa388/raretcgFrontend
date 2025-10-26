import axios from "axios";
type Card = {
  id: number;
  name: string;
  type: string;
  hp: number
};
export default async function Home() {
  let cards: Card[] = []
  try {
    const { data: { message } } = await axios.get('http://localhost:8000/api/cards')
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    cards = message
  } catch (err) {
    console.log(err)
  }
  return (
    <div className="text-center text-3xl mt-5">
      {cards.map((card) => (
        <div key={card.id}>
          <p>{`Name: ${card.name} | HP: ${card.hp} | Type: ${card.type}`}
          </p>
        </div>
      ))}
    </div>
  );
}
