import update from 'immutability-helper'
import { useCallback, useState, useEffect } from 'react'
import { Card } from './Card.js'
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://annoyedvotingapi-d7e9c0emgxhhb6cr.canadacentral-01.azurewebsites.net';

const style = {
  width: 70,
}

export const Container = () => {
  {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
            const fetchData = async () => {
                try {
                    setLoading(true)
                    
                    const ballotId = 2;
                    const response = await axios.get(`${API_URL}/games/${ballotId}`, { timeout: 5000 })
                    setCards(response.data)
                    setError(null)
                } catch (err) {
                    console.error('Error fetching games:', err);
                    setError('Failed to load games. Please try again later.')
                } finally {
                    setLoading(false)
                }
            };
      
        fetchData();
    }, []); 


    const handleSubmitVotes = async () => {
      var userid = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
      const votingData = cards.map((card, index) => ({
        BallotId: 1,
        GameId: card.id,
        UserId: userid,
        Rank: index + 1
      }));

      try {
        await axios.post(`${API_URL}/votes`, votingData);
        alert('Votes submitted successfully!');
      } catch (error) {
        console.error('Error submitting votes:', error);
        alert('Failed to submit votes');
      }
    };

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

    if (loading) {
      return <div>Loading games...</div>
    }

    if (error) {
      return <div>{error}</div>
    }

    return (
      <>
        <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        <button onClick={handleSubmitVotes}>Submit Votes</button>
      </>
    )
  }
}