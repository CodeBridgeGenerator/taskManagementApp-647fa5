
    module.exports = function (app) {
        const modelName = "courses";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            courseName: { type:  String , required: true, maxLength: 150, index: true, trim: true, comment: "Course Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , maxLength: 150, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
creditHours: { type: Number, max: 10000000, comment: "Credit Hours, p_number, false, true, true, true, true, true, true, , , , ," },
prerequisites: { type:  String , maxLength: 150, index: true, trim: true, comment: "Prerequisites, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };