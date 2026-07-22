// CANONICAL SOURCE OF TRUTH — design tokens.
// Generated from src/tokens/source/*.yaml (synced from Figma QjVyM5bRXgIOZn8PO1e0eK, extracted 2026-07-10).
// Markdown mirrors in memory/ must defer to this file. Do not hand-edit values; re-sync from Figma.

export const colorPrimitives = {
  "gray/100": "#000000",
  "gray/200": "#171717",
  "gray/300": "#292929",
  "gray/400": "#454545",
  "gray/500": "#696969",
  "gray/600": "#919191",
  "gray/700": "#b5b5b5",
  "gray/800": "#d1d1d1",
  "gray/900": "#ededed",
  "gray/1000": "#f7f7f7",
  "gray/1100": "#ffffff",
  "red/100": "#ffdada",
  "red/200": "#eb9494",
  "red/300": "#dc4848",
  "red/400": "#c42e2e",
  "red/500": "#9e1e1e",
  "red/600": "#7a1616",
  "red/700": "#5a1010",
  "red/800": "#3a0a0a",
  "red/900": "#240c0c",
  "red/1000": "#170707",
  "green/100": "#c4ecd2",
  "green/200": "#6ec494",
  "green/300": "#2ea864",
  "green/400": "#1c8a4c",
  "green/500": "#14683a",
  "green/600": "#125a32",
  "green/700": "#0e4426",
  "green/800": "#082e1a",
  "green/900": "#062012",
  "green/1000": "#04140c",
  "amber/100": "#fae0b8",
  "amber/200": "#d4a055",
  "amber/300": "#d4882f",
  "amber/400": "#b6732b",
  "amber/500": "#8a5218",
  "amber/600": "#7a4d18",
  "amber/700": "#5c3810",
  "amber/800": "#3d2408",
  "amber/900": "#241a08"
};

