import { siteName } from "../../../common/constants"

export default function Home() {

    return <><h1>{siteName}</h1>
        <div className="card">
            <p>
            Welcome! 
            </p>
        </div>
        <p className="read-the-docs">
           Click an option in the top menu to learn more
        </p></>

}