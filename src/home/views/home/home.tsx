import { SITE_NAME } from "../../../common/constants"

export default function Home() {

    return <><h1>{SITE_NAME}</h1>
        <div className="card">
            <p>
            Welcome! 
            </p>
        </div>
        <p className="read-the-docs">
           Click an option in the top menu to learn more
        </p></>

}