import React, { useState } from 'react'
import {
  CloseButton, ModalOverlay, RestaurantCuisine,
  RestaurantImage, RestaurantName, RestaurantRating
} from './styles'
import api from '../utils/api'
import session from '../utils/session'
import { useNavigate } from 'react-router-dom'

function RestaurantModal({ restaurant, onClose }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ open: false, date: '', time: '' })

  const handleChange = (key, value) => setForm({ ...form, [key]: value })

  const handleReserve = () => {
    if (session.isAuth()) {
      handleChange('open', true)
    } else {
      navigate('/login')
    }
  }

  const addReservation = () => {
    console.log(form)
    if (!form.time || !form.date) return

    let data = {
      date: `${form.date} ${form.time}`
    }

    console.log(data)

    api.post(`/restaurants/${restaurant.id}/reservations`, data).then(res => {
      console.log(res)
    }).catch(console.error)
  }

  const minDate = () => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)
    return currentDate.toLocaleDateString("pt-BR").split("/").reverse().join("-")
  }

  return (
    <ModalOverlay onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <RestaurantImage src={restaurant.image} alt={restaurant.name} />
        <RestaurantName>{restaurant.name}</RestaurantName>
        <RestaurantCuisine>{restaurant.cuisine} Cuisine</RestaurantCuisine>
        <RestaurantRating>★ {restaurant.rating.toFixed(1)}</RestaurantRating>
        <div className="align">
          {form.open ?
            <div>
              <label>
                Date
                <input
                  type="date"
                  min={minDate()}
                  value={form.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </label>
              <label>
                Time
                <input
                  type="time"
                  min="08:00"
                  max="23:00"
                  value={form.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                />
              </label>
              <div className="align" style={{ marginTop: '0px' }}>
                <button id="cancel-reserve" onClick={() => handleChange('open', false)}>Cancel</button>
                <button id="add-reserve" onClick={addReservation}>Save</button>
              </div>
            </div>
            :
            <button id="reserve" onClick={handleReserve}>Reserve</button>
          }
        </div>
      </div>
    </ModalOverlay>
  )
}

export default RestaurantModal
