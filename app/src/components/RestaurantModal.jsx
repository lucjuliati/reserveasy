import React, { useState } from 'react'
import { CloseButton, ModalOverlay, RestaurantCuisine, RestaurantImage, RestaurantName, RestaurantRating } from './styles'
import { useNavigate } from 'react-router-dom'
import Toast from './Toast'
import api from '../utils/api'
import session from '../utils/session'

function RestaurantModal({ restaurant, onClose }) {
  const navigate = useNavigate()
  const [toast, setToast] = useState({ active: false, title: "", message: "" })
  const [cooldown, setCooldown] = useState(false)
  const [form, setForm] = useState({
    open: false,
    date: new Date().toISOString().slice(0, 10),
    time: '12:00'
  })

  const handleChange = (key, value) => setForm({ ...form, [key]: value })

  const handleReserve = () => {
    if (session.isAuth()) {
      handleChange('open', true)
    } else {
      navigate('/login')
    }
  }

  const addReservation = () => {
    if (!form.time || !form.date) return

    let data = {
      date: `${form.date} ${form.time}`
    }

    if (isPast(data.date)) {
      setToast({ active: true, title: "Error", message: "You can't reserve a past date!" })
      setTimeout(() => {
        setToast({ active: false, title: "", message: "" })
      }, 4500)
      return
    }

    api.post(`/restaurants/${restaurant.id}/reservations`, data).then(res => {
      setCooldown(true)
      setToast({ active: true, title: "Success", message: "Reservation successfully made!" })
      setTimeout(() => {
        setToast({ active: false, title: "", message: "" })
        onClose()
      }, 4500)
    }).catch(console.error)
  }

  const isPast = (date) => {
    const now = new Date().getTime()
    const rDate = new Date(date).getTime()
    return rDate <= now
  }

  const minDate = () => {
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)
    return currentDate.toLocaleDateString("pt-BR").split("/").reverse().join("-")
  }

  return (
    <>
      {toast.active
        ?
        <Toast title={toast.title} message={toast.message} />
        :
        null
      }

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
                  <button id="cancel-reserve" onClick={() => handleChange('open', false)}>
                    Cancel
                  </button>
                  <button id="add-reserve" onClick={addReservation} disabled={cooldown}>
                    Save
                  </button>
                </div>
              </div>
              :
              <button id="reserve" onClick={handleReserve}>Reserve</button>
            }
          </div>
        </div>
      </ModalOverlay>
    </>
  )
}

export default RestaurantModal
