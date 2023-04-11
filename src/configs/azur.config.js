// // Call back APIs which automatically write and read into a .json file - example implementation
// const beforeCacheAccess = async (cacheContext) => {
//   cacheContext.tokenCache.deserialize(await fs.readFile(cachePath, "utf-8"));
// };

// const afterCacheAccess = async (cacheContext) => {
//   if(cacheContext.cacheHasChanged){
//       await fs.writeFile(cachePath, cacheContext.tokenCache.serialize());
//   }
// };

// // Cache Plugin
// const cachePlugin = {
//   beforeCacheAccess,
//   afterCacheAccess
// };;

// const msalConfig = {
//   auth: {
//       clientId: "enter_client_id_here",
//       authority: "https://login.microsoftonline.com/common",
//       knownAuthorities: [],
//       cloudDiscoveryMetadata: "",
//       azureCloudOptions: {
//           azureCloudInstance: "enter_AzureCloudInstance_here", // AzureCloudInstance enum is exported as a "type",
//           tenant: "enter_tenant_info" // defaults to "common"
//       }
//   },
//   cache: {
//       cachePlugin // your implementation of cache plugin
//   },
//   system: {
//       loggerOptions: {
//           loggerCallback(loglevel, message, containsPii) {
//               console.log(message);
//           },
//           piiLoggingEnabled: false,
//           logLevel: msal.LogLevel.Verbose,
//       },
//       proxyUrl: "",
//       customAgentOptions: {},
//   }
// }

// const msalInstance = new PublicClientApplication(msalConfig);