// Browser
const isSafari = () => {
	return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
};

const isMobileSafari = () => {
	return isSafari() && isIOS();
};

export {
	isSafari,
	isMobileSafari
}