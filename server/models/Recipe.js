import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 50 },
    category: { type: String, enum: ['Korean', 'Western', 'Chinese', 'Japanese', 'Baking', 'Pastry'], required: true },
    content: {
    type: {
        description: { type: String, required: true },
        ingredients: [{ type: String, required: true }],
        cookingTime: { type: Number, required: true }
        },
    required: true
    },
    ImageUrl: { 
        mainImage: {type: String, required: true},
        recipeImage: {type: [String]},
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Recipe', recipeSchema);