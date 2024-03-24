/**
 * @fileoverview Express server for running tasks using a POST request.
 */

const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Express application for running tasks.
 * @type {express.Application}
 */
const app = express();

/**
 * The port number for the server.
 * @type {number}
 */
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    /**
     * Sends the index.html file as the response.
     * @param {string} path - The path to the file to be sent.
     */
    res.sendFile(__dirname + '/public/index.html');
});

// Route for running tasks
app.post('/runtasks', (req, res) => {
    /**
     * Executes the 'node script.js' command to run tasks.
     * @param {string} command - The command to be executed.
     * @param {Function} callback - The callback function to handle the result of the command execution.
     */
    exec('node script.js', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }
        console.log(stdout);
        res.send('Tasks executed successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
