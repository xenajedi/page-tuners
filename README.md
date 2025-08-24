# Page Tuners — Pitch Site (Jekyll/GitHub Pages)

This is the initial scaffold for the Page Tuners pitch site.
- **Brand tokens** are in `_data/tokens.yml` and wired into SCSS variables.
- **Cloudinary** is the default for content images (characters/episodes) via `_includes/img.html`.
- **Logo area = Home** link (scroll to top on single-page). "Home" is not listed in the sidebar.

## Structure
- `_layouts/default.html` — global frame
- `_includes/header.html` — logo block (Home)
- `_includes/sidebar.html` — fixed sidebar, Characters disclosure (►/▾), Episodes single link
- `_includes/section-*.html` — one include per section
- `_includes/img.html` — image helper (Cloudinary or local fallback)
- `_characters/` & `_episodes/` — collections driving the section content
- `_data/navigation.yml` — sidebar order/labels
- `_sass/` & `assets/css/` — tokens + components
- `assets/js/site.js` — disclosure toggle, scrollspy, smooth-scroll

## Cloudinary
- `use_cloudinary` + `cloudinary` config are in `_config.yml`.
- Public IDs should live under: `page-tuners/characters/...` and `page-tuners/episodes/...`.
- Named transforms expected: `t_hero`, `t_card`, `t_thumb` (configure in your Cloudinary dashboard).

## Local Dev
- Install Ruby/Jekyll, then run: `bundle exec jekyll serve`
- Site base path is `/page-tuners` (matching GitHub Pages project site).

## Next steps
- Fill collection items in `_characters/` and `_episodes/` (see CSV templates you prepared).
- Upload images to Cloudinary and paste the `cdn_id` (public ID) in each item.
