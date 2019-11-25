let color = "#000000";
let id = 123;
console.log('export.js', id);
let updateId = (newId) => {
	id = newId;
	console.log('updateId:', id);
};

export {color, id, updateId}