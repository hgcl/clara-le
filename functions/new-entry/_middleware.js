// Cloudflare docs for _middleware.js, here used for auth
// https://developers.cloudflare.com/pages/functions/middleware/

export const onRequest = async (context) => {
  const { request, env } = context;
  const auth = request.headers.get("Authorization");
  const [user, pass] = [env.BASIC_USER, env.BASIC_PASS];
  if (!auth || !isValid(auth, user, pass)) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }
  return await context.next();
};

const isValid = (auth, user, pass) => {
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic") return false;
  const decoded = atob(encoded).split(":");
  return decoded[0] === user && decoded[1] === pass;
};
