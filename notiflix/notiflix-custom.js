/**
 * Notiflix Custom Wrapper
 * @version 1.0.0
 * @description A beautiful custom wrapper for Notiflix with Vue-inspired design
 * @author Your Name
 * @license MIT
 * 
 * Usage:
 * 1. Add to your HTML:
 *    <script src="https://cdn.jsdelivr.net/npm/notiflix@3.2.6/dist/notiflix-3.2.6.min.js"></script>
 *    <script src="https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/assets/notiflix-custom.js"></script>
 * 
 * 2. Use the functions:
 *    notifySuccess('Operation completed!');
 *    notifyError('Something went wrong!');
 *    notifyWarning('Please be careful!');
 *    notifyInfo('Here is some information');
 *    confirmModal('Are you sure?', callback);
 */

(function(window) {
    'use strict';

    // Check if Notiflix is loaded
    if (typeof Notiflix === 'undefined') {
        console.error('Notiflix Custom: Notiflix library is required. Please include it before this script.');
        return;
    }

    // Inject custom CSS styles
    const injectStyles = () => {
        if (document.getElementById('notiflix-custom-styles')) return;

        const style = document.createElement('style');
        style.id = 'notiflix-custom-styles';
        style.textContent = `
            /* Notiflix Custom Styles - Center Toast Design */
            #NotiflixNotifyWrap {
                width: auto !important;
                max-width: 500px !important;
                pointer-events: none !important;
                top: 50% !important;
                left: 50% !important;
                right: auto !important;
                bottom: auto !important;
                transform: translate(-50%, -50%) !important;
            }

            .notiflix-notify {
                pointer-events: auto !important;
                padding: 20px 24px !important;
                border-radius: 16px !important;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1) !important;
                margin: 12px 0 !important;
                min-width: 350px !important;
                font-size: 15px !important;
                font-weight: 500 !important;
                line-height: 1.6 !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255,255,255,0.2) !important;
                position: relative !important;
                overflow: hidden !important;
            }

            .notiflix-notify-success {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                color: #ffffff !important;
                padding-left: 55px !important;
            }

            .notiflix-notify-success::before {
                content: '✓';
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
                font-weight: bold;
                opacity: 0.3;
            }

            .notiflix-notify-failure {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
                color: #ffffff !important;
                padding-left: 55px !important;
            }

            .notiflix-notify-failure::before {
                content: '✕';
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
                font-weight: bold;
                opacity: 0.3;
            }

            .notiflix-notify-warning {
                background: linear-gradient(135deg, #ffa726 0%, #fb8c00 100%) !important;
                color: #ffffff !important;
                padding-left: 55px !important;
            }

            .notiflix-notify-warning::before {
                content: '⚠';
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
                font-weight: bold;
                opacity: 0.3;
            }

            .notiflix-notify-info {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
                color: #ffffff !important;
                padding-left: 55px !important;
            }

            .notiflix-notify-info::before {
                content: 'ℹ';
                position: absolute;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 24px;
                font-weight: bold;
                opacity: 0.3;
            }

            .notiflix-notify::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: notiflix-shimmer 3s infinite;
            }

            @keyframes notiflix-shimmer {
                0% { left: -100%; }
                50% { left: 100%; }
                100% { left: 100%; }
            }

            .notiflix-notify-close {
                background: rgba(255,255,255,0.2) !important;
                border-radius: 50% !important;
                width: 28px !important;
                height: 28px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.2s !important;
                backdrop-filter: blur(5px) !important;
            }

            .notiflix-notify-close:hover {
                background: rgba(255,255,255,0.3) !important;
                transform: rotate(90deg) !important;
            }

            .notiflix-notify {
                border-bottom: 3px solid rgba(255,255,255,0.3) !important;
            }

            @media (max-width: 600px) {
                .notiflix-notify {
                    min-width: 300px !important;
                }
            }

            /* Custom Confirm Modal Styles */
            .notiflix-confirm-custom {
                border-radius: 20px !important;
                backdrop-filter: blur(10px) !important;
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize Notiflix with custom settings
    const initializeNotiflix = () => {
        // Notify settings
        Notiflix.Notify.init({
            width: '400px',
            position: 'center-center',
            distance: '15px',
            opacity: 1,
            borderRadius: '16px',
            rtl: false,
            timeout: 3500,
            messageMaxLength: 300,
            backOverlay: false,
            plainText: false,
            showOnlyTheLastOne: false,
            clickToClose: true,
            pauseOnHover: true,
            ID: 'NotiflixNotify',
            className: 'notiflix-notify',
            zindex: 4001,
            fontFamily: 'inherit',
            fontSize: '15px',
            cssAnimation: true,
            cssAnimationDuration: 400,
            cssAnimationStyle: 'from-top',
            closeButton: true,
            useIcon: false,
            useFontAwesome: false,

            success: {
                background: '#667eea',
                textColor: '#ffffff',
                childClassName: 'notiflix-notify-success',
                notiflixIconColor: 'rgba(255,255,255,0.3)',
            },

            failure: {
                background: '#f5576c',
                textColor: '#ffffff',
                childClassName: 'notiflix-notify-failure',
                notiflixIconColor: 'rgba(255,255,255,0.3)',
            },

            warning: {
                background: '#ffa726',
                textColor: '#ffffff',
                childClassName: 'notiflix-notify-warning',
                notiflixIconColor: 'rgba(255,255,255,0.3)',
            },

            info: {
                background: '#4facfe',
                textColor: '#ffffff',
                childClassName: 'notiflix-notify-info',
                notiflixIconColor: 'rgba(255,255,255,0.3)',
            },
        });

        // Confirm settings
        Notiflix.Confirm.init({
            className: 'notiflix-confirm-custom',
            width: '400px',
            zindex: 4003,
            position: 'center',
            distance: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            backOverlay: true,
            backOverlayColor: 'rgba(0,0,0,0.5)',
            rtl: false,
            fontFamily: 'inherit',
            cssAnimation: true,
            cssAnimationDuration: 300,
            cssAnimationStyle: 'zoom',
            plainText: false,
            titleColor: '#667eea',
            titleFontSize: '20px',
            titleMaxLength: 34,
            messageColor: '#555',
            messageFontSize: '16px',
            messageMaxLength: 300,
            buttonsFontSize: '16px',
            buttonsMaxLength: 34,
            okButtonColor: '#fff',
            okButtonBackground: '#667eea',
            cancelButtonColor: '#333',
            cancelButtonBackground: '#e0e0e0',
        });
    };

    // Public API - Notification Functions
    window.notifySuccess = function(message, options = {}) {
        const defaultOptions = {
            timeout: options.timeout || 3500,
            clickToClose: options.clickToClose !== undefined ? options.clickToClose : true,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        };
        Notiflix.Notify.success(message, defaultOptions);
    };

    window.notifyError = function(message, options = {}) {
        const defaultOptions = {
            timeout: options.timeout || 3500,
            clickToClose: options.clickToClose !== undefined ? options.clickToClose : true,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        };
        Notiflix.Notify.failure(message, defaultOptions);
    };

    window.notifyWarning = function(message, options = {}) {
        const defaultOptions = {
            timeout: options.timeout || 3500,
            clickToClose: options.clickToClose !== undefined ? options.clickToClose : true,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        };
        Notiflix.Notify.warning(message, defaultOptions);
    };

    window.notifyInfo = function(message, options = {}) {
        const defaultOptions = {
            timeout: options.timeout || 3500,
            clickToClose: options.clickToClose !== undefined ? options.clickToClose : true,
            pauseOnHover: options.pauseOnHover !== undefined ? options.pauseOnHover : true,
        };
        Notiflix.Notify.info(message, defaultOptions);
    };

    // Public API - Confirm Modal Function
    window.confirmModal = function(title, message, onConfirm, onCancel, options = {}) {
        // Handle overloaded function signatures
        let finalTitle, finalMessage, finalOnConfirm, finalOnCancel, finalOptions;

        if (typeof message === 'function') {
            // confirmModal('Message', onConfirm, onCancel, options)
            finalTitle = 'Confirmation';
            finalMessage = title;
            finalOnConfirm = message;
            finalOnCancel = onConfirm;
            finalOptions = onCancel || {};
        } else {
            // confirmModal('Title', 'Message', onConfirm, onCancel, options)
            finalTitle = title;
            finalMessage = message;
            finalOnConfirm = onConfirm;
            finalOnCancel = onCancel;
            finalOptions = options;
        }

        const okButtonText = finalOptions.okButtonText || 'Confirm';
        const cancelButtonText = finalOptions.cancelButtonText || 'Cancel';

        const okCallback = function() {
            if (typeof finalOnConfirm === 'function') {
                finalOnConfirm();
            }
        };

        const cancelCallback = function() {
            if (typeof finalOnCancel === 'function') {
                finalOnCancel();
            }
        };

        const customOptions = {
            width: finalOptions.width || '400px',
            borderRadius: finalOptions.borderRadius || '20px',
            titleColor: finalOptions.titleColor || '#667eea',
            messageColor: finalOptions.messageColor || '#555',
            okButtonBackground: finalOptions.okButtonBackground || '#667eea',
            okButtonColor: finalOptions.okButtonColor || '#fff',
            cancelButtonBackground: finalOptions.cancelButtonBackground || '#e0e0e0',
            cancelButtonColor: finalOptions.cancelButtonColor || '#333',
            buttonsFontSize: finalOptions.buttonsFontSize || '16px',
            cssAnimationStyle: finalOptions.cssAnimationStyle || 'zoom',
            cssAnimationDuration: finalOptions.cssAnimationDuration || 300,
            backOverlay: finalOptions.backOverlay !== undefined ? finalOptions.backOverlay : true,
            backOverlayColor: finalOptions.backOverlayColor || 'rgba(0,0,0,0.5)',
            plainText: finalOptions.plainText !== undefined ? finalOptions.plainText : false,
        };

        Notiflix.Confirm.show(
            finalTitle,
            finalMessage,
            okButtonText,
            cancelButtonText,
            okCallback,
            cancelCallback,
            customOptions
        );
    };

    // Preset confirm modals
    window.confirmDelete = function(message, onConfirm, onCancel) {
        confirmModal(
            '⚠️ Delete Confirmation',
            message || 'Are you sure you want to delete this? This action cannot be undone.',
            onConfirm,
            onCancel,
            {
                okButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                titleColor: '#f5576c',
                okButtonBackground: '#f5576c',
                cancelButtonBackground: '#4facfe',
                cancelButtonColor: '#fff',
            }
        );
    };

    window.confirmAction = function(message, onConfirm, onCancel) {
        confirmModal(
            'Confirm Action',
            message || 'Are you sure you want to proceed?',
            onConfirm,
            onCancel
        );
    };

    // Loading indicator functions
    window.showLoading = function(message, options = {}) {
        Notiflix.Loading.standard(message || 'Loading...', {
            backgroundColor: options.backgroundColor || 'rgba(0,0,0,0.8)',
            svgColor: options.svgColor || '#667eea',
            messageColor: options.messageColor || '#ffffff',
            messageFontSize: options.messageFontSize || '16px',
        });
    };

    window.hideLoading = function(delay = 0) {
        setTimeout(() => {
            Notiflix.Loading.remove();
        }, delay);
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectStyles();
            initializeNotiflix();
        });
    } else {
        injectStyles();
        initializeNotiflix();
    }

    // Log initialization
    console.log('%c Notiflix Custom v1.0.0 ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 5px 10px; border-radius: 5px;');
    console.log('Available functions: notifySuccess(), notifyError(), notifyWarning(), notifyInfo(), confirmModal(), confirmDelete(), confirmAction(), showLoading(), hideLoading()');

})(window);