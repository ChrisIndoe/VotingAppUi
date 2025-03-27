import update from 'immutability-helper'
import { useCallback, useState, useEffect } from 'react'
import { Card } from './Card.js'
import axios from 'axios';
const style = {
  width: 70,
}
export const Container = () => {
  {
    useEffect(() => {

        const fetchData = async () => {
            try {
                axios.get(`http://localhost:5269/games/1`)
                .then(res => {
                    setCards(() => res.data)
                })
            } catch (err) {
            } finally {
            }
          };
      
          fetchData();
      }, []); // The effect will run only if count changes   
    

    const [cards, setCards] = useState([])
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const submitVote = useCallback((index) => {
      console.log('Voted for', cards[index].name);
      alert('Voted for ');
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          name={card.name}
          moveCard={moveCard}
          coverid={card.igdbImageId}
        />
      )
    }, [])
    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        <button onClick={() => console.log(cards)}>Log</button>
      </>
    )
  }
}
