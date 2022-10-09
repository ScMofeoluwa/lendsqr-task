import { app } from "./main";
import { configuration } from "./config/config";

const port = configuration.app_port;

app.listen(port, () => {
  console.log(`Connected to port:${port}`);
});
