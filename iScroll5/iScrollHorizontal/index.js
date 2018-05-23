// Demo's JS here
let myScroll1 = null;
let myScroll2 = null;
let selectedClass = {
	section: 'selected-section',
	item: 'selected-item'
};
let verticalSection = [
	{
		name: 'iscroll1',
		index: 0,
		selectedIndex: 0,
		itemSelector: 'li',
		selected: true,
		selectedItem: null,
		component: null,
	},
	{
		name: 'iscroll2',
		index: 1,
		itemSelector: 'li',
		component: null
	}];
let activeSection = null;

window.addEventListener('load', function () {
	loaded();
	verticalSection[0].component = myScroll1;
	verticalSection[1].component = myScroll2;
	activeSection = getActiveSection();
	initSelectedItem(activeSection);
});

function getActiveSection()
{
	return verticalSection.find((section) => section.selected === true);
}

function initSelectedItem(section)
{

	if (section.name === 'iscroll1')
	{
		selectItem(myScroll1.wrapper, selectedClass.section);
		let selectedItem = myScroll1.wrapper.querySelectorAll(section.itemSelector)[section.selectedIndex];
		selectItem(selectedItem, selectedClass.item);
		section.selectedItem = selectedItem;
	}
	else
	{

	}
}

function selectItem(item, selectedClass)
{
	item.classList.add(selectedClass);
}

function deSelectItem(item, selectedClass)
{
	item.classList.remove(selectedClass);
}

function loaded()
{
	myScroll1 = new IScroll('#wrapper1', {scrollX: true, scrollY: false, mouseWheel: true});
	myScroll2 = new IScroll('#wrapper2', {scrollX: true, scrollY: false, mouseWheel: true});
	initKeyEvent();
}

document.addEventListener('touchmove', function (e) {
	e.preventDefault();
}, false);

function initKeyEvent()
{
	window.addEventListener("keydown", function (event) {
		if (event.key !== undefined)
		{
			itemInVisible(event.which);
		}
	}, true);
}

function sectionLeftRight(keyChar)
{
	let nextSelectItem = null;
	if (keyChar === 37)
	{
		nextSelectItem = activeSection.selectedItem.previousSibling.previousSibling;
		if (!nextSelectItem)
		{
			return ;
		}
		nextSelectItem && activeSection.selectedIndex--;
	}
	else if (keyChar === 39)
	{
		nextSelectItem = activeSection.selectedItem.nextSibling.nextSibling;
		if (!nextSelectItem)
		{
			return;
		}
		nextSelectItem && activeSection.selectedIndex++;
	}
	if (nextSelectItem)
	{
		activeSection.selectedItem.classList.remove(selectedClass.item);
		nextSelectItem.classList.add(selectedClass.item);
		let iScroll = activeSection.name === 'iscroll1' ? myScroll1 : myScroll2;

		if (nextSelectItem.offsetLeft + iScroll.x < 0)
		{
			iScroll.scrollToElement(nextSelectItem);
		}
		else if (nextSelectItem.offsetLeft + nextSelectItem.clientWidth > iScroll.wrapperWidth - iScroll.x)
		{
			iScroll.scrollTo(-nextSelectItem.offsetLeft + (iScroll.wrapperWidth - nextSelectItem.clientWidth), 0);
		}
	}
	activeSection.selectedItem = nextSelectItem;
}

function sectionUpDown(keyChar)
{
	if (keyChar === 38 && activeSection.index > 0)
	{
		activeSection.selected = false;
		deSelectItem(activeSection.selectedItem, selectedClass.item);
		deSelectItem(activeSection.component.wrapper, selectedClass.section);
		let horizonOffset = activeSection.selectedItem.offsetLeft + activeSection.component.x;
		activeSection = verticalSection[activeSection.index - 1];
		activeSection.selected = true;
		selectItem(activeSection.component.wrapper, selectedClass.section);
		selectItem(getVerticalItem(horizonOffset), selectedClass.item);
	}
	else if (keyChar === 40 && activeSection.index < verticalSection.length - 1)
	{
		deSelectItem(activeSection.selectedItem, selectedClass.item);
		deSelectItem(activeSection.component.wrapper, selectedClass.section);
		let horizonOffset = activeSection.selectedItem.offsetLeft + activeSection.component.x;
		activeSection = verticalSection[activeSection.index + 1];
		selectItem(activeSection.component.wrapper, selectedClass.section);
		selectItem(getVerticalItem(horizonOffset), selectedClass.item);
	}
}

function getVerticalItem(horizonOffset)
{
	let allItems = activeSection.component.wrapper.querySelectorAll(activeSection.itemSelector),
			activeSectionX = activeSection.component.x;
	for (let i = 0; i < allItems.length; i++)
	{
		if (allItems[i].offsetLeft > horizonOffset - activeSectionX - allItems[i].clientWidth / 2)
		{
			activeSection.selectedItem = allItems[i];
			activeSection.selectedIndex = i;
			return activeSection.selectedItem;
		}
	}
}

function itemInVisible(keyChar)
{
	if (keyChar === 37 || keyChar === 39)
	{
		sectionLeftRight(keyChar);
	}
	else if (keyChar === 38 || keyChar === 40)
	{
		sectionUpDown(keyChar);
	}
}