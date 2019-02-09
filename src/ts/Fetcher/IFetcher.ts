export default interface IFetcher {
    fetch(url: string): Promise<string>;
    fetchYaml<I>(url: string): Promise<I>;
}
