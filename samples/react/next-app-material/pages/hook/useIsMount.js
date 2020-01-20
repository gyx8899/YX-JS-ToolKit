import { useState, useEffect } from "react";

function useIsMount() {
	const [isMount, setIsMount] = useState(false);

	useEffect(() => {
		if (!isMount) {
			setIsMount(true);
		}
		console.log("didmount or updated");
		return () => setIsMount(false);
	}, []);

	return isMount;
}

export default useIsMount;