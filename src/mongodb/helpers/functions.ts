function getSeverity(score: string): string {
	const numericScore = Number(score) ;
	if (!score || numericScore < 0 || numericScore > 10) throw new Error ('Invalidad score')
	if (numericScore < 4.0 ) return "Low"
	if (numericScore < 7.0 ) return "Medium"
	if (numericScore < 9.0 ) return "High"
	if (numericScore >= 9.0 ) return "Critical"
	return 'Something went wrong'
}

export {getSeverity};
