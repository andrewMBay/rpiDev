FROM:
http://petrkout.com/electronics/low-latency-0-4-s-video-streaming-from-raspberry-pi-mjpeg-streamer-opencv/

Overview:
To run the package, navigate to the website and follow directions after "Now we should be set to start streaming the video". Package may need to be re-built, and that may also require installing the dependencies, also covered on the website. Possible to run OpenCV analysis on the incoming stream on client, as needed.

Technical Analysis:
Package streams what appears to be MJPEG frames to a web-socket or etc and also seems to include its own packaged server to accomplish custom routing, etc. Streams appear to degrade across ALL clients as multiple streams are opened. Quality is set once at init and output is subject to the camera's framing rules.