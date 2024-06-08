export const fetchDataApi = async (apiUrL: string, endpoint?: string, options?: any): Promise<any> => {
    
    try {
        const url = endpoint ? `${apiUrL}/${endpoint}` : apiUrL;
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error (`Error fetching data: ${response.statusText}`)
        }
        return await response.json();

        } catch (er) {
            console.error(`Error fetching data from API`, er);
            throw er;
        }
} 