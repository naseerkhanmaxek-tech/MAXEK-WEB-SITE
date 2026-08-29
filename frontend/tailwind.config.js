/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "16px",
        btn: "12px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        /* ---------------- MAXEK brand system ---------------- */
        maxek: {
          red: "#E31E24",
          "red-dark": "#B8181D",
          navy: "#0B1C38",
          "navy-soft": "#16294C",
          blue: "#2E75B6",
          ink: "#0B0D12",
          surface: "#F7F8FA",
          border: "#E5E7EB",
          text: "#4B5563",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        kicker: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "display-1": ["clamp(2.25rem, 3.2vw + 1.2rem, 4rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(1.75rem, 2.2vw + 1rem, 2.75rem)", { lineHeight: "1.14", letterSpacing: "-0.02em" }],
        "display-3": ["clamp(1.25rem, 1.2vw + 0.9rem, 1.75rem)", { lineHeight: "1.24", letterSpacing: "-0.015em" }],
      },
      boxShadow: {
        card: "0 10px 30px rgba(11, 13, 18, 0.08)",
        "card-hover": "0 18px 50px rgba(11, 13, 18, 0.12)",
        header: "0 8px 24px rgba(11, 13, 18, 0.08)",
        modal: "0 30px 90px rgba(11, 13, 18, 0.28)",
      },
      maxWidth: {
        shell: "1240px",
        reading: "68ch",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
