const faker = require('faker');
const axios = require('axios').default;

// function that generates a fake acc
// every second to prevent connection refusal
function gen(i, stop) {
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

        axios.post('http://167.172.138.178:5000/Data/CreateAcc', request)
        .then( () => {
            console.log('account created! :)');
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

// takes URL, number of documents, field1, field2, ...
function genDocs(URL, numDocs) {
    let record = {};
    let args = Array.from(arguments).slice(2, arguments.length);
    console.log(args);
    for(let i = 0; i < numDocs; i++) {
        args.forEach( arg => {
            let {name, type} = arg;
            switch(type) {
                case 'name':
                    record[name] = faker.name.findName();
                    break;
                case 'firstName':
                    record[name] = faker.name.firstName();
                    break;
                case 'lastName':
                    record[name] = faker.name.lastName();
                    break;

                // numbers imply arg = {name, type, digits} where
                // size is the number of digits
                case 'number':
                    record[name] = faker.random.number() % Math.pow(10, arg.digits);
                    if(record[name] < Math.pow(10, arg.digits)) {
                        record[name] += Math.pow(10, arg.digits);
                    }
                    break;
                case 'float':
                    record[name] = faker.random.number().toFixed(2);
                    break;
                case 'date string':
                    record[name] = faker.random.date().toDateString();
                    break;
                default:
                    throw 'Invalid Parameters';
            }
        });
        console.log(record);
    }
}


genDocs('fuckyou', 100, {name: 'SSN', type: 'number', digits: 3}, {name: 'first name', type: 'firstName'});