import { getFromStorage, saveToStorage } from './storage.js';

export async function loadCandidatesData() {
    try {
        const storedData = getFromStorage();

        if (storedData.length > 0) {
            console.log('loadCandicatesData 1 ');
            return storedData;
        } else {
            const response = await fetch('./js/candidate-data.json');
            const data = await response.json();

            saveToStorage(data);
            console.log('loadCandicatesData 1.1 ');
            return data;
        }
    } catch (error) {
        console.error('loadCadicatesData error:', error);
        return [];
    }
}

export function refreshFromLocalStorage() {
    const storedData = getFromStorage();
    return storedData.length > 0 ? storedData : [];
}
