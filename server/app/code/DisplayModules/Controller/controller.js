import InitModulesModel from "./InitModules.js";
import PageFactory from "./PageFactory.js";


const Controller = async () => {
    const modules = await InitModulesModel();
    const pageFactory = await PageFactory();
    
    
    if(pageFactory.module === null){
        console.error(`Please review the following errors below`);
        console.error(`Template: ${view.error !== ''?view.error:'No error'}`);
        console.error(`Page Factory Import Module: ${pageFactory.error !== ''?pageFactory.error:'No error'}`);
        return{
            view:  `<h3 style="text-align:center;color:red">
            Unable to display template for module "DisplayModules". Please contact your local administrator as soon as possible.
            </h3>`,
            error: `Page Factory module failed. Please see errors: ${pageFactory.error}`
        }
    }
    pageFactory.module.setTitle('Modules List');
    pageFactory.module.setHeader();
    pageFactory.module.setFooter();
    pageFactory.module.addContent('<h2>Main Menu</h2> ');
    pageFactory.module.addContent('<ul>');
    for(let moduleName in modules){
        pageFactory.module.addContent(`<li key=${moduleName}>`);
        pageFactory.module.addContent(`<a href="${modules[moduleName].getRoute()}">${moduleName}</a>`);
        pageFactory.module.addContent('</li>');
    }
    pageFactory.module.addContent('</ul>');
    pageFactory.module.save();
    
    
    return{
        view: pageFactory.module.getTemplate(),
        error: ''
    }

};



export default Controller;
