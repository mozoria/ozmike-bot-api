const express = require('express')
const passport = require('passport')
const Shoe = require('../models/shoe')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// INDEX
// GET /questions
router.get('/shoes', requireToken, (req, res, next) => {
  Shoe.find()
    .populate('owner', 'email')
    .then(shoes => {
      // `questions` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return shoes.map(shoe => shoe.toObject())
    })
    // respond with status 200 and JSON of the questions
    .then(shoes => res.status(200).json({ shoes: shoes }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /questions/5a7db6c74d55bc51bdf39793
router.get('/questions/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Shoe.findById(req.params.id)
    .populate('owner', 'email')
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "question" JSON
    .then(question => res.status(200).json({ question: question.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /questions/5a7db6c74d55bc51bdf39793
router.get('/mysurvey/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  const userId = req.user._id
  Shoe.find({ owner: userId })
    .then(shoe => {
      return shoe.map(shoe => shoe.toObject())
    })
    .then(handle404)
    .then(shoes => res.status(200).json({ shoes: shoes }))

    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /questions
router.post('/shoes', requireToken, (req, res, next) => {
  // set owner of new question to be current user
  req.body.shoe.owner = req.user.id

  Shoe.create(req.body.shoe)
    // respond to succesful `create` with status 201 and JSON of new "question"
    .then(shoe => {
      res.status(201).json({ shoe: shoe.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /questions/5a7db6c74d55bc51bdf39793
router.patch('/shoes/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.shoe.owner

  Shoe.findById(req.params.id)
    .then(handle404)
    .then(shoe => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, shoe)

      // pass the result of Mongoose's `.update` to the next `.then`
      return shoe.updateOne(req.body.shoe)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /questions/5a7db6c74d55bc51bdf39793
router.delete('/shoes/:id', requireToken, (req, res, next) => {
  Shoe.findById(req.params.id)
    .then(handle404)
    .then(shoe => {
      // throw an error if current user doesn't own `question`
      requireOwnership(req, shoe)
      // delete the question ONLY IF the above didn't throw
      shoe.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
