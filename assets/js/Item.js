$(document).ready(function() {

    $("#ItemSave").click(function() {

        let ItemName = $("#ItemNameField").val();
        let ItemQTY = $("#ItemQTYField").val();
        let ItemPrice = $("#ItemPriceField").val();

        console.log(ItemName);
        console.log(ItemQTY);
        console.log(ItemPrice);

        const itemData = {
            name: ItemName,
            qty: ItemQTY,
            price: ItemPrice
        };

        console.log(itemData);
        const itemJson = JSON.stringify(itemData);
        console.log(itemJson);

        $.ajax({
            url: "http://localhost:8080/POS_BackEnd__JavaEE/Item",
            type: "POST",
            data: itemJson,
            Headers: {"Content-Type":"application/json"},
            success: (res) => {
                console.log(JSON.stringify(res));
            },
            error: (res) => {
                console.log(res);
            }
        });


    });

});