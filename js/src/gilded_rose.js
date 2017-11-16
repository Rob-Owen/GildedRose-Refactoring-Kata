class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
  	for (let item of this.items) {
  		const qualityRule = qualityRules.filter( r => item.name.includes(r.name))[0]; // apply first matching rule
	    item.quality = qualityRule.getUpdatedQuality(item);
	    const sellInRule = sellInRules.filter( r => item.name.includes(r.name))[0]; // apply first matching rule
  		item.sellIn = sellInRule.getUpdatedSellIn(item);
    }
    return this.items;
  }
}
