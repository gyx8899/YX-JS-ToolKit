// Device
const isIOS = () => {
	return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
};

export {
	isIOS
}