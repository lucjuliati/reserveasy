import { ModalOverlay, ReservationItem } from "./styles"
import { FaTimes } from "react-icons/fa"

export function ReservationsModal({ reservations, toggle, remove }) {
  const formatDate = (date) => {
    try {
      let dateParams = date.toLocaleString().replace("T", "-").replace(/:/g, "-").split("-").slice(0, 5)
      dateParams[1] = dateParams[1] - 1

      return new Date(...dateParams).toLocaleString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    } catch (err) {
      return "---"
    }
  }

  const isPast = (date) => {
    const now = new Date().getTime()
    const rDate = new Date(date).getTime()
    
    return rDate <= now
  }

  return (
    <ModalOverlay onClick={toggle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Reservations</h2>
        {reservations?.length == 0
          ?
          <p style={{ opacity: 0.75, textAlign: 'center', marginTop: '25px' }}>
            You don't have any reservations
          </p>
          :
          null
        }
        {reservations.map((reservation, key) => (
          <ReservationItem key={key}>
            <span id="close" onClick={() => remove(reservation)}>
              <FaTimes />
            </span>
            <img src={reservation?.image} height={70} width={70} />
            <div>
              <strong>{reservation?.name}</strong>
              <p
                className="reservation-time"
                style={{ color: isPast(reservation?.date) ? 'tomato' : '#111' }}>
                {formatDate(reservation?.date)}
              </p>
            </div>
          </ReservationItem>
        ))}
      </div>
    </ModalOverlay >
  )
}