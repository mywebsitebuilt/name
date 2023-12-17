const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises'); // Using the promise-based fs module

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', async (req, res) => {
    const userName = req.body.username;
    console.log(`Received user name: ${userName}`);

    // Save the name to the name.txt file
    await saveToTextFile(userName);

    res.send(`Hello, ${userName}! Your name has been received and saved.`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

async function saveToTextFile(userName) {
    try {
        // Append the user name to the name.txt file
        await fs.appendFile('name.txt', `${userName}\n`);
        console.log('Name saved to name.txt');
    } catch (error) {
        console.error('Error saving name to file:', error);
    }
}