export const colors = {
  "background/canvas": {
    "light": "alias:gray/1100",
    "dark": "alias:gray/100"
  },
  "background/surface": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/200"
  },
  "background/surface/green": {
    "light": "alias:green/100",
    "dark": "alias:green/900"
  },
  "background/surface/red": {
    "light": "alias:red/100",
    "dark": "alias:red/900"
  },
  "background/surface/raised+2": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "background/surface/raised+5": {
    "light": "alias:gray/500",
    "dark": "alias:gray/700"
  },
  "background/surface/raised+6": {
    "light": "alias:gray/400",
    "dark": "alias:gray/800"
  },
  "text/primary": {
    "light": "alias:gray/400",
    "dark": "alias:gray/1000"
  },
  "text/secondary": {
    "light": "alias:gray/600",
    "dark": "alias:gray/600"
  },
  "text/tertiary": {
    "light": "alias:gray/700",
    "dark": "alias:gray/700"
  },
  "text/disabled": {
    "light": "alias:gray/800",
    "dark": "alias:gray/400"
  },
  "text/inverted": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/200"
  },
  "text/cta": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "text/colored/red": {
    "light": "alias:red/400",
    "dark": "alias:red/400"
  },
  "text/colored/green": {
    "light": "alias:green/400",
    "dark": "alias:green/400"
  },
  "text/colored/amber": {
    "light": "alias:amber/400",
    "dark": "alias:amber/400"
  },
  "text/colored/gray": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "icon/primary": {
    "light": "alias:gray/400",
    "dark": "alias:gray/900"
  },
  "icon/disable": {
    "light": "alias:gray/800",
    "dark": "alias:gray/400"
  },
  "icon/red": {
    "light": "alias:red/300",
    "dark": "alias:red/300"
  },
  "icon/green": {
    "light": "alias:green/300",
    "dark": "alias:green/300"
  },
  "icon/inverted": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/200"
  },
  "icon/cta": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "button/primary/background": {
    "light": "alias:gray/300",
    "dark": "alias:gray/1000"
  },
  "button/primary/pressed": {
    "light": "alias:gray/500",
    "dark": "alias:gray/600"
  },
  "button/primary/disabled": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/200"
  },
  "button/secondary/background": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/300"
  },
  "button/secondary/pressed": {
    "light": "alias:gray/500",
    "dark": "#ffffff"
  },
  "button/link/text": {
    "light": "alias:gray/400",
    "dark": "alias:gray/1000"
  },
  "button/actionable/enabled": {
    "light": "alias:gray/600",
    "dark": "alias:gray/600"
  },
  "button/actionable/disabled": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "button/toggle/thumb": {
    "light": "alias:gray/1000",
    "dark": "alias:gray/200"
  },
  "button/toggle/track active": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "button/toggle/track inactive": {
    "light": "alias:gray/600",
    "dark": "alias:gray/500"
  },
  "button/toggle/track disabled": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "button/radio/on": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "button/radio/off(stroke)": {
    "light": "alias:gray/700",
    "dark": "alias:gray/500"
  },
  "button/radio/disable": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "button/checkbox/checked": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "button/checkbox/unchecked": {
    "light": "alias:gray/700",
    "dark": "alias:gray/500"
  },
  "button/checkbox/disable": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "button/chip/selected": {
    "light": "alias:gray/200",
    "dark": "alias:gray/1000"
  },
  "button/chip/unselected (stroke)": {
    "light": "alias:gray/700",
    "dark": "alias:gray/500"
  },
  "battery/high": {
    "light": "alias:green/300",
    "dark": "alias:green/300"
  },
  "battery/medium": {
    "light": "alias:amber/300",
    "dark": "alias:amber/300"
  },
  "battery/critical": {
    "light": "alias:red/300",
    "dark": "alias:red/300"
  },
  "border/separator line": {
    "light": "alias:gray/900",
    "dark": "alias:gray/500"
  },
  "border/default": {
    "light": "alias:gray/800",
    "dark": "alias:gray/500"
  },
  "border/icon": {
    "light": "alias:gray/700",
    "dark": "alias:gray/500"
  },
  "border/disable": {
    "light": "alias:gray/900",
    "dark": "alias:gray/300"
  },
  "default/status bar": {
    "light": "alias:gray/100",
    "dark": "alias:gray/1100"
  },
  "Ios/Liquid glass": {
    "light": "#f7f7f7a6",
    "dark": "#171717a6"
  },
  "Ios/primary button": {
    "light": "#292929a6",
    "dark": "#f7f7f7a6"
  },
  "Ios/Secondary button": {
    "light": "#f7f7f7a6",
    "dark": "#292929a6"
  },
  "Ios/Equalizer card": {
    "light": "#f7f7f700",
    "dark": "#17171700"
  }
}; // modes: light, dark

export const numerals = [
  {
    "name": "XS",
    "value": 4
  },
  {
    "name": "S",
    "value": 8
  },
  {
    "name": "M",
    "value": 12
  },
  {
    "name": "L",
    "value": 16
  },
  {
    "name": "XL",
    "value": 24
  },
  {
    "name": "XXL",
    "value": 32
  },
  {
    "name": "XXXL",
    "value": 44
  },
  {
    "name": "Very big",
    "value": 56
  },
  {
    "name": "Rarely use",
    "value": 80
  },
  {
    "name": "Gaps/bottom sheet",
    "value": 24
  },
  {
    "name": "Gaps/L2-Card Gap",
    "value": 16
  },
  {
    "name": "Gaps/small gap",
    "value": 12
  },
  {
    "name": "Gaps/smaller gap",
    "value": 8
  },
  {
    "name": "Radius/Card",
    "value": 18
  },
  {
    "name": "Radius/Bottomsheet",
    "value": 32
  },
  {
    "name": "Radius/Slider button",
    "value": 8
  },
  {
    "name": "Radius/Tiniest",
    "value": 12
  },
  {
    "name": "Padding/Screen side margin",
    "value": 0
  },
  {
    "name": "Padding/top, bottom padding small",
    "value": 12
  },
  {
    "name": "Padding/Card Side Padding",
    "value": 16
  },
  {
    "name": "Padding/Card Top, bottom Padding",
    "value": 16
  },
  {
    "name": "Padding/Bottomsheet padding",
    "value": 20
  }
];

