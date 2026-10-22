
    module.exports = function (app) {
        const modelName = "enrollments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            student: { type:  String , maxLength: 150, index: true, trim: true, comment: "Student, p, false, true, true, true, true, true, true, , , , ," },
course: { type: Schema.Types.ObjectId, ref: "courses", comment: "Course, dropdown, false, true, true, true, true, true, true, courses, courses, one-to-one, courseName," },
startDate: { type: Date, required: true, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
endDate: { type: Date, comment: "End Date, p_date, false, true, true, true, true, true, true, , , , ," },
grade: { type: Boolean, required: false, comment: "Grade, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };