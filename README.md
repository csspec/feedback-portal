# Feedback Portal for PEC University of Technology

This repository will contain code for online teacher feedback system.

### Why this project?

Manual systems require a lot of paperwork and manpower. Also, there are higher chances of errors in manual work. Therefore, there is a need to use technology to digitalize these manual tasks.

Need of online Teacher Feedback System could be felt from the fact that each semester a huge amount of paper is wasted in form of OMR sheets to fill feedbacks. Also, a large number of faculty members spend a lot of time in collecting these feedbacks from students and then checking and compiling the results of feedback. Our project will be to automate this.

### Technologies used
We are using [Java Spring framework](http://spring.io) to build the back-end of the project. While for frontend we are using [React.JS](https://facebook.github.io/react), thus enabling us to create a dynamic website. For designing we are using customised [Bootstrap](https://github.com/csspec/bootstrap-sass).

### Building and Running
Project works fine on Ubuntu 16.04 (64 bit). So the following instructions are given with Ubuntu in mind.
(Project can be compiled on Windows, but instructions are not included)

 1. Install the dependencies (You may need to give sudo permissions for it)

	```bash
	$ ./scripts/install.sh
	```

 2. Compile the source code

	```bash
	$ ./scripts/build.sh
	```

 3. Open a new terminal, and start the Mongo server

	```bash
	$ mongod --dbpath=data/db
	```

 4. Start the server

	```bash
	$ ./scripts/run.sh
	```

Go to http://localhost:8080/.
