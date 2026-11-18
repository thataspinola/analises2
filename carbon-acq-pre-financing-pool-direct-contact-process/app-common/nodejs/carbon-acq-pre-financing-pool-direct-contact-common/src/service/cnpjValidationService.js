const isValidCNPJ = (cnpjString) => {
	const cleanupRegex = /[^0-9A-Za-z]*/gm
	let cleanedUpCnpj = cnpjString.replace(cleanupRegex, '')
	if (cleanedUpCnpj.length > 14 || cleanedUpCnpj.length < 14) {
		return false
	}

	const cnpjWithoutVerifyDigits = cleanedUpCnpj.substr(0, 12)
	const cnpjVerificatorTens = cleanedUpCnpj.substr(12, 1)
	const cnpjVerificatorUnits = cleanedUpCnpj.substr(13, 1)
	const verificatorTensDigit = verifyingDigitCalculator(cnpjWithoutVerifyDigits)

	if (String(verificatorTensDigit) !== String(cnpjVerificatorTens)) {
		return false
	}

	const verificatorUnitsDigit = verifyingDigitCalculator(
		cnpjWithoutVerifyDigits,
		cnpjVerificatorTens
	)

	if (String(cnpjVerificatorUnits) !== String(verificatorUnitsDigit)) {
		return false
	}
	return true
}

const characterValueArray = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 17,
	a: 17,
	B: 18,
	b: 18,
	C: 19,
	c: 19,
	D: 20,
	d: 20,
	E: 21,
	e: 21,
	F: 22,
	f: 22,
	G: 23,
	g: 23,
	H: 24,
	h: 24,
	I: 25,
	i: 25,
	J: 26,
	j: 26,
	K: 27,
	k: 27,
	L: 28,
	l: 28,
	M: 29,
	m: 29,
	N: 30,
	n: 30,
	O: 31,
	o: 31,
	P: 32,
	p: 32,
	Q: 33,
	q: 33,
	R: 34,
	r: 34,
	S: 35,
	s: 35,
	T: 36,
	t: 36,
	U: 37,
	u: 37,
	V: 38,
	v: 38,
	W: 39,
	w: 39,
	X: 40,
	x: 40,
	Y: 41,
	y: 41,
	Z: 42,
	z: 42,
}

function verifyingDigitCalculator(
	valueWithoutVerifyDigits,
	verificatorTensDigit
) {
	let verifyingDigitResult = 0
	let valueToBeCheckedArray = String(valueWithoutVerifyDigits)
		.split('')
		.map((char) => characterValueArray[char])
	let firstPartDigitsMultiplyStart = 5
	let secondPartDigitsMultiplyStart = 9
	let verificatorDigitSum = 0
	//o segundo parametro(verificatorTensDigit) só será considerado para o cálculo do segundo digito
	if (verificatorTensDigit !== undefined) {
		valueToBeCheckedArray.push(parseInt(String(verificatorTensDigit)))
		firstPartDigitsMultiplyStart++
	}
	let secondPartValueArrayIndexStart = 0
	for (
		let valueArrayIndex = 0,
			firstPartDigitsMultiply = firstPartDigitsMultiplyStart;
		firstPartDigitsMultiply >= 2;
		valueArrayIndex++,
			secondPartValueArrayIndexStart++,
			firstPartDigitsMultiply--
	) {
		verificatorDigitSum +=
			valueToBeCheckedArray[valueArrayIndex] * firstPartDigitsMultiply
	}
	for (
		let valueArrayIndex = secondPartValueArrayIndexStart,
			secondPartDigitsMultiply = secondPartDigitsMultiplyStart;
		secondPartDigitsMultiply >= 2;
		valueArrayIndex++, secondPartDigitsMultiply--
	) {
		verificatorDigitSum +=
			valueToBeCheckedArray[valueArrayIndex] * secondPartDigitsMultiply
	}
	const remainderFromElevenDivision = verificatorDigitSum % 11
	if (remainderFromElevenDivision >= 2) {
		verifyingDigitResult = 11 - remainderFromElevenDivision
	}
	return verifyingDigitResult
}

module.exports.isValidCNPJ = isValidCNPJ
