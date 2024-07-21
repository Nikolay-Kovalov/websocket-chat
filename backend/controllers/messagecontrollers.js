import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
    try{
    const {message} =  req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
        partisipants: { $all: [ senderId, receiverId]}
    })


    if(!conversation){
        conversation = await Conversation.create({
            partisipants: [senderId, receiverId]
        })
    }

    console.log(conversation)    

    const newMessage = new Message({
        receiverId,
        senderId, 
        message
    })

    console.log(newMessage)

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()])

    res.status(201).json(newMessage)
}
    catch(error){
console.log("Error in sendMessage controller", error.message)
res.status(500).res.json({error: "Internal server error"})
    }
   
}

export const getMessages = async (req, res) => {
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            partisipants: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages")
    
        if(!conversation){
            return res.status(200).json([])
        }
  
        const messages = conversation.messages

        res.status(200).json(messages)
}
catch(error){
    console.log("Error in getMessages controller", error.message)
    res(500).json({error: "Internal server error"})
        }
    }