export function saveToStorage(data) {
    localStorage.setItem('candidateData', JSON.stringify(data));
}

export function getFromStorage() {
    const data = localStorage.getItem('candidateData');
    return data ? JSON.parse(data) : [];
}

export function clearStorage() {
    localStorage.removeItem('candidateData');
}
