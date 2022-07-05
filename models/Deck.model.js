const { Schema, model } = require("mongoose");

// imagen, name, apiId
const DeckSchema = new Schema({ 
    userId: String,
    iconUrls: String,
    name: String,
    apiId: Number
},
{
    timestamps: true,
  })

const Deck = model("Deck", DeckSchema);

module.exports = Deck;