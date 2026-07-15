import { useEffect, useState } from "react";
import { APP_ICON_LINK, SITE_NAME } from "../../../common/constants";
import styles from "./home.module.css";

const colors = ["#00bfbf", "#9acee6", "#9acee6"];

function createSpark(x: number, y: number): void {
    const spark = document.createElement("div");

    const size = Math.random() * 5 + 2;

    spark.style.position = "fixed";
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.borderRadius = "50%";
    spark.style.background =
        colors[Math.floor(Math.random() * colors.length)];
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "999999";
    spark.style.boxShadow = `0 0 ${size * 2}px currentColor`;
    spark.style.color = spark.style.background;

    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 35;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.animate(
        [
            {
                transform: "translate(0px, 0px) scale(1)",
                opacity: 1,
            },
            {
                transform: `translate(${dx}px, ${dy}px) scale(0)`,
                opacity: 0,
            },
        ],
        {
            duration: 1400 + Math.random() * 300,
            easing: "cubic-bezier(.2,.8,.2,1)",
        }
    ).onfinish = () => spark.remove();
}

export default function Home() {
    const [moving, setMoving] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event: globalThis.MouseEvent): void => {
            // if (Math.random() > 0.4) {
                createSpark(event.clientX, event.clientY);
            // }
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);



    return (
        <div className={styles.home}>
            <img
                className={`${styles.appIcon} ${moving ? styles.flyAcross : ""}`}
                src={APP_ICON_LINK}
                alt="App Icon"
                onClick={() => setMoving(true)}
                onAnimationEnd={() => setMoving(false)}
            />
            <h1>Welcome to {SITE_NAME}!</h1>
            <p className="read-the-docs">
                Click an option in the top menu to learn more
            </p>
        </div>
    );
}