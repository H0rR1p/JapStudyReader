"""Create an empty Windows icon so JSR never inherits Electron's branding."""
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
canvas = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
output = ROOT / "assets" / "jsr-empty.ico"
output.parent.mkdir(parents=True, exist_ok=True)
canvas.save(output, sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print(output)
