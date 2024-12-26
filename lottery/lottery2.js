const data = require('./data');

// 1. Extract classic numbers into an array of arrays
const extractClassicNumbers = (data) => {
    return data.map((entry) => entry.classic.numbers);
};

// 2. Check for identical sets of numbers and return consolidated indices and numbers
const findIdenticalSets = (data) => {
    const seen = new Map();

    data.forEach((entry, index) => {
        const numbers = entry.classic.numbers;
        const key = numbers
            .slice()
            .sort((a, b) => a - b)
            .join(','); // Sort and stringify for comparison

        if (seen.has(key)) {
            const existingSet = seen.get(key);

            // Check if the date is the same; if yes, treat as duplicate, not identical
            if (!existingSet.dates.includes(entry.date)) {
                existingSet.indices.push(index);
                existingSet.dates.push(entry.date);
            }
        } else {
            seen.set(key, {
                indices: [index],
                numbers: numbers.slice(),
                dates: [entry.date],
            });
        }
    });

    return Array.from(seen.values()).filter((set) => set.indices.length > 1);
};

// 3. Find the 10 most repeated numbers
const findMostRepeatedNumbers = (numbersArray) => {
    const frequency = new Map();

    numbersArray.flat().forEach((num) => {
        frequency.set(num, (frequency.get(num) || 0) + 1);
    });

    return Array.from(frequency.entries())
        .sort((a, b) => b[1] - a[1]) // Sort by frequency in descending order
        .slice(0, 10) // Take top 10
        .map(([num, count]) => ({ number: num, count }));
};

// 4. Check if a given set of numbers exists in the data
const checkSimilarSet = (numbersArray, inputNumbers) => {
    const inputKey = inputNumbers.sort((a, b) => a - b).join(',');
    return numbersArray.findIndex(
        (numbers) => numbers.sort((a, b) => a - b).join(',') === inputKey
    );
};

// 5. Generate a combination of 6 numbers not in the data with enhanced randomization
const generateUniqueCombination = (numbersArray) => {
    const seenKeys = new Set(
        numbersArray.map((numbers) => numbers.sort((a, b) => a - b).join(','))
    );
    const mostRepeated = findMostRepeatedNumbers(numbersArray).map(
        (entry) => entry.number
    );

    while (true) {
        const combination = [];
        const usedNumbers = new Set();

        // Incorporate most repeated numbers into the combination
        while (combination.length < 3 && mostRepeated.length > 0) {
            const randomIndex = Math.floor(Math.random() * mostRepeated.length);
            const selectedNumber = mostRepeated[randomIndex];
            if (!usedNumbers.has(selectedNumber)) {
                usedNumbers.add(selectedNumber);
                combination.push(selectedNumber);
            }
        }

        // Fill the rest with unique random numbers between 1 and 49
        while (combination.length < 6) {
            const randomNum = Math.floor(Math.random() * 49) + 1;
            if (!usedNumbers.has(randomNum)) {
                usedNumbers.add(randomNum);
                combination.push(randomNum);
            }
        }

        // Sort and check uniqueness
        const combinationKey = combination.sort((a, b) => a - b).join(',');
        if (!seenKeys.has(combinationKey)) {
            return combination;
        }
    }
};

// 6. Generate a random combination of 6 numbers not in the data without considering most repeated numbers
const generateUniqueCombination2 = (numbersArray) => {
    const seenKeys = new Set(
        numbersArray.map((numbers) => numbers.sort((a, b) => a - b).join(','))
    );

    while (true) {
        const combination = [];
        const usedNumbers = new Set();

        // Generate 6 unique numbers between 1 and 49
        while (combination.length < 6) {
            const randomNum = Math.floor(Math.random() * 49) + 1;
            if (!usedNumbers.has(randomNum)) {
                usedNumbers.add(randomNum);
                combination.push(randomNum);
            }
        }

        // Sort and check uniqueness
        const combinationKey = combination.sort((a, b) => a - b).join(',');
        if (!seenKeys.has(combinationKey)) {
            return combination;
        }
    }
};

// Extract classic numbers
const classicNumbers = extractClassicNumbers(data);
console.log('Count of classic numbers:', classicNumbers.length);

// Find identical sets
const identicalSets = findIdenticalSets(data);
console.log('Identical Sets:', identicalSets);

// Find most repeated numbers
const mostRepeatedNumbers = findMostRepeatedNumbers(classicNumbers);
console.log('Top 10 Most Repeated Numbers:', mostRepeatedNumbers);

// Check for a similar set in the data
const inputNumbers = [5, 22, 27, 30, 40, 42];
const similarSetIndex = checkSimilarSet(classicNumbers, inputNumbers);
if (similarSetIndex !== -1) {
    console.log(`The input set matches the set at index ${similarSetIndex}.`);
} else {
    console.log('The input set does not match any set in the data.');
}

// Generate a unique combination
const uniqueCombination = generateUniqueCombination(classicNumbers);
console.log('Unique Combination:', uniqueCombination);

// Generate a unique combination 2 without considering most repeated numbers
const uniqueCombination2 = generateUniqueCombination2(classicNumbers);
console.log('Unique Combination 2 :', uniqueCombination2);

// Just testing to Find indices of entries with no classic numbers
// const findEntriesWithoutClassicNumbers = (data) => {
//     return data.reduce((acc, entry, index) => {
//         if (!entry.classic?.numbers) {
//             acc.push(index);
//         }
//         return acc;
//     }, []);
// };

// Find indices with no classic numbers
// const entriesWithoutClassicNumbers = findEntriesWithoutClassicNumbers(data);
// console.log('Entries without classic numbers:', entriesWithoutClassicNumbers);
