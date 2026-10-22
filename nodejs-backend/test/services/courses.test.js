const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("courses service", async () => {
  let thisService;
  let courseCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("courses");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (courses)");
  });

  describe("#create", () => {
    const options = {"courseName":"new value","description":"new value","creditHours":23,"prerequisites":"new value"};

    beforeEach(async () => {
      courseCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new course", () => {
      assert.strictEqual(courseCreated.courseName, options.courseName);
assert.strictEqual(courseCreated.description, options.description);
assert.strictEqual(courseCreated.creditHours, options.creditHours);
assert.strictEqual(courseCreated.prerequisites, options.prerequisites);
    });
  });

  describe("#get", () => {
    it("should retrieve a course by ID", async () => {
      const retrieved = await thisService.Model.findById(courseCreated._id);
      assert.strictEqual(retrieved._id.toString(), courseCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"courseName":"updated value","description":"updated value","creditHours":100,"prerequisites":"updated value"};

    it("should update an existing course ", async () => {
      const courseUpdated = await thisService.Model.findByIdAndUpdate(
        courseCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(courseUpdated.courseName, options.courseName);
assert.strictEqual(courseUpdated.description, options.description);
assert.strictEqual(courseUpdated.creditHours, options.creditHours);
assert.strictEqual(courseUpdated.prerequisites, options.prerequisites);
    });
  });

  describe("#delete", async () => {
    it("should delete a course", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const courseDeleted = await thisService.Model.findByIdAndDelete(courseCreated._id);
      assert.strictEqual(courseDeleted._id.toString(), courseCreated._id.toString());
    });
  });
});