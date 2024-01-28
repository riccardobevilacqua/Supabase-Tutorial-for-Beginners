import { useState, useEffect } from 'react'
import supabase from '../config/supabaseClient'

import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const onDelete = async (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id)
    })
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, { ascending: false })

      if (error) {
        setFetchError('Could not fetch smoothies')
        setSmoothies(null)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [orderBy])

  return (
    <div className="page home">
      {fetchError && (
        <p>{fetchError}</p>
      )}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By:</p>
            <button onClick={() => setOrderBy('created_at')} disabled={orderBy === 'created_at'}>Newest</button>
            <button onClick={() => setOrderBy('rating')} disabled={orderBy === 'rating'}>Rating</button>
            <button onClick={() => setOrderBy('title')} disabled={orderBy === 'title'}>Alphabetical</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home