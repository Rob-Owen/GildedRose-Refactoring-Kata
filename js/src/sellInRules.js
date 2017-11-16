class sellInRule{
	constructor(name, incrementRule) {
		this.name = name;
		this.rule = incrementRule;
	}

	getUpdatedSellIn(item) {
		const increment = this.rule(item);
		return item.sellIn + increment;
	}
}

const sellInRules = [
	new sellInRule('Sulfuras, Hand of Ragnaros', item => 0),
	new sellInRule('', item => -1)
];