import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'

const SmoothieCard = ({
  smoothie,
  onDelete,
}) => {
  const {
    id,
    title,
    method,
    rating,
  } = smoothie
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .delete()
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error deleting smoothie', error)
    }

    if (data) {
      onDelete(id)
    }
  }

  return (
    <div className="smoothie-card">
      <h3>{title}</h3>
      <p>{method}</p>
      <div className="rating">{rating}</div>
      <div className="buttons">
        <Link to={`/${id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default SmoothieCard
