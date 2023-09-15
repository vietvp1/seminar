import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from './slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = []

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */

let clientInstance: prismic.Client<
  prismic.PrismicDocument<Record<string, any>, string, string>
>
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  if (clientInstance) {
    return clientInstance
  }
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: { next: { revalidate: 60 } },
    ...config,
    accessToken:
      'MC5aTG55QUJFQUFDSUFGOXdq.c--_vSQ6A0rvv71XKu-_ve-_vU3vv71pX38x77-977-9Ge-_ve-_vQA7GUjvv73vv73vv73vv70kaQ',
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  clientInstance = client
  return client
}
