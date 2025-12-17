export function formatDate(dateStr) {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatGender(gender) {
    if (gender === 'Male') return 'Nam';
    if (gender === 'Female') return 'Nữ';
    return gender || '--';
}

export function formatEducation(level) {
    const educationMap = {
        'University': 'Đại học',
        'College': 'Cao đẳng',
        'Master': 'Thạc sĩ',
        'PhD': 'Tiến sĩ'
    };
    return educationMap[level] || level || '--';
}

export function getInitials(fullName) {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length >= 2) {
        return nameParts[0][0] + nameParts[nameParts.length - 1][0];
    }
    return fullName.substring(0, 2);
}

export function getAvatarColor(id) {
    const colors = ['#ff9800', '#2196f3', '#4caf50', '#f44336', '#9c27b0', '#ff5722', '#00bcd4', '#795548'];
    return colors[id % colors.length];
}
