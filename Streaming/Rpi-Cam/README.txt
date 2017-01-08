FROM:
http://elinux.org/RPi-Cam-Web-Interface

Overview:
To run the package, navigate to the website and follow directions after "chmod u+x *.sh". Package does not need to be re-built, and should not require any additional packages to be installed manually. Initial impression is that it is possible to run OpenCV analysis on the incoming stream on client, not confirmed. Set working directory of terminal to inner Rpi_Cam... folder and run "bash start.sh" to run. HTTP interface will come up on port 100 or other as configured.

Technical Analysis:
Package streams what appears to be JPEG frames to a PHP frame and also to includes its own packaged server to accomplish custom routing, etc. There also appears to be possibility to send h264 frames to save bandwidth, but not confirmed. Streams appear to degrade across SINGLE clients as multiple streams are opened on that SINGLE client, other clients seem to be unaffected. Possible load-balancing, RTMP, or broadcasting in packaged server. Quality is set to default at init and output is subject to the camera's framing rules but can be changed on the fly from the HTTP interface. There are also recording/viewing options as well as motion sensing built in. Local recording is not subject to frame-drops/stuttering of live-streams to remote clients. Initial testing shows lag of ~ 1/2 second moving from WIFI to WAN to 4G device. Potentially identical lag for large numbers of connected users (balancer??).

Technical Notes:
-Appears to have lightweight capture framework functioning under elaborate HTML/JS wrapped with PHP scripts
-Many of the technical details can be parsed out via the index.php offered in the www folder
-Core of index.php also includes config.php - many options found here
	-In turn, config.php also loads several other config files, including
		-raspimjpeg, exists in <rPi-Cam>/etc/raspimjpeg and is copied during install
		-uconfig, generated as a user-override of raspimjpeg after install
-Uses some kind of framework to take raw frames from the camera and convert them into JPEG
-RaspiCam appears to be a framework surrounding a raspimjpeg capture engine
	-Suggest exploring using engine as standalone integration into MBAY project
	-Indeed, start.sh kills several processes and then restarts raspimjpeg as www-data user
-Takes camera JPEGs and saves them to /dev/shm/mjpeg/cam.jpg, which is simlinked to /var/www/html
-Uses two methods for delivery:
	-Uses php script called cam_pic.php to throw headers and content each time JPEG is update (JS driver?)
	-Uses php script called cam_pic_new.php to throw headers once and then "stream" the JPEGs
	-Methods can be differentiated from inspecting elements live on page
-Captured/saved files are available under the application directory on the rPi