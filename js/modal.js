import { validateForm, clearAllErrors } from './validation.js';

export function setupModalHandlers(manager) {
    const modal = document.getElementById('addCandidateModal');
    const btnAddCandidate = document.querySelector('.btn-add-candidate');
    const closeModal = document.querySelector('.close-modal');
    const btnCancel = document.querySelector('.btn-cancel');
    const form = document.getElementById('addCandidateForm');

    if (btnAddCandidate) {
        btnAddCandidate.addEventListener('click', () => {
            openAddModal(manager);
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            closeModal_internal(manager);
        });
    }

    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            closeModal_internal(manager);
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal_internal(manager);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit(manager, form);
    });
}

function handleFormSubmit(manager, form) {
    const validationResult = validateForm(form);

    if (!validationResult.valid) {
        manager.showToast('Vui lòng kiểm tra lại thông tin!', 'error');
        return;
    }

    const formData = new FormData(form);
    const candidateData = {};

    for (let [key, value] of formData.entries()) {
        candidateData[key] = value.trim();
    }

    if (manager.modalMode === 'edit') {
        manager.updateCandidate(manager.editingCandidateId, candidateData);
        manager.showToast('Đã cập nhật ứng viên thành công!', 'success');
    } else {
        manager.addCandidate(candidateData);
        manager.showToast('Đã thêm ứng viên thành công!', 'success');
    }
    closeModal_internal(manager);
}

export function openAddModal(manager) {
    const modal = document.getElementById('addCandidateModal');
    const form = document.getElementById('addCandidateForm');
    const modalTitle = document.querySelector('.modal-header h2');

    manager.modalMode = 'add';
    manager.editingCandidateId = null;

    modalTitle.textContent = 'Thêm ứng viên';
    form.reset();
    //forcus input first
    setTimeout(() => {
        modal.querySelector('.forcus')?.focus();
    }, 50);

    const today = new Date().toISOString().split('T')[0];
    form.querySelector('[name="appliedDate"]').value = today;

    modal.classList.add('show');
}


export function openEditModal(manager, candidateId) {
    const modal = document.getElementById('addCandidateModal');
    const form = document.getElementById('addCandidateForm');
    const modalTitle = document.querySelector('.modal-header h2');

    const candidate = manager.candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    manager.modalMode = 'edit';
    manager.editingCandidateId = candidateId;

    modalTitle.textContent = 'Chỉnh sửa ứng viên';
    //forcus input first
    setTimeout(() => {
        modal.querySelector('.forcus')?.focus();
    }, 50);
    fillFormData(form, candidate);

    modal.classList.add('show');
}

function fillFormData(form, candidate) {
    for (let key in candidate) {
        if (key === 'id') continue;

        const input = form.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = candidate[key] || '';
        }
    }
}

function closeModal_internal(manager) {
    const modal = document.getElementById('addCandidateModal');
    const form = document.getElementById('addCandidateForm');

    clearAllErrors(form);

    modal.classList.remove('show');
    form.reset();
    manager.modalMode = 'add';
    manager.editingCandidateId = null;
}

