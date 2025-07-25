# 📦 Assets CDN Repository

This repository contains reusable frontend assets such as CSS and JavaScript files (both minified and unminified), which can be used via a public CDN like **jsDelivr**.

## 📁 Folder Structure

```
assets/
├── css/
│   ├── my-style.css
│   ├── my-style.min.css
├── js/
│   ├── utils.js
│   ├── utils.min.js
├── plugins/
│   └── swiper/
│       ├── swiper.css
│       ├── swiper.min.css
│       └── swiper.min.js
```

## 🚀 How to Use via jsDelivr CDN

### Versioned (Recommended):
```
https://cdn.jsdelivr.net/gh/<your-username>/assets@v1.0.0/css/my-style.min.css
https://cdn.jsdelivr.net/gh/<your-username>/assets@v1.0.0/js/utils.min.js
```

### Latest (Not recommended for production):
```
https://cdn.jsdelivr.net/gh/<your-username>/assets/css/my-style.min.css
```

## 🔖 Steps to Publish

1. Push changes to the repository.
2. Create a GitHub Release with tag (e.g. `v1.0.0`).
3. Use the CDN link with version.

## ✅ Best Practices

- Keep minified and unminified versions.
- Use semantic versioning in releases.
- Organize files into relevant folders.
- Update this README with usage instructions and version info.

## 👨‍💻 Author

**Jaber Masud**  
[GitHub](https://github.com/masud9900)