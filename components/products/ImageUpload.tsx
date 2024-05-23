"use client";
import { getImagePath } from "@/src/util";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  imageProduct?: string;
};

export default function ImageUpload({ imageProduct }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState();
  return (
    <>
      <CldUploadWidget
        onSuccess={(result, { widget }) => {
          if (result.event === "success") {
            widget.close();
            //@ts-ignore
            setImageUrl(result.info?.secure_url);
          }
          console.log(result);
        }}
        uploadPreset="rsyt9vuy"
        options={{
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <>
            <div className="space-y2">
              <label className=" text-slate-800">Imagen Producto:</label>
              <div
                className="relative cursor-pointer hover:opacity-70 transition p-10
             border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-300"
                onClick={() => open()}
              >
                <TbPhotoPlus size={50} />
                <p className="text-lg font-semibold">Agregar Imagen</p>

                {imageUrl && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      fill
                      style={{ objectFit: "contain" }}
                      src={imageUrl}
                      alt="Imagen Producto"
                    />
                  </div>
                )}
              </div>
            </div>

            {imageProduct && !imageUrl && (
              <div className=" space-y-2">
                <label>Imagen Actual:</label>
                <div className="relative w-64 h-64 ">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={getImagePath(imageProduct)}
                    alt="Imagen Producto"
                  />
                </div>
              </div>
            )}

            <input
              type="hidden"
              name="image"
              defaultValue={imageUrl ? imageUrl : imageProduct}
            />
          </>
        )}
      </CldUploadWidget>
    </>
  );
}
