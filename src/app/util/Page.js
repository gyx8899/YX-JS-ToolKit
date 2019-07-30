/**
 * scrollListToIndex
 * @param listFolder
 * @param index
 * @param toTopIndex
 * @param duration
 */
function scrollListToIndex(listFolder, index, toTopIndex, duration) {
	if (index === 0) {
		scrollTo(listFolder, 0, duration);
	} else {
		let listItems = listFolder.childNodes,
				scrollOffset = 0,
				contentHeight = 0,
				scrollToCenter = 0;
		duration = (duration === undefined ? 500 : duration);
		for (let i = 0, l = listItems.length; i < l; i++) {
			let listItemHeight = listItems[i].offsetHeight;
			if (i < index) {
				scrollOffset += listItemHeight;
				if (i > toTopIndex - 1) {
					scrollToCenter += listItems[i - toTopIndex].offsetHeight;
				}
			}
			contentHeight += listItemHeight;
		}
		scrollOffset = scrollToCenter;
		if (scrollOffset + listFolder.offsetHeight > contentHeight) {
			scrollOffset = contentHeight - listFolder.offsetHeight;
		}
		scrollTo(listFolder, scrollOffset, duration);
	}
}

/**
 * scrollTo
 * @param element
 * @param to
 * @param duration
 */
function scrollTo(element, to, duration) {
	if (duration <= 0) return;
	let difference = to - element.scrollTop;
	let perTick = difference / duration * 10;

	setTimeout(function () {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration - 10);
	}, 10);
}

export {
	scrollListToIndex,
	scrollTo,
}