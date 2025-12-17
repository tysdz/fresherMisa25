import { loadCandidatesData, refreshFromLocalStorage } from './push-data.js';
import { setupEventListeners } from './event-handlers.js';
import { renderTable } from './table-renderer.js';
import { setupModalHandlers, openAddModal, openEditModal } from './modal.js';
import { addCandidate, updateCandidate, clearData } from './crud-candidate.js';
import { showToast } from './toast.js';
import { filterCandidates } from './filter.js';

class CandidateManager {
    constructor() {
        this.candidates = [];
        this.filteredCandidates = [];
        this.currentPage = 1;
        this.pageSize = 10;
        this.searchQuery = '';
        this.editingCandidateId = null;
        this.modalMode = 'add';

        this.init();
    }

    async init() {
        await this.loadCandidatesFromJSON();
        this.setupEventListeners();
        this.setupModalHandlers();
        this.renderTable();
    }

    async loadCandidatesFromJSON() {
        try {
            const data = await loadCandidatesData();
            this.candidates = data;
            this.filteredCandidates = [...this.candidates];
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            this.candidates = [];
            this.filteredCandidates = [];
        }
    }

    setupEventListeners() {
        setupEventListeners(this);
    }

    filterCandidates() {
        this.filteredCandidates = filterCandidates(this.candidates, this.searchQuery);
    }

    renderTable() {
        renderTable(this);
    }

    refreshFromLocalStorage() {
        const data = refreshFromLocalStorage();
        if (data.length > 0) {
            this.candidates = data;
            this.filterCandidates();
            this.renderTable();
        }
    }

    setupModalHandlers() {
        setupModalHandlers(this);
    }

    openAddModal() {
        openAddModal(this);
    }

    openEditModal(candidateId) {
        openEditModal(this, candidateId);
    }

    addCandidate(candidateData) {
        addCandidate(this, candidateData);
    }

    updateCandidate(candidateId, candidateData) {
        updateCandidate(this, candidateId, candidateData);
    }

    clearData() {
        clearData(this);
    }

    showToast(message, type = 'success') {
        showToast(message, type);
    }
}

let candidateManager;

document.addEventListener('DOMContentLoaded', () => {
    candidateManager = new CandidateManager();
});

export default CandidateManager;
