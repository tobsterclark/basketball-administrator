import { ApiKeyStrategy, createClient, Host, IApiKeyStrategy, WixClient } from "@wix/sdk";
import { items } from "@wix/data";

export class WixApi {
	wixClient: WixClient<
		Host<any> | undefined,
		IApiKeyStrategy,
		{
			items: typeof items;
		}
	>;
	private static instance?: WixApi;

	private constructor() {
		this.wixClient = createClient({
			modules: { items },
			auth: ApiKeyStrategy({
				apiKey:
					"IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjJlMmFhZDM4LWE1ODctNDFkMS1iYmM0LThkNDhjMTJlOWM1MlwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcImE4ZDVkNWViLTU0YWEtNDI5MS1iYWEyLTY3NDFmMTcyYjk4ZFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJjMTRjYzkyZi1mYWVmLTQyNzEtYTQzOC01NmYyOTZiYmVlZjFcIn19IiwiaWF0IjoxNzA2OTQ3MjAzfQ.m14P-SZpfzTU2KnhUPa9tI228p7UxDDKV-caISMpXzR95Tj86WRMDny7nbdGdhOPJoM-XhPot0n0qdnqQSJua1wvuvGi6jxIa2kbS3nbCwAd4oi1WjdhO-yiueqjHGnLrJCNPrDJ1x1whiO0MLYUIauAzKlUYs8a9RsMHkUPdOuHs9IgXHD1zUIfjheIDF3c8-36Gsmd49tfFpkwOGkkHsSG14Yx6qtATJiSv5siLmAtY-su6knX4YAroHG13jkFdvwLirG_QQmDEV9e7m9Us4EXhSAptCJ1Inuif9P3NLL7SwMNU6R7-PeBfM48o_Au8P_pgc2zJPkmxkhdIX0-bQ",
				siteId: "dba588da-fbf9-449b-8db0-f09c03a20f20",
			}),
		});
	}

	static getDefaultInstance(): WixApi {
		if (WixApi.instance) return WixApi.instance;

		WixApi.instance = new WixApi();
		return WixApi.instance;
	}
}
