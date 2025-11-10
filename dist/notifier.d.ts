export type NotifyType = "default" | "success" | "error" | "warning";
export type NotifyPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export interface ToastOptions {
    duration?: number;
    actionText?: string;
    onAction?: () => void;
    position?: NotifyPosition;
}
export declare function toast(message: string, options?: ToastOptions): void;
export declare namespace toast {
    function success(message: string, options?: ToastOptions): void;
    function error(message: string, options?: ToastOptions): void;
    function warning(message: string, options?: ToastOptions): void;
}
