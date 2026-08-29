{
  "brand": {
    "name": "MAXEK",
    "attributes": [
      "premium",
      "elegant",
      "minimal",
      "modern",
      "spacious",
      "corporate",
      "timeless",
      "engineering-led",
      "credibility-first"
    ],
    "non_negotiables": {
      "hero": {
        "background": "Use /assets/video/maxek-hero.mp4 as full-screen (100vh) background video. object-fit: cover. Dark overlay. No split layout. No containers/cards in hero.",
        "copy": {
          "kicker": "INTEGRATED ENGINEERING GROUP",
          "headline": "Engineering Tomorrow. / Building Sustainable Growth.",
          "support": "Creating value through engineering, technology, and innovation.",
          "cta": "Explore MAXEK (smooth-scroll to Business Verticals)",
          "scroll_indicator": "subtle animated indicator"
        }
      },
      "header": {
        "initial": "Transparent over hero video; light logo; white nav links.",
        "scrolled": "White background; dark logo; dark nav; subtle shadow; smooth transition."
      },
      "avoid": [
        "template layouts",
        "generic construction website look",
        "excessive gradients",
        "heavy glassmorphism",
        "cartoon illustrations",
        "AI-generated fake people",
        "busy/cluttered sections",
        "flashy animations",
        "organizational charts/flowcharts (especially for Business Hub)"
      ]
    }
  },
  "design_tokens": {
    "css_custom_properties": {
      "notes": "Implement these in /app/frontend/src/index.css under :root. Keep shadcn HSL vars but override with MAXEK system. Provide both HEX (for Tailwind config) and HSL (for shadcn tokens).",
      "colors": {
        "maxek_red": {
          "hex": "#E31E24",
          "hex_alt": "#D71920",
          "hsl": "358 78% 51%",
          "usage": "Primary accent only: CTAs, active states, small highlights, rules, badges. Never as large background blocks."
        },
        "navy_heading": {
          "hex": "#0B1B3A",
          "hsl": "220 68% 14%",
          "usage": "All headings on white sections."
        },
        "ink": {
          "hex": "#0B0D12",
          "hsl": "225 22% 6%",
          "usage": "Hero overlay text + deep neutral for dark sections."
        },
        "white": {
          "hex": "#FFFFFF",
          "hsl": "0 0% 100%"
        },
        "grey_text": {
          "hex": "#4B5563",
          "hsl": "215 14% 35%",
          "usage": "Body text on white."
        },
        "grey_muted": {
          "hex": "#6B7280",
          "hsl": "220 9% 46%",
          "usage": "Secondary labels, meta, captions."
        },
        "grey_border": {
          "hex": "#E5E7EB",
          "hsl": "220 13% 91%",
          "usage": "Hairline borders, dividers."
        },
        "grey_surface": {
          "hex": "#F7F8FA",
          "hsl": "220 20% 98%",
          "usage": "Subtle section background alternation (not cards)."
        },
        "hero_overlay": {
          "rgba": "rgba(0,0,0,0.55)",
          "usage": "Overlay layer above hero video for readability."
        },
        "focus_ring": {
          "hex": "#E31E24",
          "hsl": "358 78% 51%",
          "usage": "Visible focus ring (2px) with offset."
        },
        "success": { "hex": "#0F766E", "hsl": "173 78% 26%" },
        "warning": { "hex": "#B45309", "hsl": "28 90% 37%" },
        "danger": { "hex": "#B91C1C", "hsl": "0 74% 42%" }
      },
      "typography": {
        "font_pairing": {
          "heading": {
            "family": "Space Grotesk",
            "fallback": "ui-sans-serif, system-ui",
            "why": "Modern, engineered, premium; strong numerals; not generic."
          },
          "body": {
            "family": "IBM Plex Sans",
            "fallback": "ui-sans-serif, system-ui",
            "why": "Corporate readability; neutral tone; excellent at small sizes."
          },
          "mono_optional": {
            "family": "IBM Plex Mono",
            "usage": "Project metadata tables, slugs, technical tags (sparingly)."
          },
          "implementation": {
            "google_fonts": [
              "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
            ],
            "css_vars": {
              "--font-heading": "'Space Grotesk'",
              "--font-body": "'IBM Plex Sans'",
              "--font-mono": "'IBM Plex Mono'"
            }
          }
        },
        "type_scale_clamp": {
          "h1": "clamp(2.25rem, 3.2vw + 1.2rem, 4rem)",
          "h2": "clamp(1.75rem, 2.2vw + 1rem, 2.75rem)",
          "h3": "clamp(1.25rem, 1.2vw + 0.9rem, 1.75rem)",
          "h4": "clamp(1.125rem, 0.6vw + 0.95rem, 1.25rem)",
          "body": "1rem",
          "body_sm": "0.9375rem",
          "caption": "0.8125rem",
          "kicker": "0.75rem",
          "line_heights": {
            "tight": "1.1",
            "heading": "1.15",
            "body": "1.65"
          },
          "letter_spacing": {
            "kicker": "0.14em",
            "heading": "-0.02em",
            "body": "0em"
          }
        }
      },
      "radius_shadow": {
        "radius": {
          "card": "16px",
          "button": "12px",
          "input": "12px",
          "pill": "999px"
        },
        "shadow": {
          "card": "0 10px 30px rgba(11, 13, 18, 0.08)",
          "card_hover": "0 18px 50px rgba(11, 13, 18, 0.12)",
          "header_scrolled": "0 8px 24px rgba(11, 13, 18, 0.08)"
        }
      },
      "spacing_rhythm": {
        "section_padding_y": {
          "mobile": "py-16",
          "tablet": "md:py-24",
          "desktop": "lg:py-28"
        },
        "container": {
          "max_width": "max-w-6xl",
          "padding": "px-5 sm:px-6 lg:px-8"
        },
        "grid": {
          "desktop_columns": 12,
          "gap": "gap-6 lg:gap-10",
          "editorial_rule": "Use asymmetric spans (e.g., 5/7, 4/8) to avoid template feel."
        }
      }
    },
    "tailwind_extension": {
      "notes": "Add these to tailwind.config.js theme.extend.colors and fontFamily. Use semantic tokens in components.",
      "colors": {
        "maxek": {
          "red": "#E31E24",
          "navy": "#0B1B3A",
          "ink": "#0B0D12",
          "surface": "#F7F8FA",
          "border": "#E5E7EB",
          "text": "#4B5563",
          "muted": "#6B7280"
        }
      },
      "fontFamily": {
        "heading": "var(--font-heading)",
        "sans": "var(--font-body)",
        "mono": "var(--font-mono)"
      }
    }
  },
  "signature_details": {
    "distinctive_elements": [
      {
        "name": "Precision Rule System",
        "description": "Use thin 1px rules (borders) and micro-labels to create an engineered editorial feel: section headers have a left rule + kicker label; cards have a top accent rule that animates on hover.",
        "tailwind": {
          "section_header": "flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-maxek-muted",
          "rule": "h-px flex-1 bg-maxek-border"
        }
      },
      {
        "name": "Red Accent as Motion",
        "description": "MAXEK red appears primarily as animated underline, focus ring, and small corner notch—not as big fills. This keeps the site premium and avoids a loud corporate look.",
        "examples": [
          "Nav active link underline grows from left",
          "Card hover reveals 2px red top border",
          "Primary button hover shows subtle red glow shadow"
        ]
      }
    ]
  },
  "layout_blueprints": {
    "global": {
      "page_shell": {
        "structure": "Header (fixed) + main + Footer. Use <main id='main-content'> for skip link.",
        "max_width": "Use container max-w-6xl for most sections; allow full-bleed for hero video and occasional image bands.",
        "section_headers": "Kicker + H2 + short support line; align left; use asymmetric grid with copy on left and supporting media/cards on right."
      },
      "editorial_patterns": [
        "Use Z-pattern on landing sections: left-aligned headline, right-aligned supporting stats/cards.",
        "Alternate section background: white then maxek-surface (very subtle).",
        "Use sticky subnav only on long detail pages (projects/article) if needed; keep minimal."
      ]
    },
    "routes": {
      "/": {
        "sections": [
          "Hero (video)",
          "About MAXEK",
          "Why MAXEK (6 cards)",
          "Business Verticals (3 cards with official logos)",
          "Featured Projects (4 official photos)",
          "Industries We Serve (10 grid)",
          "Our Engineering Approach (6-step)",
          "Global Presence",
          "Knowledge Center (list)",
          "Careers (teaser)",
          "Contact CTA",
          "Footer"
        ],
        "hero_spec": {
          "layers": [
            "<video> full-bleed",
            "overlay: bg-black/55",
            "content: bottom-left aligned on desktop; centered-left on mobile"
          ],
          "content_layout": {
            "container": "absolute inset-0 flex items-end",
            "inner": "w-full px-5 sm:px-6 lg:px-10 pb-14 sm:pb-16 lg:pb-20",
            "max_width": "max-w-3xl",
            "kicker": "text-[11px] tracking-[0.22em] uppercase text-white/80",
            "headline": "font-heading text-white leading-[1.05]",
            "support": "mt-4 text-base sm:text-lg text-white/80 max-w-[52ch]",
            "cta_row": "mt-8 flex items-center gap-4"
          },
          "cta": {
            "primary": "Button primary (solid white) with red hover accent",
            "secondary": "Ghost/outline (white border) for Business Enquiry in header only"
          },
          "scroll_indicator": {
            "position": "absolute bottom-6 left-1/2 -translate-x-1/2",
            "style": "thin rounded pill outline + moving dot",
            "motion": "y: [0, 10, 0], duration 1.6s, easeInOut, repeat Infinity"
          }
        },
        "business_verticals": {
          "grid": "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8",
          "card": "Use shadcn Card with large padding; logo top-left; short description; CTA link with animated underline.",
          "logo": "Use official vertical logos only: /assets/logos/maxek-*-logo.webp"
        }
      },
      "/about": {
        "layout": "Editorial longform: left rail for section nav (desktop) + main content. Use generous spacing and occasional full-bleed image bands (Unsplash) between chapters.",
        "sections": [
          "Company Overview",
          "Our Story",
          "Vision",
          "Mission",
          "Core Values",
          "Leadership",
          "Corporate Profile",
          "Quality & Compliance",
          "Global Presence"
        ]
      },
      "/verticals": {
        "layout": "Hub page: hero (static image band, not video) + 3 vertical cards + quick facts + CTA to enquiry modal.",
        "note": "Keep consistent with home vertical cards; avoid reinventing."
      },
      "/verticals/maxek-infra": {
        "sections": [
          "Hero",
          "Overview",
          "Services (8)",
          "Industries",
          "Engineering Process",
          "Projects",
          "Safety & Quality",
          "FAQs (Accordion)",
          "Contact (Enquiry CTA)"
        ],
        "faq": "Use shadcn Accordion."
      },
      "/verticals/maxek-solutions": {
        "sections": [
          "Hero",
          "About",
          "Digital Solutions",
          "Products",
          "Technology Stack",
          "Industries",
          "Case Studies",
          "FAQs",
          "Contact"
        ]
      },
      "/verticals/maxek-business-hub": {
        "critical": "Must be interactive, premium experience; never a flowchart/org chart.",
        "interaction_model": {
          "pattern": "Pillars as interactive tabs + animated content panel; each pillar reveals its offerings as cards with microcopy.",
          "components": [
            "shadcn Tabs",
            "Card",
            "Badge",
            "Accordion for FAQs"
          ]
        },
        "pillars": {
          "Brand Solutions": ["Brand Launch™", "Brand Revamp™"],
          "Growth Solutions": ["Lead Engine™", "Sales Engine™", "Market Dominance™", "Growth Accelerator™"],
          "People Solutions": ["Recruitment Partner™", "People Excellence™"],
          "Technology Solutions": [
            "Digital Transformation™",
            "Business Systems™",
            "Business Automation™",
            "Business Intelligence™"
          ]
        },
        "maxek_edu": [
          "AI Learning",
          "Business Courses",
          "Corporate Training",
          "Workshops",
          "Certification Programs"
        ]
      },
      "/projects": {
        "layout": "Filterable listing with vertical filters (shadcn Select/ToggleGroup) + project cards. Use 4 official photos as featured; additional projects can use neutral placeholders or repeated official photos only if PRD allows (prefer placeholders).",
        "cards": "Image top (16:9), title, meta row (industry/location), short scope, CTA."
      },
      "/projects/:slug": {
        "layout": "Hero image (16:9) + overview; then two-column meta grid; then narrative sections: Challenges/Solutions/Results; gallery grid.",
        "components": ["Breadcrumb", "Tabs (Overview/Details/Gallery)", "Table for metadata"]
      },
      "/knowledge-center": {
        "layout": "Category filters + list. Use clean editorial cards; no blog gimmicks.",
        "detail": "Article page with reading width max-w-3xl, sticky TOC optional on desktop."
      },
      "/careers": {
        "layout": "Openings list (Accordion or Cards) + benefits grid + internships + apply flow (modal or dedicated section).",
        "apply": "Use same form styling as Business Enquiry; persist to backend."
      },
      "/contact": {
        "layout": "Two-column: company info + form; Google Maps placeholder block with subtle border and caption."
      },
      "/privacy-policy": { "layout": "Longform legal: max-w-3xl, strong typographic rhythm." },
      "/terms-and-conditions": { "layout": "Longform legal: max-w-3xl, strong typographic rhythm." },
      "404": { "layout": "Minimal: headline, short copy, primary CTA back home, secondary to contact." }
    }
  },
  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use": [
        "button.jsx",
        "card.jsx",
        "badge.jsx",
        "accordion.jsx",
        "dialog.jsx (for enquiry modal)",
        "sheet.jsx (for mobile full-screen menu)",
        "tabs.jsx (for Business Hub pillars)",
        "select.jsx (filters)",
        "navigation-menu.jsx (desktop nav)",
        "breadcrumb.jsx",
        "table.jsx",
        "input.jsx",
        "textarea.jsx",
        "label.jsx",
        "sonner.jsx (toasts)"
      ]
    },
    "specs": {
      "buttons": {
        "primary": {
          "style": "Solid navy text on white in hero; elsewhere solid navy background with white text OR white background with navy text depending on context. Use red only as hover accent.",
          "tailwind": "rounded-xl px-5 py-3 text-sm font-medium tracking-tight shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2",
          "hover": "hover:shadow-md hover:-translate-y-[1px] hover:bg-maxek-navy hover:text-white (or invert based on base)",
          "motion": "transition-[background-color,color,box-shadow] duration-200 ease-out"
        },
        "secondary_outline": {
          "usage": "Header Business Enquiry button (outlined).",
          "tailwind": "rounded-xl border border-white/40 bg-white/0 text-white hover:border-white/70 hover:bg-white/10",
          "scrolled_state": "border-maxek-border text-maxek-navy hover:border-maxek-red/40 hover:bg-maxek-surface"
        },
        "link": {
          "style": "Text link with animated underline in red.",
          "tailwind": "relative inline-flex items-center gap-2 text-maxek-navy",
          "underline": "after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-maxek-red after:transition-transform after:duration-200 hover:after:scale-x-100"
        },
        "data_testid_examples": [
          "data-testid=\"hero-explore-maxek-button\"",
          "data-testid=\"header-business-enquiry-button\""
        ]
      },
      "cards": {
        "base": {
          "tailwind": "rounded-2xl border border-maxek-border bg-white p-7 shadow-[var(--shadow-card)]",
          "hover": "hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
          "motion": "transition-[box-shadow,transform,border-color] duration-250 ease-out"
        },
        "accent_rule": "Add a top rule: before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-maxek-red before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-transform before:duration-300"
      },
      "inputs": {
        "tailwind": "rounded-xl border border-maxek-border bg-white px-4 py-3 text-sm text-maxek-ink placeholder:text-maxek-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maxek-red focus-visible:ring-offset-2",
        "error": "border-danger/40 text-danger focus-visible:ring-danger",
        "helper_text": "text-xs text-maxek-muted"
      },
      "accordion": {
        "component": "accordion.jsx",
        "style": "Minimal, premium: thin dividers, generous padding, plus/minus icon.",
        "tailwind": "border-b border-maxek-border py-5",
        "trigger": "text-left font-heading text-base text-maxek-navy hover:text-maxek-ink"
      },
      "modal_business_enquiry": {
        "component": "dialog.jsx",
        "backdrop": "bg-black/60 backdrop-blur-sm",
        "panel": "max-w-2xl rounded-2xl border border-white/10 bg-white shadow-2xl",
        "motion": "Fade + scale (0.98→1) with 220ms ease-out; close 160ms",
        "a11y": [
          "Trap focus",
          "Escape closes",
          "Click outside closes",
          "Prevent background scroll",
          "Initial focus on first field"
        ],
        "fields": [
          "Full Name*",
          "Company Name",
          "Email*",
          "Phone*",
          "Business Vertical",
          "Service Required",
          "Project Details",
          "Submit"
        ],
        "data_testids": {
          "modal": "business-enquiry-modal",
          "submit": "business-enquiry-submit-button",
          "close": "business-enquiry-close-button"
        }
      },
      "mobile_menu": {
        "component": "sheet.jsx",
        "pattern": "Full-screen overlay menu with large tap targets; staggered link reveal; includes Business Enquiry CTA.",
        "panel": "w-screen h-screen bg-white",
        "links": "text-2xl font-heading text-maxek-navy",
        "meta": "Add contact snippet + social icons at bottom.",
        "data_testids": {
          "open": "mobile-menu-open-button",
          "close": "mobile-menu-close-button",
          "panel": "mobile-menu-panel"
        }
      }
    }
  },
  "motion": {
    "libraries": {
      "framer_motion": {
        "use_for": [
          "page transitions",
          "section reveal",
          "staggered lists",
          "modal open/close",
          "mobile menu link stagger"
        ]
      },
      "gsap": {
        "use_for": [
          "only where required: hero scroll indicator fine-tuning or complex timeline",
          "avoid heavy parallax"
        ]
      },
      "lenis": {
        "use_for": ["smooth scrolling for Explore MAXEK CTA and general scroll feel"],
        "reduced_motion": "Disable Lenis when prefers-reduced-motion: reduce"
      }
    },
    "framer_variants": {
      "page": {
        "initial": { "opacity": 0, "y": 10 },
        "animate": { "opacity": 1, "y": 0 },
        "exit": { "opacity": 0, "y": -8 },
        "transition": { "duration": 0.35, "ease": [0.22, 1, 0.36, 1] }
      },
      "section_reveal": {
        "hidden": { "opacity": 0, "y": 18 },
        "show": { "opacity": 1, "y": 0 },
        "transition": { "duration": 0.55, "ease": [0.22, 1, 0.36, 1] }
      },
      "stagger": {
        "container": { "hidden": {}, "show": { "transition": { "staggerChildren": 0.08, "delayChildren": 0.06 } } },
        "item": { "hidden": { "opacity": 0, "y": 14 }, "show": { "opacity": 1, "y": 0, "transition": { "duration": 0.45, "ease": [0.22, 1, 0.36, 1] } } }
      },
      "modal": {
        "overlay": {
          "hidden": { "opacity": 0 },
          "show": { "opacity": 1, "transition": { "duration": 0.18 } },
          "exit": { "opacity": 0, "transition": { "duration": 0.14 } }
        },
        "panel": {
          "hidden": { "opacity": 0, "scale": 0.98, "y": 8 },
          "show": { "opacity": 1, "scale": 1, "y": 0, "transition": { "duration": 0.22, "ease": [0.22, 1, 0.36, 1] } },
          "exit": { "opacity": 0, "scale": 0.985, "y": 6, "transition": { "duration": 0.16, "ease": [0.4, 0, 0.2, 1] } }
        }
      }
    },
    "micro_interactions": [
      "Buttons: hover lift -translate-y-[1px], shadow increase; active scale-[0.98]",
      "Links: red underline reveal",
      "Cards: subtle lift + top red rule reveal",
      "Images: hover scale-[1.03] with transition-[transform] duration-500 ease-out",
      "Scroll reveal: only once per section; disable on reduced motion"
    ]
  },
  "image_urls": {
    "rules": [
      "Use official MAXEK assets wherever specified; never redesign/replace them.",
      "No cartoon/CGI/AI-looking imagery; avoid cliché fake-people stock.",
      "Prefer industrial facilities, smart factories, infrastructure, steel fabrication, data centers, logistics, glass architecture.",
      "Use WebP where possible; lazy-load below the fold."
    ],
    "official": {
      "hero_video": "/assets/video/maxek-hero.mp4",
      "logos": {
        "light": "/assets/logos/maxek-logo-light.webp",
        "dark": "/assets/logos/maxek-logo-dark.webp",
        "verticals": [
          "/assets/logos/maxek-infra-logo.webp",
          "/assets/logos/maxek-solutions-logo.webp",
          "/assets/logos/maxek-businesshub-logo.webp"
        ]
      },
      "projects": [
        "/assets/projects/industrial-plant-construction-maxek.webp",
        "/assets/projects/factory-infrastructure-steel-fabrication-maxek.webp",
        "/assets/projects/high-rise-commercial-tower-kerala-maxek.webp",
        "/assets/projects/urban-infrastructure-development-maxek.webp"
      ]
    },
    "stock_unsplash": {
      "industrial_facility_exterior": [
        {
          "url": "https://images.unsplash.com/photo-1590830485400-76188d1c518f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5JTIwZXh0ZXJpb3IlMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg1NTE0MTc1fDA&ixlib=rb-4.1.0&q=85",
          "usage": "About page chapter break / Global Presence background band"
        },
        {
          "url": "https://images.unsplash.com/photo-1654971958821-0541f0f3e9e9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5JTIwZXh0ZXJpb3IlMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg1NTE0MTc1fDA&ixlib=rb-4.1.0&q=85",
          "usage": "Industries page hero band"
        }
      ],
      "factory_interior": [
        {
          "url": "https://images.unsplash.com/photo-1774186184398-1cc2da3d029e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBib2FyZHJvb20lMjBtZWV0aW5nJTIwbW9kZXJuJTIwZ2xhc3MlMjBidWlsZGluZ3xlbnwwfHx8fDE3ODU1MTQxOTB8MA&ixlib=rb-4.1.0&q=85",
          "usage": "Business Hub success stories / Careers culture band (use sparingly; avoid cliché people focus)"
        },
        {
          "url": "https://images.unsplash.com/photo-1776090188275-72957bae4ed7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxpbmR1c3RyaWFsJTIwcm9ib3RpY3MlMjBmYWN0b3J5JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzg1NTE0MTg3fDA&ixlib=rb-4.1.0&q=85",
          "usage": "MAXEK Solutions page hero band"
        }
      ]
    }
  },
  "seo_ui_notes": {
    "visual": [
      "One H1 per page; use kicker labels as <p> not headings.",
      "Breadcrumbs on detail pages (projects/articles) for UX + SEO.",
      "Use consistent card titles as <h3> for listings."
    ]
  },
  "testing_requirements": {
    "data_testid_rule": "All interactive and key informational elements MUST include data-testid in kebab-case describing role.",
    "examples": [
      "data-testid=\"header-nav-projects-link\"",
      "data-testid=\"projects-vertical-filter-select\"",
      "data-testid=\"project-card-open-button\"",
      "data-testid=\"knowledge-center-category-filter\"",
      "data-testid=\"careers-apply-now-button\"",
      "data-testid=\"contact-form-submit-button\""
    ]
  },
  "instructions_to_main_agent": {
    "implementation_priorities": [
      "Replace default CRA App.css centering patterns; do not center the app container globally.",
      "Update /app/frontend/src/index.css :root tokens to MAXEK palette (navy headings, grey text, red accent).",
      "Implement header scroll state with logo swap and color transitions.",
      "Hero must be full-bleed video with minimal overlay copy and smooth-scroll CTA.",
      "Use shadcn Dialog for Business Enquiry modal; ensure focus management + scroll lock.",
      "Use shadcn Sheet for full-screen mobile menu.",
      "Use Framer Motion variants exactly as specified; avoid flashy motion.",
      "Keep gradients minimal per restriction rules; for MAXEK, prefer solid colors + subtle noise texture instead of gradients.",
      "Ensure Lighthouse performance: lazy-load images, preload hero video metadata only, use prefers-reduced-motion."
    ],
    "libraries": {
      "required": ["framer-motion", "gsap (only where required)", "@studio-freight/lenis", "lucide-react"],
      "optional": ["recharts (for minimal stats if needed)"]
    },
    "js_files_note": "Project uses .js components; write examples in React .js (not .tsx)."
  }
}

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
