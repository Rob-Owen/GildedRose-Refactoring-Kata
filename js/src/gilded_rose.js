class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
  	items.forEach( i => i.quality = i.quality > 50 ? 50 : i.quality);
    this.items = items;
  }

  updateQuality() {
  	for (let item of this.items) {
  		const applicableRules = qualityRules.filter( r => item.name.includes(r.name)); // apply all matching rules
	    let qualityChange = applicableRules.reduce( (acc, r) => r.getQualityChange(item, acc), -1 );
	    QualityRule.applyQualityChange(item, qualityChange);

	    const sellInRule = sellInRules.filter( r => item.name.includes(r.name))[0]; // apply first matching rule
  		item.sellIn = sellInRule.getUpdatedSellIn(item);
    }
    return this.items;
  }
}
