#!/usr/bin/env python3
"""
Master Keyword Consolidation Script for The Glownique
Aggregates all keywords from:
1. SEO-Optimization/resources/ubersuggest-keyword-decision-register-2026-08-21.csv (300 raw + decisions)
2. SEO-Optimization/resources/ubersuggest-keywords-before-cleanup-2026-08-21.csv (300 raw metrics)
3. SEO-Optimization/resources/ubersuggest-keyword-map-2026-08-21.csv (150 curated mapped)
4. SEO-Optimization/05-keyword-and-intent-map.csv (37 core page clusters + intents)
5. SEO-Optimization/blog-drafts/halloween-neon-sign-ideas/keywords.csv (10 blog keywords + CPC)
6. scripts/blog-posts/backlit-signage-vs-light-box-signs.mjs (Backlit pillar post keywords)
7. scripts/blog-seed/content.mjs & upload-ubersuggest-blog.mjs (Blog seed posts)
8. New Backlit signs pages (/business-signs/backlit-signs, backlit-lobby-signs, wall-surfaces-and-standoffs)
9. Live routes in lib/collection-pages.ts and lib/industry-pages.ts

Outputs:
- SEO-Optimization/master-website-keywords.xlsx (Multi-tab formatted Excel workbook)
- SEO-Optimization/master-website-keywords.csv (Clean master CSV file)
"""

import csv
import os
import re
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

BASE_DIR = r"D:\code play ground\Projects\theglownique\next-js-frontend"

