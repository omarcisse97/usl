export class PageFactory {
    constructor() {
        this.title = 'Blank';
        this.header = '';
        this.content = '';
        this.footer = '';
        this.page = '';
    }

    setTitle(title) {
        this.title = title;
    }

    setHeader() {
        this.header = `
        <!DOCTYPE html> 
          <html lang="en"> 
          <head> 
          <meta charset="UTF-8"> 
          <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
          <link rel="stylesheet" media="all" href="/assets/stylesheets/style.css" />
          <title>DBMS - ${this.title}</title> 
          </head> 
          <body> 
          <header> 
          <h1>Database Management System Server</h1> 
          </header> 
          <navigation>
           <ul> 
           <li>User: ocisse</li> 
           <li><a href="http://localhost:8080/modules">Menu</a></li>
            <li><a href="http://localhost:8080/logout">Logout</a></li> 
            </ul> 
            </navigation>
             <div id="content">
        `;
    }
    

    setFooter() {
        this.footer = '</div> <footer> &copy; 2024 DBMS Devciss </footer> </body> </html>';
    }

    addContent(newEl) {
        const strContent = this.content + newEl;
        this.content = strContent;
    }
    clearContent(){
        this.content = '';
    }

    save() {
        if (this.header === null) {
            this.setHeader();
        }
        if (this.footer === null) {
            this.setFooter();
        }
    
        this.page = this.header + this.content + this.footer;
    }
    
    
    getTemplate() {
        if(this.page === ''){
            this.save();
        }
        return this.page;
    }
}
