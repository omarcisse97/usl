import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { clear } from 'console';
import ModuleManager from './app/ModuleManager.js';
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'app', 'public')));

const moduleManager = new ModuleManager();
await moduleManager.initModules();

for (let pk in await moduleManager.getModules()) {
  const namespace = await moduleManager.getNamespace(pk);
  if (namespace.error !== '') {
    console.log(`${namespace.error}`);
    continue;
  }
  const modules = namespace.namespaceData._modules;
  for (let module in modules) {
    if (modules[module]._publicRoute !== '') {
      app.get(`/${modules[module]._publicRoute}`, async (req, res) => {
        const controllerPath = `file://${modules[module]._controller.replace(/\\/g, '/')}`;
        try {
          const { default: Controller } = await import(controllerPath);
          const controller = await Controller();
          res.send(controller.view);
          if(controller.error !== ''){
            console.error(`Please see the errors: ${controller.error}`);
          }
        } catch (err) {
          res.send(
            `<h3 style="text-align:center;color:red">
            Error displaying the template for "${module}" module. Please contact your local administrator
            </h3>`);
          console.error(`GET Request failed. System failed to display templete. Please check error details -> ${err} `);

        }
      });
    }
  }
  
}
app.get("/", async (req, res) => {
  console.log('Reading from server \n');
  res.redirect(301, '/modules');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

