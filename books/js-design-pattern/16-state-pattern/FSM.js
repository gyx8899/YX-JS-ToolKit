var fsm = new StateMachine({
	init: 'solid',
	transition: [
		{
			name: 'melt',
			from: 'solid',
			to: 'liquid',
		},
		{
			name: 'freeze',
			from: 'liquid',
			to: 'solid',
		},
		{
			name: 'vaporize',
			from: 'liquid',
			to: 'gas'
		},
		{
			name: 'condense',
			from: 'gas',
			to: 'liquid'
		}
	],
	methods: {
		onMelt: () => {
			console.log('')
		},
		onFreeze: () => {

		},
		onVaporize: () => {

		},
		onCondense: () => {

		}
	}
});