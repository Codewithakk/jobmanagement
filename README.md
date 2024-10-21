## akshay_s_application2

## Running in dev environment

for Frontend 

1. `cd jobmanagement`
2. `npm install`
3. `npm start`

and for backend
1. `cd jobmanagement`
2. `cd backend`
3. `npm install`
4.  `node server.js or nodemon server.js`

## .env file

MONGO_URI=
EMAIL_USERNAME=
JWT_SECRET=SDfsdfsdf54sd5s
EMAIL_PASSWORD=
BASE_URL=http://localhost:5000
COMPANY_NAME=
EMAIL_USER=
SESSION_SECRET=WErww415wejhg
NODE_ENV=production


## Folder Structure

```
.
├── package.json
├── postcss.config.js
├── public
│   ├── assets
│   │   ├── images --------- All Project Images
│   │   └── fonts ---------- Project fonts
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.jsx
│   ├── components --------- UI and Detected Common Components
│   ├── constants ---------- Project constants
│   ├── hooks -------------- Helpful Hooks
│   ├── index.jsx
│   ├── pages -------------- All route pages
│   ├── Routes.jsx ---------- Routing
│   ├── styles
│   │   ├── index.css ------ Other Global Styles
│   │   └── tailwind.css --- Default Tailwind modules
│   └── util
│       └── index.jsx ------- Helpful utils
└── tailwind.config.js ----- Entire theme config, colors, fonts etc.
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.jsx` is the JavaScript entry point.

You may create subdirectories inside src.

