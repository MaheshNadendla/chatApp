const messageSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String }, // text content
    mediaUrl: { type: String }, // optional media
    messageType: {
      type: String,
      enum: ['text', 'image', 'video', 'audio', 'file'],
      default: 'text'
    },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Message', messageSchema);
  