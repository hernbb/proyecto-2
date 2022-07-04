const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  name:String,
  username: String,
  password: String,
  email:{
    type: String,
    required:[true, 'Email is required.'],
    match:[/^\S+@\S+\.\S+$/,'Please use a valid email address.'],
    unique:true,
    lowercase:true,
    trim:true

  },
  favorites:  [{	
    type: Schema.Types.ObjectId,
		ref: "Card"
  }]
  //referencias de la bd characrters
});

const User = model("User", userSchema);

module.exports = User;
