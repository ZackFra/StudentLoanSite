const faker = require('faker');
const axios = require('axios').default;

// function that generates a fake acc
// every second to prevent connection refusal
function genAccs(i, stop) {
    setTimeout( () => {
        let name = faker.name.findName();
        let [firstName, lastName] = name.split(' ');
        let user = lastName + faker.random.number();
        let pass = faker.random.word();
        let debt = faker.random.number().toFixed(2);
        let lastFour = faker.random.number() % 10000;
        if(lastFour < 1000) {
            lastFour += 1000;
        }
        let DOB = faker.date.between('1960', '2000').toDateString();
        let request = {
            user,
            pass, 
            debt,
            firstName,
            lastName,
            lastFour,
            DOB
        }

        axios.post('169.254.125.99:5000/CreateAcc', request)
        .then( res => {
            // do nothing
        })
        .catch( err => {
            console.log(err);
        })

        // create another timeout until 
        // we've made as many as required
        if(i < stop) {
            genAccs(i+1, stop);
        }
    }, 1000)
}

genAccs(0, 2000);