import requests
import os
import printer

def extract_text(info, targetText):
    label = info.find("strong", string=lambda text: targetText in text)
    p = label.parent

    link = p.find("a")
    if link:
        return link.text.strip()
    else:
        return "".join(p.findAll(text=True, recursive=False)).strip()

def get_image_and_save(book, img):
    imageLocation = os.getenv("IMAGE_PATH")
    file_path = f"{imageLocation}/{book["ISBN13"]}.jpg"

    if os.path.isfile(file_path):
        printer.yellow("Image already exists.")
    else:
        # Request image
        URL = img["src"]
        image = requests.get(URL)

        # Save image
        with open(file_path, 'wb') as f:
            f.write(image.content)