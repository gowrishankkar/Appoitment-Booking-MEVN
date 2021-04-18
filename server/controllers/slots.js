const Slot = require('../models/slots');

const slot_index = (req, res) => {
  Slot.find().sort({ createdAt: -1 })

}

const slot_details = (req, res) => {
  const id = req.params.id;

}

const slot_create_get = (req, res) => {
  // res.render('create', { title: 'Create a new blog' });
}

const slot_create = (req, res) => {

}

const slot_delete = (req, res) => {
  const id = req.params.id;
  Slot.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  slot_index, 
  slot_details, 
  slot_create_get, 
  slot_create, 
  slot_delete
}