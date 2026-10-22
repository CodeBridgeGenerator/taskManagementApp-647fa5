
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
firstName: faker.lorem.sentence(""),
lastName: faker.lorem.sentence(""),
email: faker.lorem.sentence(""),
phone: faker.lorem.sentence(""),
dateOfBirth: faker.date.soon(),
gender: faker.datatype.boolean(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
