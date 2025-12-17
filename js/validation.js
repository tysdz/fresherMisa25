export const validators = {
    required: (value) => {
        return value && value.trim() !== '';
    },

    email: (value) => {
        if (!value) return true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },

    phoneNumber: (value) => {
        if (!value) return true;
        const phoneRegex = /^0\d{9,10}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
    }
};

export const errorMessages = {
    fullName: {
        required: 'Vui lòng nhập họ và tên'
    },
    email: {
        required: 'Vui lòng nhập email',
        email: 'Email không đúng định dạng'

    },
    phoneNumber: {
        required: 'Vui lòng nhập số điện thoại',
        phoneNumber: 'Số điện thoại không đúng định dạng (VD: 0912345678)'
    },
    appliedDate: {
        required: 'Vui lòng chọn ngày ứng tuyển'
    }
};

export const validationRules = {
    fullName: ['required'],
    email: ['required', 'email'],
    phoneNumber: ['required', 'phoneNumber'],
    appliedDate: ['required']
};


export function showFieldError(fieldName, message) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (!input) return;

    clearFieldError(fieldName);

    input.classList.add('error');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.id = `error-${fieldName}`;

    if (input.parentElement) {
        input.parentElement.appendChild(errorDiv);
    }
}

export function clearFieldError(fieldName) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) {
        input.classList.remove('error');
    }

    const errorDiv = document.getElementById(`error-${fieldName}`);
    if (errorDiv) {
        errorDiv.remove();
    }
}


export function clearAllErrors(form) {
    form.querySelectorAll('.error').forEach(el => {
        el.classList.remove('error');
    });

    form.querySelectorAll('.error-message').forEach(el => {
        el.remove();
    });
}


export function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    if (!rules) return { valid: true };

    for (let rule of rules) {
        const isValid = validators[rule](value);

        if (!isValid) {
            const message = errorMessages[fieldName]?.[rule] || 'Dữ liệu không hợp lệ';
            return { valid: false, message };
        }
    }

    return { valid: true };
}

export function validateForm(form) {
    const formData = new FormData(form);
    const errors = {};
    let isValid = true;
    clearAllErrors(form);

    for (let [fieldName, value] of formData.entries()) {
        const result = validateField(fieldName, value.trim());
        if (!result.valid) {
            errors[fieldName] = result.message;
            showFieldError(fieldName, result.message);
            isValid = false;
        }
    }

    return {
        valid: isValid,
        errors: errors
    };
}


