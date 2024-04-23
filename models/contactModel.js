const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    firstName: {
      type: String,
      required: [true, "Please add a firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a lastName"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
    },
  },
  {
    timestamps: true,
    collection: "Contacts",
  }




 
 
)

module.exports = mongoose.model('Contact', contactSchema)
