import { useEffect, useRef } from "react";

const useOutsideClick = (handler, listenCapturing = true) => {
	const ref = useRef();

	useEffect(() => {
		const handleClick = (e) => {
			if (
				ref.current &&
				!ref.current.contains(e.target) &&
				!e.target.closest("[data-menu-trigger]")
			)
				handler();
		};

		document.addEventListener("click", handleClick, listenCapturing);

		return () =>
			document.removeEventListener("click", handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
};

export { useOutsideClick };
