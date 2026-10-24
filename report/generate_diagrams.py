import os
from PIL import Image, ImageDraw, ImageFont

def draw_rounded_rectangle(draw, bounds, radius, fill, outline=None, width=1):
    x0, y0, x1, y1 = bounds
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill, outline=outline, width=width)

def draw_arrow_down(draw, x, y0, y1, color="#0f766e", width=3):
    draw.line([(x, y0), (x, y1)], fill=color, width=width)
    draw.polygon([(x, y1 + 10), (x - 7, y1 - 2), (x + 7, y1 - 2)], fill=color)

def generate_architecture_diagram(output_path):
    # Canvas size: 1200 x 780
    w, h = 1200, 780
    img = Image.new("RGB", (w, h), "#f8fafc")
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arial.ttf", 24)
        font_head = ImageFont.truetype("arialbd.ttf", 18)
        font_sub = ImageFont.truetype("arial.ttf", 13)
        font_pill = ImageFont.truetype("arialbd.ttf", 12)
    except:
        font_title = ImageFont.load_default()
        font_head = font_title
        font_sub = font_title
        font_pill = font_title

    # Main Header
    draw.text((w // 2, 35), "Three-Layer System Architecture: Vellore Smart City Dashboard", fill="#0f172a", font=font_title, anchor="mm")

    # Layer 1: Presentation Layer
    draw_rounded_rectangle(draw, (80, 80, 1120, 240), radius=16, fill="#ffffff", outline="#0d9488", width=2)
    draw_rounded_rectangle(draw, (95, 95, 360, 128), radius=8, fill="#ccfbf1")
    draw.text((105, 102), "1. PRESENTATION LAYER (CLIENT UI)", fill="#0f766e", font=font_pill)
    draw.text((95, 140), "React 18 + TypeScript + Vite Single Page Application", fill="#0f172a", font=font_head)
    draw.text((95, 168), "Interactive civic interface rendered via modern component architecture with Tailwind CSS styling.", fill="#475569", font=font_sub)
    
    # Sub-blocks in presentation
    ui_blocks = [
        ("Chart.js Analytics", "Line, Bar, Pie, Doughnut"),
        ("Leaflet + OSM GIS", "Interactive city pins & layers"),
        ("Adaptive Layout", "Desktop sidebar + mobile drawer"),
        ("Bilingual UI", "English & Tamil toggle"),
    ]
    for i, (b_title, b_sub) in enumerate(ui_blocks):
        bx0 = 95 + i * 255
        draw_rounded_rectangle(draw, (bx0, 192, bx0 + 240, 226), radius=6, fill="#f1f5f9", outline="#cbd5e1", width=1)
        draw.text((bx0 + 12, 198), b_title, fill="#0f172a", font=font_pill)
        draw.text((bx0 + 12, 212), b_sub, fill="#64748b", font=font_sub)

    # Arrow 1 -> 2
    draw_arrow_down(draw, 600, 242, 280, color="#0d9488", width=3)
    draw.text((615, 260), "User Events & Reactive Subscriptions", fill="#0f766e", font=font_sub)

    # Layer 2: Application Layer
    draw_rounded_rectangle(draw, (80, 295, 1120, 485), radius=16, fill="#ffffff", outline="#2563eb", width=2)
    draw_rounded_rectangle(draw, (95, 310, 370, 343), radius=8, fill="#dbeafe")
    draw.text((105, 317), "2. APPLICATION LAYER (LOGIC & STATE)", fill="#1d4ed8", font=font_pill)
    draw.text((95, 355), "Zustand State Stores & Modular Service Abstraction", fill="#0f172a", font=font_head)
    draw.text((95, 383), "Coordinates state management, input validation, offline fallbacks, and multi-corridor transit synchronization.", fill="#475569", font=font_sub)

    app_blocks = [
        ("API Services Layer", "api.ts (weather/AQI fetchers)"),
        ("State Management", "Zustand (Auth, Language, Theme)"),
        ("Grievance Redressal", "LocalStorage validation & tracker"),
        ("Synchronized Filters", "Corridor routing (All, MAS, BLR)"),
    ]
    for i, (b_title, b_sub) in enumerate(app_blocks):
        bx0 = 95 + i * 255
        draw_rounded_rectangle(draw, (bx0, 420, bx0 + 240, 465), radius=6, fill="#f1f5f9", outline="#cbd5e1", width=1)
        draw.text((bx0 + 12, 428), b_title, fill="#0f172a", font=font_pill)
        draw.text((bx0 + 12, 444), b_sub, fill="#64748b", font=font_sub)

    # Arrow 2 -> 3
    draw_arrow_down(draw, 600, 487, 525, color="#2563eb", width=3)
    draw.text((615, 505), "Data Ingestion & Local Normalization", fill="#1d4ed8", font=font_sub)

    # Layer 3: Data Source Layer
    draw_rounded_rectangle(draw, (80, 540, 1120, 725), radius=16, fill="#ffffff", outline="#d97706", width=2)
    draw_rounded_rectangle(draw, (95, 555, 360, 588), radius=8, fill="#fef3c7")
    draw.text((105, 562), "3. DATA SOURCE LAYER (APIS & MODELS)", fill="#b45309", font=font_pill)
    draw.text((95, 600), "Hybrid Telemetry: Live Environmental Feeds & Sample Civic Models", fill="#0f172a", font=font_head)
    draw.text((95, 628), "Distinguishes live verified API endpoints from clearly marked local municipal planning models.", fill="#475569", font=font_sub)

    data_blocks = [
        ("Open-Meteo Weather", "LIVE: 12.9165 N, 79.1325 E"),
        ("Open-Meteo Air Quality", "LIVE: US AQI, PM2.5, NO2"),
        ("OpenStreetMap Tiles", "LIVE: Carto tile server"),
        ("Municipal Sample JSON", "SAMPLE: Power, Water, Waste"),
    ]
    for i, (b_title, b_sub) in enumerate(data_blocks):
        bx0 = 95 + i * 255
        badge_fill = "#dcfce7" if "LIVE" in b_sub else "#fee2e2"
        badge_border = "#86efac" if "LIVE" in b_sub else "#fca5a5"
        draw_rounded_rectangle(draw, (bx0, 660, bx0 + 240, 705), radius=6, fill=badge_fill, outline=badge_border, width=1)
        draw.text((bx0 + 12, 668), b_title, fill="#0f172a", font=font_pill)
        draw.text((bx0 + 12, 684), b_sub, fill="#475569", font=font_sub)

    img.save(output_path, "PNG", dpi=(300, 300))
    print(f"Architecture diagram saved to: {output_path}")

def generate_workflow_diagram(output_path):
    w, h = 1200, 560
    img = Image.new("RGB", (w, h), "#f8fafc")
    draw = ImageDraw.Draw(img)

    try:
        font_title = ImageFont.truetype("arial.ttf", 22)
        font_head = ImageFont.truetype("arialbd.ttf", 16)
        font_sub = ImageFont.truetype("arial.ttf", 13)
        font_step = ImageFont.truetype("arialbd.ttf", 14)
    except:
        font_title = ImageFont.load_default()
        font_head = font_title
        font_sub = font_title
        font_step = font_title

    draw.text((w // 2, 35), "System Working Flow: From Multi-Source Data to Visual Dashboard", fill="#0f172a", font=font_title, anchor="mm")

    steps = [
        ("Step 1: Data Collection", "External APIs & Mock Data", [
            "• Open-Meteo Weather API",
            "• Open-Meteo Air Quality API",
            "• OpenStreetMap Geo Tile Server",
            "• Municipal sample JSON files",
            "• Real-time system device clock"
        ], "#ccfbf1", "#0f766e"),
        ("Step 2: Service Layer", "Processing & Normalization", [
            "• Fetcher error/timeout interception",
            "• Offline fallback dataset binding",
            "• WMO weather code mapping",
            "• AQI health category grading",
            "• LocalStorage serialization"
        ], "#dbeafe", "#1d4ed8"),
        ("Step 3: State Dispatch", "Zustand & React Hooks", [
            "• Reactive hooks (useWeather, etc.)",
            "• Global filter state propagation",
            "• Bilingual dictionary lookup",
            "• Dark/light theme class toggling",
            "• Non-blocking toast queuing"
        ], "#fef3c7", "#b45309"),
        ("Step 4: Frontend View", "Visual Analytics & Maps", [
            "• Responsive Chart.js canvases",
            "• Interactive Leaflet map pins",
            "• Live updating clock ticker",
            "• Sortable transit schedule table",
            "• Mobile drawer navigation"
        ], "#f3e8ff", "#7e22ce"),
    ]

    for i, (title, subtitle, bullets, bg_color, border_color) in enumerate(steps):
        bx = 50 + i * 280
        draw_rounded_rectangle(draw, (bx, 90, bx + 250, 480), radius=14, fill="#ffffff", outline=border_color, width=2)
        
        # Header pill
        draw_rounded_rectangle(draw, (bx + 12, 105, bx + 238, 145), radius=8, fill=bg_color)
        draw.text((bx + 125, 125), title, fill=border_color, font=font_step, anchor="mm")
        
        draw.text((bx + 125, 170), subtitle, fill="#0f172a", font=font_head, anchor="mm")
        draw.line([(bx + 20, 195), (bx + 230, 195)], fill="#e2e8f0", width=1)
        
        # Bullets
        y_text = 220
        for b in bullets:
            draw.text((bx + 18, y_text), b, fill="#334155", font=font_sub)
            y_text += 46

        # Flow arrow between columns
        if i < 3:
            arrow_x = bx + 250
            draw.line([(arrow_x + 5, 280), (arrow_x + 25, 280)], fill="#0d9488", width=3)
            draw.polygon([(arrow_x + 25, 280), (arrow_x + 18, 274), (arrow_x + 18, 286)], fill="#0d9488")

    img.save(output_path, "PNG", dpi=(300, 300))
    print(f"Workflow diagram saved to: {output_path}")

if __name__ == "__main__":
    assets_dir = r"C:\Users\hariharan\.gemini\antigravity\scratch\smart-city-vellore-dashboard\report\assets"
    os.makedirs(assets_dir, exist_ok=True)
    generate_architecture_diagram(os.path.join(assets_dir, "architecture_diagram.png"))
    generate_workflow_diagram(os.path.join(assets_dir, "workflow_diagram.png"))
