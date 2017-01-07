# This script uses 1 passed parameter to toggle a FS/HW hack for the rPi3B green board LED.
# See the app.js Express server to view usage in Node.js environment as callback function.

echo "Param 1: $1"
if [ $1 == "ON" ]; then
	echo "LED setting on!"
	echo none >/sys/class/leds/led0/trigger
	echo 1 >/sys/class/leds/led0/brightness
else
	echo "LED setting off!"
	echo none >/sys/class/leds/led0/trigger
	echo 0 >/sys/class/leds/led0/brightness
fi
echo "EXITING LED SETTER"