import React, { useState } from "react";
import Cropper from "react-easy-crop";

const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

// Copy from "https://codesandbox.io/s/react-easy-crop-demo-with-cropped-output-q8q1mnr01w?from-embed=&file=/src/cropImage.js:0-2289"
async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return canvas.toDataURL("image/jpeg");
}

export const cropImage = async (image, croppedAreaPixels, onError) => {
    try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        return croppedImage;
    } catch (err) {
        onError(err);
    }
};

const ImageCropper = ({ open, image, onComplete, ...props }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    return (
        open && (
            <div
                className={`fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50`}
            >
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-[95%] md:w-[500px] bg-white mx-auto rounded shadow-lg overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4">
                                Crop Image
                            </h2>
                            <div className="relative w-full h-[265px] md:h-[300px] bg-[#333] rounded">
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onCropComplete={(_, croppedAreaPixels) => {
                                        setCroppedAreaPixels(croppedAreaPixels);
                                    }}
                                    onZoomChange={setZoom}
                                    {...props}
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() =>
                                        onComplete(
                                            cropImage(
                                                image,
                                                croppedAreaPixels,
                                                console.log
                                            )
                                        )
                                    }
                                >
                                    Finish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ImageCropper;
