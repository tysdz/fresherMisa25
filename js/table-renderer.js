import { formatDate, formatGender, formatEducation, getInitials, getAvatarColor } from './format.js';

function renderCandidateRow(candidate) {
    const initials = getInitials(candidate.fullName);
    const avatarColor = getAvatarColor(candidate.id);

    return `
        <td class="sticky"><input type="checkbox" class="candidate-checkbox" data-id="${candidate.id}"></td>
        <td>
            <div class="candidate-name">
                <div class="candidate-avatar" style="background-color: ${avatarColor}">
                    ${initials}
                </div>
                ${candidate.fullName || '--'}
            </div>
        </td>
        <td>${formatDate(candidate.dateOfBirth)}</td>
        <td>${formatGender(candidate.gender)}</td>
        <td>${candidate.phoneNumber || '--'}</td>
        <td>${candidate.email || '--'}</td>
        <td>${candidate.district || '--'}</td>
        <td>${candidate.address || '--'}</td>
        <td>${candidate.school || '--'}</td>
        <td>${formatEducation(candidate.educationLevel)}</td>
        <td>${candidate.trainingPlace || '--'}</td>
        <td>${candidate.major || '--'}</td>
        <td>${formatDate(candidate.appliedDate)}</td>
        <td>${candidate.source || '--'}</td>
        <td>${candidate.recruiter || '--'}</td>
        <td>${candidate.collaborator || '--'}</td>
        <td>${candidate.lastCompany || '--'}</td>
        <td>${formatDate(candidate.startDate)}</td>
        <td>${formatDate(candidate.endDate)}</td>
        <td>${candidate.jobTitle || '--'}</td>
        <td class="job-description">${candidate.jobDescription || '--'}</td>
    `;
}

export function renderTable(manager) {
    const tbody = document.getElementById('candidateTableBody');
    if (!tbody) return;

    const startIndex = (manager.currentPage - 1) * manager.pageSize;
    const endIndex = Math.min(startIndex + manager.pageSize, manager.filteredCandidates.length);
    const paginatedData = manager.filteredCandidates.slice(startIndex, endIndex);

    tbody.innerHTML = '';

    paginatedData.forEach(candidate => {
        const row = document.createElement('tr');
        row.innerHTML = renderCandidateRow(candidate);
        row.dataset.candidateId = candidate.id;
        row.style.cursor = 'pointer';

        row.addEventListener('click', (e) => {
            if (e.target.type === 'checkbox') {
                return;
            }
            manager.openEditModal(candidate.id);
        });

        tbody.appendChild(row);
    });

    updatePaginationInfo(manager);
}

export function updatePaginationInfo(manager) {
    const totalRecords = document.getElementById('totalRecords');
    const pageInfo = document.getElementById('pageInfo');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');

    if (totalRecords) {
        totalRecords.textContent = manager.filteredCandidates.length;
    }

    const startIndex = (manager.currentPage - 1) * manager.pageSize + 1;
    const endIndex = Math.min(manager.currentPage * manager.pageSize, manager.filteredCandidates.length);

    if (pageInfo) {
        pageInfo.textContent = `${startIndex} - ${endIndex} bản ghi`;
    }

    const totalPages = Math.ceil(manager.filteredCandidates.length / manager.pageSize);

    if (prevPage) {
        prevPage.disabled = manager.currentPage === 1;
    }

    if (nextPage) {
        nextPage.disabled = manager.currentPage >= totalPages;
    }
}
