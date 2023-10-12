import React, { forwardRef, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

const ImageComponent = forwardRef((props, ref) => {
    const { src, blur } = props;
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setImageLoaded(true);
        };
        img.src = src;
    }, [src]);

    return <>
        {imageLoaded ? <img ref={ref} loading="lazy" src={src} alt="Original"></img> :
            <Blurhash
                className="blur-hash"
                hash={blur}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
            />}
    </>
});

export default ImageComponent;