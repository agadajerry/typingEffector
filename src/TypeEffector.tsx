import React, { useEffect, useState } from 'react';
import ssss from "./styleer/styleer.module.css";


function TypeEffector({wordsList}:{wordsList:any}){


  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const dynamicTextRef = React.useRef<HTMLSpanElement>(null);


  useEffect(() => {
    const dynamicText = dynamicTextRef.current;

    if (dynamicText) {
      const currentWord = wordsList[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.innerHTML = currentChar;
      dynamicText.classList.add("stop-blinking");

      const typeTimeout = setTimeout(() => {
        if (charIndex < currentWord.length && !isDeleting) {
          setCharIndex(charIndex + 1);
        } else if (charIndex > 0 && isDeleting) {
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(!isDeleting);
          dynamicText.classList.remove("stop-blinking");

          // If not deleting, wait for a pause before moving to the next word
          if (!isDeleting) {
            setTimeout(() => {
              setWordIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
            }, 4000); // Adjust this delay as needed
          }
        }
      }, isDeleting ? 100 : 200);

      return () => clearTimeout(typeTimeout);
    }
  }, [charIndex, isDeleting, wordIndex, wordsList]);

  return <h4 className={ssss.imTypingNow}><span ref={dynamicTextRef}></span></h4>;
}

export default TypeEffector;
