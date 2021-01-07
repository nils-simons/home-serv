const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');
const exec = require('child_process').execFile;
app.setMaxListeners(150)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/home-serv', function(req, res) {
    action_handler(req, res)
})


async function action_handler(req, res) {
    try {
        var config = fs.readFileSync(path.join(__dirname, 'data/config.json'))
        var config = JSON.parse(config)
        var action_data = fs.readFileSync(path.join(__dirname, 'data/actions_data.json'))
        var action_data = JSON.parse(action_data)
        var key = req.body.key
        var action_name = req.body.action_name
        if (key == config.server_secret_key) {
            if (action_data.all_actions.includes(action_name)) {
                res.sendStatus(200)
                ioa = action_data.all_actions.indexOf(action_name)
                console.log(action_data.all_actions_data[ioa])
                exec(action_data.all_actions_data[ioa][1], function(err, data) {
                    console.log("Opening: " + action_data.all_actions_data[ioa][1])
                });
            } else {
                res.sendStatus(500)
            }
        } else {
            res.sendStatus(400)
        }
    } catch (error) {
        res.sendStatus(501)
        return
    }
}


var config = fs.readFileSync(path.join(__dirname, 'data/config.json'));
var config = JSON.parse(config);

app.listen(config.server_port, () => {
    console.log(`Server listening at *:${config.server_port}`)
})