module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current', // Para Jest
				},
			},
		],
		'@babel/preset-react',
	],
};