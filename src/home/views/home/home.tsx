import { APP_ICON_LINK, SITE_NAME } from "../../../common/constants"
import styles from "./home.module.css"

export default function Home() {

    return <div className={styles.home}>
        <img className={styles.appIcon} src={APP_ICON_LINK} alt="App Icon" />
        <h1>Welcome to {SITE_NAME}!</h1>
        <p className="read-the-docs">
           Click an option in the top menu to learn more
        </p>
        </div>

}