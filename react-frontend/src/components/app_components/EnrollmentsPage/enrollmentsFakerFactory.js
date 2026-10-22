
import { faker } from "@faker-js/faker";
export default (user,count,courseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
student: faker.lorem.sentence("8"),
course: courseIds[i % courseIds.length],
startDate: faker.date.soon(),
endDate: faker.date.soon(),
grade: faker.datatype.boolean(),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
