import express from 'express'
import { 
    getRestaurants, 
    getRestaurantById, 
    checkAvailability 
} from './controllers/restaurantController.js'

const router = express.Router()

router.get('/api/hello', (req, res) => res.send("Hello World!"))
router.get('/hello', (req, res) => res.send("Hello World! not api"))
router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurantById)
router.post('/restaurants/:id/check-availability', checkAvailability)

export default router
