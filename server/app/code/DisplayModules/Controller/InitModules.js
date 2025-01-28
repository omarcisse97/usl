import ModuleManager from "../../../ModuleManager.js";
import Modules from "../Model/model.js";


const InitModulesModel = async() => {
    const modules = {};
    const moduleManager = new ModuleManager();
    await moduleManager.initModules();
    const namespaces = await moduleManager.getModules();
    for (let key in namespaces) {
        const nmsp = await moduleManager.getNamespace(key);
        if (nmsp.error !== '') {
            continue;
        }
        const mdls = nmsp.namespaceData._modules;
        for (let mdl in mdls) {
            if (mdls[mdl]._publicRoute === '' || mdl === 'DisplayModules') {
                continue;
            }
            
            modules[mdl] = new Modules(
                mdl,
                `http://localhost:8080/${mdls[mdl]._publicRoute}`,
                mdls[mdl]._modulePath
             );
        }
    }
    return modules;

};
export default InitModulesModel;