export const typography = [
  {
    "name": "\ud83d\udc44 Headings/Extra large",
    "key": "b71c13ae6ba01f6a1420f6c8717e258acf05526c",
    "font_family": "Saira",
    "font_style": "Regular",
    "font_size": 80,
    "line_height": "90%",
    "letter_spacing": "0%"
  },
  {
    "name": "\ud83d\udc44 Headings/large",
    "key": "023bec87d37391ab4ebe5f0eee0388f4ba378cfd",
    "font_family": "Saira",
    "font_style": "Medium",
    "font_size": 50,
    "line_height": "110%",
    "letter_spacing": "0%"
  },
  {
    "name": "\ud83d\udc44 Headings/Medium",
    "key": "306128b970d1ce7f7e9954aec82f5e4a26fe302a",
    "font_family": "Saira",
    "font_style": "SemiBold",
    "font_size": 34,
    "line_height": "110%",
    "letter_spacing": "0%"
  },
  {
    "name": "\ud83d\udc44 Headings/Small",
    "key": "d5529a4aeaa26b89df146d424f9913da1b7bb40d",
    "font_family": "Saira",
    "font_style": "SemiBold",
    "font_size": 24,
    "line_height": "110%",
    "letter_spacing": "0%"
  },
  {
    "name": "Sub Headings/Section title",
    "key": "fa983b1f7103184034289cb7177701b91f1d62b6",
    "font_family": "Saira",
    "font_style": "Medium",
    "font_size": 21,
    "line_height": "110%",
    "letter_spacing": "0%",
    "description": "Used for text fields and pages like motion gestures and product tips, basically pages which are around a single image."
  },
  {
    "name": "Sub Headings/card headings",
    "key": "4dbf91047a720c21ba583a1ce2539ba1301c0c45",
    "font_family": "Saira",
    "font_style": "Medium",
    "font_size": 16,
    "line_height": "110%",
    "letter_spacing": "0%"
  },
  {
    "name": "Content/large",
    "key": "03849eacadae190bf9118e1fb845c765abaa3b77",
    "font_family": "Geist",
    "font_style": "Regular",
    "font_size": 16,
    "line_height": "auto",
    "letter_spacing": "0%"
  },
  {
    "name": "Content/Medium",
    "key": "da4375c2c5f85700e9aae260dca739094255dc38",
    "font_family": "Geist",
    "font_style": "Regular",
    "font_size": 14,
    "line_height": "auto",
    "letter_spacing": "0%"
  },
  {
    "name": "Content/Small",
    "key": "b671f22f561a117228b690a9013075ba9094d766",
    "font_family": "Geist",
    "font_style": "Regular",
    "font_size": 12,
    "line_height": "130%",
    "letter_spacing": "0%"
  },
  {
    "name": "Content/smallest",
    "key": "50452c3f06114e5e94e62ab8429db8620643454f",
    "font_family": "Geist",
    "font_style": "Medium",
    "font_size": 10,
    "line_height": "auto",
    "letter_spacing": "0%"
  },
  {
    "name": "Bold content/Big",
    "key": "7be1ce7dded9d9ae87fdff338e0e7641e4f0d774",
    "font_family": "Geist",
    "font_style": "SemiBold",
    "font_size": 14,
    "line_height": "auto",
    "letter_spacing": "0%"
  },
  {
    "name": "Bold content/Small",
    "key": "bc07e9e182af46fd70a202c9bd192b9b35ae6b68",
    "font_family": "Geist",
    "font_style": "SemiBold",
    "font_size": 12,
    "line_height": "auto",
    "letter_spacing": "0%"
  }
];

export const effects = [
  {
    "name": "Navigation shadow",
    "key": "34478a730a7eeddd88507dd24b5d0e76e9069f82",
    "effects": [
      {
        "type": "DROP_SHADOW",
        "x": 0,
        "y": 4,
        "blur": 12,
        "spread": 0,
        "color": "rgba(0,0,0,0.08)"
      }
    ],
    "note": "The only shadow in the system; owned by l1-inner-page-navigation's scrolled state (see its shadow_exception rule)."
  }
];
