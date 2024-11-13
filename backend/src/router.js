import express from 'express'
import users from './controllers/users.js'
import restaurants from './controllers/restaurants.js'
import { auth } from './middleware/auth.js'

const router = express.Router()

router.post('/users/', users.signUp)
router.post('/users/login', users.login)
router.post('/users/guests', auth, users.createGuest)
router.get('/restaurants', restaurants.list)
router.post('/restaurants/reservations', auth, restaurants.addReservation)
router.delete('/restaurants/reservations/:id', auth, restaurants.removeReservation)

export default router
