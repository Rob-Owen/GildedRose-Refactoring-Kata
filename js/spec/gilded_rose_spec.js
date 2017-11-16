describe("Gilded Rose", function() {
    it("Generate Item", () => {
        const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("Generate multiple items", () => {
        const gildedRose = new Shop([new Item("foo", 0, 0),new Item("foo", 0, 0),new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items.length).toEqual(3);
    })

    it("Quality decays by one each day", () => {
        const gildedRose = new Shop([ new Item("beer", 10, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(39);
    });


    it("SellIn should decay by one each day", () => {
        const gildedRose = new Shop([ new Item("beer", 10, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
    });

    it("The Quality of an item is never negative", () => {
        const gildedRose = new Shop([ new Item("potatoes", 5, 1) ]);

        gildedRose.updateQuality();
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    it("Aged Brie gets better with age", () => {
        const gildedRose = new Shop([ new Item("Aged Brie", 10, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });

    it("Conjured Aged Brie gets even better with age!", () => {
	    const gildedRose = new Shop([ new Item("Conjured Aged Brie", 10, 40) ]);
	    const items = gildedRose.updateQuality();
	    expect(items[0].quality).toEqual(42);
    });

    it("The quality of Aged Brie is never more than 50", () => {
        const gildedRose = new Shop([ new Item("Aged Brie", 10, 49) ]);

        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(50);
    });

    it("The quality of items decreases twice as fast once sellIn reaches zero", () => {
	    const gildedRose = new Shop([ new Item("potatoes", 0, 40) ]);
	    gildedRose.updateQuality();
	    const items = gildedRose.updateQuality();
	    expect(items[0].quality).toEqual(37);
    });

    it("The quality of conjured items decreases twice as fast as normal", () => {
	    const gildedRose = new Shop([ new Item("Conjured potatoes", 10, 40) ]);
	    const items = gildedRose.updateQuality();
	    expect(items[0].quality).toEqual(38);
    });


    // it("The quality of an item is never more than 50", () => {
    //     const gildedRose = new Shop([ new Item("old socks", 10, 60) ]);
    //     const items = gildedRose.updateQuality();
    //     expect(items[0].quality).toEqual(49);
    // });

    describe("Sulfuras", () => {
        it("Sulfuras never has to be sold", () => {
            const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 35, 48) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(35);
        });

        it("Sulfuras never degrades in quality", () => {
            const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 35, 48) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(48);
        });
    });

    describe("Backstage Passes", () => {

        describe("...to a TAFKAL80ETC concert", () => {
            it("Backstage passes quality increases by 1 when more than 10 days left to sell", () => {
                const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(11);
            });
            it("Backstage passes quality increases by 2 when 10 of fewer days left to sell", () => {
                const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(12);
            });
            it("Backstage passes quality increases by 3 when 5 of fewer days left to sell", () => {
                const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10) ]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(13);
            });
            it("Backstage passes quality drops to zero after the concert", () => {
                const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10) ]);
                gildedRose.updateQuality();
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(0);
            });
        });

        // describe("...to a generic concert", () => {
        //     it("Backstage passes quality increases by 1 when more than 10 days left to sell", () => {
        //         const gildedRose = new Shop([ new Item("Backstage passes to", 15, 10) ]);
        //         const items = gildedRose.updateQuality();
        //         expect(items[0].quality).toEqual(11);
        //     });
        //     it("Backstage passes quality increases by 2 when 10 of fewer days left to sell", () => {
        //         const gildedRose = new Shop([ new Item("Backstage passes to", 10, 10) ]);
        //         const items = gildedRose.updateQuality();
        //         expect(items[0].quality).toEqual(12);
        //     });
        //     it("Backstage passes quality increases by 3 when 5 of fewer days left to sell", () => {
        //         const gildedRose = new Shop([ new Item("Backstage passes to", 5, 10) ]);
        //         const items = gildedRose.updateQuality();
        //         expect(items[0].quality).toEqual(13);
        //     });
        //     it("Backstage passes quality drops to zero after the concert", () => {
        //         const gildedRose = new Shop([ new Item("Backstage passes to", 1, 10) ]);
        //         const items = gildedRose.updateQuality();
        //         expect(items[0].quality).toEqual(0);
        //     });
        // });
    });
});
