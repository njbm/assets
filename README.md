# 📦 njbm/assets — Universal Frontend Assets CDN

A centralized repository of reusable frontend assets (JavaScript, CSS, images, fonts, icons, and plugins), published and distributed via [jsDelivr](https://www.jsdelivr.com/) CDN for easy use in any web project.

---

## 🚀 Quick Start (CDN Usage)

**Add any asset to your project in seconds:**

**JavaScript (versioned, recommended):**
```html
<script src="https://cdn.jsdelivr.net/gh/njbm/assets@1.0.2/js/form-submit-lock.min.js"></script>
```

**CSS (versioned):**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/njbm/assets@1.0.2/css/my-styles.min.css">
```

**Latest (not recommended for production):**
```html
<script src="https://cdn.jsdelivr.net/gh/njbm/assets/js/form-submit-lock.min.js"></script>
```

---

## 🧮 Calculator Widget (Example)

**Add a robust calculator to your site:**
```html
<div id="my-calculator"></div>
<script src="https://cdn.jsdelivr.net/gh/njbm/assets@1.0.2/calculator/robust-calculator.js"></script>
<script>
  RobustCalculator.init('#my-calculator', { theme: "dark", accent: "#e17055" });
</script>
```

**Or the latest:**
```html
<script src="https://cdn.jsdelivr.net/gh/njbm/assets/calculator/robust-calculator.js"></script>
```

---

## 📂 Repository Structure

```
assets/
  calculator/
    robust-calculator.js
    robust-calculator.min.js
    calculator-theme.css
    icons/
  js/
    form-submit-lock.js
    form-submit-lock.min.js
  css/
    my-styles.css
    my-styles.min.css
  icons/
    logo.svg
    github.svg
  plugins/
    <your-plugin-files>
README.md
```

---

## 🔖 Publishing & Versioning

1. **Push changes** to `main`.
2. **Create a GitHub Release** with a semantic version tag (e.g. `v1.0.2`).
3. **Use the versioned CDN link** for stable production use.

*Tip: Always use versioned links in production for stability!*

---

## ✅ Best Practices

- Always keep both minified (`.min.js`, `.min.css`) and unminified versions.
- Use semantic versioning (`vX.Y.Z`) for releases and CDN tags.
- Organize assets into clear folders by type or project.
- Update this README with new asset usage and version info.

---

## 📝 Adding or Updating Assets

- Place new files in the appropriate folder (e.g. `/js`, `/css`, `/calculator`, `/plugins`).
- For major updates, increment the version and release a new tag.
- Update usage examples in the README if needed.

---

## ℹ️ More Examples

**Icon CDN:**
```html
<img src="https://cdn.jsdelivr.net/gh/njbm/assets/icons/logo.svg" alt="Logo">

<img src="https://cdn.jsdelivr.net/gh/njbm/assets@1.0.2/icons/logo.svg" alt="Logo">
```

**Plugin CDN:**
```html
<script src="https://cdn.jsdelivr.net/gh/njbm/assets@1.0.2/plugins/your-plugin.min.js"></script>
```

---

## 👨‍💻 Maintainer

**Jaber Masud**  
[GitHub](https://github.com/njbm)  
[Blog](https://jaber.netlify.app)

---

> _Happy coding! Use, share, and contribute to make web development faster and easier for everyone._