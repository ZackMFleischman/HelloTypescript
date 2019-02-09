import * as yamlJS from "js-yaml";
import IFetcher from "@Fetcher/IFetcher";
import { FetchError, FetchConnectionError } from "@Fetcher/FetchErrors";

export default class Fetcher implements IFetcher {
    public fetch(url: string): Promise<string> {
        return window.fetch(url)
            .then(this._handleFetchResponse)
            .catch(error => this._throwFetchError(error, url));
    }

    public fetchYaml<I>(url: string): Promise<I> {
        return this.fetch(url)
            .then(yaml => yamlJS.safeLoad(yaml) as I);
    }

    private _handleFetchResponse(response: Response): Promise<string> {
        if (response.ok)
            return response.text();
        else
            throw new FetchError(response.status, response.url);
    }

    private _throwFetchError(error: Error, url: string): never {
        let errorToThrow: Error = error;

        if (!(error instanceof FetchError))
            errorToThrow = new FetchConnectionError(error.message, url);

        throw errorToThrow;
    }
}
