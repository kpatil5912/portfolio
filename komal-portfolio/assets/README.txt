Project cover media goes here.

The portfolio picks the cover in this priority order:
  1) VIDEO  (preferred) -> plays muted + looping, auto-replaces the animated scene
  2) IMAGE  (fallback)  -> shown if no video is present
  3) Animated holographic scene (built in CSS) -> shown if neither file exists

To use YOUR video covers, drop these exact files in this "assets" folder:
  - amenity.mp4      (cover for AmenityHub / Amenity Booking Application)
  - restotrack.mp4   (cover for Resto-Track)

Or, to use images instead:
  - amenity.png
  - restotrack.png

Notes:
  * File names must match exactly (lowercase).
  * Recommended video: short, MUTED, looping MP4 (H.264), ~16:10, a few MB.
  * If a file is missing or fails to load, nothing breaks - the animated
    holographic scene is shown automatically.
  * "Classpath" is a Java concept; for a website the video must physically
    live in this portfolio/assets/ folder (or be served from a URL).
