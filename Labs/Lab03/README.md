# Welcome to `LAB03`

## Setting up project and things around it
- Firstly, you need to create a project by using the command below
```
npm init -y
```

- Then you can expect the `package.json` file to be created and yes, you can edit most of the thing in here

```json
{
  "name": "Lab03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

- Secondly, you will need to install modules, in this lab, we are going to use `express` for the project bone, `body-parser` for form processing and `nodemon` for server side real-time code-browser apply, don't judge the term I'm using here, try it and you will see it 

```
npm install express body-parser nodemon
```
- Then, you have to go to `package.json` and configure the `start` section from `scripts` like this 

```json
"scripts": {
    "start": "nodemon --inspect index.js",
  },
```
- Now, you are enough to tango with this Lab

## Tips 😆
- Highly recommend using Chrome developer debugger cause of the nice and neat interface which is of course, better than VS Code console. Firstly, open Chrome and search for this `chrome://inspect/#devices`

- Then click `Open dedicated DevTools for Node` to attach it to a running VS Code inspection 

<p>
  <img src = "https://i.ibb.co/Y0zpB3D/image.png"/>
</p>

## [Tutorial videos](https://www.youtube.com/playlist?list=PLu1AuqcHccUgEmma-RME4KxbkoBd8VSc5)

## Links for use 🔗
- [body-parser](https://www.npmjs.com/package/body-parser)
- [email-validator](https://www.npmjs.com/package/email-validator)
- [multer](https://www.npmjs.com/package/multer)