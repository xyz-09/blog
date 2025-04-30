---
layout: post
title: Svg to stl using scad
date: 2025-04-30
category: [3d]
author: Edyta Jozdowska
tags: ["3d"]
excerpt: Preparing an object outline in Inkscape, importing into OpenSCAD, and exporting to STL
published: true
---


# Short review 

This workflow allows you to:
- Extract an outline from an SVG in Inkscape  
- Set stroke width and convert the stroke to a standalone path  
- Export the path to DXF (AutoCAD R14)  
- Import the DXF into OpenSCAD  
- Export the final model to an STL file

# 1. Prepare the outline in Inkscape

1. **Open the SVG file**  
   - File → Open, select `file.svg`.  
2. **Add a stroke**  
   - Select the object.  
   - Open the **Fill and Stroke** dialog (Shift + Ctrl + F).  
   - In the **Stroke Style** tab, set the **Width** (e.g., 2 px).  
3. **Convert the stroke to a path**  - form main menu
   - Path → Stroke to Path or use (CTRL + Alt + C)

## 2. Export to DXF (AutoCAD R14)

1. Select the resulting path.  
2. File → Save As…  
3. Choose **Desktop Cutting Plotter (AutoCAD R14) (*.dxf)**.  
4. Save as `file.dxf` in the same folder as your `.scad` script.

---

## 3. Install OpenSCAD

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install openscad
```
### Windows
Visit [https://www.openscad.org/downloads.html]

Download the MSI installer and run it.

## Import the DXF and generate the model in OpenSCAD
Create a file `dfx-to-stl.scad` with the following content:

```scad
$fn = 100;

module stl_from_dxf(extrude_height = 5) {
    linear_extrude(
        height      = extrude_height,
        center      = false,
        convexity   = 10
    )
        import("file.dxf");
}

// Example: 20 mm extrusion height
stl_from_dxf(20);

```
where:
* `$fn = 100;` — smoothness of curves and edges.
* `extrude_height` — extrusion height in millimeters.

## Export to STL
1. In OpenSCAD, choose Design → Compile and Render (CGAL) (F6).
2. After rendering, select File → Export → Export as STL.
3. Save as `result.stl`.

That all :smile:
