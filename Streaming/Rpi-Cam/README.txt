FROM:
http://elinux.org/RPi-Cam-Web-Interface

Overview:
To run the package, navigate to the website and follow directions after "chmod u+x *.sh". Package does not need to be re-built, and should not require any additional packages to be installed manually. Initial impression is that it is possible to run OpenCV analysis on the incoming stream on client, not confirmed. Set working directory of terminal to inner Rpi_Cam... folder and run "bash start.sh" to run. HTTP interface will come up on port 100 or other as configured.

Technical Analysis:
Package streams what appears to be MJPEG frames to a web-socket or etc and also seems to include its own packaged server to accomplish custom routing, etc. There also appears to be possibility to send h264 frames to save bandwidth, but not confirmed. Streams appear to degrade across SINGLE clients as multiple streams are opened on that SINGLE client, others seem to be unaffected. Possible load-balancing, RTMP, or broadcasting in packaged server. Quality is set to default at init and output is subject to the camera's framing rules but can be changed on the fly from the HTTP interface. There are also recording/viewing options as well as motion sensing built in. Local recording is not subject to frame-drops/stuttering of live-streams to remote clients.