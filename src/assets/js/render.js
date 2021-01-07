// const publicIp = require('public-ip');
const data = require('./data/config.json');
const actionsData = require('./data/actions_data.json');
const fileDialog = require('file-dialog');

console.log(data)
const doc = document
const body = doc.querySelector('.body')
const settingsBtn = doc.querySelector('.div-settings')
const settingsSec = doc.querySelector('.sec-settings')
const newSec = doc.querySelector('.sec-new')
const newBtn = doc.querySelector('.div-new')
const settingsBackBtn = doc.querySelector('.div-settings-back')
const newBackBtn = doc.querySelector('.div-new-back')
// const settingsInputServerIp = doc.querySelector('.input-server-host')
const settingsInputServerPort = doc.querySelector('.input-server-port')
const settingsInputServerKey = doc.querySelector('.input-server-key')
const settingsSaveBtn = doc.querySelector('.btn-settings-save')
const settingsSavedDiv = doc.querySelector('.div-settings-saved')
const secActionsBoxes = doc.querySelector('.sec-actions-boxes')
const inputNewActionName = doc.querySelector('.input-new-action-name')
const inputNewActionPath = doc.querySelector('.input-new-action-path')
const btnCreateAction = doc.querySelector('.btn-new-create')
const txtCreateActionPayload = doc.querySelector('.txt-new-payload')
const secEdit = doc.querySelector('.sec-edit')
const editBackBtn = doc.querySelector('.div-edit-back')
const inputEditActionName = doc.querySelector('.input-edit-action-name')
const inputEditActionPath = doc.querySelector('.input-edit-action-path')
const btnEditDel = doc.querySelector('.btn-edit-del')
const btnEditSave = doc.querySelector('.btn-edit-save')

// SETTINGS
settingsBtn.addEventListener('click', () => {
    settingsSec.style.display = "block"
    settingsBtn.style.display = "none"
    newBtn.style.display = "none"
    body.style.overflow = "hidden"
})

settingsBackBtn.addEventListener('click', () => {
    settingsSec.style.display = "none"
    settingsBtn.style.display = "block"
    newBtn.style.display = "block"
    body.style.overflow = "auto"
})

settingsInputServerPort.value = data.server_port
settingsInputServerKey.value = data.server_secret_key

settingsInputServerKey.addEventListener('click', () => {
    if (settingsInputServerKey.type == "password") {
        settingsInputServerKey.type = "text"
    } else {
        settingsInputServerKey.type = "password"
    }
})

settingsSaveBtn.addEventListener('click', () => {
    settingsSaveBtn.innerHTML = "..."
    var server_data = { 
        server_port: settingsInputServerPort.value,
        server_secret_key: settingsInputServerKey.value
    };
    var server_data = JSON.stringify(server_data);
    console.log(server_data)
    fs.writeFileSync(path.join(__dirname, 'data/config.json'), server_data);
    settingsSavedDiv.style.display = "block"
    settingsSaveBtn.innerHTML = "Saved"
})

// EDIT ACTION

function recFindByExt(base,ext,files,result) 
{
    files = files || fs.readdirSync(base) 
    result = result || [] 

    files.forEach( 
        function (file) {
            var newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                } 
            }
        }
    )
    return result
}

svgEdit = `<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.86515 0.21515L0.78485 0.13485C0.762346 0.112347 0.731825 0.0997056 0.7 0.0997056C0.668175 0.0997056 0.637654 0.112347 0.61515 0.13485L0.1 0.65V0.9H0.35L0.86515 0.38485C0.887653 0.362346 0.900294 0.331825 0.900294 0.3C0.900294 0.268175 0.887653 0.237654 0.86515 0.21515ZM0.2 0.8V0.69145L0.56035 0.33105L0.66895 0.43965L0.3086 0.8H0.2ZM0.73965 0.36895L0.79445 0.31415C0.79631 0.312293 0.797785 0.310087 0.798791 0.307659C0.799798 0.305231 0.800316 0.302628 0.800316 0.3C0.800316 0.297372 0.799798 0.294769 0.798791 0.292341C0.797785 0.289913 0.79631 0.287707 0.79445 0.28585L0.71415 0.20555C0.712293 0.20369 0.710087 0.202215 0.707659 0.201209C0.705231 0.200202 0.702628 0.199684 0.7 0.199684C0.697372 0.199684 0.694769 0.200202 0.692341 0.201209C0.689913 0.202215 0.687707 0.20369 0.68585 0.20555L0.63105 0.26035L0.73965 0.36895Z\" fill=\"#30363D\"/>`

