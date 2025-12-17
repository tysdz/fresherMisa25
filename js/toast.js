export function showToast(message, type = 'success') {
    const backgroundColor = type === 'success'
        ? 'linear-gradient(to right, #2CA01C, #248517)'
        : 'linear-gradient(to right, #ff5f6d, #ffc371)';

    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: backgroundColor,
        },
        stopOnFocus: true,
        onClick: function () { }
    }).showToast();
}
