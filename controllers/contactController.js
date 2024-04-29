const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");
const User = require("../models/userModel");

// @desc    Get contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(contacts);
});

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Private
const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc    Set contact
// @route   POST /api/contacts
// @access  Private
const setContact = asyncHandler(async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  // Check if any of the required properties are missing or empty
  if (!firstName || !lastName || !phoneNumber) {
    res.status(400);
    throw new Error("Please provide values for all required fields");
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    phoneNumber,
    user: req.user.id,
  });

  res.status(200).json(contact);
});

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Privater
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedContact);
});

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the contact user
  if (contact.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await contact.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
  getContactById,
};
