class QualityRule {
	constructor(name, incrementRule) {
		this.name = name;
		this.rule = incrementRule;
	}

	getQualityChange(item, currentIncrement) {
		return this.rule(item, currentIncrement);
	}

	static applyQualityChange(item, qualityChange) {
		if (item.sellIn < 0) {
			qualityChange *= 2;
		}
		item.quality = QualityRule.getQualityInRange(item.quality + qualityChange);
	}

	static getQualityInRange(quality) { return quality > 50 ? 50 : (quality < 0 ? 0 : quality) }
}

const backstagePassRule = (item, currentIncrement) => {
	if (item.sellIn === 0) {
		return -1*item.quality;
	}
	else {
		return (1 + Number(item.sellIn < 11) + Number(item.sellIn < 6));
	}
};

const qualityRules = [
	new QualityRule('Aged Brie', (item, currentIncrement) => currentIncrement*-1),
	new QualityRule('Sulfuras, Hand of Ragnaros', (item, currentIncrement) => 0),
	new QualityRule('Backstage passes to', backstagePassRule),
	new QualityRule('Conjured', (item, currentIncrement) => currentIncrement*2),
];