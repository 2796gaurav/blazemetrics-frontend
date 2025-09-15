// Accessibility utilities and helpers
// Ensures consistent accessibility implementation across components

export const a11y = {
  // ARIA labels and descriptions
  labels: {
    // Navigation
    mainNavigation: "Main navigation",
    breadcrumbNavigation: "Breadcrumb navigation",
    sectionNavigation: "Section navigation",
    searchForm: "Search documentation",
    
    // Actions
    copyCode: "Copy code to clipboard",
    runCode: "Run code example",
    toggleTheme: "Toggle theme",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    scrollToTop: "Scroll to top",
    
    // Content
    codeExample: "Code example",
    interactiveDemo: "Interactive demonstration",
    performanceChart: "Performance comparison chart",
    featureComparison: "Feature comparison table",
    
    // Status
    loading: "Loading content",
    error: "Error occurred",
    success: "Operation successful",
    warning: "Warning message",
  },

  // Screen reader announcements
  announcements: {
    copied: "Code copied to clipboard",
    codeExecuted: "Code executed successfully",
    navigationChanged: "Navigation changed",
    contentLoaded: "Content loaded",
    searchResults: (count: number) => `${count} search results found`,
    pageChanged: (title: string) => `Navigated to ${title}`,
  },

  // Focus management
  focus: {
    // Trap focus within a container
    trapFocus: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      container.addEventListener('keydown', handleTabKey)
      return () => container.removeEventListener('keydown', handleTabKey)
    },

    // Set focus to element with announcement
    setFocusWithAnnouncement: (element: HTMLElement, announcement?: string) => {
      element.focus()
      if (announcement) {
        a11y.announce(announcement)
      }
    },
  },

  // Screen reader announcements
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.createElement('div')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    announcer.textContent = message

    document.body.appendChild(announcer)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  },

  // Keyboard navigation helpers
  keyboard: {
    // Handle escape key
    onEscape: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback()
      }
    },

    // Handle enter/space for custom buttons
    onActivate: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        callback()
      }
    },

    // Arrow key navigation for lists
    arrowNavigation: (
      container: HTMLElement,
      selector: string = '[role="option"], button, [tabindex="0"]'
    ) => {
      const items = Array.from(container.querySelectorAll(selector)) as HTMLElement[]
      let currentIndex = 0

      const handleArrowKeys = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            currentIndex = Math.min(currentIndex + 1, items.length - 1)
            items[currentIndex].focus()
            break
          case 'ArrowUp':
            e.preventDefault()
            currentIndex = Math.max(currentIndex - 1, 0)
            items[currentIndex].focus()
            break
          case 'Home':
            e.preventDefault()
            currentIndex = 0
            items[currentIndex].focus()
            break
          case 'End':
            e.preventDefault()
            currentIndex = items.length - 1
            items[currentIndex].focus()
            break
        }
      }

      container.addEventListener('keydown', handleArrowKeys)
      return () => container.removeEventListener('keydown', handleArrowKeys)
    },
  },

  // Color contrast and visibility
  contrast: {
    // Check if colors meet WCAG contrast requirements
    meetsContrastRequirement: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
      // This is a simplified check - in production, use a proper contrast calculation library
      const requiredRatio = level === 'AAA' ? 7 : 4.5
      // Implementation would calculate actual contrast ratio
      return true // Placeholder
    },

    // Get high contrast alternative
    getHighContrastColor: (color: string, background: string): string => {
      // Implementation would return a high contrast version
      return color // Placeholder
    },
  },

  // Motion and animation preferences
  motion: {
    // Check if user prefers reduced motion
    prefersReducedMotion: (): boolean => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    },

    // Get appropriate animation duration based on user preference
    getAnimationDuration: (normalDuration: number): number => {
      return a11y.motion.prefersReducedMotion() ? 0 : normalDuration
    },

    // Conditional animation classes
    getAnimationClasses: (animationClasses: string, staticClasses: string = ''): string => {
      return a11y.motion.prefersReducedMotion() ? staticClasses : animationClasses
    },
  },

  // Form accessibility
  form: {
    // Generate accessible form field IDs and labels
    generateFieldId: (name: string): string => `field-${name}-${Date.now()}`,
    
    // Associate label with field
    associateLabel: (fieldId: string, labelId: string) => ({
      field: { id: fieldId, 'aria-labelledby': labelId },
      label: { id: labelId, htmlFor: fieldId },
    }),

    // Error message association
    associateError: (fieldId: string, errorId: string) => ({
      field: { 'aria-describedby': errorId, 'aria-invalid': 'true' },
      error: { id: errorId, role: 'alert' },
    }),
  },

  // Skip links and landmarks
  landmarks: {
    // Generate skip link
    skipLink: (targetId: string, label: string) => ({
      href: `#${targetId}`,
      className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:rounded',
      children: label,
    }),

    // Main content landmark
    mainContent: {
      role: 'main',
      id: 'main-content',
      'aria-label': 'Main content',
    },

    // Navigation landmark
    navigation: (label: string) => ({
      role: 'navigation',
      'aria-label': label,
    }),
  },
} as const

// CSS classes for screen readers
export const srOnlyClasses = 'sr-only'
export const focusVisibleClasses = 'focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:border focus:rounded'

// High contrast mode detection
export const useHighContrast = () => {
  return window.matchMedia('(prefers-contrast: high)').matches
}

// Reduced motion detection hook
export const useReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}