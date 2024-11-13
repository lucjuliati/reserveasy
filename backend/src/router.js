import express from 'express'
import users from './controllers/users.js'

const router = express.Router()

router.get('/users/', users.getUsers)
router.post('/users/guests', users.createGuest)
// router.get('/restaurants', getRestaurants)
// router.get('/restaurants/:id', getRestaurantById)
// router.post('/restaurants/:id/check-availability', checkAvailability)

export default router
