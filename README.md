<a name="readme-top"></a>

<div align="center">
<!--   <img src="murple_logo.png" alt="logo" width="140"  height="auto" /> -->
  <br/>

  <h3><b>Notifications API README</b></h3>

</div>

<!-- TABLE OF CONTENTS -->

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [❓ FAQ (OPTIONAL)](#faq)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 [notifications-api] <a name="about-project"></a>

<!-- > The notifications API is a service that aims at providing notification services to any application (Mobile, Web etc) -->

**[notifications-api]** The notifications API is a service that aims at providing notification services to any application (Mobile, Web etc)

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<!-- > Describe the tech stack and include only the relevant sections that apply to your project. -->

<!-- <details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
  </ul>
</details> -->

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
  </ul>
</details>

<!-- <details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details> -->

<!-- Features -->

### Key Features <a name="key-features"></a>

> Describe between 1-3 key features of the application.

- **[Send SMS with Twilio (or any provider)]**
- **[Send emails]**
- **[Send Push Notifications]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LIVE DEMO -->

## 🚀 Live Demo <a name="live-demo"></a>

> Add a link to your deployed project.

- [Live Demo Link](http://notification-alb-250089916.eu-north-1.elb.amazonaws.com:3000/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

> This guide helps you set up the Notification API locally using Docker or manually with Node.js.

To get a local copy up and running, follow these steps.

### Prerequisites

Before you begin, make sure you have:

- **[Node.js (v18+) and npm installed OR]**
- **[Docker installed and running]**
- **[Git ]**

### Setup

Clone this repository to your desired folder:

```sh
git clone https://github.com/your-username/notification-api.git
cd notification-api

```

### Install

Install this project with:
> Option 1 [With Docker -Recommended]

```sh
docker build -t notification-app .
docker run -p 3000:3000 notification-app

```

> Option 2 [Run with Node.js (Manual Setup)]

```sh
npm install

```

### Usage

To run the project, execute the following command:

```sh
npm run build   # Compile TypeScript
npm start       # Start the compiled app

```

### Run tests

To run tests, run the following command:


```sh
  npm test
```

### API Endpoints

> GET / – Basic health check

> POST /email – Send an email notification
Body:

```json
{
  "recipient": "you@example.com",
  "subject": "Hello",
  "body": "This is a test"
}

```

> POST /sms – Send an SMS notification
Body:

```json
{
  "recipient": "+255...",
  "message": "This is an SMS"
}

> POST /PUSH – Send an PUSH notification
Body:

```json
{
  "deviceToken": "xyz123",
  "message": "Push content",
  "title": "New Alert"
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

> Mention all of the collaborators of this project.

👤 **Mnemba Chambuya**

- GitHub: [@githubhandle](https://github.com/githubhandle)
- LinkedIn: [LinkedIn](https://linkedin.com/in/linkedinhandle)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

> Describe 1 - 3 features you will add to the project.

- [ ] **[Authentication & Authorization with keys and tokens]**
- [ ] **[Versioning ]**
- [ ] **[A test GUI]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

> Write a message to encourage readers to support your project

If you like this project...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

> Give credit to everyone who inspired your codebase.

I would like to thank...

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FAQ (optional) -->

## ❓ FAQ (OPTIONAL) <a name="faq"></a>

> Add at least 2 questions new developers would ask when they decide to use your project.

- **[What is the purpose of this api?]**

  - [The aim of this API, when it is finnished, is to provide an easy way for developers to add a notifications functionality into their apps with the most scalable and maintanable way possible.]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
