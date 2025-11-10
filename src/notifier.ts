// src/notifier.ts

export type NotifyType = "default" | "success" | "error" | "warning";
export type NotifyPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  duration?: number;
  actionText?: string;
  onAction?: () => void;
  position?: NotifyPosition;
}

function createToast(
  message: string,
  type: NotifyType = "default",
  options: ToastOptions = {}
) {
  if (typeof window === "undefined") return;

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
      if (toastEl.parentNode) toastEl.remove();
      if (container?.children.length === 0) container.remove();
    }, 300);
  };

  if (duration > 0) setTimeout(hide, duration);
}

// ✅ Правильный способ: функция + пространство имён (merge)
export function toast(message: string, options?: ToastOptions): void;
export function toast(message: string, options?: ToastOptions) {
  createToast(message, "default", options);
}

// Добавляем статические методы через namespace
export namespace toast {
  export function success(message: string, options?: ToastOptions) {
    createToast(message, "success", options);
  }
  export function error(message: string, options?: ToastOptions) {
    createToast(message, "error", options);
  }
  export function warning(message: string, options?: ToastOptions) {
    createToast(message, "warning", options);
  }
}