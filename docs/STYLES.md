# Styling Guidelines

This document provides guidelines for maintaining consistent styling across the ERP Company System.

## Design System

### Color Palette

#### Primary Colors
- **Primary Blue**: `#3b82f6` - Main brand color
- **Primary Dark**: `#1e40af` - Darker shade for hover states
- **Primary Light**: `#93c5fd` - Lighter shade for backgrounds

#### Semantic Colors
- **Success**: `#10b981` - For successful actions
- **Warning**: `#f59e0b` - For warnings and alerts
- **Danger**: `#ef4444` - For destructive actions
- **Info**: `#0ea5e9` - For informational messages

#### Neutral Colors
- **Background**: `#f9fafb` - Light mode background
- **Surface**: `#ffffff` - Card and surface backgrounds
- **Border**: `#e5e7eb` - Border color
- **Text Primary**: `#111827` - Primary text color
- **Text Secondary**: `#6b7280` - Secondary text color
- **Text Muted**: `#9ca3af` - Muted text color

### Typography

#### Font Families
- **Primary Font**: `Inter` - For body text and UI
- **Display Font**: `Poppins` - For headings and titles
- **Monospace Font**: `Fira Code` - For code and technical content

#### Font Sizes
- **H1**: 32px (2rem) - Page titles
- **H2**: 24px (1.5rem) - Section headings
- **H3**: 20px (1.25rem) - Subsection headings
- **H4**: 16px (1rem) - Minor headings
- **Body**: 14px (0.875rem) - Regular text
- **Small**: 12px (0.75rem) - Helper text and labels
- **Tiny**: 11px (0.6875rem) - Captions

#### Font Weights
- **Light**: 300 - Subtle text
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasis
- **Semibold**: 600 - Headings
- **Bold**: 700 - Strong emphasis

### Spacing

Using a 4px base unit:
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 12px (0.75rem)
- **lg**: 16px (1rem)
- **xl**: 24px (1.5rem)
- **2xl**: 32px (2rem)
- **3xl**: 48px (3rem)
- **4xl**: 64px (4rem)

### Border Radius

- **sm**: 4px - Small elements
- **md**: 8px - Standard elements
- **lg**: 12px - Large elements
- **xl**: 16px - Extra large elements
- **full**: 9999px - Circular elements

### Shadows

- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

## Tailwind CSS Usage

### Class Organization

Organize Tailwind classes in this order:
1. Layout (display, position, flex, grid)
2. Sizing (width, height, padding, margin)
3. Typography (font, text color, text alignment)
4. Backgrounds (background color, gradients)
5. Borders (border, border-radius, border-color)
6. Effects (shadow, opacity, transform)
7. Transitions (duration, timing, animation)

### Example Component

```tsx
export function Button({ variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={cn(
        // Layout
        'inline-flex items-center justify-center',
        // Sizing
        'px-4 py-2',
        // Typography
        'font-medium text-sm',
        // Transitions
        'transition-colors duration-200',
        // Variants
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        // Sizes
        size === 'sm' && 'px-3 py-1 text-xs',
        size === 'lg' && 'px-6 py-3 text-base',
      )}
      {...props}
    />
  );
}
```

## Component Styling

### Button Component

```tsx
// Primary button
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
  Click me
</button>

// Secondary button
<button className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
  Cancel
</button>

// Danger button
<button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
  Delete
</button>
```

### Card Component

```tsx
<div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</div>
```

### Form Components

```tsx
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Email
    </label>
    <input
      type="email"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter your email"
    />
  </div>
</div>
```

## Dark Mode

The application supports dark mode using Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Dark Mode Colors

- **Background**: `#111827` (dark-900)
- **Surface**: `#1f2937` (dark-800)
- **Border**: `#374151` (dark-700)
- **Text Primary**: `#f9fafb` (gray-50)
- **Text Secondary**: `#d1d5db` (gray-300)

## Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid */}
</div>
```

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Animation & Transitions

### Transition Classes

```tsx
// Smooth color transition
<button className="transition-colors duration-200 hover:bg-blue-700">
  Hover me
</button>

// Smooth transform transition
<div className="transition-transform duration-300 hover:scale-105">
  Scale on hover
</div>
```

### Animation Classes

```tsx
// Fade in animation
<div className="animate-fade-in">Content</div>

// Slide in animation
<div className="animate-slide-in-right">Content</div>
```

## Accessibility

### Color Contrast
- Ensure text has sufficient contrast with background
- Use WCAG AA standards (4.5:1 for normal text)
- Test with contrast checker tools

### Focus States
```tsx
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible button
</button>
```

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Use semantic elements (button, nav, main, etc.)
- Add ARIA labels where needed

## CSS Custom Properties

Define custom properties in `src/index.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1e40af;
  --spacing-unit: 4px;
  --border-radius: 8px;
}

.dark {
  --color-primary: #60a5fa;
  --color-background: #111827;
}
```

## Best Practices

1. **Use Tailwind classes** - Prefer Tailwind over custom CSS
2. **Avoid inline styles** - Use classes instead
3. **Use CSS variables** - For theme colors and spacing
4. **Keep components small** - Easier to style and maintain
5. **Test responsiveness** - Check all breakpoints
6. **Maintain consistency** - Follow the design system
7. **Document custom styles** - Explain non-obvious styling
8. **Use semantic colors** - Use color names that describe purpose

## Tools & Resources

- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Color Picker**: https://tailwindcolor.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Responsive Tester**: https://responsively.app/

## Related Documentation

- [STRUCTURE](./STRUCTURE.md) - Project structure
- [TECHNOLOGIES](./TECHNOLOGIES.md) - Technology stack
- [CONTRIBUTING](./CONTRIBUTING.md) - Contribution guidelines