def load_data():
    keywords = {}  # key: normalized_kw -> dict of attributes
    
    # 1. Load Ubersuggest Raw & Decision Register
    dec_file = os.path.join(BASE_DIR, "SEO-Optimization", "resources", "ubersuggest-keyword-decision-register-2026-08-21.csv")
    if os.path.exists(dec_file):
        with open(dec_file, "r", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                kw = r["keyword"].strip()
                nkw = kw.lower()
                vol = int(r["estimated_monthly_volume_us"]) if r["estimated_monthly_volume_us"].isdigit() else 0
                sd = int(r["seo_difficulty"]) if r["seo_difficulty"].isdigit() else 0
                keywords[nkw] = {
                    "keyword": kw,
                    "volume": vol,
                    "sd": sd,
                    "cpc": None,
                    "decision": r.get("decision", "").strip(),
                    "cohort": r.get("cohort", "").strip(),
                    "role": r.get("role", "").strip(),
                    "target_url": r.get("target_url", "").strip(),
                    "reason": r.get("reason", "").strip(),
                    "source": "Ubersuggest 300 Register",
                    "intent": "",
                    "funnel": "",
                    "category": "",
                }

    # 2. Load Ubersuggest Curated Map (150 terms)
    map_file = os.path.join(BASE_DIR, "SEO-Optimization", "resources", "ubersuggest-keyword-map-2026-08-21.csv")
    if os.path.exists(map_file):
        with open(map_file, "r", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                kw = r["keyword"].strip()
                nkw = kw.lower()
                vol = int(r["estimated_monthly_volume_us"]) if r["estimated_monthly_volume_us"].isdigit() else 0
                sd = int(r["seo_difficulty"]) if r["seo_difficulty"].isdigit() else 0
                if nkw in keywords:
                    if r.get("target_url"):
                        keywords[nkw]["target_url"] = r["target_url"].strip()
                    if r.get("cohort"):
                        keywords[nkw]["cohort"] = r["cohort"].strip()
                    if r.get("role"):
                        keywords[nkw]["role"] = r["role"].strip()
                    if r.get("rationale"):
                        keywords[nkw]["reason"] = r["rationale"].strip()
                    keywords[nkw]["decision"] = "KEEP"
                else:
                    keywords[nkw] = {
                        "keyword": kw,
                        "volume": vol,
                        "sd": sd,
                        "cpc": None,
                        "decision": "KEEP",
                        "cohort": r.get("cohort", "").strip(),
                        "role": r.get("role", "").strip(),
                        "target_url": r.get("target_url", "").strip(),
                        "reason": r.get("rationale", "").strip(),
                        "source": "Ubersuggest 150 Map",
                        "intent": "",
                        "funnel": "",
                        "category": "",
                    }

    # 3. Load 05-keyword-and-intent-map.csv
    intent_file = os.path.join(BASE_DIR, "SEO-Optimization", "05-keyword-and-intent-map.csv")
    page_intent_rows = []
    if os.path.exists(intent_file):
        with open(intent_file, "r", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                page_intent_rows.append(r)
                pk = r["primary_keyword"].strip()
                npk = pk.lower()
                vol = int(r["search_volume"]) if r["search_volume"].isdigit() else 0
                sd = int(r["keyword_difficulty"]) if r["keyword_difficulty"].isdigit() else 0
                
                # Extract CPC from notes if present
                cpc_match = re.search(r"CPC[^\d]{1,10}(\d+\.\d+)", r.get("notes", ""))
                cpc_val = float(cpc_match.group(1)) if cpc_match else None
                
                if npk in keywords:
                    if vol > 0 and keywords[npk]["volume"] == 0:
                        keywords[npk]["volume"] = vol
                    if sd > 0 and keywords[npk]["sd"] == 0:
                        keywords[npk]["sd"] = sd
                    if cpc_val:
                        keywords[npk]["cpc"] = cpc_val
                    if r.get("canonical_url") and not keywords[npk]["target_url"]:
                        keywords[npk]["target_url"] = r["canonical_url"].strip()
                    if r.get("intent"):
                        keywords[npk]["intent"] = r["intent"].strip()
                    if r.get("funnel_stage"):
                        keywords[npk]["funnel"] = r["funnel_stage"].strip()
                    if r.get("notes") and not keywords[npk]["reason"]:
                        keywords[npk]["reason"] = r["notes"].strip()
                    if not keywords[npk]["cohort"]:
                        keywords[npk]["cohort"] = "live_page" if r.get("page_status") == "existing" else "planned_90_day"
                    if not keywords[npk]["role"]:
                        keywords[npk]["role"] = "primary"
                    keywords[npk]["decision"] = "KEEP"
                else:
                    keywords[npk] = {
                        "keyword": pk,
                        "volume": vol,
                        "sd": sd,
                        "cpc": cpc_val,
                        "decision": "KEEP",
                        "cohort": "live_page" if r.get("page_status") == "existing" else "planned_90_day",
                        "role": "primary",
                        "target_url": r.get("canonical_url", "").strip(),
                        "reason": r.get("notes", "").strip(),
                        "source": "05 Intent Map",
                        "intent": r.get("intent", "").strip(),
                        "funnel": r.get("funnel_stage", "").strip(),
                        "category": r.get("cluster", "").strip(),
                    }

    # 4. Load Halloween blog keywords
    hw_file = os.path.join(BASE_DIR, "SEO-Optimization", "blog-drafts", "halloween-neon-sign-ideas", "keywords.csv")
    if os.path.exists(hw_file):
        with open(hw_file, "r", encoding="utf-8") as f:
            for r in csv.DictReader(f):
                kw = r["keyword"].strip()
                if not kw:
                    continue
                nkw = kw.lower()
                vol = int(r["average_monthly_searches"]) if r.get("average_monthly_searches", "").isdigit() else 0
                sd = int(r["seo_difficulty"]) if r.get("seo_difficulty", "").isdigit() else 0
                cpc_val = float(r["cpc_usd"]) if r.get("cpc_usd", "").replace(".", "", 1).isdigit() else None
                role = r.get("role", "editorial").strip()
                notes = r.get("notes", "").strip()
                
                if nkw in keywords:
                    if vol > 0 and keywords[nkw]["volume"] == 0:
                        keywords[nkw]["volume"] = vol
                    if sd > 0 and keywords[nkw]["sd"] == 0:
                        keywords[nkw]["sd"] = sd
                    if cpc_val:
                        keywords[nkw]["cpc"] = cpc_val
                    if not keywords[nkw]["target_url"]:
                        keywords[nkw]["target_url"] = "/blog/halloween-neon-sign-ideas"
                    if not keywords[nkw]["cohort"]:
                        keywords[nkw]["cohort"] = "blog_post"
                else:
                    keywords[nkw] = {
                        "keyword": kw,
                        "volume": vol,
                        "sd": sd,
                        "cpc": cpc_val,
                        "decision": "KEEP",
                        "cohort": "blog_post",
                        "role": role,
                        "target_url": "/blog/halloween-neon-sign-ideas",
                        "reason": notes,
                        "source": "Halloween Blog Research",
                        "intent": "informational",
                        "funnel": "awareness",
                        "category": "Editorial & Blog",
                    }

    # 5. Add Backlit Cluster Keywords (from latest release and pillar post)
    backlit_additions = [
        {
            "keyword": "backlit signs",
            "volume": 2400,
            "sd": 31,
            "cpc": 8.45,
            "target_url": "/business-signs/backlit-signs",
            "role": "primary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "Commercial hub for exterior & interior halo backlit metal letters and signage.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "commercial backlit signs",
            "volume": 320,
            "sd": 27,
            "cpc": 9.10,
            "target_url": "/business-signs/backlit-signs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "B2B commercial modifier for storefront and building backlit signage.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "backlit lobby signs",
            "volume": 40,
            "sd": 29,
            "cpc": 12.50,
            "target_url": "/business-signs/backlit-lobby-signs",
            "role": "primary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "High-value B2B corporate lobby, reception desk, and executive suite halo signage.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "backlit reception signs",
            "volume": 70,
            "sd": 25,
            "cpc": 11.20,
            "target_url": "/business-signs/backlit-lobby-signs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "Reception area corporate halo lit branding and backer-mounted signs.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "halo lit lobby signs",
            "volume": 50,
            "sd": 24,
            "cpc": 10.80,
            "target_url": "/business-signs/backlit-lobby-signs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "Corporate halo illumination query for interior reception walls.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "backlit sign wall surfaces and standoffs",
            "volume": 110,
            "sd": 18,
            "cpc": 4.20,
            "target_url": "/guides/backlit-sign-wall-surfaces-and-standoffs",
            "role": "primary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "informational_commercial",
            "funnel": "consideration",
            "category": "Technical Guides & Buying Decisions",
            "reason": "Technical installation guide: diffuse vs specular wall reflection and standoff depths.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "backlit sign standoff distance",
            "volume": 90,
            "sd": 15,
            "cpc": 3.80,
            "target_url": "/guides/backlit-sign-wall-surfaces-and-standoffs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "informational",
            "funnel": "consideration",
            "category": "Technical Guides & Buying Decisions",
            "reason": "Optical halo spread formula (0.5 to 1.5 inch standoffs) query.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "halo lit sign wall reflection",
            "volume": 70,
            "sd": 14,
            "cpc": 3.50,
            "target_url": "/guides/backlit-sign-wall-surfaces-and-standoffs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "informational",
            "funnel": "consideration",
            "category": "Technical Guides & Buying Decisions",
            "reason": "Wall material reflection guide: drywall, brick, wood slat, tile, polished marble.",
            "source": "Backlit Cluster Implementation",
        },
        {
            "keyword": "backlit signage vs light box signs",
            "volume": 1900,
            "sd": 28,
            "cpc": 6.80,
            "target_url": "/blog/backlit-signage-vs-light-box-signs",
            "role": "primary",
            "cohort": "blog_post",
            "decision": "KEEP",
            "intent": "informational_commercial",
            "funnel": "consideration",
            "category": "Editorial & Blog",
            "reason": "Comprehensive pillar comparison article: halo backlit metal letters vs edge-lit lightboxes.",
            "source": "Backlit Blog Post",
        },
        {
            "keyword": "reverse channel letter signs",
            "volume": 140,
            "sd": 11,
            "cpc": 9.50,
            "target_url": "/business-signs/backlit-signs",
            "role": "secondary",
            "cohort": "live_page",
            "decision": "KEEP",
            "intent": "transactional_commercial",
            "funnel": "decision",
            "category": "Backlit & Halo-Lit Signs",
            "reason": "Industry fabrication terminology for halo-illuminated channel letters.",
            "source": "Backlit Cluster Implementation",
        },
    ]

    for bkw in backlit_additions:
        nkw = bkw["keyword"].lower()
        if nkw in keywords:
            for k, v in bkw.items():
                if v:
                    keywords[nkw][k] = v
        else:
            keywords[nkw] = bkw

    # 6. Add Blog Seed Keywords
    blog_seed_kws = [
        ("how to clean led neon signs", "/blog/how-to-clean-and-maintain-led-neon-signs", 720, 16, 0.45, "Care & Setup", "Dry dusting, microfiber, avoiding alcohol on acrylic."),
        ("how long do led neon signs last", "/blog/how-long-do-led-neon-signs-last", 1300, 22, 0.55, "Care & Setup", "Lifespan, driver replacement, 12V silicone vs glass."),
        ("how to hang a neon sign", "/blog/how-to-hang-a-neon-sign", 880, 20, 0.60, "Care & Setup", "Drywall anchors, standoffs, adhesive strips, ceiling hanging."),
        ("led neon vs glass neon", "/blog/led-neon-vs-glass-neon", 1600, 29, 0.85, "Sign Basics", "Energy consumption, durability, gas vs silicone LEDs, safety."),
        ("neon sign colours", "/blog/neon-sign-colours", 590, 24, 0.70, "Colour & Design", "Jacketed vs white silicone, ambient light contrast, legibility."),
        ("neon sign ideas for weddings", "/blog/neon-sign-ideas-for-weddings", 880, 26, 0.90, "Ideas & Inspiration", "Last names, photo backdrops, botanical walls, dimming."),
        ("signage trends 2026", "/blog/signage-trends-2026", 390, 21, 0.75, "Trends", "Minimalist halo lit, slimline acrylic, neutral warm white, energy efficiency."),
        ("gym neon sign ideas", "/blog/gym-neon-sign-ideas", 260, 23, 0.65, "Ideas & Inspiration", "Motivational quotes, barbell iconography, high-vibration mounting."),
        ("choose right neon color", "/blog/how-to-choose-the-right-neon-color-for-your-sign", 320, 19, 0.50, "Colour & Design", "Color psychology, wall contrast, ambient light levels."),
    ]
    for b_kw, b_url, b_vol, b_sd, b_cpc, b_cat, b_notes in blog_seed_kws:
        nkw = b_kw.lower()
        if nkw in keywords:
            keywords[nkw]["target_url"] = b_url
            keywords[nkw]["cohort"] = "blog_post"
            keywords[nkw]["category"] = "Editorial & Blog"
            keywords[nkw]["role"] = "primary"
            if keywords[nkw]["volume"] == 0:
                keywords[nkw]["volume"] = b_vol
            if keywords[nkw]["sd"] == 0:
                keywords[nkw]["sd"] = b_sd
            if not keywords[nkw]["cpc"]:
                keywords[nkw]["cpc"] = b_cpc
            keywords[nkw]["intent"] = "informational"
            keywords[nkw]["funnel"] = "awareness"
        else:
            keywords[nkw] = {
                "keyword": b_kw,
                "volume": b_vol,
                "sd": b_sd,
                "cpc": b_cpc,
                "decision": "KEEP",
                "cohort": "blog_post",
                "role": "primary",
                "target_url": b_url,
                "reason": b_notes,
                "source": "Sanity Blog Seed",
                "intent": "informational",
                "funnel": "awareness",
                "category": "Editorial & Blog",
            }

    # 7. Normalize Categories, Intent, and Funnel Stage across all keywords
    for nkw, data in keywords.items():
        kw = data["keyword"]
        target = data.get("target_url", "")
        cohort = data.get("cohort", "")
        
        # Categorize
        if not data["category"]:
            if target.startswith("/blog"):
                data["category"] = "Editorial & Blog"
            elif "/guides" in target or "vs" in kw or "cost" in kw or "standoff" in kw or "wall" in kw:
                data["category"] = "Technical Guides & Buying Decisions"
            elif "backlit" in kw or "halo" in kw:
                data["category"] = "Backlit & Halo-Lit Signs"
            elif "channel letter" in kw or "3d metal" in kw:
                data["category"] = "Storefront & Channel Letters"
            elif "lightbox" in kw or "light box" in kw:
                data["category"] = "Lightbox & Edge-Lit Signs"
            elif "acrylic" in kw:
                data["category"] = "Acrylic Signs & UV Print"
            elif any(w in kw for w in ["bar", "beer", "cocktail", "pub"]):
                data["category"] = "Industry - Hospitality & Bars"
            elif any(w in kw for w in ["restaurant", "pizza", "taco", "food", "cafe"]):
                data["category"] = "Industry - Restaurants & Food"
            elif any(w in kw for w in ["salon", "spa", "beauty", "hair"]):
                data["category"] = "Industry - Salons & Spas"
            elif any(w in kw for w in ["gym", "fitness", "workout"]):
                data["category"] = "Industry - Gyms & Fitness"
            elif any(w in kw for w in ["office", "lobby", "corporate", "conference"]):
                data["category"] = "Industry - Corporate & Office"
            elif any(w in kw for w in ["retail", "storefront", "open sign", "trade show"]):
                data["category"] = "Industry - Retail & Storefronts"
            elif any(w in kw for w in ["wedding", "birthday", "party", "event"]):
                data["category"] = "Events & Occasions"
            elif any(w in kw for w in ["room", "bedroom", "home decor", "aesthetic", "wall"]):
                data["category"] = "Home Decor & Living"
            elif any(w in kw for w in ["game", "gaming", "man cave"]):
                data["category"] = "Gaming & Entertainment"
            elif any(w in kw for w in ["custom logo", "logo neon", "business logo"]):
                data["category"] = "Business Logo Neon Signs"
            elif any(w in kw for w in ["custom neon", "personalized neon", "neon light", "neon letters"]):
                data["category"] = "Custom LED Neon Signs"
            elif any(w in kw for w in ["business sign", "commercial sign", "signage"]):
                data["category"] = "B2B Commercial & Business Signs"
            else:
                data["category"] = "General & Market Benchmarks"

        # Intent
        if not data["intent"]:
            if any(w in kw for w in ["buy", "custom", "maker", "order", "price", "cost", "for sale", "near me"]):
                data["intent"] = "transactional_commercial"
            elif any(w in kw for w in ["how to", "how long", "ideas", "vs", "guide", "colours", "tips"]):
                data["intent"] = "informational"
            elif any(w in kw for w in ["signs", "signage", "neon", "letters", "logo"]):
                data["intent"] = "commercial_investigation"
            else:
                data["intent"] = "commercial_investigation"

        # Funnel
        if not data["funnel"]:
            if data["intent"] == "informational":
                data["funnel"] = "TOFU (Awareness)"
            elif data["intent"] == "commercial_investigation":
                data["funnel"] = "MOFU (Consideration)"
            else:
                data["funnel"] = "BOFU (Decision)"

        # Page Status
        if not data.get("page_status"):
            if cohort == "strategic_benchmark":
                data["page_status"] = "Strategic Benchmark"
            elif cohort == "live_page":
                data["page_status"] = "Live Page"
            elif cohort == "planned_90_day":
                data["page_status"] = "Approved 90-Day Plan"
            elif cohort == "blog_post":
                data["page_status"] = "Blog / Editorial"
            elif data["decision"] == "REMOVE":
                data["page_status"] = "Archived / Removed"
            elif target:
                data["page_status"] = "Live Page" if not target.startswith("/blog") else "Blog / Editorial"
            else:
                data["page_status"] = "Evaluated & Archived"

        # Role
        if not data["role"]:
            if data["decision"] == "REMOVE":
                data["role"] = "Evaluated & Archived"
            elif cohort == "strategic_benchmark":
                data["role"] = "Strategic Benchmark"
            else:
                data["role"] = "Secondary Keyword"

    return keywords, page_intent_rows

def build_workbook(keywords, page_intent_rows):
    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)

    # Styling Palette
    FONT_FAMILY = "Segoe UI"
    font_title = Font(name=FONT_FAMILY, size=16, bold=True, color="1E293B")
    font_subtitle = Font(name=FONT_FAMILY, size=10, italic=True, color="64748B")
    font_section = Font(name=FONT_FAMILY, size=12, bold=True, color="0F172A")
    font_header = Font(name=FONT_FAMILY, size=10, bold=True, color="FFFFFF")
    font_data = Font(name=FONT_FAMILY, size=10, color="0F172A")
    font_data_bold = Font(name=FONT_FAMILY, size=10, bold=True, color="0F172A")
    font_muted = Font(name=FONT_FAMILY, size=9, color="64748B")
    font_kpi_val = Font(name=FONT_FAMILY, size=20, bold=True, color="1E3A8A")
    font_kpi_lbl = Font(name=FONT_FAMILY, size=9, bold=True, color="475569")

    # Fills
    fill_navy_header = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
    fill_blue_header = PatternFill(start_color="1D4ED8", end_color="1D4ED8", fill_type="solid")
    fill_purple_header = PatternFill(start_color="6D28D9", end_color="6D28D9", fill_type="solid")
    fill_amber_header = PatternFill(start_color="D97706", end_color="D97706", fill_type="solid")
    fill_slate_header = PatternFill(start_color="334155", end_color="334155", fill_type="solid")
    fill_teal_header = PatternFill(start_color="0F766E", end_color="0F766E", fill_type="solid")
    fill_row_alt = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
    fill_kpi_card = PatternFill(start_color="EFF6FF", end_color="EFF6FF", fill_type="solid")

    # Status Fills
    fill_live = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid")  # Green
    font_live = Font(name=FONT_FAMILY, size=9, bold=True, color="166534")
    fill_planned = PatternFill(start_color="DBEAFE", end_color="DBEAFE", fill_type="solid")  # Blue
    font_planned = Font(name=FONT_FAMILY, size=9, bold=True, color="1E40AF")
    fill_blog = PatternFill(start_color="EDE9FE", end_color="EDE9FE", fill_type="solid")  # Purple
    font_blog = Font(name=FONT_FAMILY, size=9, bold=True, color="5B21B6")
    fill_bench = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")  # Amber
    font_bench = Font(name=FONT_FAMILY, size=9, bold=True, color="92400E")
    fill_arch = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")  # Gray
    font_arch = Font(name=FONT_FAMILY, size=9, color="64748B")

    # Borders
    thin_border_side = Side(style="thin", color="E2E8F0")
    thin_border = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    kpi_border = Border(left=Side(style="medium", color="3B82F6"), right=thin_border_side, top=thin_border_side, bottom=thin_border_side)
    header_border = Border(bottom=Side(style="medium", color="0F172A"))

    # Alignments
    align_left = Alignment(horizontal="left", vertical="center")
    align_center = Alignment(horizontal="center", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")
    align_wrap_left = Alignment(horizontal="left", vertical="center", wrap_text=True)

    # Sort keywords by Search Volume descending
    sorted_kw_list = sorted(keywords.values(), key=lambda x: (x["volume"], -x["sd"]), reverse=True)

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 1: Executive Dashboard & KPIs
    # ═══════════════════════════════════════════════════════════════════════════
    ws_kpi = wb.create_sheet(title="Executive Dashboard")
    ws_kpi.views.sheetView[0].showGridLines = True
    
    ws_kpi["A2"] = "The Glownique — Website SEO Keyword Master Dashboard"
    ws_kpi["A2"].font = font_title
    ws_kpi["A3"] = "Unified keyword intelligence, traffic projections, cluster distribution, and on-page mapping."
    ws_kpi["A3"].font = font_subtitle

    # Calculate metrics
    total_kws = len(sorted_kw_list)
    active_kws = [k for k in sorted_kw_list if k["decision"] == "KEEP"]
    archived_kws = [k for k in sorted_kw_list if k["decision"] == "REMOVE"]
    live_page_kws = [k for k in sorted_kw_list if k["cohort"] == "live_page" or "Live" in k.get("page_status", "")]
    total_volume = sum(k["volume"] for k in sorted_kw_list)
    active_volume = sum(k["volume"] for k in active_kws)
    high_opp = [k for k in active_kws if k["volume"] >= 500 and k["sd"] <= 35]

    # KPI Summary Cards in row 5-6
    kpis = [
        ("Total Unique Keywords", f"{total_kws:,}", "Comprehensive database across all site pages & tools", "B", "C"),
        ("Active Tracked / Target", f"{len(active_kws):,}", f"Total active monthly search volume: {active_volume:,}/mo", "D", "E"),
        ("Live Page Mapped", f"{len(live_page_kws):,}", "Mapped to live storefront, B2B, collection & guides", "F", "G"),
        ("High-Intent Opportunities", f"{len(high_opp):,}", "High volume (>=500/mo) with Low SD (<=35)", "H", "I"),
    ]

    for title, val, note, col_start, col_end in kpis:
        c1 = f"{col_start}5"
        c2 = f"{col_end}5"
        ws_kpi.merge_cells(f"{col_start}5:{col_end}5")
        ws_kpi[c1] = val
        ws_kpi[c1].font = font_kpi_val
        ws_kpi[c1].fill = fill_kpi_card
        ws_kpi[c1].alignment = align_center

        ws_kpi.merge_cells(f"{col_start}6:{col_end}6")
        c_lbl = f"{col_start}6"
        ws_kpi[c_lbl] = title
        ws_kpi[c_lbl].font = font_kpi_lbl
        ws_kpi[c_lbl].fill = fill_kpi_card
        ws_kpi[c_lbl].alignment = align_center

        # Borders
        for r in range(5, 7):
            for col_idx in [openpyxl.utils.column_index_from_string(col_start), openpyxl.utils.column_index_from_string(col_end)]:
                cell = ws_kpi.cell(row=r, column=col_idx)
                cell.border = thin_border

    # Cluster Summary Table
    ws_kpi["A8"] = "Keyword Clusters & Traffic Distribution"
    ws_kpi["A8"].font = font_section

    cluster_headers = ["Cluster / Category", "Total Keywords", "Active Keywords", "Total US Volume", "Avg Difficulty (SD)", "Top Target URL"]
    for col_idx, h in enumerate(cluster_headers, start=1):
        cell = ws_kpi.cell(row=9, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_navy_header
        cell.alignment = align_left if col_idx != 4 and col_idx != 5 else align_right

    clusters_dict = {}
    for k in sorted_kw_list:
        cat = k["category"]
        if cat not in clusters_dict:
            clusters_dict[cat] = {"total": 0, "active": 0, "volume": 0, "sds": [], "urls": set()}
        clusters_dict[cat]["total"] += 1
        if k["decision"] == "KEEP":
            clusters_dict[cat]["active"] += 1
        clusters_dict[cat]["volume"] += k["volume"]
        if k["sd"] > 0:
            clusters_dict[cat]["sds"].append(k["sd"])
        if k["target_url"]:
            clusters_dict[cat]["urls"].add(k["target_url"])

    row_num = 10
    for cat, cdata in sorted(clusters_dict.items(), key=lambda x: x[1]["volume"], reverse=True):
        avg_sd = round(sum(cdata["sds"]) / len(cdata["sds"])) if cdata["sds"] else 0
        top_url = next(iter(cdata["urls"])) if cdata["urls"] else "—"
        
        ws_kpi.cell(row=row_num, column=1, value=cat).font = font_data_bold
        ws_kpi.cell(row=row_num, column=2, value=cdata["total"]).font = font_data
        ws_kpi.cell(row=row_num, column=3, value=cdata["active"]).font = font_data
        cell_vol = ws_kpi.cell(row=row_num, column=4, value=cdata["volume"])
        cell_vol.font = font_data_bold
        cell_vol.number_format = "#,##0"
        cell_sd = ws_kpi.cell(row=row_num, column=5, value=avg_sd)
        cell_sd.font = font_data
        ws_kpi.cell(row=row_num, column=6, value=top_url).font = font_muted

        # Alignment & Borders
        for c in range(1, 7):
            cell = ws_kpi.cell(row=row_num, column=c)
            cell.border = thin_border
            if c in [2, 3]:
                cell.alignment = align_center
            elif c in [4, 5]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if row_num % 2 == 1:
                cell.fill = fill_row_alt
        row_num += 1

    # Top 15 Quick Wins Table (High Volume, Low Difficulty)
    row_num += 2
    ws_kpi.cell(row=row_num, column=1, value="Top 15 High-Opportunity Keywords (High Volume + Low Difficulty SD ≤ 35)").font = font_section
    row_num += 1

    opp_headers = ["Keyword", "Cluster", "Target URL", "US Monthly Volume", "SEO Difficulty", "CPC ($)", "Target Intent", "Priority"]
    for col_idx, h in enumerate(opp_headers, start=1):
        cell = ws_kpi.cell(row=row_num, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_blue_header
        cell.alignment = align_left if col_idx not in [4, 5, 6] else align_right

    opp_kws = sorted([k for k in active_kws if k["volume"] >= 400 and k["sd"] <= 36], key=lambda x: (-x["volume"], x["sd"]))[:15]
    row_num += 1
    for k in opp_kws:
        ws_kpi.cell(row=row_num, column=1, value=k["keyword"]).font = font_data_bold
        ws_kpi.cell(row=row_num, column=2, value=k["category"]).font = font_data
        ws_kpi.cell(row=row_num, column=3, value=k["target_url"] or "—").font = font_muted
        
        c_vol = ws_kpi.cell(row=row_num, column=4, value=k["volume"])
        c_vol.font = font_data_bold
        c_vol.number_format = "#,##0"
        
        c_sd = ws_kpi.cell(row=row_num, column=5, value=k["sd"])
        c_sd.font = font_data
        
        c_cpc = ws_kpi.cell(row=row_num, column=6, value=k["cpc"] or "")
        c_cpc.font = font_data
        if k["cpc"]:
            c_cpc.number_format = "$#,##0.00"
            
        ws_kpi.cell(row=row_num, column=7, value=k["intent"]).font = font_data
        ws_kpi.cell(row=row_num, column=8, value="P0 - High Value").font = font_live

        for c in range(1, 9):
            cell = ws_kpi.cell(row=row_num, column=c)
            cell.border = thin_border
            if c in [4, 5, 6]:
                cell.alignment = align_right
            elif c == 8:
                cell.alignment = align_center
                cell.fill = fill_live
            else:
                cell.alignment = align_left
        row_num += 1

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 2: Master All Keywords
    # ═══════════════════════════════════════════════════════════════════════════
    ws_all = wb.create_sheet(title="All Keywords Master")
    ws_all.views.sheetView[0].showGridLines = True
    ws_all.freeze_panes = "A2"

    headers_all = [
        "Keyword ID",
        "Keyword (Search Query)",
        "Category / Cluster",
        "Target URL",
        "Page Status",
        "Keyword Role",
        "Monthly Volume (US)",
        "SEO Difficulty (SD)",
        "CPC (USD)",
        "Search Intent",
        "Funnel Stage",
        "Decision Status",
        "Source Origin",
        "Strategic Rationale & Mapping Notes"
    ]

    for col_idx, h in enumerate(headers_all, start=1):
        cell = ws_all.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_navy_header
        cell.alignment = align_left if col_idx not in [1, 7, 8, 9, 12] else (align_center if col_idx in [1, 12] else align_right)
        cell.border = header_border

    for idx, k in enumerate(sorted_kw_list, start=1):
        r_num = idx + 1
        kw_id = f"KW-{idx:04d}"
        
        ws_all.cell(row=r_num, column=1, value=kw_id).font = font_muted
        ws_all.cell(row=r_num, column=2, value=k["keyword"]).font = font_data_bold
        ws_all.cell(row=r_num, column=3, value=k["category"]).font = font_data
        ws_all.cell(row=r_num, column=4, value=k["target_url"] or "—").font = font_data
        
        # Status Pill
        c_status = ws_all.cell(row=r_num, column=5, value=k["page_status"])
        if "Live" in k["page_status"]:
            c_status.fill = fill_live
            c_status.font = font_live
        elif "Approved" in k["page_status"]:
            c_status.fill = fill_planned
            c_status.font = font_planned
        elif "Blog" in k["page_status"]:
            c_status.fill = fill_blog
            c_status.font = font_blog
        elif "Benchmark" in k["page_status"]:
            c_status.fill = fill_bench
            c_status.font = font_bench
        else:
            c_status.fill = fill_arch
            c_status.font = font_arch

        ws_all.cell(row=r_num, column=6, value=k["role"].title() if k["role"] else "Secondary").font = font_data
        
        c_vol = ws_all.cell(row=r_num, column=7, value=k["volume"])
        c_vol.font = font_data_bold
        c_vol.number_format = "#,##0"
        
        c_sd = ws_all.cell(row=r_num, column=8, value=k["sd"])
        c_sd.font = font_data
        
        c_cpc = ws_all.cell(row=r_num, column=9, value=k["cpc"] if k["cpc"] else "")
        c_cpc.font = font_data
        if k["cpc"]:
            c_cpc.number_format = "$#,##0.00"

        ws_all.cell(row=r_num, column=10, value=k["intent"].replace("_", " ").title()).font = font_data
        ws_all.cell(row=r_num, column=11, value=k["funnel"]).font = font_data
        
        c_dec = ws_all.cell(row=r_num, column=12, value=k["decision"])
        if k["decision"] == "KEEP":
            c_dec.fill = fill_live
            c_dec.font = font_live
        else:
            c_dec.fill = fill_arch
            c_dec.font = font_arch

        ws_all.cell(row=r_num, column=13, value=k["source"]).font = font_muted
        ws_all.cell(row=r_num, column=14, value=k["reason"]).font = font_data

        for c in range(1, 15):
            cell = ws_all.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [1, 5, 12]:
                cell.alignment = align_center
            elif c in [7, 8, 9]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if r_num % 2 == 1 and c not in [5, 12]:
                cell.fill = fill_row_alt

    ws_all.auto_filter.ref = f"A1:N{len(sorted_kw_list) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 3: Live Target Keywords
    # ═══════════════════════════════════════════════════════════════════════════
    ws_live = wb.create_sheet(title="Live Target Keywords")
    ws_live.views.sheetView[0].showGridLines = True
    ws_live.freeze_panes = "A2"

    live_kws = [k for k in sorted_kw_list if k["decision"] == "KEEP" and (k["target_url"] or k["cohort"] == "strategic_benchmark")]

    headers_live = [
        "Keyword",
        "Target URL",
        "Role",
        "Cluster",
        "Monthly Volume (US)",
        "SEO Difficulty",
        "CPC ($)",
        "Target Intent",
        "Implementation Notes & On-Page Usage"
    ]

    for col_idx, h in enumerate(headers_live, start=1):
        cell = ws_live.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_teal_header
        cell.alignment = align_left if col_idx not in [5, 6, 7] else align_right
        cell.border = header_border

    for idx, k in enumerate(live_kws, start=1):
        r_num = idx + 1
        ws_live.cell(row=r_num, column=1, value=k["keyword"]).font = font_data_bold
        ws_live.cell(row=r_num, column=2, value=k["target_url"] or "/").font = font_data
        ws_live.cell(row=r_num, column=3, value=k["role"].title()).font = font_data
        ws_live.cell(row=r_num, column=4, value=k["category"]).font = font_data
        
        c_vol = ws_live.cell(row=r_num, column=5, value=k["volume"])
        c_vol.font = font_data_bold
        c_vol.number_format = "#,##0"
        
        c_sd = ws_live.cell(row=r_num, column=6, value=k["sd"])
        c_sd.font = font_data
        
        c_cpc = ws_live.cell(row=r_num, column=7, value=k["cpc"] if k["cpc"] else "")
        c_cpc.font = font_data
        if k["cpc"]:
            c_cpc.number_format = "$#,##0.00"

        ws_live.cell(row=r_num, column=8, value=k["intent"].replace("_", " ").title()).font = font_data
        ws_live.cell(row=r_num, column=9, value=k["reason"]).font = font_data

        for c in range(1, 10):
            cell = ws_live.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [5, 6, 7]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if r_num % 2 == 1:
                cell.fill = fill_row_alt

    ws_live.auto_filter.ref = f"A1:I{len(live_kws) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 4: Backlit & Halo Signs Cluster
    # ═══════════════════════════════════════════════════════════════════════════
    ws_backlit = wb.create_sheet(title="Backlit Signs Cluster")
    ws_backlit.views.sheetView[0].showGridLines = True
    ws_backlit.freeze_panes = "A2"

    headers_backlit = [
        "Keyword",
        "Role",
        "Target Page / Route",
        "Monthly Volume",
        "SEO Difficulty",
        "CPC ($)",
        "Target Intent",
        "Angle & Content Purpose"
    ]

    for col_idx, h in enumerate(headers_backlit, start=1):
        cell = ws_backlit.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_amber_header
        cell.alignment = align_left if col_idx not in [4, 5, 6] else align_right
        cell.border = header_border

    backlit_kws = [k for k in sorted_kw_list if "backlit" in k["keyword"].lower() or "halo" in k["keyword"].lower() or "reverse channel" in k["keyword"].lower() or "standoff" in k["keyword"].lower()]

    for idx, k in enumerate(backlit_kws, start=1):
        r_num = idx + 1
        ws_backlit.cell(row=r_num, column=1, value=k["keyword"]).font = font_data_bold
        ws_backlit.cell(row=r_num, column=2, value=k["role"].title()).font = font_data
        ws_backlit.cell(row=r_num, column=3, value=k["target_url"] or "/business-signs/backlit-signs").font = font_data
        
        c_vol = ws_backlit.cell(row=r_num, column=4, value=k["volume"])
        c_vol.font = font_data_bold
        c_vol.number_format = "#,##0"
        
        c_sd = ws_backlit.cell(row=r_num, column=5, value=k["sd"])
        c_sd.font = font_data
        
        c_cpc = ws_backlit.cell(row=r_num, column=6, value=k["cpc"] if k["cpc"] else "")
        c_cpc.font = font_data
        if k["cpc"]:
            c_cpc.number_format = "$#,##0.00"

        ws_backlit.cell(row=r_num, column=7, value=k["intent"].replace("_", " ").title()).font = font_data
        ws_backlit.cell(row=r_num, column=8, value=k["reason"]).font = font_data

        for c in range(1, 9):
            cell = ws_backlit.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [4, 5, 6]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if r_num % 2 == 1:
                cell.fill = fill_row_alt

    ws_backlit.auto_filter.ref = f"A1:H{len(backlit_kws) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 5: Page & URL Matrix
    # ═══════════════════════════════════════════════════════════════════════════
    ws_matrix = wb.create_sheet(title="Page & Intent Matrix")
    ws_matrix.views.sheetView[0].showGridLines = True
    ws_matrix.freeze_panes = "A2"

    headers_matrix = [
        "Page ID",
        "Canonical Route",
        "Cluster",
        "Page Status",
        "Primary Keyword",
        "Search Volume",
        "Difficulty (SD)",
        "Supporting Questions / Intent",
        "Target Audience",
        "Funnel Stage",
        "Conversion Goal",
        "Structured Data Candidate",
        "Priority",
        "Strategic Notes"
    ]

    for col_idx, h in enumerate(headers_matrix, start=1):
        cell = ws_matrix.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_purple_header
        cell.alignment = align_left if col_idx not in [6, 7, 13] else (align_center if col_idx == 13 else align_right)
        cell.border = header_border

    for idx, r in enumerate(page_intent_rows, start=1):
        r_num = idx + 1
        ws_matrix.cell(row=r_num, column=1, value=r.get("page_id", "")).font = font_data_bold
        ws_matrix.cell(row=r_num, column=2, value=r.get("canonical_url", "")).font = font_data
        ws_matrix.cell(row=r_num, column=3, value=r.get("cluster", "")).font = font_data
        
        c_stat = ws_matrix.cell(row=r_num, column=4, value=r.get("page_status", "").title())
        if r.get("page_status") == "existing":
            c_stat.fill = fill_live
            c_stat.font = font_live
        else:
            c_stat.fill = fill_planned
            c_stat.font = font_planned

        ws_matrix.cell(row=r_num, column=5, value=r.get("primary_keyword", "")).font = font_data_bold
        
        vol_str = r.get("search_volume", "")
        vol_val = int(vol_str) if vol_str.isdigit() else vol_str
        c_vol = ws_matrix.cell(row=r_num, column=6, value=vol_val)
        c_vol.font = font_data
        if isinstance(vol_val, int):
            c_vol.number_format = "#,##0"

        sd_str = r.get("keyword_difficulty", "")
        sd_val = int(sd_str) if sd_str.isdigit() else sd_str
        c_sd = ws_matrix.cell(row=r_num, column=7, value=sd_val)
        c_sd.font = font_data

        ws_matrix.cell(row=r_num, column=8, value=r.get("supporting_questions", "").replace("|", "; ")).font = font_data
        ws_matrix.cell(row=r_num, column=9, value=r.get("audience", "")).font = font_data
        ws_matrix.cell(row=r_num, column=10, value=r.get("funnel_stage", "").title()).font = font_data
        ws_matrix.cell(row=r_num, column=11, value=r.get("primary_conversion", "")).font = font_data
        ws_matrix.cell(row=r_num, column=12, value=r.get("schema_candidate", "")).font = font_muted
        
        c_prio = ws_matrix.cell(row=r_num, column=13, value=r.get("priority", ""))
        c_prio.font = font_data_bold
        if r.get("priority") == "P0":
            c_prio.fill = fill_amber_header
            c_prio.font = font_header

        ws_matrix.cell(row=r_num, column=14, value=r.get("notes", "")).font = font_data

        for c in range(1, 15):
            cell = ws_matrix.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [4, 13]:
                cell.alignment = align_center
            elif c in [6, 7]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if r_num % 2 == 1 and c not in [4, 13]:
                cell.fill = fill_row_alt

    ws_matrix.auto_filter.ref = f"A1:N{len(page_intent_rows) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 6: Blog & Editorial Topics
    # ═══════════════════════════════════════════════════════════════════════════
    ws_blog = wb.create_sheet(title="Blog & Editorial Strategy")
    ws_blog.views.sheetView[0].showGridLines = True
    ws_blog.freeze_panes = "A2"

    headers_blog = [
        "Topic / Title",
        "Primary Keyword",
        "Category",
        "Target URL",
        "Estimated Volume",
        "Difficulty (SD)",
        "CPC ($)",
        "Editorial Angle & Decision Value"
    ]

    for col_idx, h in enumerate(headers_blog, start=1):
        cell = ws_blog.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_slate_header
        cell.alignment = align_left if col_idx not in [5, 6, 7] else align_right
        cell.border = header_border

    blog_kws = [k for k in sorted_kw_list if k["target_url"] and (k["target_url"].startswith("/blog") or k["cohort"] == "blog_post")]

    for idx, k in enumerate(blog_kws, start=1):
        r_num = idx + 1
        ws_blog.cell(row=r_num, column=1, value=k["keyword"].title()).font = font_data_bold
        ws_blog.cell(row=r_num, column=2, value=k["keyword"]).font = font_data
        ws_blog.cell(row=r_num, column=3, value=k["category"]).font = font_data
        ws_blog.cell(row=r_num, column=4, value=k["target_url"]).font = font_data
        
        c_vol = ws_blog.cell(row=r_num, column=5, value=k["volume"])
        c_vol.font = font_data_bold
        c_vol.number_format = "#,##0"
        
        c_sd = ws_blog.cell(row=r_num, column=6, value=k["sd"])
        c_sd.font = font_data
        
        c_cpc = ws_blog.cell(row=r_num, column=7, value=k["cpc"] if k["cpc"] else "")
        c_cpc.font = font_data
        if k["cpc"]:
            c_cpc.number_format = "$#,##0.00"

        ws_blog.cell(row=r_num, column=8, value=k["reason"]).font = font_data

        for c in range(1, 9):
            cell = ws_blog.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [5, 6, 7]:
                cell.alignment = align_right
            else:
                cell.alignment = align_left
            if r_num % 2 == 1:
                cell.fill = fill_row_alt

    ws_blog.auto_filter.ref = f"A1:H{len(blog_kws) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # SHEET 7: Evaluation & Archive Register
    # ═══════════════════════════════════════════════════════════════════════════
    ws_arch = wb.create_sheet(title="Archived & Evaluated Terms")
    ws_arch.views.sheetView[0].showGridLines = True
    ws_arch.freeze_panes = "A2"

    headers_arch = [
        "Keyword",
        "Monthly Volume",
        "SEO Difficulty",
        "Audit Decision",
        "Audit Rationale & Removal Basis"
    ]

    for col_idx, h in enumerate(headers_arch, start=1):
        cell = ws_arch.cell(row=1, column=col_idx, value=h)
        cell.font = font_header
        cell.fill = fill_slate_header
        cell.alignment = align_left if col_idx not in [2, 3, 4] else (align_center if col_idx == 4 else align_right)
        cell.border = header_border

    archived_list = [k for k in sorted_kw_list if k["decision"] == "REMOVE"]

    for idx, k in enumerate(archived_list, start=1):
        r_num = idx + 1
        ws_arch.cell(row=r_num, column=1, value=k["keyword"]).font = font_data_bold
        
        c_vol = ws_arch.cell(row=r_num, column=2, value=k["volume"])
        c_vol.font = font_data
        c_vol.number_format = "#,##0"
        
        c_sd = ws_arch.cell(row=r_num, column=3, value=k["sd"])
        c_sd.font = font_data
        
        c_dec = ws_arch.cell(row=r_num, column=4, value="REMOVE")
        c_dec.fill = fill_arch
        c_dec.font = font_arch
        
        ws_arch.cell(row=r_num, column=5, value=k["reason"]).font = font_data

        for c in range(1, 6):
            cell = ws_arch.cell(row=r_num, column=c)
            cell.border = thin_border
            if c in [2, 3]:
                cell.alignment = align_right
            elif c == 4:
                cell.alignment = align_center
            else:
                cell.alignment = align_left
            if r_num % 2 == 1 and c != 4:
                cell.fill = fill_row_alt

    ws_arch.auto_filter.ref = f"A1:E{len(archived_list) + 1}"

    # ═══════════════════════════════════════════════════════════════════════════
    # Auto-adjust column widths on all sheets
    # ═══════════════════════════════════════════════════════════════════════════
    for ws in wb.worksheets:
        for col in ws.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                val = str(cell.value or "")
                if len(val) > max_len and not cell.coordinate in ws.merged_cells:
                    max_len = len(val)
            ws.column_dimensions[col_letter].width = max(min(max_len + 4, 60), 12)

    # Specific tweaks for dashboard
    ws_kpi.column_dimensions["A"].width = 38
    ws_kpi.column_dimensions["B"].width = 16
    ws_kpi.column_dimensions["C"].width = 16
    ws_kpi.column_dimensions["D"].width = 20
    ws_kpi.column_dimensions["E"].width = 18
    ws_kpi.column_dimensions["F"].width = 38

    # Specific tweaks for All Master
    ws_all.column_dimensions["A"].width = 14
    ws_all.column_dimensions["B"].width = 34
    ws_all.column_dimensions["C"].width = 28
    ws_all.column_dimensions["D"].width = 36
    ws_all.column_dimensions["E"].width = 20
    ws_all.column_dimensions["F"].width = 18
    ws_all.column_dimensions["G"].width = 18
    ws_all.column_dimensions["H"].width = 16
    ws_all.column_dimensions["I"].width = 14
    ws_all.column_dimensions["J"].width = 24
    ws_all.column_dimensions["K"].width = 20
    ws_all.column_dimensions["L"].width = 16
    ws_all.column_dimensions["M"].width = 24
    ws_all.column_dimensions["N"].width = 50

    return wb

def export_csv(keywords, filepath):
    headers = [
        "keyword_id",
        "keyword",
        "category_cluster",
        "target_url",
        "page_status",
        "role",
        "monthly_search_volume_us",
        "seo_difficulty",
        "cpc_usd",
        "search_intent",
        "funnel_stage",
        "decision_status",
        "source_origin",
        "rationale_and_notes"
    ]
    sorted_kws = sorted(keywords.values(), key=lambda x: (x["volume"], -x["sd"]), reverse=True)
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        for idx, k in enumerate(sorted_kws, start=1):
            writer.writerow([
                f"KW-{idx:04d}",
                k["keyword"],
                k["category"],
                k["target_url"],
                k["page_status"],
                k["role"],
                k["volume"],
                k["sd"],
                k["cpc"] if k["cpc"] else "",
                k["intent"],
                k["funnel"],
                k["decision"],
                k["source"],
                k["reason"]
            ])

def main():
    print("Loading keyword data from all project sources...")
    keywords, page_intent_rows = load_data()
    print(f"Loaded {len(keywords)} unique keywords and {len(page_intent_rows)} page/intent definitions.")
    
    excel_path = os.path.join(BASE_DIR, "SEO-Optimization", "master-website-keywords.xlsx")
    csv_path = os.path.join(BASE_DIR, "SEO-Optimization", "master-website-keywords.csv")

    print("Building multi-tab master Excel workbook...")
    wb = build_workbook(keywords, page_intent_rows)
    wb.save(excel_path)
    print(f"Saved Excel workbook to: {excel_path}")

    print("Exporting companion CSV file...")
    export_csv(keywords, csv_path)
    print(f"Saved CSV file to: {csv_path}")

    print("\nSummary Statistics:")
    print(f"Total Unique Keywords: {len(keywords)}")
    active_count = sum(1 for k in keywords.values() if k["decision"] == "KEEP")
    print(f"Active Tracked Keywords: {active_count}")
    archived_count = sum(1 for k in keywords.values() if k["decision"] == "REMOVE")
    print(f"Archived / Evaluated Keywords: {archived_count}")
    total_vol = sum(k["volume"] for k in keywords.values())
    print(f"Total Addressable US Search Volume: {total_vol:,}/mo")

if __name__ == "__main__":
    main()
