const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const CardSchema = new Schema(
  {
    name: String,
    id: Number,
    maxLevel: Number,
    iconUrls: {medium:String}
  },
  {
    timestamps: true,
  }
);


CardSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});


// const Character = model("Character", userSchema);

module.exports = model("Card", CardSchema);
