**NOTE**: This project has been divided into two modules - one act as a service and provides set of RESTful APIs and is managed by [@crypton3535](https://github.com/crypton3535) and other one is this module which only uses the APIs provided by the former.

# Feedback Portal for PEC University of Technology

This repository will contain code for online teacher feedback system.

### Why this project?

Manual systems require a lot of paperwork and manpower. Also, there are higher chances of errors in manual work. Therefore, there is a need to use technology to digitalize these manual tasks.

Need of online Teacher Feedback System could be felt from the fact that each semester a huge amount of paper is wasted in form of OMR sheets to fill feedbacks. Also, a large number of faculty members spend a lot of time in collecting these feedbacks from students and then checking and compiling the results of feedback. Our project will be to automate this.

### Technologies
This project is built using [Express](https://expressjs.com/) framework. The frontend is entirely written using React framework.

### Build instructions
First you will need to install Node.JS. **Windows** users can download it from their official [site](https://nodejs.org/en/download/).
**Linux** users can follow the instructions provided on their [site](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

 + First fetch the dependencies
   + Slow way
     ```bash
     $ npm install
     ```

   + Faster way, uses `yarn`
     ```bash
     $ yarn install
     ```

 + Define some environment variables. **This step is important**. Do not skip this step.
    ```bash
    $ export FEEDBACK_CLIENT_ID=feedback  # Registered client_id of feedback-portal on auth server
    $ export FEEDBACK_CLIENT_SECRET=secret  # Issued secret to the feedback-portal by auth server
    $ export AUTH_SERVER_LINK=example.com   # Link to auth server
    $ export CSSPEC_SECRET=secret    # Your secret required to sign cookies
    ```

 + Compile the JSX files
    ```bash
    $ npm run build
    ```

 + Start the server
    ```bash
    $ npm run start
    ```

 + Hit http://localhost:3000 to visit the start page

## Want to contribute?
Feel free to contribute the project by doing the following things:
 + Remove React from static pages like start page. Just write plain HTML or Jade for it.
