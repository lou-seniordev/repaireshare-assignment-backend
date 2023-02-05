const databases: { [key: string]: Set<string> } = {};

/**
 * Adds data to a set with a specified name
 *
 * @param setName The name of the set to add data to
 * @param data The data to add to the set
 */
const saveData = (setName: string, data: any): void => {
	// If the set doesn't exist, create a new set
	if (!databases[setName]) {
		databases[setName] = new Set();
	}
	
	// Add the data to the set as a stringified JSON object
	databases[setName].add(JSON.stringify(data));
};

/**
 * Gets all data from a set with a specified name
 *
 * @param setName The name of the set to get data from
 * @returns An array of all data from the set
 */
const getData = (setName: string): any[] => {
	// If the set doesn't exist, return an empty array
	if (!databases[setName]) {
		return [];
	}
	
	// Return the data from the set as parsed JSON objects
	return Array.from(databases[setName]).map(d => JSON.parse(d));
};

/**
 * Removes data from a set with a specified name
 *
 * @param setName The name of the set to remove data from
 * @param data The data to remove from the set
 */
const removeData = (setName: string, data: any): void => {
	// If the set doesn't exist, return without doing anything
	if (!databases[setName]) {
		return;
	}
	
	// Remove the data from the set as a stringified JSON object
	databases[setName].delete(JSON.stringify(data));
};


/**
 * Updates data in a set with a specified name
 *
 * @param setName The name of the set to update data in
 * @param oldData The old string version of the data in order to remove
 * @param data The data to update in the set
 */
const updateData = (setName: string, data: Array<object>): void => {
	// If the set doesn't exist, return without doing anything
	if (!databases[setName]) {
		return;
	}
	
	databases[setName] = new Set();
	for (const record of data) {
		databases[setName].add(JSON.stringify(record));
	}
	
};

export { saveData, getData, removeData, updateData };
