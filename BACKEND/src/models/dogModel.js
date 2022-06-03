const { Schema, model } = require('mongoose')

const DogSchema = new Schema({
    breed: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    weight: { type: String, required: true, unique: true },
    activity: { type: String, required: true },
    care_requirement: { type: String, required: true },
    life_expectancy :{ type: String, required: true},
    imgs:{type:Array,required:false},
    trainingTutorial:{type:String,required:false},
    video:{type:String,required:false}
    },
    {collection:'Dog'}
    )

module.exports = model('Dog', DogSchema)