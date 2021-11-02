const fs = require('fs').promises;
var fileName = "/Users/timur/Desktop/basic/nodejs/Alotech-fullstack-bootcamp/Hafta_1/fs_module_crud/employees.json";


const createAndWriteFunction = () => {
    var newData = { "name": "Employee 1", "salary": 2000 };
    fs.writeFile(fileName, JSON.stringify(newData), err => {
        if (err) {
            console.log(err)
            return
        }
    }, console.log("yazdı"))
}

async function read() {
    const data = await fs.readFile(fileName, 'utf8', "binary");
    return new Buffer.from(data);
}

const update = async () => {
    var newData = { "name": "Employee 3", "salary": 2005 };
    const readFileValue = await fs.readFile(fileName, 'utf8', "binary");
    fs.writeFile(fileName, readFileValue + JSON.stringify(newData), err => {
        if (err) {
            console.log(err)
            return
        }
    }, console.log("yazdı yeni değeri"))
}

const deleteFile = () => {
    fs.unlink(fileName, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });
}

//createAndWriteFunction();
read().then((e) => {
    console.log(`here ${JSON.stringify(JSON.parse(e))}`)
});
//update();
/* deleteFile(); */
