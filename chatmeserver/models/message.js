const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 160
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }  
},
{
    timestamps: true
}
);

messageSchema.pre("remove", async function(next){
    try{
    // find the user
      let user = await User.findById(this.user);
    // remove the message from the id provided in messages list
    user.message.remove(this.id);
    // save the user
    await user.save();
    //return next
    return next();
    }catch(e){
     return next(err);
    }
    
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;