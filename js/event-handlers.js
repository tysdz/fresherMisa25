export function setupEventListeners(manager) {
    setupSearch(manager);
    setupPageSize(manager);
    setupPagination(manager);
    setupSelectAll();
}

function setupSearch(manager) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        manager.searchQuery = e.target.value.trim().toLowerCase();
        manager.filterCandidates();
        manager.currentPage = 1;
        manager.renderTable();
    });
}

function setupPageSize(manager) {
    const pageSize = document.getElementById('pageSize');
    if (!pageSize) return;

    pageSize.addEventListener('change', (e) => {
        manager.pageSize = parseInt(e.target.value, 10);
        manager.currentPage = 1;
        manager.renderTable();
    });
}

function setupSelectAll() {
    const selectAll = document.getElementById('selectAll');
    if (!selectAll) return;

    selectAll.addEventListener('change', (e) => {
        document
            .querySelectorAll('.candidate-checkbox')
            .forEach(cb => cb.checked = e.target.checked);
    });
}

// setup pagination and nextpage
function setupPagination(manager) {
    setupPrevPage(manager);
    setupNextPage(manager);
}

function setupPrevPage(manager) {
    const prevPage = document.getElementById('prevPage');
    if (!prevPage) return;

    prevPage.addEventListener('click', () => {
        if (manager.currentPage > 1) {
            manager.currentPage--;
            manager.renderTable();
        }
    });
}

function setupNextPage(manager) {
    const nextPage = document.getElementById('nextPage');
    if (!nextPage) return;

    nextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(
            manager.filteredCandidates.length / manager.pageSize
        );
        if (manager.currentPage < totalPages) {
            manager.currentPage++;
            manager.renderTable();
        }
    });
}

