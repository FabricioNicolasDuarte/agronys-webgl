from pathlib import Path
root = Path(r"C:\Users\fabri\agronys-webgl")
needle = 'href="./favicon.svg"'
for p in root.glob("*.html"):
    t = p.read_text(encoding="utf-8")
    if 'favicon.png' in t:
        print("already", p.name)
        continue
    t2 = t.replace(
        '<link rel="icon" type="image/svg+xml" href="./favicon.svg" />',
        '<link rel="icon" type="image/png" href="./favicon.png" />\n    <link rel="apple-touch-icon" href="./favicon.png" />',
    )
    if t2 != t:
        p.write_text(t2, encoding="utf-8")
        print("updated", p.name)
    else:
        print("skip", p.name)
