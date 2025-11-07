import config from "../utils/Configuration";

const API_KEY: string = config.NOTION_API_KEY;
const HOST: string = config.NOTION_HOST;

export async function query<T>(datasourceId: string, body: any): Promise<Array<T>> {
    const url = `${HOST}/data_sources/${datasourceId}/query`;
    const response = await fetch(url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Notion-Version': config.NOTION_VERSION,
            'Content-Type': ' application/json'
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP error! status: ${response.status}. Error: ${error}`);
    }

    type JSONResponse = {
        results: Array<T>;
    }

    const jsonResponse: JSONResponse = await response.json();

    return jsonResponse.results;
}

export async function save(datasourceId: string, icon: { [key: string]: string }, properties: any): Promise<void> {
    const url = `${HOST}/pages`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            'Notion-Version': config.NOTION_VERSION,
        },
        body: JSON.stringify({
            parent: { data_source_id: datasourceId },
            icon: icon ? icon : undefined,
            properties
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP error! status: ${response.status}. Error: ${error}`);
    }
}
