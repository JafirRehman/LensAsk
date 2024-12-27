const mongoose = require("mongoose");
const express = require("express");
// Define the schema
const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
