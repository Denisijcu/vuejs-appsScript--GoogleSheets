function doGet(){
    let template = HtmlService.createTemplateFromFile('index');
    template.data = getDB();
    return template.evaluate().setTitle("Vuejs and SpreadSheet Demo").setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

const include = (fileName)=> HtmlService.createHtmlOutputFromFile(fileName).getContent();


function getDB(){
    let dbItems = new DBItems();

    return dbItems.getItems();
}

class Item{
  constructor(itemID,category,title,description,price,units,image,like){
     this.itemID = itemID;
     this.category = category;
     this.title=title;
     this.description=description;
     this.price= price;
     this.units = units;
     this.image=image;
     this.like=like;
  }

}

class DBItems{
  constructor(){}

  getItems(){
    let items = [];
    let item = new Item();
    const id="1O4Rih7vRC8vsgPaGhuROIN6C3k_Fjs3DN324ZLCzODk";

    const shItems = SpreadsheetApp.openById(id).getSheetByName("Items");

    let dataItems = shItems.getDataRange().getValues().slice(1);

    dataItems.map( item => {

      item = {

          itemID: item[0],
          category:item[1],
          title: item[2],
          description:item[3],
          price:item[4],
          units:item[5],
          image:item[6],
          like:item[7]
      };

      items.push(item);

    });

    return items;

  }
}
