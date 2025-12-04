import { useEffect, useState } from "react";

export default function useWebSocket(url:string) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (event) => setData(JSON.parse(event.data));
        ws.onerror = console.error;

        return () => ws.close();
    }, [url]);

    return data;
}
