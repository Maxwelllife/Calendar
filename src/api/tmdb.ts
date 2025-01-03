import configuration from "../configuration";

const apiBasePath = `${configuration.apiUrl}/3`;

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    console.log('relativeUrl', relativeUrl)
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${configuration.apiToken}`
        }
    };

    const response = await fetch(`${apiBasePath}/${relativeUrl}`, options);
    console.log('response', response)
    const json: TBody = await response.json();
    return json;

}

export interface MovieDetails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[]
}

interface Configuration {
    images: {
        base_url: string;
    }
}

export const client = {
    async getConfiguration() {
        return get<Configuration>('configuration');
    },
    async getNowPlaying(): Promise<MovieDetails[]> {
        const response = await get<PageResponse<MovieDetails>>('movie/now_playing?language=en-US&page=1');
        return response.results;
    }
}
