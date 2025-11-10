// src/notifier.ts
function createToast(message, type = "default", options = {}) {
    if (typeof window === "undefined")
        return;
    const { duration = 3000, actionText, onAction, position = "top-right" } = options;
    const containerId = `sonner-lite-${position}`;
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className = `sonner-lite-container sonner-lite-${position}`;
        document.body.appendChild(container);
    }
    const toastEl = document.createElement("div");
    toastEl.className = `notify ${type}`;
    const text = document.createElement("span");
    text.textContent = message;
    toastEl.appendChild(text);
    if (actionText && onAction) {
        const button = document.createElement("button");
        button.textContent = actionText;
        button.onclick = () => {
            onAction();
            hide();
        };
        toastEl.appendChild(button);
    }
    container.appendChild(toastEl);
    setTimeout(() => toastEl.classList.add("show"), 10);
    const hide = () => {
        toastEl.classList.remove("show");
        setTimeout(() => {
            if (toastEl.parentNode)
                toastEl.remove();
            if ((container === null || container === void 0 ? void 0 : container.children.length) === 0)
                container.remove();
        }, 300);
    };
    if (duration > 0)
        setTimeout(hide, duration);
}
export function toast(message, options) {
    createToast(message, "default", options);
}
// Добавляем статические методы через namespace
(function (toast) {
    function success(message, options) {
        createToast(message, "success", options);
    }
    toast.success = success;
    function error(message, options) {
        createToast(message, "error", options);
    }
    toast.error = error;
    function warning(message, options) {
        createToast(message, "warning", options);
    }
    toast.warning = warning;
})(toast || (toast = {}));
