/**!
 * ObserverAttribute v1.0.0.201901204
 */
class ObserverAttribute {
	constructor()
	{
		this.subNode = []
	}

	addSubNode(element, attributeKey)
	{
		this.subNode.push({
			element,
			attributeKey,
		})
	}

	update(attributeValue)
	{
		this.subNode = this.subNode.map(({element, attributeKey}) => {
			this.replace(element, attributeKey, attributeValue);
			return {
				element,
				attributeKey
			}
		})
	}

	replace(element, attributeKey, attributeValue)
	{
		element.setAttribute(attributeKey, attributeValue);
	}
}

export default ObserverAttribute