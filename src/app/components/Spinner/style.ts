export default ({
	spinner: {
		display: 'inline-block',
		width: 50,
		height: 50,

		'&::after': {
			content: '""',
			display: 'block',
			width: 30,
			height: 30,
			borderRadius: '50%',
			border: '10px solid #39f',
			borderColor: '#39f transparent #39f transparent',
			animation: 'ring 1s linear infinite',
		},
	},
	'@keyframes ring': {
		'0%': {
			transform: 'rotate(0deg)',
		},
		'100%': {
			transform: 'rotate(359deg)',
		},
	},
});