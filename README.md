# Ival Permana - Portfolio Website

A modern, responsive portfolio website built with Tailwind CSS, showcasing skills and experience as a Computer Engineering student at Universitas Negeri Makassar.

## 🎨 Design Features

- **Light Theme**: Clean and modern light color scheme with blue accent colors (#3b82f6)
- **Fully Responsive**: Mobile-first design that works seamlessly across all devices
- **Smooth Animations**: Scroll-triggered reveal animations and parallax effects
- **Interactive Elements**: Animated skill progress bars and mobile navigation toggle
- **Modern UI**: Built with Tailwind CSS for consistent, professional styling

## 📄 Sections

1. **Navigation** - Sticky navigation bar with mobile hamburger menu
2. **Hero** - Welcome section with gradient background and call-to-action
3. **About** - Personal introduction and background
4. **Skills** - Interactive skill cards with animated progress bars (HTML/CSS, JavaScript, Tailwind CSS, Bootstrap)
5. **Projects** - Currently empty, ready for future projects
6. **Experience** - Education and work experience timeline
7. **Contact** - Functional contact form with FormSubmit integration
8. **Footer** - Copyright and GitHub link

## 🎯 Key Features

### Responsive Design
- **Mobile**: < 768px - Hamburger menu, single-column layout
- **Tablet**: 768px - 1023px - Two-column grids
- **Desktop**: 1024px+ - Multi-column layouts with optimized spacing

### Scroll Animations
- Fade-in effects on sections as they enter viewport
- Parallax hero effect on scroll
- Animated skill progress bars
- Smooth scroll navigation

### Contact Form Integration
The contact form uses [FormSubmit.co](https://formsubmit.co/) to handle form submissions without backend code.

**Current Configuration:**
- Email: `ivalpermana004@gmail.com`
- Captcha: Disabled
- Redirect: Returns to portfolio with success message
- Subject: "New Portfolio Contact Message"

**To Change the Email Address:**
1. Open `index.html`
2. Find the form tag: `<form id="contact-form" action="https://formsubmit.co/ivalpermana004@gmail.com" method="POST">`
3. Replace `ivalpermana004@gmail.com` with your email
4. Optional: Update the `_next` hidden input to change the redirect URL
5. Optional: Update the `_subject` hidden input to change the email subject

**FormSubmit Configuration Options:**
- `_captcha`: Set to "true" to enable reCAPTCHA spam protection
- `_next`: URL to redirect to after successful submission
- `_subject`: Custom email subject line
- See [FormSubmit documentation](https://formsubmit.co/) for more options

## 🚀 Running the Site

This is a static website with no build process required.

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser.

### Option 2: Local Server (Recommended)
Using Python:
```bash
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080`

Using Node.js (with npx):
```bash
npx serve .
```

Using PHP:
```bash
php -S localhost:8080
```

## 📁 File Structure

```
.
├── index.html          # Main HTML file with inline CSS and JavaScript
├── README.md          # This file
├── FEATURES.md        # Detailed feature documentation
└── .gitignore         # Git ignore file
```

## 🛠 Technology Stack

- **HTML5**: Semantic markup with ARIA attributes
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks or libraries
- **FormSubmit.co**: Contact form backend service

## ⚡ Performance

- **Zero Build Time**: No compilation or bundling required
- **CDN Delivery**: Tailwind CSS loaded from CDN for fast delivery
- **Inline Assets**: All custom CSS and JavaScript inline in HTML
- **Minimal Dependencies**: Only Tailwind CSS CDN, everything else is custom

## ♿ Accessibility

- Semantic HTML5 elements (nav, header, main, section, footer)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators on form fields and buttons
- High contrast color scheme for readability
- Responsive text sizing

## 🎨 Customization

### Colors
The site uses Tailwind's default color palette with blue as the primary color. To customize:
1. Modify the `tailwind.config` in the `<script>` section of `index.html`
2. Update custom CSS color values in the `<style>` section

### Content
All content is in `index.html`:
- Update text in each section directly
- Add/remove skill cards in the Skills section
- Modify experience items in the Experience section
- Update personal information and links

### Projects Section
The Projects section is intentionally empty for now. To add projects:
1. Find the `<!-- Projects Section -->` in `index.html`
2. Replace the placeholder content with project cards
3. Add project images if needed (create an `img/` directory)

## 📝 Notes

- First form submission to a new email address will require email verification via FormSubmit
- Projects section is empty by design - ready for future content
- No external assets or images - pure HTML/CSS/JS implementation
- Mobile navigation automatically closes when a link is clicked

## 📧 Contact

- **GitHub**: [@eval04](https://github.com/eval04)
- **Email**: ivalpermana004@gmail.com

---

© 2025 Ival Permana. All rights reserved.
