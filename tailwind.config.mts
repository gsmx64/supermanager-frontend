const {heroui} = require("@heroui/react");

module.exports = {
  purge: [],
  darkMode: 'selector', // or 'media' or 'class' of 'selector'
  theme: {
    extend: {
      colors: {
        brand: {
          50: "rgb(239, 246, 255)",
          100: "rgb(219, 234, 254)",
          200: "rgb(191, 219, 254)",
          300: "rgb(147, 197, 253)",
          400: "rgb(96, 165, 250)",
          500: "rgb(59, 130, 246)",
          600: "rgb(37, 99, 235)",
          700: "rgb(29, 78, 216)",
          800: "rgb(30, 64, 175)",
          900: "rgb(30, 58, 138)",
        },
        neutral: {
          0: "rgb(255, 255, 255)",
          50: "rgb(250, 250, 250)",
          100: "rgb(245, 245, 245)",
          200: "rgb(229, 229, 229)",
          300: "rgb(212, 212, 212)",
          400: "rgb(163, 163, 163)",
          500: "rgb(115, 115, 115)",
          600: "rgb(82, 82, 82)",
          700: "rgb(64, 64, 64)",
          800: "rgb(38, 38, 38)",
          900: "rgb(23, 23, 23)",
          950: "rgb(10, 10, 10)",
        },
        error: {
          50: "rgb(254, 242, 242)",
          100: "rgb(254, 226, 226)",
          200: "rgb(254, 202, 202)",
          300: "rgb(252, 165, 165)",
          400: "rgb(248, 113, 113)",
          500: "rgb(239, 68, 68)",
          600: "rgb(220, 38, 38)",
          700: "rgb(185, 28, 28)",
          800: "rgb(153, 27, 27)",
          900: "rgb(127, 29, 29)",
        },
        warning: {
          50: "rgb(255, 251, 235)",
          100: "rgb(254, 243, 199)",
          200: "rgb(253, 230, 138)",
          300: "rgb(252, 211, 77)",
          400: "rgb(251, 191, 36)",
          500: "rgb(245, 158, 11)",
          600: "rgb(217, 119, 6)",
          700: "rgb(180, 83, 9)",
          800: "rgb(146, 64, 14)",
          900: "rgb(120, 53, 15)",
        },
        success: {
          50: "rgb(240, 253, 244)",
          100: "rgb(220, 252, 231)",
          200: "rgb(187, 247, 208)",
          300: "rgb(134, 239, 172)",
          400: "rgb(74, 222, 128)",
          500: "rgb(34, 197, 94)",
          600: "rgb(22, 163, 74)",
          700: "rgb(21, 128, 61)",
          800: "rgb(22, 101, 52)",
          900: "rgb(20, 83, 45)",
        },
        "brand-primary": "rgb(37, 99, 235)",
        "default-font": "rgb(23, 23, 23)",
        "subtext-color": "rgb(115, 115, 115)",
        "neutral-border": "rgb(229, 229, 229)",
        "white": "rgb(255, 255, 255)",
        "default-background": "rgb(255, 255, 255)",
      },
      fontSize: {
        caption: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "caption-bold": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        body: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
        "body-bold": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-3": [
          "16px",
          {
            lineHeight: "20px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-2": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "heading-1": [
          "30px",
          {
            lineHeight: "36px",
            fontWeight: "500",
            letterSpacing: "0em",
          },
        ],
        "monospace-body": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
            letterSpacing: "0em",
          },
        ],
      },
      fontFamily: {
        caption: "Inter",
        "caption-bold": "Inter",
        body: "Inter",
        "body-bold": "Inter",
        "heading-3": "Inter",
        "heading-2": "Inter",
        "heading-1": "Inter",
        "monospace-body": "monospace",
      },
      boxShadow: {
        sm: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        default: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        md: "0px 4px 16px -2px rgba(0, 0, 0, 0.08), 0px 2px 4px -1px rgba(0, 0, 0, 0.08)",
        lg: "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
        overlay:
          "0px 12px 32px -4px rgba(0, 0, 0, 0.08), 0px 4px 8px -2px rgba(0, 0, 0, 0.08)",
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        DEFAULT: "4px",
        lg: "8px",
        full: "9999px",
      },
      container: {
        padding: {
          DEFAULT: "16px",
          sm: "calc((100vw + 16px - 640px) / 2)",
          md: "calc((100vw + 16px - 768px) / 2)",
          lg: "calc((100vw + 16px - 1024px) / 2)",
          xl: "calc((100vw + 16px - 1280px) / 2)",
          "2xl": "calc((100vw + 16px - 1536px) / 2)",
        },
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
        256: "64rem",
        320: "80rem",
      },
      screens: {
        mobile: {
          max: "767px",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      themes: {
        light: {
          colors: {
            default: {
              50: "#fafafa",
              100: "#f2f2f3",
              200: "#ebebec",
              300: "#e3e3e6",
              400: "#dcdcdf",
              500: "#d4d4d8",
              600: "#afafb2",
              700: "#8a8a8c",
              800: "#656567",
              900: "#404041",
              foreground: "#000",
              DEFAULT: "#d4d4d8"
            },
            primary: {
              50: "#dfedfd",
              100: "#b3d4fa",
              200: "#86bbf7",
              300: "#59a1f4",
              400: "#2d88f1",
              500: "#006fee",
              600: "#005cc4",
              700: "#00489b",
              800: "#003571",
              900: "#002147",
              foreground: "#fff",
              DEFAULT: "#006fee"
            },
            secondary: {
              50: "#e4f6f8",
              100: "#bfe8ee",
              200: "#99dbe4",
              300: "#73cedb",
              400: "#4ec0d1",
              500: "#28b3c7",
              600: "#2194a4",
              700: "#1a7481",
              800: "#13555f",
              900: "#0c363c",
              foreground: "#000",
              DEFAULT: "#28b3c7"
            },
            success: {
              50: "#e2f8ec",
              100: "#b9efd1",
              200: "#91e5b5",
              300: "#68dc9a",
              400: "#40d27f",
              500: "#17c964",
              600: "#13a653",
              700: "#0f8341",
              800: "#0b5f30",
              900: "#073c1e",
              foreground: "#000",
              DEFAULT: "#17c964"
            },
            warning: {
              50: "#fef4e4",
              100: "#fce4bd",
              200: "#fad497",
              300: "#f9c571",
              400: "#f7b54a",
              500: "#f5a524",
              600: "#ca881e",
              700: "#9f6b17",
              800: "#744e11",
              900: "#4a320b",
              foreground: "#000",
              DEFAULT: "#f5a524"
            },
            danger: {
              50: "#f8e0e9",
              100: "#eeb5c9",
              200: "#e48aaa",
              300: "#db5e8a",
              400: "#d1336b",
              500: "#c7084b",
              600: "#a4073e",
              700: "#810531",
              800: "#5f0424",
              900: "#3c0217",
              foreground: "#fff",
              DEFAULT: "#c7084b"
            },
            background: "#ffffff",
            foreground: "#000000",
            content1: {
              DEFAULT: "#ffffff",
              foreground: "#000"
            },
            content2: {
              DEFAULT: "#f4f4f5",
              foreground: "#000"
            },
            content3: {
              DEFAULT: "#e4e4e7",
              foreground: "#000"
            },
            content4: {
              DEFAULT: "#d4d4d8",
              foreground: "#000"
            },
            focus: "#006FEE",
            overlay: "#000000"
          }
        },
        dark: {
          colors: {
            default: {
              50: "#0d0d0e",
              100: "#19191c",
              200: "#26262a",
              300: "#323238",
              400: "#3f3f46",
              500: "#65656b",
              600: "#8c8c90",
              700: "#b2b2b5",
              800: "#d9d9da",
              900: "#ffffff",
              foreground: "#fff",
              DEFAULT: "#3f3f46"
            },
            primary: {
              50: "#002147",
              100: "#003571",
              200: "#00489b",
              300: "#005cc4",
              400: "#006fee",
              500: "#2d88f1",
              600: "#59a1f4",
              700: "#86bbf7",
              800: "#b3d4fa",
              900: "#dfedfd",
              foreground: "#fff",
              DEFAULT: "#006fee"
            },
            secondary: {
              50: "#0c363c",
              100: "#13555f",
              200: "#1a7481",
              300: "#2194a4",
              400: "#28b3c7",
              500: "#4ec0d1",
              600: "#73cedb",
              700: "#99dbe4",
              800: "#bfe8ee",
              900: "#e4f6f8",
              foreground: "#000",
              DEFAULT: "#28b3c7"
            },
            success: {
              50: "#073c1e",
              100: "#0b5f30",
              200: "#0f8341",
              300: "#13a653",
              400: "#17c964",
              500: "#40d27f",
              600: "#68dc9a",
              700: "#91e5b5",
              800: "#b9efd1",
              900: "#e2f8ec",
              foreground: "#000",
              DEFAULT: "#17c964"
            },
            warning: {
              50: "#4a320b",
              100: "#744e11",
              200: "#9f6b17",
              300: "#ca881e",
              400: "#f5a524",
              500: "#f7b54a",
              600: "#f9c571",
              700: "#fad497",
              800: "#fce4bd",
              900: "#fef4e4",
              foreground: "#000",
              DEFAULT: "#f5a524"
            },
            danger: {
              50: "#3c0217",
              100: "#5f0424",
              200: "#810531",
              300: "#a4073e",
              400: "#c7084b",
              500: "#d1336b",
              600: "#db5e8a",
              700: "#e48aaa",
              800: "#eeb5c9",
              900: "#f8e0e9",
              foreground: "#fff",
              DEFAULT: "#c7084b"
            },
            background: "#000000",
            foreground: "#ffffff",
            content1: {
              DEFAULT: "#18181b",
              foreground: "#fff"
            },
            content2: {
              DEFAULT: "#27272a",
              foreground: "#fff"
            },
            content3: {
              DEFAULT: "#3f3f46",
              foreground: "#fff"
            },
            content4: {
              DEFAULT: "#52525b",
              foreground: "#fff"
            },
            focus: "#006FEE",
            overlay: "#ffffff"
          }
        }
      },
      layout: {
        disabledOpacity: "0.5"
      }
    }),
  ],
}
