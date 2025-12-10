# 🎨 Notiflix Custom

A beautiful, Vue-inspired wrapper for [Notiflix](https://notiflix.github.io/) with gorgeous center-positioned toasts and easy-to-use API.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🎯 **Center-positioned notifications** - Beautiful toasts in the center of the screen
- 🌈 **Gradient designs** - Modern gradient backgrounds for all notification types
- ✨ **Glassmorphism effects** - Elegant backdrop blur and translucent styling
- 🎭 **Shimmer animations** - Subtle light effects for premium feel
- 📱 **Fully responsive** - Works perfectly on all screen sizes
- 🚀 **Simple API** - Easy-to-use functions like `notifySuccess()`, `notifyError()`
- 🎨 **Customizable** - Override any style or behavior
- 💪 **Zero dependencies** - Only requires Notiflix core library

## 📦 Installation

### Via CDN (jsDelivr)

Add these two scripts to your HTML:

```html
<!-- Step 1: Include Notiflix -->
<script src="https://cdn.jsdelivr.net/npm/notiflix@3.2.6/dist/notiflix-3.2.6.min.js"></script>

<!-- Step 2: Include Notiflix Custom -->
<script src="https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/assets/notiflix-custom.js"></script>
```

### Via NPM (Optional)

```bash
npm install notiflix
```

Then include the custom script in your project.

## 🚀 Quick Start

```javascript
// Success notification
notifySuccess('Operation completed successfully!');

// Error notification
notifyError('Something went wrong!');

// Warning notification
notifyWarning('Please be careful!');

// Info notification
notifyInfo('Here is some useful information');

// Confirm modal
confirmModal(
    'Are you sure?',
    () => console.log('Confirmed!'),
    () => console.log('Cancelled')
);
```

## 📖 API Reference

### Notifications

#### `notifySuccess(message, options?)`
Display a success notification with gradient purple background.

```javascript
notifySuccess('Data saved successfully!');

// With options
notifySuccess('Saved!', {
    timeout: 5000,
    clickToClose: true,
    pauseOnHover: true
});
```

#### `notifyError(message, options?)`
Display an error notification with gradient red background.

```javascript
notifyError('Failed to save data!');
```

#### `notifyWarning(message, options?)`
Display a warning notification with gradient orange background.

```javascript
notifyWarning('This action requires confirmation!');
```

#### `notifyInfo(message, options?)`
Display an info notification with gradient blue background.

```javascript
notifyInfo('New update available!');
```

**Options:**
- `timeout` (number): Display duration in milliseconds (default: 3500)
- `clickToClose` (boolean): Click to dismiss (default: true)
- `pauseOnHover` (boolean): Pause timeout on hover (default: true)

### Confirm Modals

#### `confirmModal(title, message, onConfirm, onCancel, options?)`
Display a custom confirm modal.

```javascript
confirmModal(
    'Delete Item',
    'Are you sure you want to delete this?',
    () => notifySuccess('Deleted!'),
    () => notifyInfo('Cancelled')
);

// Shorthand (message only)
confirmModal(
    'Are you sure?',
    () => notifySuccess('Confirmed!'),
    () => notifyInfo('Cancelled')
);
```

**Options:**
- `okButtonText` (string): Confirm button text (default: 'Confirm')
- `cancelButtonText` (string): Cancel button text (default: 'Cancel')
- `width` (string): Modal width (default: '400px')
- `titleColor` (string): Title text color
- `okButtonBackground` (string): Confirm button background
- And more...

#### `confirmDelete(message, onConfirm, onCancel?)`
Preset delete confirmation with warning styling.

```javascript
confirmDelete(
    'This action cannot be undone!',
    () => notifySuccess('Item deleted'),
    () => notifyInfo('Deletion cancelled')
);
```

#### `confirmAction(message, onConfirm, onCancel?)`
Preset action confirmation with default styling.

```javascript
confirmAction(
    'Proceed with this action?',
    () => notifySuccess('Done!')
);
```

### Loading Indicators

#### `showLoading(message?, options?)`
Display a loading indicator.

```javascript
showLoading('Processing...');

// With custom options
showLoading('Loading...', {
    backgroundColor: 'rgba(0,0,0,0.8)',
    svgColor: '#667eea'
});
```

#### `hideLoading(delay?)`
Hide the loading indicator.

```javascript
hideLoading(); // Hide immediately
hideLoading(1000); // Hide after 1 second
```

## 🎨 Customization

You can customize the styles by modifying the CSS in `notiflix-custom.js` or by overriding the styles in your own CSS file:

```css
/* Override notification background */
.notiflix-notify-success {
    background: linear-gradient(135deg, #your-color-1, #your-color-2) !important;
}

/* Override modal styles */
.notiflix-confirm-custom {
    border-radius: 30px !important;
}
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📝 Examples

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>Notiflix Custom Demo</title>
</head>
<body>
    <button onclick="notifySuccess('Hello World!')">Show Success</button>
    <button onclick="confirmDelete('Delete?', () => alert('Deleted'))">Confirm Delete</button>

    <script src="https://cdn.jsdelivr.net/npm/notiflix@3.2.6/dist/notiflix-3.2.6.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/yourusername/yourrepo@main/assets/notiflix-custom.js"></script>
</body>
</html>
```

### Async/Await Example

```javascript
async function saveData() {
    showLoading('Saving...');
    
    try {
        await fetch('/api/save', { method: 'POST' });
        hideLoading();
        notifySuccess('Data saved successfully!');
    } catch (error) {
        hideLoading();
        notifyError('Failed to save data!');
    }
}
```

### Form Validation Example

```javascript
function submitForm() {
    const data = getFormData();
    
    if (!data.email) {
        notifyWarning('Please enter your email!');
        return;
    }
    
    confirmAction(
        'Submit this form?',
        async () => {
            showLoading('Submitting...');
            await submitToServer(data);
            hideLoading();
            notifySuccess('Form submitted!');
        }
    );
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on top of [Notiflix](https://notiflix.github.io/) by Furkan MT
- Inspired by Vue Toaster and modern UI design principles

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/yourrepo](https://github.com/yourusername/yourrepo)

---

Made with ❤️ by [Your Name]