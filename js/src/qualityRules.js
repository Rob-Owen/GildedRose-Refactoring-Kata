class QualityRule {
	constructor(name, incrementRule) {
		this.name = name;
		this.rule = incrementRule;
	}

	getUpdatedQuality(item) {
		let qualityChange = this.rule(item);
		if (item.sellIn < 0) {
			qualityChange *= 2; // decay twice as fast if out of date
		}
		return QualityRule.getQualityInRange(item.quality + qualityChange);
	}

	static getQualityInRange(quality) { return quality > 50 ? 50 : (quality < 0 ? 0 : quality) }
}

const backstagePassRule = item => {
	if (item.sellIn === 0) {
		return -1*item.quality;
	}
	else {
		return (1 + Number(item.sellIn < 11) + Number(item.sellIn < 6));
	}
};

const qualityRules = [
	new QualityRule('Conjured Aged Brie', item => 2),
	new QualityRule('Aged Brie', item => 1),
	new QualityRule('Sulfuras, Hand of Ragnaros', item => 0),
	new QualityRule('Backstage passes to', backstagePassRule),
	new QualityRule('Conjured', item => -2),
	new QualityRule('', item => -1)        // default rule - all names match
];