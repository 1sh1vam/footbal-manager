import { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc: string;
}

const Image = ({ fallbackSrc, src, ...props }: ImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [precSrcProp, setPrevSrcProp] = useState(src);

    if (src !== precSrcProp) {
        setImgSrc(src);
        setPrevSrcProp(src);
    }
  
    const handleImageError = () => {
      setImgSrc(fallbackSrc);
    };
  
    return (
      <img
        {...props}
        src={imgSrc}
        onError={handleImageError}
      />
    );
  };
  
  export default Image;