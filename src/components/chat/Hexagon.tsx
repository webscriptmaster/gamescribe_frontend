// components/Hexagon.tsx
import React, { useState, useEffect } from 'react';
import { baseUrl } from "@/utils/url";
import styles from "@/styles/Hexagon.module.css";
interface HexagonProps {
    type: string;
    hexData: Array<{ img_url: string; color: string; type: string; }>
}

const Hexagon: React.FC<HexagonProps> = ({ type, hexData }) => {
    const [animationState, setAnimationState] = useState<"fadeIn" | "fadeOut">("fadeIn");
    const [toggle, setToggle] = useState<boolean>(true);
    const [text, setText] = useState<string>("");
    const [currentItem, setCurrentItem] = useState<{
        img_url: string;
        color: string,
        type: string
    }>({
        img_url: (hexData[0]?.img_url === undefined ? "" : hexData[0].img_url),
        type: type,
        color: (hexData[0]?.color === undefined ? "" : hexData[0].color)
    });
    useEffect(() => {
        setCurrentItem(hexData[0]);
        setToggle(!toggle);
    }, [hexData]);
    useEffect(() => {
        if (type=="MO") setText("Monster");
        else if (type==="CH") setText("Character");
        else if (type==="IT") setText("Item");
        else if (type==="SP") setText("Spell");
        else if (type==="LO") setText("Location");
        else if (type==="BG") setText("Background");
        else if (type==="EQ") setText("Equipment");
        
        const timer = setTimeout(() => {
            setAnimationState('fadeOut');
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * hexData.length);
                const randomObject = hexData[randomIndex];

                if (hexData.length == 0) {
                    setCurrentItem(currentItem);
                } else {
                    setCurrentItem(randomObject);
                }
                setAnimationState('fadeIn');
                setToggle(!toggle);
            }, 1500)
        }, Math.random() * 20000 + 10);

        return () => clearTimeout(timer);
    }, [toggle]);
    return (
        <div className={`${styles.hexagon} ${styles[animationState]}`} style={{ backgroundColor: currentItem === undefined ? "#CFC38F" : currentItem.color }}>
            <div className={`${styles.hexagonText}`}>
                <h3 style={{textAlign:"center"}}>{currentItem != undefined ? text : ""}</h3>
            </div>
            {currentItem != undefined && currentItem?.img_url != "" ?
                <img src={baseUrl + currentItem?.img_url} alt="Hexagon Image" className={styles.hexagonImage} />
                : <></>
            }
        </div>
    );
};

export default Hexagon;

{/* <div className={styles.hexagon} style={{ backgroundColor: contentColor }}> */ }
{/* <div className={`${styles.hexagon} ${styles[animationState]}`} style={{ backgroundColor: currentItem.color }}>
    {currentItem.img_url != "" ?
        <img src={baseUrl + currentItem.img_url} alt="Hexagon Image" className={styles.hexagonImage} />
        : <></>
    }
</div> 
<div className={`hexagon ${styles[animationState]}`}>
            <div className='hexagon-inner'>
                <div className='hexagon-inner-2' style={{ backgroundColor: contentColor }}></div>
            </div>
        </div>
*/
}
