import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Track: NextPage = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading'
    return (
        <div>
            <p>aaa</p>
        </div>
    )
}

export default Track;