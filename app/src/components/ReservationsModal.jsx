import { ModalOverlay, ReservationItem } from "./styles"

export function ReservationsModal({ reservations, toggle }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  return (
    <ModalOverlay onClick={toggle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Reservations</h2>
        {reservations.map((reservation, key) => (
          <ReservationItem key={key}>
            <img src={reservation?.image} height={80} width={80} />
            <div>
              <strong>{reservation?.name}</strong>
              <p>{formatDate(reservation?.date)}</p>
            </div>
          </ReservationItem>
        ))}
      </div>
    </ModalOverlay>
  )
}