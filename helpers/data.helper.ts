var faker = require('faker');

export class DataHelper {
    getUser() {
        const user = {
            firstName: faker.name.findName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            telephone: faker.phone.phoneNumber(),
            password: faker.internet.password()
        }
        console.log(user);
        return user;
    }
}