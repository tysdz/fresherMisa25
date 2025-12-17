import { saveToStorage, clearStorage } from './storage.js';

export function addCandidate(manager, candidateData) {
    const newId = Math.max(...manager.candidates.map(c => c.id), 0) + 1;
    const newCandidate = { id: newId, ...candidateData };

    manager.candidates.unshift(newCandidate);
    saveToStorage(manager.candidates);

    manager.filterCandidates();
    manager.currentPage = 1;
    manager.renderTable();
}

export function updateCandidate(manager, candidateId, candidateData) {
    const index = manager.candidates.findIndex(c => c.id === candidateId);
    if (index !== -1) {
        manager.candidates[index] = { id: candidateId, ...candidateData };
        saveToStorage(manager.candidates);

        manager.filterCandidates();
        manager.renderTable();
    }

}

export function clearData(manager) {
    if (confirm('Bạn có chắc muốn xóa toàn bộ dữ liệu?')) {
        clearStorage();
        manager.candidates = [];
        manager.filteredCandidates = [];
        manager.renderTable();
        manager.showToast('Đã xóa toàn bộ dữ liệu!', 'success');
    }
}
