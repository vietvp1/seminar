import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import sm from "./sm.json";

export const endpoint = sm.apiEndpoint;

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(endpoint);

/**
 * A list of Route Resolver objects that define how a document's `url` field
 * is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig["routes"] = [
  // {
  //   type: 'homepage',
  //   path: '/',
  // },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
    accessToken:
      "MC5aUVFIR2hJQUFDTUFsM2I5.77-9Innvv73vv70TL--_ve-_vSfvv71l77-9SO-_vXJpU--_vWFrW0bvv71zWCbvv73vv71J77-9UA",
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
