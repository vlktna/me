/** A site-local path, including the deployment's optional subdirectory. */
export function sitePath(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
