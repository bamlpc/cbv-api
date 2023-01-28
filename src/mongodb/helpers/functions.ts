function getSeverity(score: string): string {
	const numericScore = Number(score);
	if (!score || numericScore < 0 || numericScore > 10) {
		throw new Error('Invalidad score');
	}
	else if (numericScore < 4.0) return 'Low';
	else if (numericScore < 7.0) return 'Medium';
	else if (numericScore < 9.0) return 'High';
	else if (numericScore >= 9.0) return 'Critical';
	return 'Something went wrong';
}

export { getSeverity };
