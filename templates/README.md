# Shopify Technical Challenge Documentation

## Overview

The Shopify Lookbook feature allows merchants to create interactive lookbooks using Shopify's native metaobjects functionality. This Lookbook feature displays on dedicated pages and automatically appear on product pages when products are featured in them.


### File Structure

```
sections/
  |__ lookbook.liquid          # Main section template
snippets/
  |__ lookbook-item.liquid     # Individual lookbook component
assets/
  |__ section-lookbook.css     # Styling
  |__ lookbook.js             # Interactive functionality
```


## Integration Guide

### 1. Adding Lookbooks to Pages

The lookbook section can be added to any page through the **Theme Editor**:

1. Go to **Online Store → Themes → Customize**
2. Navigate to the desired page (Homepage, Contact, About, etc.)
3. Click **"Add section"**
4. Select **"Lookbooks"** from the Select Lookbook dropdown


### 2. Product Page Automatic Display

On **product pages**, lookbooks automatically appear when:
- The current product is featured in any lookbook
- No manual setup required - it's automatic filtering


### 3. Creating Lookbooks

1. **Admin Setup**:
   - Go to Settings → Metaobjects
   - Create entries of type "lookbook"
   - Fill required fields

2. **Hotspot Configuration**:
```json
[
  {
    "x": 25, // X coordinate for hotspot
    "y": 40, // Y coordinate for hotspot
    "product": // Add desired Shopify product 
  }
]
```

3. **Section Usage**:
   - Add "Lookbook" section via theme customizer
   - Select metaobjects to display

## Technical Features

### Interactive Elements
- **Hotspots**: Click to reveal product popups
- **Hover Effects**: Visual feedback on interactive elements

### Product Detection Logic
```liquid
{%- for product in lookbook.products.value -%}
  {%- if product.id == current_product.id -%}
    <!-- Display lookbook -->
  {%- endif -%}
{%- endfor -%}
```

### Running this solution locally
- Clone the repository
- Run `shopify theme pull` to pull the theme files from the Shopify store
- Use `shopify theme dev -e development` to start the local dev server
- Use `shopify theme push -e development` to push changes to the development environment






