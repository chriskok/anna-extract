try:
    from PIL import Image
except ImportError:
    import Image
import pytesseract
import cv2

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract'

curr_image_path = "public/data/service_call.jpg"

# what each item means: [element.width, element.height, element.top, element.left, sampleImage.width, sampleImage.height];
example_data = {"Date":[159,30,73,231,407,634],"Name":[316,77,96,54,407,634]}
curr_coord_data = example_data['Name']

# int_val/int_total = x/curr_total
# x = curr_total * (int_val/int_total)
def get_proportional(int_val, int_total, curr_total):
    return curr_total * (int_val/int_total)

def crop_image(coord_data, image_path):
    img = cv2.imread(image_path)
    interface_w = coord_data[4] 
    interface_h = coord_data[5] 

    height, width, _ = img.shape

    coord_w = int(get_proportional(coord_data[0], interface_w, width))
    coord_h = int(get_proportional(coord_data[1], interface_h, height))
    coord_top = int(get_proportional(coord_data[2], interface_h, height))
    coord_left = int(get_proportional(coord_data[3], interface_w, width))

    crop_img = img[coord_top:coord_top  + coord_h, coord_left:coord_left + coord_w]
    return crop_img

def ocr_on_image(current_image):
    # img_rgb = cv2.cvtColor(current_image, cv2.COLOR_BGR2RGB)
    # cv2.imshow("cropped", img_rgb)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # print(pytesseract.image_to_string(img_rgb, config='--psm 7 -c tessedit_char_whitelist=0123456789.%'))

    gray = cv2.cvtColor(current_image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    data = pytesseract.image_to_string(thresh, lang='eng',config='--psm 6')
    
    return data

def main():
    cropped_image = crop_image(curr_coord_data, curr_image_path)
    print(ocr_on_image(cropped_image))
    
if __name__ == "__main__":
    main()


