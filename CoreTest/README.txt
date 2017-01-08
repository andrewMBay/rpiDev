THIS IS WHERE YOU BUILD AND RUN THE WEBSERVER AND INDIVIDUAL PROJECTS

USE:
bash install.sh TO INSTALL ALL THE MODULES, ONCE - THIS TAKES A WHILE!!!
bash run.sh OR nodejs app.js TO RUN THE WEBSERVER, EVERY USE
bash runBuilder.sh TO RUN THE PROJECT BUILDERS - SEE NOTES ABOUT WORKING DIRECTORIES

NOTE ON INSTALLING:
The installation script only forwards the directory listing from "node_modules" to the npm installer, allowing huge project compression for transport, but the modules must be downloaded before the programs will work again. This takes a long time on the rPi. Terminal's working directory must be the directly above the "node_modules" folder - should be the same location as the install and run scripts.

NOTE ON RUNNING SERVER:
Bash webserver script allows "stacking" programs and piping their stout to the current terminal - but also allows new commands, etc to be run in the mean time. Commands "broken up" by stout text from "stacked" programs will execute without a problem except for decreased readability. **To "stack" another program or scipt, simply include the terminal commands followed by the ampersand (&). Can be useful when several programs need to run concurrently (i.e. a webpack builder and webserver for the output). When just running the webserver, the raw nodejs command is easier, as CTRL+C can then terminate without leaving the terminal.

NOTE ON BUILDING PROJECTS:
The builder scripts will scan, build, then watch the React application directory for changes and re-build as needed. **Each builder needs it's own terminal/process to run in. Terminal's working directory must be the parent folder for each project, i.e. same folder as the "runBuilder.sh" scripts.

NOTE ON CREATING PROJECTS:
The projects in place (Toggle/List) can be copied as-is and renamed when building a new project, and all builders/scripts/etc should transfer over. The webserver must be updated to handle both static requests and root requests for a site - see the current code to understand how this works. A new project should only require 5 new lines of code (at minimum) in the Node server.
