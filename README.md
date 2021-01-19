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
|Nicer JS and CSS|working on|
|Linux Support|-|
|MacOS Support|-|
|Add payload field to modify section|-|

## License

MIT License

Copyright (c) 2021 IchBinHanz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
