const adminRestrictedPaths = ["/topics", "/topics/[0-9]+/delete"];

const roleMiddleware = async (context, next) => {
    const user = await context.state.session.get("user");
  
    if (
      user &&
      !user.admin &&
      context.request.method === "POST" &&
      (context.request.url.pathname.match(adminRestrictedPaths[1]) || context.request.url.pathname === adminRestrictedPaths[0])
    ) {
      context.response.redirect("/topics");
    } else {
      await next();
    }
  };
  
  export { roleMiddleware };