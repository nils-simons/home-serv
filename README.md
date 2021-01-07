# Home Serv

Home Serv ist a Computer Automatisation Tool. With Home Serv you can create action and trigger these with voice (Google Assistant, Amazon Alexa, ...).


## How to use

You need to download the latest release of Home Serv. You need a IFTTT account.
After launching the app open the port on your router, the default port ist 5599, but you can change it in the settings.
After you finish you can create your first action.
To do so click on the create button in the lower right corner of the app. Then enter the name of your action and the executable path of your action.
After clicking on the create button your get a json string back.
Copy the json string and create a new applet in IFTTT, choose "Webhooks" for "Then That" and put your public ip followed by the port and "/home-serv". For the method select POST and for Content type select "application/json". Finally put the copied text in the body field.

### [Video Tutorial](https://www.youtube.com/watch?v=ZGgI9ItTQik)

## To do

||STATUS|
|----------------|-------------------------------|
|Linux Support|-|
|MacOS Support|-|
|Add payload field to modify section|-|