function updateActionPanel() {
    secActionsBoxes.innerHTML = ""
    actionsData.all_actions.forEach(elm => {
        console.log(elm)
        indexOfAction = actionsData.all_actions.indexOf(elm)
        console.log(indexOfAction)
        console.log(actionsData.all_actions_data[indexOfAction][1])
        secActionsBoxes.innerHTML += `<div class=\"action-box\"><span>${elm}</span><svg onclick=\"editAction(${indexOfAction})\" class=\"svg-edit\" width=\"26\" height=\"26\" viewBox=\"0 0 1 1\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">${svgEdit}</svg></div>`
    });
}
updateActionPanel()
function editAction(indexOfAction) {
    btnEditSave.innerHTML = "Save Action"
    btnEditDel.innerHTML = "Delete Action"
    secEdit.style.display = "block"
    settingsBtn.style.display = "none"
    newBtn.style.display = "none"
    body.style.overflow = "hidden"
    inputEditActionName.value = actionsData.all_actions[indexOfAction]
    inputEditActionPath.value = actionsData.all_actions_data[indexOfAction][1]
    inputEditActionPath.addEventListener('click', () => {
        fileDialog({ accept: '.exe' })
            .then(files => {
                console.log(files[0].path)
                inputEditActionPath.value = files[0].path
        })
    })

    btnEditDel.addEventListener('click', () => {
        btnEditDel.innerHTML = "..."
        actionsData.all_actions.splice(indexOfAction, 1)
        actionsData.all_actions_data.splice(indexOfAction, 1)
        fs.writeFileSync(path.join(__dirname, 'data/actions_data.json'), JSON.stringify(actionsData));
        updateActionPanel()
        btnEditDel.innerHTML = "Deleted"
    })

    btnEditSave.addEventListener('click', () => {
        if (actionsData.all_actions.includes(inputEditActionName.value)) {
            alert("Name already given.")
        } else {
            btnEditSave.innerHTML = "..."
            actionsData.all_actions[indexOfAction] = inputEditActionName.value
            actionsData.all_actions_data[indexOfAction][1] = inputEditActionPath.value
            fs.writeFileSync(path.join(__dirname, 'data/actions_data.json'), JSON.stringify(actionsData));
            updateActionPanel()
            btnEditSave.innerHTML = "Saved"
        }
    })
}

editBackBtn.addEventListener('click', () => {
    secEdit.style.display = "none"
    settingsBtn.style.display = "block"
    newBtn.style.display = "block"
    body.style.overflow = "auto"
})

// NEW ACTION

newBtn.addEventListener('click', () => {
    newSec.style.display = "block"
    settingsBtn.style.display = "none"
    newBtn.style.display = "none"
    body.style.overflow = "hidden"
    inputNewActionName.value = ""
    inputNewActionPath.value = ""
    txtCreateActionPayload.innerHTML = ""
    txtCreateActionPayload.style.display = "none"
})

newBackBtn.addEventListener('click', () => {
    newSec.style.display = "none"
    settingsBtn.style.display = "block"
    newBtn.style.display = "block"
    body.style.overflow = "auto"
})

inputNewActionPath.addEventListener('click', () => {
fileDialog({ accept: '.exe' })
    .then(files => {
        console.log(files[0].path)
        inputNewActionPath.value = files[0].path
})
})

btnCreateAction.addEventListener('click', () => {
    btnCreateAction.innerHTML = "..."
    if (actionsData.all_actions.includes(inputNewActionName.value)) {
        alert("Name already given.")
        btnCreateAction.innerHTML = "Create Action"
        return
    } else {
        actionsData.all_actions.push(inputNewActionName.value)
        action_arr = [inputNewActionName.value, inputNewActionPath.value]
        actionsData.all_actions_data.push(action_arr)
        fs.writeFileSync(path.join(__dirname, 'data/actions_data.json'), JSON.stringify(actionsData));
        txtCreateActionPayload.style.display = 'inline-block'
        txtCreateActionPayload.innerHTML = `{"key": "${data.server_secret_key}", "action_name": "${inputNewActionName.value}"}`
        updateActionPanel()
        btnCreateAction.innerHTML = "Created"
        return
    }
})